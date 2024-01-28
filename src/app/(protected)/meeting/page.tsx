"use client";

//import for authentication
import { useSession } from "@clerk/nextjs";

//nextjs and react imports
import Link from "next/link";
import { useState } from "react"; // Import useState

//convex imports
import { useMutation, useQuery, useAction } from "convex/react";
import { api } from "../../../../convex/_generated/api";

// shadcnui imports
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

// import custom components
import Chat from "@/components/chat/chat";
import Transcript from "@/components/transcript/transcript";
import AudioRecorder from "@/components/transcript/audio-recorder";

const MeetingPage = () => {
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
        <div className="flex flex-row">
          {/* list the meetings */}
          <div className="flex flex-col h-full gap-4 w-1/4">
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
                  <Card>
                    <CardHeader>
                      <CardTitle>{meeting.title}</CardTitle>
                      <CardDescription>
                        <p>{meeting._id?.substring(0, 10)}...</p>
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <p>Card Content</p>
                    </CardContent>
                    <CardFooter>
                      <Button onClick={() => setSelectedMeetingID(meeting._id)}>
                        Open
                      </Button>{" "}
                      {/* Update the selectedMeetingID state */}
                    </CardFooter>
                  </Card>
                </div>
              );
            })}
          </div>
          {/* show the transcript */}
          {selectedMeetingID && (
            <div className="flex flex-col">
              <AudioRecorder />
              <Transcript meetingID={selectedMeetingID} />
            </div>
          )}
          {/* show the chat */}
          {selectedMeetingID && <Chat meetingID={selectedMeetingID}></Chat>}
        </div>
      )}
    </main>
  );
};

export default MeetingPage;
