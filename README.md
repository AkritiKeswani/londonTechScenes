# LondonTechScenes

A web app that aggregates London's tech community events, people, and venues into one central platform.

## Tech Stack

- **Next.js 14** (App Router)
- **TypeScript**
- **Tailwind CSS**
- **Supabase** (backend - auth, database, storage)
- **shadcn/ui** (components)

## Getting Started

### Prerequisites

- Node.js 18+ and npm/yarn/pnpm

### Installation

1. Install dependencies:
```bash
npm install
```

2. Set up environment variables:
```bash
cp .env.local.example .env.local
```

Then add your Supabase credentials to `.env.local`:
```
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
```

3. Run the development server:
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Database Schema

### Events Table
```sql
CREATE TABLE events (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  date DATE NOT NULL,
  start_time TIME NOT NULL,
  end_time TIME,
  venue TEXT NOT NULL,
  location TEXT NOT NULL,
  type TEXT NOT NULL CHECK (type IN ('hackathon', 'meetup', 'workshop', 'conference', 'networking')),
  topics TEXT[] DEFAULT '{}',
  host_name TEXT NOT NULL,
  registration_url TEXT,
  image_url TEXT,
  source TEXT NOT NULL CHECK (source IN ('luma', 'eventbrite', 'manual')),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
```

### People Table (Future)
```sql
CREATE TABLE people (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  bio TEXT,
  building TEXT,
  interests TEXT[] DEFAULT '{}',
  twitter TEXT,
  linkedin TEXT,
  website TEXT,
  avatar_url TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
```

### Venues Table (Future)
```sql
CREATE TABLE venues (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  address TEXT NOT NULL,
  description TEXT,
  recurring_events TEXT[] DEFAULT '{}',
  website TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
```

## Project Structure

```
├── app/
│   ├── events/
│   │   └── [id]/
│   │       └── page.tsx      # Event detail page
│   ├── submit/
│   │   └── page.tsx           # Submit event form
│   ├── layout.tsx             # Root layout
│   ├── page.tsx               # Home page with events feed
│   └── globals.css            # Global styles
├── components/
│   ├── ui/                    # shadcn/ui components
│   ├── hero-section.tsx       # Landing page hero
│   └── events-feed.tsx        # Events feed with filters
├── lib/
│   ├── supabase.ts            # Supabase client
│   ├── utils.ts               # Utility functions
│   └── mock-events.ts         # Mock event data
└── types/
    └── event.ts               # TypeScript types
```

## Features

- ✅ Landing page with hero section
- ✅ Events feed with filtering and search
- ✅ Event detail pages
- ✅ Submit event form
- ✅ Responsive design
- 🚧 Database integration (ready for Supabase)
- 🚧 People directory
- 🚧 Venues map

## Design Principles

- Clean, modern, minimal aesthetic (inspired by Linear/Vercel)
- Fast loading, no bloat
- Mobile-responsive
- Inter font
- Dark mode friendly

## License

MIT

