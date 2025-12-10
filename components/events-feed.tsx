"use client";

import { useState, useMemo } from "react";
import { Event } from "@/types/event";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { format, parseISO } from "date-fns";
import Link from "next/link";
import { isEventPast } from "@/lib/utils";
import { cn } from "@/lib/utils";

interface EventsFeedProps {
  events: Event[];
}

export function EventsFeed({ events }: EventsFeedProps) {
  const [activeTab, setActiveTab] = useState<"upcoming" | "past">("upcoming");

  // Filter events into upcoming and past
  const { upcomingEvents, pastEvents } = useMemo(() => {
    const upcoming: Event[] = [];
    const past: Event[] = [];

    events.forEach((event) => {
      if (isEventPast(event)) {
        past.push(event);
      } else {
        upcoming.push(event);
      }
    });

    // Sort upcoming events by date (earliest first)
    upcoming.sort((a, b) => {
      const dateA = new Date(`${a.date}T${a.start_time}`);
      const dateB = new Date(`${b.date}T${b.start_time}`);
      return dateA.getTime() - dateB.getTime();
    });

    // Sort past events by date (most recent first)
    past.sort((a, b) => {
      const dateA = new Date(`${a.date}T${a.end_time || a.start_time}`);
      const dateB = new Date(`${b.date}T${b.end_time || b.start_time}`);
      return dateB.getTime() - dateA.getTime();
    });

    return { upcomingEvents: upcoming, pastEvents: past };
  }, [events]);

  const displayedEvents = activeTab === "upcoming" ? upcomingEvents : pastEvents;

  return (
    <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Tabs */}
      <div className="flex gap-2 mb-8 border-b">
        <Button
          variant="ghost"
          onClick={() => setActiveTab("upcoming")}
          className={cn(
            "rounded-none border-b-2 border-transparent -mb-[1px]",
            activeTab === "upcoming" && "border-primary text-primary"
          )}
        >
          Upcoming ({upcomingEvents.length})
        </Button>
        <Button
          variant="ghost"
          onClick={() => setActiveTab("past")}
          className={cn(
            "rounded-none border-b-2 border-transparent -mb-[1px]",
            activeTab === "past" && "border-primary text-primary"
          )}
        >
          Past ({pastEvents.length})
        </Button>
      </div>

      {/* Events Grid */}
      {displayedEvents.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-muted-foreground">
            {activeTab === "upcoming" 
              ? "No upcoming events available." 
              : "No past events available."}
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {displayedEvents.map((event) => (
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

