import { notFound } from "next/navigation";
import { mockEvents } from "@/lib/mock-events";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { format, parseISO } from "date-fns";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";

interface EventDetailPageProps {
  params: {
    id: string;
  };
}

export default function EventDetailPage({ params }: EventDetailPageProps) {
  const event = mockEvents.find((e) => e.id === params.id);

  if (!event) {
    notFound();
  }

  return (
    <main className="min-h-screen bg-background">
      <div className="w-full max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Back Button */}
        <Link href="/">
          <Button variant="ghost" className="mb-6">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Events
          </Button>
        </Link>

        {/* Event Card */}
        <Card>
          <CardHeader>
            <div className="flex flex-wrap gap-2 mb-4">
              <Badge variant="secondary">{event.type}</Badge>
              {event.topics.map((topic) => (
                <Badge key={topic} variant="outline">
                  {topic}
                </Badge>
              ))}
            </div>
            <CardTitle className="text-3xl mb-2">{event.title}</CardTitle>
            <CardDescription className="text-base">
              Hosted by {event.host_name}
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Description */}
            <div>
              <h3 className="font-semibold mb-2">About this event</h3>
              <p className="text-muted-foreground">{event.description}</p>
            </div>

            {/* Event Details */}
            <div className="space-y-4">
              <div>
                <div className="font-medium mb-1">Date</div>
                <div className="text-muted-foreground">
                  {format(parseISO(event.date), "EEEE, MMMM d, yyyy")}
                </div>
              </div>

              <div>
                <div className="font-medium mb-1">Time</div>
                <div className="text-muted-foreground">
                  {event.start_time}
                  {event.end_time && ` - ${event.end_time}`}
                </div>
              </div>

              <div>
                <div className="font-medium mb-1">Venue</div>
                <div className="text-muted-foreground">{event.venue}</div>
                <div className="text-sm text-muted-foreground">{event.location}</div>
              </div>
            </div>

            {/* Registration Button */}
            {event.registration_url && (
              <div className="pt-4">
                <Button asChild size="lg" className="w-full sm:w-auto">
                  <a
                    href={event.registration_url}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Register for Event
                  </a>
                </Button>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </main>
  );
}

