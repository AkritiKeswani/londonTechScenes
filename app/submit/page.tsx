"use client";

import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ArrowLeft, CheckCircle2, Lock } from "lucide-react";
import Link from "next/link";
import { SignedIn, SignedOut, SignInButton } from "@clerk/nextjs";
import { submitEvent } from "@/lib/events";

export default function SubmitEventPage() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    date: "",
    start_time: "",
    end_time: "",
    venue: "",
    location: "",
    type: "meetup",
    topics: "",
    host_name: "",
    registration_url: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // This should only be called if signed in, but double-check client-side
      // Parse topics from comma-separated string
      const topicsArray = formData.topics
        .split(",")
        .map((t) => t.trim())
        .filter((t) => t.length > 0);

      const eventData = {
        title: formData.title,
        description: formData.description,
        date: formData.date,
        start_time: formData.start_time,
        end_time: formData.end_time || null,
        venue: formData.venue,
        location: formData.location,
        type: formData.type as "hackathon" | "meetup" | "workshop" | "conference" | "networking",
        topics: topicsArray,
        host_name: formData.host_name,
        registration_url: formData.registration_url || null,
        image_url: null,
        source: "manual" as const,
      };

      const result = await submitEvent(eventData);

      if (!result.success) {
        throw new Error(result.error || "Failed to submit event");
      }

      setIsSubmitted(true);
    } catch (error) {
      console.error("Error submitting event:", error);
      alert("There was an error submitting your event. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSubmitted) {
    return (
      <main className="min-h-screen bg-background flex items-center justify-center px-4">
        <Card className="w-full max-w-md">
          <CardHeader className="text-center">
            <div className="flex justify-center mb-4">
              <CheckCircle2 className="h-16 w-16 text-primary" />
            </div>
            <CardTitle>Event Submitted!</CardTitle>
            <CardDescription>
              Thank you for submitting your event. It will be reviewed and, if approved, will appear on the site after a 20-hour buffer period.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col gap-2">
              <Button asChild className="w-full">
                <Link href="/">Back to Home</Link>
              </Button>
              <Button
                asChild
                variant="outline"
                className="w-full"
                onClick={() => setIsSubmitted(false)}
              >
                <button type="button">Submit Another Event</button>
              </Button>
            </div>
          </CardContent>
        </Card>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-background">
      <div className="w-full max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Back Button */}
        <Link href="/">
          <Button variant="ghost" className="mb-6">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Home
          </Button>
        </Link>

        {/* Form Card */}
        <Card>
          <CardHeader>
            <CardTitle>Submit an Event</CardTitle>
            <CardDescription>
              Help grow London&apos;s tech community by sharing your event. All submissions are reviewed before being published.
            </CardDescription>
          </CardHeader>
          <CardContent>
            {/* Sign-in prompt for unsigned users */}
            <SignedOut>
              <div className="mb-6 p-4 bg-muted rounded-lg border border-border flex items-start gap-3">
                <Lock className="h-5 w-5 text-muted-foreground mt-0.5" />
                <div className="flex-1">
                  <p className="text-sm font-medium mb-1">Sign in required</p>
                  <p className="text-sm text-muted-foreground mb-3">
                    Please sign in to submit an event to the community.
                  </p>
                  <SignInButton mode="modal">
                    <Button size="sm">Sign In</Button>
                  </SignInButton>
                </div>
              </div>
            </SignedOut>

            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Title */}
              <div className="space-y-2">
                <label htmlFor="title" className="text-sm font-medium">
                  Event Title *
                </label>
                <Input
                  id="title"
                  required
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  placeholder="AI Builders London Meetup"
                />
              </div>

              {/* Description */}
              <div className="space-y-2">
                <label htmlFor="description" className="text-sm font-medium">
                  Description *
                </label>
                <textarea
                  id="description"
                  required
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  placeholder="Tell us about your event..."
                  className="flex min-h-[120px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                />
              </div>

              {/* Date and Time */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="space-y-2">
                  <label htmlFor="date" className="text-sm font-medium">
                    Date *
                  </label>
                  <Input
                    id="date"
                    type="date"
                    required
                    value={formData.date}
                    onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <label htmlFor="start_time" className="text-sm font-medium">
                    Start Time *
                  </label>
                  <Input
                    id="start_time"
                    type="time"
                    required
                    value={formData.start_time}
                    onChange={(e) => setFormData({ ...formData, start_time: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <label htmlFor="end_time" className="text-sm font-medium">
                    End Time
                  </label>
                  <Input
                    id="end_time"
                    type="time"
                    value={formData.end_time}
                    onChange={(e) => setFormData({ ...formData, end_time: e.target.value })}
                  />
                </div>
              </div>

              {/* Venue and Location */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label htmlFor="venue" className="text-sm font-medium">
                    Venue Name *
                  </label>
                  <Input
                    id="venue"
                    required
                    value={formData.venue}
                    onChange={(e) => setFormData({ ...formData, venue: e.target.value })}
                    placeholder="TechHub Shoreditch"
                  />
                </div>
                <div className="space-y-2">
                  <label htmlFor="location" className="text-sm font-medium">
                    Location *
                  </label>
                  <Input
                    id="location"
                    required
                    value={formData.location}
                    onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                    placeholder="Shoreditch, London"
                  />
                </div>
              </div>

              {/* Type and Topics */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label htmlFor="type" className="text-sm font-medium">
                    Event Type *
                  </label>
                  <select
                    id="type"
                    required
                    value={formData.type}
                    onChange={(e) => setFormData({ ...formData, type: e.target.value })}
                    className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                  >
                    <option value="meetup">Meetup</option>
                    <option value="hackathon">Hackathon</option>
                    <option value="workshop">Workshop</option>
                    <option value="conference">Conference</option>
                    <option value="networking">Networking</option>
                  </select>
                </div>
                <div className="space-y-2">
                  <label htmlFor="topics" className="text-sm font-medium">
                    Topics (comma-separated) *
                  </label>
                  <Input
                    id="topics"
                    required
                    value={formData.topics}
                    onChange={(e) => setFormData({ ...formData, topics: e.target.value })}
                    placeholder="AI, Machine Learning"
                  />
                </div>
              </div>

              {/* Host and Registration */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label htmlFor="host_name" className="text-sm font-medium">
                    Host Name *
                  </label>
                  <Input
                    id="host_name"
                    required
                    value={formData.host_name}
                    onChange={(e) => setFormData({ ...formData, host_name: e.target.value })}
                    placeholder="AI Builders London"
                  />
                </div>
                <div className="space-y-2">
                  <label htmlFor="registration_url" className="text-sm font-medium">
                    Registration URL
                  </label>
                  <Input
                    id="registration_url"
                    type="url"
                    value={formData.registration_url}
                    onChange={(e) => setFormData({ ...formData, registration_url: e.target.value })}
                    placeholder="https://lu.ma/event"
                  />
                </div>
              </div>

              {/* Submit Button */}
              <SignedIn>
                <Button type="submit" size="lg" className="w-full" disabled={isSubmitting}>
                  {isSubmitting ? "Submitting..." : "Submit Event"}
                </Button>
              </SignedIn>
              <SignedOut>
                <Button type="button" size="lg" className="w-full" disabled>
                  <Lock className="mr-2 h-4 w-4" />
                  Sign in to Submit
                </Button>
              </SignedOut>
            </form>
          </CardContent>
        </Card>
      </div>
    </main>
  );
}

