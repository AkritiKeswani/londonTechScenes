import { PeopleFeed } from "@/components/people-feed";
import { mockPeople } from "@/lib/mock-people";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function PeoplePage() {
  // Filter to only show approved people
  const approvedPeople = mockPeople.filter((person) => person.approval_status === "approved");

  return (
    <main className="min-h-screen bg-background">
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <div className="mb-12 text-center">
          <h1 className="text-4xl sm:text-5xl font-bold tracking-tight mb-4">
            Connect with London&apos;s Tech Community
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-6">
            Discover founders, developers, designers, and investors building the future in London.
            Connect, collaborate, and grow together.
          </p>
          <Button asChild size="lg" variant="outline">
            <Link href="/people/submit">Submit a Profile</Link>
          </Button>
        </div>

        {/* People Feed */}
        <PeopleFeed people={approvedPeople} />
      </div>
    </main>
  );
}

