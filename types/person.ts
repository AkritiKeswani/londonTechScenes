export interface Person {
  id: string;
  name: string;
  bio: string | null;
  building: string | null; // What they're building/working on
  role: "founder" | "developer" | "designer" | "investor" | "operator" | "other";
  company: string | null; // Company/startup name
  interests: string[]; // e.g., ["AI", "Web3", "SaaS"]
  twitter: string | null;
  linkedin: string | null;
  website: string | null;
  avatar_url: string | null;
  location: string | null; // e.g., "Shoreditch, London"
  communities: string[]; // e.g., ["Cerebral Valley", "AI Builders"]
  open_to_connect: boolean; // Whether they're open to connections
  created_at: string;
  approval_status: "pending" | "approved" | "rejected";
  approved_at: string | null;
}

