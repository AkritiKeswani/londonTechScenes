"use client";

import { useState, useMemo } from "react";
import { Person } from "@/types/person";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Twitter, Linkedin, Globe } from "lucide-react";
import { cn } from "@/lib/utils";

interface PeopleFeedProps {
  people: Person[];
}

export function PeopleFeed({ people }: PeopleFeedProps) {
  const [selectedRole, setSelectedRole] = useState<string>("all");
  const [selectedInterest, setSelectedInterest] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState("");

  // Get all unique roles and interests for filters
  const allRoles = useMemo(() => {
    const roles = new Set(people.map((p) => p.role));
    return Array.from(roles);
  }, [people]);

  const allInterests = useMemo(() => {
    const interests = new Set(people.flatMap((p) => p.interests));
    return Array.from(interests).sort();
  }, [people]);

  // Filter people
  const filteredPeople = useMemo(() => {
    return people.filter((person) => {
      // Role filter
      if (selectedRole !== "all" && person.role !== selectedRole) {
        return false;
      }

      // Interest filter
      if (selectedInterest !== "all" && !person.interests.includes(selectedInterest)) {
        return false;
      }

      // Search filter
      if (searchQuery) {
        const query = searchQuery.toLowerCase();
        const searchableText = [
          person.name,
          person.bio,
          person.building,
          person.company,
          ...person.interests,
          ...person.communities,
        ]
          .filter(Boolean)
          .join(" ")
          .toLowerCase();
        if (!searchableText.includes(query)) {
          return false;
        }
      }

      return true;
    });
  }, [people, selectedRole, selectedInterest, searchQuery]);

  return (
    <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Filters */}
      <div className="mb-8 space-y-4">
        {/* Search */}
        <div className="relative">
          <input
            type="text"
            placeholder="Search by name, bio, interests, company..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full px-4 py-2 rounded-md border border-input bg-background text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
          />
        </div>

        {/* Filter Pills */}
        <div className="flex flex-wrap gap-2">
          <Button
            variant={selectedRole === "all" ? "default" : "outline"}
            size="sm"
            onClick={() => setSelectedRole("all")}
          >
            All Roles
          </Button>
          {allRoles.map((role) => (
            <Button
              key={role}
              variant={selectedRole === role ? "default" : "outline"}
              size="sm"
              onClick={() => setSelectedRole(role)}
            >
              {role.charAt(0).toUpperCase() + role.slice(1)}
            </Button>
          ))}
        </div>

        {/* Interest Filters */}
        {allInterests.length > 0 && (
          <div className="flex flex-wrap gap-2">
            <Button
              variant={selectedInterest === "all" ? "default" : "outline"}
              size="sm"
              onClick={() => setSelectedInterest("all")}
            >
              All Interests
            </Button>
            {allInterests.map((interest) => (
              <Button
                key={interest}
                variant={selectedInterest === interest ? "default" : "outline"}
                size="sm"
                onClick={() => setSelectedInterest(interest)}
              >
                {interest}
              </Button>
            ))}
          </div>
        )}
      </div>

      {/* People Grid */}
      {filteredPeople.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-muted-foreground">No people found matching your filters.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredPeople.map((person) => (
            <Link key={person.id} href={`/people/${person.id}`}>
              <Card className="h-full hover:shadow-lg transition-shadow cursor-pointer border">
                <CardHeader className="pb-4">
                  <div className="flex items-start justify-between mb-2">
                    <CardTitle className="text-xl leading-tight">{person.name}</CardTitle>
                    {person.open_to_connect && (
                      <Badge variant="secondary" className="text-xs">
                        Open to Connect
                      </Badge>
                    )}
                  </div>
                  <div className="space-y-1">
                    {person.role && (
                      <Badge variant="outline" className="text-xs capitalize">
                        {person.role}
                      </Badge>
                    )}
                    {person.company && (
                      <p className="text-sm text-muted-foreground">{person.company}</p>
                    )}
                  </div>
                  {person.bio && (
                    <CardDescription className="line-clamp-3 text-sm leading-relaxed mt-2">
                      {person.bio}
                    </CardDescription>
                  )}
                </CardHeader>
                <CardContent className="space-y-4 pt-0">
                  {/* Building/Working On */}
                  {person.building && (
                    <div className="text-sm">
                      <span className="font-medium">Building: </span>
                      <span className="text-muted-foreground">{person.building}</span>
                    </div>
                  )}

                  {/* Location */}
                  {person.location && (
                    <div className="text-sm text-muted-foreground">{person.location}</div>
                  )}

                  {/* Interests */}
                  {person.interests.length > 0 && (
                    <div className="flex flex-wrap gap-2 pt-2">
                      {person.interests.slice(0, 3).map((interest) => (
                        <Badge key={interest} variant="outline" className="text-xs">
                          {interest}
                        </Badge>
                      ))}
                      {person.interests.length > 3 && (
                        <Badge variant="outline" className="text-xs">
                          +{person.interests.length - 3}
                        </Badge>
                      )}
                    </div>
                  )}

                  {/* Communities */}
                  {person.communities.length > 0 && (
                    <div className="text-sm text-muted-foreground pt-2 border-t">
                      <span className="font-medium">Communities: </span>
                      {person.communities.join(", ")}
                    </div>
                  )}

                  {/* Social Links */}
                  {(person.twitter || person.linkedin || person.website) && (
                    <div className="flex gap-2 pt-2 border-t">
                      {person.twitter && (
                        <a
                          href={person.twitter}
                          target="_blank"
                          rel="noopener noreferrer"
                          onClick={(e) => e.stopPropagation()}
                          className="text-muted-foreground hover:text-foreground"
                        >
                          <Twitter className="h-4 w-4" />
                        </a>
                      )}
                      {person.linkedin && (
                        <a
                          href={person.linkedin}
                          target="_blank"
                          rel="noopener noreferrer"
                          onClick={(e) => e.stopPropagation()}
                          className="text-muted-foreground hover:text-foreground"
                        >
                          <Linkedin className="h-4 w-4" />
                        </a>
                      )}
                      {person.website && (
                        <a
                          href={person.website}
                          target="_blank"
                          rel="noopener noreferrer"
                          onClick={(e) => e.stopPropagation()}
                          className="text-muted-foreground hover:text-foreground"
                        >
                          <Globe className="h-4 w-4" />
                        </a>
                      )}
                    </div>
                  )}
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}

