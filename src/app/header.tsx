"use client";

import { ModeToggle } from "./mode-toggle";
import { Separator } from "../components/ui/separator";
import { SignedOut, SignedIn, UserButton, SignInButton } from "@clerk/nextjs";

export function Header() {
  return (
    <div className="border-b  max-w-7xl">
      <div className="container h-16 flex flex-row justify-between items-center">
        <div className="text-xl font-bold">MeetingNotes-AI</div>

        <div className="flex flex-row items-center space-x-4">
          <ModeToggle />
          <SignedIn>
            <UserButton />
          </SignedIn>{" "}
          <SignedOut>
            <SignInButton />
          </SignedOut>
        </div>
      </div>
    </div>
  );
}
