import { useState, useRef, useEffect } from "react";
import Waving from "../components/Waving";

const Recording = () => {
  const [recording, setRecording] = useState(false);
  const [displayAudio, setDisplayAudio] = useState(false);
  const [duration, setDuration] = useState(0);
  const audioRef = useRef(null);
  const mediaRecorderRef = useRef(null);

  useEffect(() => {
    let timerId;

    if (recording) {
      timerId = setInterval(() => {
        setDuration((prevDuration) => prevDuration + 1);
      }, 1000);
    }

    return () => {
      clearInterval(timerId);
    };
  }, [recording]);

  const handleStartRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const mediaRecorder = new MediaRecorder(stream);

      mediaRecorder.addEventListener("dataavailable", handleDataAvailable);
      mediaRecorder.start();

      setRecording(true);
      setDisplayAudio(false);
      setDuration(0);
      mediaRecorderRef.current = mediaRecorder;
    } catch (error) {
      console.error("Error accessing media devices.", error);
    }
  };

  const handleStopRecording = () => {
    if (mediaRecorderRef.current && recording) {
      mediaRecorderRef.current.stop();
      setRecording(false);
      setDisplayAudio(true);
    }
  };

  const handleDataAvailable = (event) => {
    const audioBlob = new Blob([event.data], { type: "audio/wav" });
    const audioUrl = URL.createObjectURL(audioBlob);
    audioRef.current.src = audioUrl;
  };

  const formatDuration = (duration) => {
    const minutes = Math.floor(duration / 60);
    const seconds = duration % 60;
    return `${minutes}:${seconds.toString().padStart(2, "0")}`;
  };

  return (
    <div className="container mx-auto px-3 text-center">
      {!displayAudio ? (
        <>
          {!recording ? (
            <>
              <p className="text-lg mb-10">Hello!</p>
              <p className="font-bold text-4xl mb-20">Tap to start recording</p>
              <button
                onClick={handleStartRecording}
                disabled={recording}
                className="bg-red w-28 h-28 rounded-full ring ring-offset-main ring-offset-[18px] ring-red"
              ></button>
            </>
          ) : (
            <>
              <h2 className="text-3xl font-medium mb-2">
                Recording in progress...
              </h2>
              <span className="text-2xl">
                10:30 AM{" "}
                <span className="ms-6">{formatDuration(duration)}</span>
              </span>
              <Waving />
              <button
                onClick={handleStopRecording}
                disabled={!recording}
                className="bg-blue/25 hover:bg-blue/50 w-28 h-28 rounded-full mx-auto mt-10 flex justify-center items-center"
              >
                <div className="w-14 h-14 bg-blue-dark" />
              </button>
            </>
          )}
        </>
      ) : (
        <audio ref={audioRef} controls className="w-full h-16	p-5 bg-[#f1f1f1] rounded-xl" />
        
      )}
    </div>
  );
};

export default Recording;
