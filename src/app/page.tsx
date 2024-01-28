"use client";

import { SignInButton, SignOutButton, useSession } from "@clerk/nextjs";

import { useState, useRef } from "react";
import AudioRecorder from "@/components/transcript/audio-recorder";

export default function Home() {
  const { isSignedIn } = useSession();
  // console.log(isSignedIn);

  let [recordOption, setRecordOption] = useState("video");
  const toggleRecordOption = (type) => {
    return () => {
      setRecordOption(type);
    };
  };
  return (
    <div>
      <h1>React Media Recorder</h1>
      <div className="button-flex">
        <button onClick={toggleRecordOption("video")}>Record Video</button>
        <button onClick={toggleRecordOption("audio")}>Record Audio</button>
      </div>
      <div>{recordOption === "video" ? <div /> : <AudioRecorder />}</div>
    </div>
  );

  // return <main className="">welcome to the home page</main>;
}
