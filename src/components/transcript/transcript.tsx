"use client";

// import reaxt stuff
import { useState, useEffect } from "react";

//import convex db stuff
import { useMutation, useQuery, useAction } from "convex/react";
import { api } from "../../../convex/_generated/api";

export default function Transcript({
  //   finalizedSentences,
  //   speakers,
  meetingID,
}: {
  //   finalizedSentences: SentenceData[];
  //   speakers: SpeakerData[];
  meetingID?: string;
}) {
  return <div className="flex flex-col h-full w-full">meeting transcript</div>;
}
