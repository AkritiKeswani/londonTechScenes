export interface Event {
  id: string;
  title: string;
  description: string;
  date: string;
  start_time: string;
  end_time: string | null;
  venue: string;
  location: string;
  type: "hackathon" | "meetup" | "workshop" | "conference" | "networking";
  topics: string[];
  host_name: string;
  registration_url: string | null;
  image_url: string | null;
  source: "luma" | "eventbrite" | "manual";
  created_at: string;
}

