"use client";

import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ArrowLeft, CheckCircle2, Lock, Info } from "lucide-react";
import Link from "next/link";
import { SignedIn, SignedOut, SignInButton } from "@clerk/nextjs";

export default function SubmitPersonPage() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    bio: "",
    building: "",
    role: "founder",
    company: "",
    interests: "",
    twitter: "",
    linkedin: "",
    website: "",
    location: "",
    communities: "",
    open_to_connect: true,
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // Parse interests and communities from comma-separated strings
      const interestsArray = formData.interests
        .split(",")
        .map((i) => i.trim())
        .filter((i) => i.length > 0);
      
      const communitiesArray = formData.communities
        .split(",")
        .map((c) => c.trim())
        .filter((c) => c.length > 0);

      const personData = {
        name: formData.name,
        bio: formData.bio || null,
        building: formData.building || null,
        role: formData.role as "founder" | "developer" | "designer" | "investor" | "operator" | "other",
        company: formData.company || null,
        interests: interestsArray,
        twitter: formData.twitter || null,
        linkedin: formData.linkedin || null,
        website: formData.website || null,
        location: formData.location || null,
        communities: communitiesArray,
        open_to_connect: formData.open_to_connect,
      };

      // TODO: Call API to submit person
      console.log("Submitting person:", personData);
      
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000));

      setIsSubmitted(true);
    } catch (error) {
      console.error("Error submitting person:", error);
      alert("There was an error submitting the profile. Please try again.");
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
            <CardTitle>Profile Submitted!</CardTitle>
            <CardDescription>
              Thank you for submitting the profile. It will be reviewed and, if approved, will appear on the site.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col gap-2">
              <Button asChild className="w-full">
                <Link href="/people">Back to People</Link>
              </Button>
              <Button
                asChild
                variant="outline"
                className="w-full"
                onClick={() => setIsSubmitted(false)}
              >
                <button type="button">Submit Another Profile</button>
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
        <Link href="/people">
          <Button variant="ghost" className="mb-6">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to People
          </Button>
        </Link>

        {/* Form Card */}
        <Card>
          <CardHeader>
            <CardTitle>Submit a Profile</CardTitle>
            <CardDescription>
              Share someone&apos;s profile with the London tech community. Make sure you have their permission before submitting.
            </CardDescription>
            
            {/* Permission Notice */}
            <div className="mt-4 p-4 bg-muted rounded-lg border border-border flex items-start gap-3">
              <Info className="h-5 w-5 text-muted-foreground mt-0.5 flex-shrink-0" />
              <div className="text-sm text-muted-foreground">
                <p className="font-medium mb-1">Important:</p>
                <p>Please ensure you have explicit permission from the person before submitting their profile. This helps maintain trust and privacy in our community.</p>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            {/* Sign-in prompt for unsigned users */}
            <SignedOut>
              <div className="mb-6 p-4 bg-muted rounded-lg border border-border flex items-start gap-3">
                <Lock className="h-5 w-5 text-muted-foreground mt-0.5" />
                <div className="flex-1">
                  <p className="text-sm font-medium mb-1">Sign in required</p>
                  <p className="text-sm text-muted-foreground mb-3">
                    Please sign in to submit a profile.
                  </p>
                  <SignInButton mode="modal">
                    <Button size="sm">Sign In</Button>
                  </SignInButton>
                </div>
              </div>
            </SignedOut>

            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Name */}
              <div className="space-y-2">
                <label htmlFor="name" className="text-sm font-medium">
                  Name *
                </label>
                <Input
                  id="name"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="John Doe"
                />
              </div>

              {/* Bio */}
              <div className="space-y-2">
                <label htmlFor="bio" className="text-sm font-medium">
                  Bio
                </label>
                <textarea
                  id="bio"
                  value={formData.bio}
                  onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
                  placeholder="Tell us about this person..."
                  className="flex min-h-[120px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                />
              </div>

              {/* Role and Company */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label htmlFor="role" className="text-sm font-medium">
                    Role *
                  </label>
                  <select
                    id="role"
                    required
                    value={formData.role}
                    onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                    className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                  >
                    <option value="founder">Founder</option>
                    <option value="developer">Developer</option>
                    <option value="designer">Designer</option>
                    <option value="investor">Investor</option>
                    <option value="operator">Operator</option>
                    <option value="other">Other</option>
                  </select>
                </div>
                <div className="space-y-2">
                  <label htmlFor="company" className="text-sm font-medium">
                    Company/Startup
                  </label>
                  <Input
                    id="company"
                    value={formData.company}
                    onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                    placeholder="Company Name"
                  />
                </div>
              </div>

              {/* Building */}
              <div className="space-y-2">
                <label htmlFor="building" className="text-sm font-medium">
                  What they&apos;re building
                </label>
                <Input
                  id="building"
                  value={formData.building}
                  onChange={(e) => setFormData({ ...formData, building: e.target.value })}
                  placeholder="AI-powered developer tools"
                />
              </div>

              {/* Interests and Communities */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label htmlFor="interests" className="text-sm font-medium">
                    Interests (comma-separated) *
                  </label>
                  <Input
                    id="interests"
                    required
                    value={formData.interests}
                    onChange={(e) => setFormData({ ...formData, interests: e.target.value })}
                    placeholder="AI, Web3, SaaS"
                  />
                </div>
                <div className="space-y-2">
                  <label htmlFor="communities" className="text-sm font-medium">
                    Communities (comma-separated)
                  </label>
                  <Input
                    id="communities"
                    value={formData.communities}
                    onChange={(e) => setFormData({ ...formData, communities: e.target.value })}
                    placeholder="Cerebral Valley, AI Builders"
                  />
                </div>
              </div>

              {/* Location */}
              <div className="space-y-2">
                <label htmlFor="location" className="text-sm font-medium">
                  Location
                </label>
                <Input
                  id="location"
                  value={formData.location}
                  onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                  placeholder="Shoreditch, London"
                />
              </div>

              {/* Social Links */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="space-y-2">
                  <label htmlFor="twitter" className="text-sm font-medium">
                    Twitter/X URL
                  </label>
                  <Input
                    id="twitter"
                    type="url"
                    value={formData.twitter}
                    onChange={(e) => setFormData({ ...formData, twitter: e.target.value })}
                    placeholder="https://twitter.com/username"
                  />
                </div>
                <div className="space-y-2">
                  <label htmlFor="linkedin" className="text-sm font-medium">
                    LinkedIn URL
                  </label>
                  <Input
                    id="linkedin"
                    type="url"
                    value={formData.linkedin}
                    onChange={(e) => setFormData({ ...formData, linkedin: e.target.value })}
                    placeholder="https://linkedin.com/in/username"
                  />
                </div>
                <div className="space-y-2">
                  <label htmlFor="website" className="text-sm font-medium">
                    Website
                  </label>
                  <Input
                    id="website"
                    type="url"
                    value={formData.website}
                    onChange={(e) => setFormData({ ...formData, website: e.target.value })}
                    placeholder="https://example.com"
                  />
                </div>
              </div>

              {/* Open to Connect */}
              <div className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  id="open_to_connect"
                  checked={formData.open_to_connect}
                  onChange={(e) => setFormData({ ...formData, open_to_connect: e.target.checked })}
                  className="h-4 w-4 rounded border-input"
                />
                <label htmlFor="open_to_connect" className="text-sm font-medium">
                  Open to connect
                </label>
              </div>

              {/* Submit Button */}
              <SignedIn>
                <Button type="submit" size="lg" className="w-full" disabled={isSubmitting}>
                  {isSubmitting ? "Submitting..." : "Submit Profile"}
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

