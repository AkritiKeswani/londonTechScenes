import { Event } from "@/types/event";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { format, parseISO } from "date-fns";
import Link from "next/link";

interface EventsFeedProps {
  events: Event[];
}

export function EventsFeed({ events }: EventsFeedProps) {
  return (
    <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Events Grid */}
      {events.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-muted-foreground">No events available.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {events.map((event) => (
            <Link key={event.id} href={`/events/${event.id}`}>
              <Card className="h-full hover:shadow-lg transition-shadow cursor-pointer border">
                <CardHeader className="pb-4">
                  <CardTitle className="text-xl mb-3 leading-tight">{event.title}</CardTitle>
                  <CardDescription className="line-clamp-3 text-sm leading-relaxed">
                    {event.description}
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4 pt-0">
                  {/* Event Details */}
                  <div className="space-y-2 text-sm">
                    <div className="text-muted-foreground">
                      {format(parseISO(event.date), "EEE, MMM d, yyyy")}
                    </div>
                    <div className="text-muted-foreground">
                      {event.start_time}
                      {event.end_time && ` - ${event.end_time}`}
                    </div>
                    <div className="text-muted-foreground">
                      {event.venue}
                    </div>
                  </div>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-2 pt-2">
                    <Badge variant="secondary" className="text-xs">{event.type}</Badge>
                    {event.topics.map((topic) => (
                      <Badge key={topic} variant="outline" className="text-xs">
                        {topic}
                      </Badge>
                    ))}
                  </div>

                  {/* Host */}
                  <div className="text-sm text-muted-foreground pt-2 border-t">
                    Hosted by {event.host_name}
                  </div>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}

