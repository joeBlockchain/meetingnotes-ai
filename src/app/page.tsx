"use client";

import { SignInButton, SignOutButton, useSession } from "@clerk/nextjs";

import { useState, useRef } from "react";
import AudioRecorder from "@/components/transcript/audio-recorder";

export default function Home() {
  const { isSignedIn } = useSession();
  // console.log(isSignedIn);

  return <div>Welcome to the home page</div>;

  // return <main className="">welcome to the home page</main>;
}
