import Link from "next/link";
import { Button } from "@/components/ui/button";

export function HeroSection() {
  return (
    <div className="relative w-full overflow-hidden bg-background">
      <div className="relative w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 sm:py-32">
        <div className="text-center space-y-8">
          {/* Main Headline */}
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight">
            londonTechScenes
          </h1>

          {/* Subheading */}
          <p className="text-lg sm:text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto">
            Discover events, meet builders, and find venues in London&apos;s vibrant tech community.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Button asChild size="lg" className="px-8">
              <Link href="#events">
                Browse Events
              </Link>
            </Button>
            <Button asChild size="lg" variant="outline" className="px-8">
              <Link href="/submit">
                Submit Event
              </Link>
            </Button>
          </div>

          {/* Feature Pills */}
          <div className="flex flex-wrap justify-center gap-4 pt-8">
            <div className="px-4 py-2 rounded-full bg-card border text-sm">
              Events
            </div>
            <div className="px-4 py-2 rounded-full bg-card border text-sm">
              People
            </div>
            <div className="px-4 py-2 rounded-full bg-card border text-sm">
              Venues
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

