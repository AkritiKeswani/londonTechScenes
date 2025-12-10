import { HeroSection } from "@/components/hero-section";
import { EventsFeed } from "@/components/events-feed";
import { mockEvents } from "@/lib/mock-events";
import { getApprovedEvents } from "@/lib/events";

export default async function Home() {
  // Try to fetch from Supabase, fallback to mock data if not configured
  let events;
  try {
    events = await getApprovedEvents();
    // If no events from Supabase, use mock data
    if (events.length === 0) {
      events = mockEvents;
    }
  } catch (error) {
    // Fallback to mock data if Supabase isn't configured
    events = mockEvents;
  }

  return (
    <main className="min-h-screen">
      <HeroSection />
      <section id="events" className="py-12">
        <EventsFeed events={events} />
      </section>
    </main>
  );
}
