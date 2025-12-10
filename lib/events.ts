import { supabase } from "./supabase";
import { Event } from "@/types/event";

/**
 * Check if an event is past the 20-hour approval buffer
 */
export function isPastApprovalBuffer(approvedAt: string | null): boolean {
  if (!approvedAt) return false;
  
  const approvedTime = new Date(approvedAt).getTime();
  const now = new Date().getTime();
  const twentyHoursInMs = 20 * 60 * 60 * 1000; // 20 hours in milliseconds
  
  return (now - approvedTime) >= twentyHoursInMs;
}

/**
 * Fetch all approved events that are past the 20-hour buffer
 */
export async function getApprovedEvents(): Promise<Event[]> {
  try {
    const { data, error } = await supabase
      .from("events")
      .select("*")
      .eq("approval_status", "approved")
      .not("approved_at", "is", null)
      .order("date", { ascending: true });

    if (error) {
      console.error("Error fetching events:", error);
      return [];
    }

    // Filter events that are past the 20-hour buffer
    const approvedEvents = (data || []).filter((event) =>
      isPastApprovalBuffer(event.approved_at)
    ) as Event[];

    return approvedEvents;
  } catch (error) {
    console.error("Error fetching events:", error);
    return [];
  }
}

/**
 * Submit a new event (will be pending approval)
 */
export async function submitEvent(eventData: Omit<Event, "id" | "created_at" | "approval_status" | "approved_at">): Promise<{ success: boolean; error?: string }> {
  try {
    const { error } = await supabase.from("events").insert([
      {
        ...eventData,
        approval_status: "pending",
        approved_at: null,
        created_at: new Date().toISOString(),
      },
    ]);

    if (error) {
      console.error("Error submitting event:", error);
      return { success: false, error: error.message };
    }

    return { success: true };
  } catch (error) {
    console.error("Error submitting event:", error);
    return { success: false, error: "Failed to submit event" };
  }
}

