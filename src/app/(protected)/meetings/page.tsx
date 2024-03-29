"use client";

// import for authentication
import { useSession } from "@clerk/nextjs";

//next imports
import Link from "next/link";
import React, { useState } from "react";

//convex imports
import { useMutation, useQuery, useAction } from "convex/react";
import { api } from "../../../../convex/_generated/api";

// shadcnui imports
import { Button } from "@/components/ui/button";

export default function MeetingsPage() {
  const { isSignedIn, isLoaded } = useSession();
  // convex functions for db
  const meetings = useQuery(api.meetings.getMeetingsForUser);
  const createMeeting = useMutation(api.meetings.createMeeting);

  const [selectedMeetingID, setSelectedMeetingID] = useState<string | null>(
    null
  );

  if (!isSignedIn) {
    return <div>Checking credentials...</div>;
  }
  if (!isLoaded) {
    return <div>Loading...</div>;
  }
  return (
    <main className="mt-4">
      {isSignedIn && (
        // Grid of meetings in cards
        <div className="flex flex-row h-full gap-4">
          <Button
            variant="outline"
            onClick={async () => {
              const response = await createMeeting({ title: "My Meeting" });
              console.log(response);
            }}
          >
            Create Meeting
          </Button>
          {meetings?.map((meeting) => {
            return (
              <div key={meeting._id} className="">
                <Button className="">
                  Title: {meeting.title} ID: {meeting._id}
                </Button>
              </div>
            );
          })}
        </div>
      )}
    </main>
  );
}

MeetingsPage;
