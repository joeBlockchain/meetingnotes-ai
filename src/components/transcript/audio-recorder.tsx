"use client";

// import react stuff
import { useState, useRef, useEffect } from "react";

//import sshadcnui stuff
import { Button } from "@/components/ui/button";

export default function AudioRecorder() {
  const [permission, setPermission] = useState(false);
  const mediaRecorder = useRef<MediaRecorder | null>(null);
  const [recordingStatus, setRecordingStatus] = useState("inactive");
  const [stream, setStream] = useState<MediaStream | null>(null);
  const [audioChunks, setAudioChunks] = useState<BlobPart[]>([]);
  const [audio, setAudio] = useState<string | null>(null);

  const startRecording = async () => {
    if ("MediaRecorder" in window) {
      try {
        const streamData = await navigator.mediaDevices.getUserMedia({
          audio: true,
          video: false,
        });
        setPermission(true);
        setStream(streamData);
        setRecordingStatus("recording");

        let options = {};
        if (MediaRecorder.isTypeSupported("audio/webm")) {
          options = { mimeType: "audio/webm" };
        } else if (MediaRecorder.isTypeSupported("audio/ogg")) {
          options = { mimeType: "audio/ogg" };
        } else {
          // You can add more checks for other types or throw an error if none are supported
          console.error("No supported audio MIME type found");
          return;
        }

        //create new Media recorder instance using the stream
        const media = new MediaRecorder(streamData, options);
        //set the MediaRecorder instance to the mediaRecorder ref
        mediaRecorder.current = media;

        // This event handler will be called whenever there's data available
        mediaRecorder.current.ondataavailable = async (event) => {
          console.log("ondataavailable event fired", event);
          if (event.data.size > 0) {
            const arrayBuffer = await event.data.arrayBuffer();
            console.log(
              `Sending audio data length: ${arrayBuffer.byteLength} bytes`
            );

            //   socket.emit("audio-data", arrayBuffer);
          } else {
            console.log("No audio data available");
          }
        };

        //invokes the start method to start the recording process
        mediaRecorder.current.start(500);

        mediaRecorder.current.ondataavailable = (event) => {
          if (typeof event.data === "undefined") return;
          if (event.data.size === 0) return;
          console.log(`Chunk size: ${event.data.size} bytes`); // Log the size of the chunk
        };

        //this verson records the data to local
        // let localAudioChunks: BlobPart[] = [];
        // mediaRecorder.current.ondataavailable = (event) => {
        //   if (typeof event.data === "undefined") return;
        //   if (event.data.size === 0) return;
        //   localAudioChunks.push(event.data);
        //   console.log(`Chunk size: ${event.data.size} bytes`); // Log the size of the chunk
        // };
        // setAudioChunks(localAudioChunks);
      } catch (err: any) {
        alert(err.message);
      }
    } else {
      alert("The MediaRecorder API is not supported in your browser.");
    }
  };

  //this stop recording will create a blob file and a playable URL to downloa
  const stopRecording = () => {
    setRecordingStatus("inactive");
    if (mediaRecorder.current) {
      //stops the recording instance
      mediaRecorder.current.stop();

      mediaRecorder.current.onstop = () => {
        //this code will make a play button available and ability to download the recording.
        //creates a blob file from the audiochunks data
        // const audioBlob = new Blob(audioChunks, { type: mimeType });
        // //creates a playable URL from the blob file.
        // const audioUrl = URL.createObjectURL(audioBlob);
        // setAudio(audioUrl);
        // setAudioChunks([]);

        // Stop each track on the stream to turn off the red light
        stream?.getTracks().forEach((track) => track.stop());

        // Reset the stream and audioChunks state
        setPermission(false);
        setStream(null);
        setAudioChunks([]);
      };
    }
  };

  return (
    <div>
      <main>
        <div className="audio-controls">
          {!permission ? (
            <Button onClick={startRecording} variant="default">
              Start Recording
            </Button>
          ) : null}
          {recordingStatus === "recording" ? (
            <Button onClick={stopRecording} variant="destructive">
              Stop Recording
            </Button>
          ) : null}
        </div>
        {audio ? (
          <div className="audio-player">
            <audio src={audio} controls></audio>
            <a download href={audio}>
              Download Recording
            </a>
          </div>
        ) : null}
      </main>
    </div>
  );
}
