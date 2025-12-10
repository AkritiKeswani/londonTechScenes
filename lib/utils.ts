import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { Event } from "@/types/event";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * Check if an event has already passed based on its date and end_time
 */
export function isEventPast(event: Event): boolean {
  const now = new Date();
  const eventDate = new Date(event.date);
  
  // If event has an end_time, use that; otherwise use start_time
  const timeToUse = event.end_time || event.start_time;
  const [hours, minutes] = timeToUse.split(':').map(Number);
  
  // Set the event date/time
  eventDate.setHours(hours, minutes, 0, 0);
  
  // If event has end_time, we consider it past only after the end_time
  // Otherwise, we consider it past after the start_time
  return eventDate < now;
}

