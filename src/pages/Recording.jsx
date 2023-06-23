import { useState, useEffect, useRef } from "react";
import Waving from "../components/Waving";
import WaveSurfer from "wavesurfer.js";


const Recording = () => {
  const [recording, setRecording] = useState(false);
  const [audioUrl, setAudioUrl] = useState("");
  const [waveform, setWaveform] = useState(null);
  const mediaRecorderRef = useRef(null);
  const waveformRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [audioEnded, setAudioEnded] = useState(false);
  const [displayAudio, setDisplayAudio] = useState(false);
  const [duration, setDuration] = useState(0);

  useEffect(() => {
    navigator.mediaDevices.getUserMedia({ audio: true }).then((stream) => {
      mediaRecorderRef.current = new MediaRecorder(stream);
      mediaRecorderRef.current.addEventListener(
        "dataavailable",
        handleDataAvailable
      );
    });

    return () => {
      if (mediaRecorderRef.current) {
        mediaRecorderRef.current.removeEventListener(
          "dataavailable",
          handleDataAvailable
        );
      }
    };
  }, []);

  useEffect(() => {
    if (waveformRef.current && audioUrl) {
      const wavesurfer = WaveSurfer.create({
        container: waveformRef.current,
        waveColor: "#76FAA1",
        progressColor: "#94ffb7",
        cursorWidth: 3,
        cursorColor: '#5881F2',
        barGap: 0,
        responsive: true,
        barHeight: 15,
      });

      wavesurfer.load(audioUrl);
      setWaveform(wavesurfer);

      return () => wavesurfer.destroy();
    }
  }, [audioUrl]);

  useEffect(() => {
    let timer;
    if (recording) {
      timer = setInterval(() => {
        setDuration((prevDuration) => prevDuration + 1);
      }, 1000);
    } else {
      setDuration(0);
    }

    return () => {
      clearInterval(timer);
    };
  }, [recording]);

  const formatDuration = (duration) => {
    const minutes = Math.floor(duration / 60);
    const seconds = duration % 60;
    return `${minutes}:${seconds.toString().padStart(2, "0")}`;
  };

  const handleStartRecording = () => {
    const chunks = [];
    mediaRecorderRef.current.start();
    setRecording(true);
    setDisplayAudio(false);
    waveform && waveform.empty();
    waveform && waveform.setMute(true);

    mediaRecorderRef.current.addEventListener("dataavailable", (event) => {
      chunks.push(event.data);
    });
  };

  const handleStopRecording = () => {
    mediaRecorderRef.current.stop();
    setRecording(false);
    setDisplayAudio(true);
    waveform && waveform.setMute(false);
  };

  const handleTogglePlayPause = () => {
    if (isPlaying) {
      waveform && waveform.pause();
    } else {
      waveform && waveform.play();
    }
    setIsPlaying(!isPlaying);
    setAudioEnded(false);
  };

  useEffect(() => {
    if (waveform && audioUrl) {
      waveform.on('finish', handleAudioEnded);
    }
  }, [waveform, audioUrl]);
  
  const handleAudioEnded = () => {
    setIsPlaying(false);
    setAudioEnded(true);
  };

  const handleSeekForward = () => {
    waveform && waveform.skipForward(5); // تأخير 5 ثواني
  };

  const handleSeekBackward = () => {
    waveform && waveform.skipBackward(5); // تقديم 5 ثواني
  };

  const handleDataAvailable = (event) => {
    const audioBlob = new Blob([event.data], { type: "audio/wav" });
    const audioUrl = URL.createObjectURL(audioBlob);
    setAudioUrl(audioUrl);
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
        <>
          <div className="text-center">
            <div ref={waveformRef} className="mt-10 max-w-xl mx-auto"  />
            <span className="text-2xl">5:18</span>

            {audioUrl && (
              <div className="mt-8 flex items-center justify-center gap-16">
                <button onClick={handleSeekBackward}>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    className="w-10 h-10 text-blue hover:text-secondary"
                  >
                    <path d="M9.195 18.44c1.25.713 2.805-.19 2.805-1.629v-2.34l6.945 3.968c1.25.714 2.805-.188 2.805-1.628V8.688c0-1.44-1.555-2.342-2.805-1.628L12 11.03v-2.34c0-1.44-1.555-2.343-2.805-1.629l-7.108 4.062c-1.26.72-1.26 2.536 0 3.256l7.108 4.061z" />
                  </svg>
                </button>

                <button onClick={handleTogglePlayPause}>
                  {!isPlaying ? (
                    <>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="currentColor"
                        className="w-12 h-12 text-blue hover:text-secondary"
                      >
                        <path
                          fillRule="evenodd"
                          d="M4.5 5.653c0-1.426 1.529-2.33 2.779-1.643l11.54 6.348c1.295.712 1.295 2.573 0 3.285L7.28 19.991c-1.25.687-2.779-.217-2.779-1.643V5.653z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </>
                  ) : (
                    <>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={4}
                        stroke="currentColor"
                        className="w-12 h-12 text-blue hover:text-secondary"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M15.75 5.25v13.5m-7.5-13.5v13.5"
                        />
                      </svg>
                    </>
                  )}
                </button>

                <button onClick={handleSeekForward}>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    className="w-10 h-10 text-blue hover:text-secondary"
                  >
                    <path d="M5.055 7.06c-1.25-.714-2.805.189-2.805 1.628v8.123c0 1.44 1.555 2.342 2.805 1.628L12 14.471v2.34c0 1.44 1.555 2.342 2.805 1.628l7.108-4.061c1.26-.72 1.26-2.536 0-3.256L14.805 7.06C13.555 6.346 12 7.25 12 8.688v2.34L5.055 7.06z" />
                  </svg>
                </button>
              </div>
            )}

            <button className="mt-20">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={2}
                stroke="currentColor"
                className="w-32 h-32 text-blue hover:text-secondary"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5m-13.5-9L12 3m0 0l4.5 4.5M12 3v13.5"
                />
              </svg>
            </button>
            <p className="text-2xl mt-5">Send recording for processing</p>
          </div>
        </>
      )}
    </div>
  );
};

export default Recording;
