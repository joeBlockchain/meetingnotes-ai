"use client";

import { SignInButton, SignOutButton, useSession } from "@clerk/nextjs";
import { useMutation, useQuery } from "convex/react";
import { api } from "../../convex/_generated/api";

export default function Home() {
  const { isSignedIn } = useSession();
  console.log(isSignedIn);

  const createMeeting = useMutation(api.meetings.createMeeting);
  const meetings = useQuery(api.meetings.getMeetingsForUser);

  return (
    <main className="">
      {isSignedIn ? <SignOutButton /> : <SignInButton />}

      {isSignedIn && (
        <form
          onSubmit={async (e) => {
            e.preventDefault();
            const form = e.target as HTMLFormElement;
            const formData = new FormData(form);
            const title = formData.get("title") as string;
            await createMeeting({
              title,
            });
            form.reset();
          }}
        >
          <label>Title</label>
          <input name="title" className="text-black" />
          <button type="submit">Create Meeting</button>
        </form>
      )}

      {meetings?.map((meeting) => {
        return <div key={meeting._id}>{meeting.title}</div>;
      })}
    </main>
  );
}
