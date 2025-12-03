import { HeroSection } from "@/components/hero-section";
import { EventsFeed } from "@/components/events-feed";
import { mockEvents } from "@/lib/mock-events";

export default function Home() {
  return (
    <main className="min-h-screen">
      <HeroSection />
      <section id="events" className="py-12">
        <EventsFeed events={mockEvents} />
      </section>
    </main>
  );
}

