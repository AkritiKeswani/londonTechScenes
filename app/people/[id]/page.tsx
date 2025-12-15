import { notFound } from "next/navigation";
import { mockPeople } from "@/lib/mock-people";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Twitter, Linkedin, Globe } from "lucide-react";
import Link from "next/link";

interface PersonDetailPageProps {
  params: {
    id: string;
  };
}

export default function PersonDetailPage({ params }: PersonDetailPageProps) {
  const person = mockPeople.find((p) => p.id === params.id);

  if (!person) {
    notFound();
  }

  return (
    <main className="min-h-screen bg-background">
      <div className="w-full max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Back Button */}
        <Link href="/people">
          <Button variant="ghost" className="mb-6">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to People
          </Button>
        </Link>

        {/* Person Card */}
        <Card>
          <CardHeader>
            <div className="flex flex-wrap gap-2 mb-4">
              {person.role && (
                <Badge variant="secondary" className="capitalize">
                  {person.role}
                </Badge>
              )}
              {person.open_to_connect && (
                <Badge variant="outline">Open to Connect</Badge>
              )}
              {person.interests.map((interest) => (
                <Badge key={interest} variant="outline">
                  {interest}
                </Badge>
              ))}
            </div>
            <CardTitle className="text-3xl mb-2">{person.name}</CardTitle>
            {person.company && (
              <CardDescription className="text-base">
                {person.company}
              </CardDescription>
            )}
            {person.location && (
              <CardDescription className="text-sm mt-1">
                📍 {person.location}
              </CardDescription>
            )}
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Bio */}
            {person.bio && (
              <div>
                <h3 className="font-semibold mb-2">About</h3>
                <p className="text-muted-foreground">{person.bio}</p>
              </div>
            )}

            {/* Building */}
            {person.building && (
              <div>
                <h3 className="font-semibold mb-2">Building</h3>
                <p className="text-muted-foreground">{person.building}</p>
              </div>
            )}

            {/* Communities */}
            {person.communities.length > 0 && (
              <div>
                <h3 className="font-semibold mb-2">Communities</h3>
                <div className="flex flex-wrap gap-2">
                  {person.communities.map((community) => (
                    <Badge key={community} variant="secondary">
                      {community}
                    </Badge>
                  ))}
                </div>
              </div>
            )}

            {/* Social Links */}
            {(person.twitter || person.linkedin || person.website) && (
              <div>
                <h3 className="font-semibold mb-3">Connect</h3>
                <div className="flex gap-3">
                  {person.twitter && (
                    <Button asChild variant="outline">
                      <a
                        href={person.twitter}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2"
                      >
                        <Twitter className="h-4 w-4" />
                        Twitter
                      </a>
                    </Button>
                  )}
                  {person.linkedin && (
                    <Button asChild variant="outline">
                      <a
                        href={person.linkedin}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2"
                      >
                        <Linkedin className="h-4 w-4" />
                        LinkedIn
                      </a>
                    </Button>
                  )}
                  {person.website && (
                    <Button asChild variant="outline">
                      <a
                        href={person.website}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2"
                      >
                        <Globe className="h-4 w-4" />
                        Website
                      </a>
                    </Button>
                  )}
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </main>
  );
}

