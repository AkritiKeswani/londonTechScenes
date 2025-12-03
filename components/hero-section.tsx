import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Calendar, Users, MapPin } from "lucide-react";

export function HeroSection() {
  return (
    <div className="relative w-full overflow-hidden bg-background">
      <div className="relative w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 sm:py-32">
        <div className="text-center space-y-8">
          {/* Main Headline */}
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight">
            London&apos;s Tech Scene,
            <br />
            <span>
              All in One Place
            </span>
          </h1>

          {/* Subheading */}
          <p className="text-lg sm:text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto">
            Discover events, meet builders, and find venues in London&apos;s vibrant tech community.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Button asChild size="lg" className="text-base px-8">
              <Link href="#events">
                <Calendar className="mr-2 h-5 w-5" />
                Browse Events
              </Link>
            </Button>
            <Button asChild size="lg" variant="outline" className="text-base px-8">
              <Link href="/submit">
                Submit Event
              </Link>
            </Button>
          </div>

          {/* Feature Pills */}
          <div className="flex flex-wrap justify-center gap-4 pt-8">
            <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-card border text-sm">
              <Calendar className="h-4 w-4 text-primary" />
              <span>Events</span>
            </div>
            <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-card border text-sm">
              <Users className="h-4 w-4 text-primary" />
              <span>People</span>
            </div>
            <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-card border text-sm">
              <MapPin className="h-4 w-4 text-primary" />
              <span>Venues</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

