# Supabase Setup Guide for londonTechScenes

## Overview

Events submitted through the form go to Supabase with `approval_status: "pending"`. After you manually approve them, they appear on the site after a 20-hour buffer period.

## Database Schema

### Events Table

Run this SQL in your Supabase SQL Editor:

```sql
-- Create events table
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
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  approval_status TEXT NOT NULL DEFAULT 'pending' CHECK (approval_status IN ('pending', 'approved', 'rejected')),
  approved_at TIMESTAMP WITH TIME ZONE
);

-- Create index for faster queries
CREATE INDEX idx_events_approval_status ON events(approval_status);
CREATE INDEX idx_events_approved_at ON events(approved_at);
CREATE INDEX idx_events_date ON events(date);
```

## Approval Workflow

1. **User submits event** → Goes to Supabase with `approval_status: "pending"` and `approved_at: null`

2. **You review events** → Check pending events in Supabase dashboard

3. **Approve event** → Update the event:
   ```sql
   UPDATE events 
   SET approval_status = 'approved', approved_at = NOW() 
   WHERE id = 'event-id-here';
   ```

4. **20-hour buffer** → Event appears on site 20 hours after `approved_at` timestamp

5. **Reject event** (optional):
   ```sql
   UPDATE events 
   SET approval_status = 'rejected' 
   WHERE id = 'event-id-here';
   ```

## How to Approve Events

### Option 1: Supabase Dashboard (Easiest)

1. Go to your Supabase project dashboard
2. Navigate to **Table Editor** → `events` table
3. Filter by `approval_status = 'pending'`
4. Click on an event to edit
5. Change `approval_status` to `"approved"`
6. Set `approved_at` to current timestamp (or use `NOW()`)
7. Save

### Option 2: SQL Editor

```sql
-- Approve a specific event
UPDATE events 
SET approval_status = 'approved', approved_at = NOW() 
WHERE id = 'your-event-id-here';

-- Approve all pending events (use with caution!)
UPDATE events 
SET approval_status = 'approved', approved_at = NOW() 
WHERE approval_status = 'pending';
```

### Option 3: Create Admin Page (Future Enhancement)

You could build a simple admin page at `/admin` with authentication to approve/reject events directly from the site.

## Environment Variables

Add these to your Vercel project settings:

```
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
```

## How It Works

- **Form submission**: Events are saved with `approval_status: "pending"`
- **Site display**: Only shows events where:
  - `approval_status = "approved"`
  - `approved_at` is not null
  - At least 20 hours have passed since `approved_at`
- **20-hour buffer**: Implemented in `lib/events.ts` - events only appear after the buffer period

## Testing

1. Submit an event via `/submit`
2. Check Supabase dashboard - should see event with `approval_status: "pending"`
3. Approve it manually
4. Wait 20 hours (or temporarily change buffer in code for testing)
5. Event should appear on homepage

