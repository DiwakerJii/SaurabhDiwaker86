import React, { useState, useEffect } from "react";

const CHUNK_SIZE = 1024;
const SAMPLE_RATE = 44100;
const CHANNEL = 2;
const DURATION = 7;
const ENCODING = "16 Bit PCM";
const AUDIO_FORMAT = ".wav";

const Recorder = () => {
    const [recording, setRecording] = useState(false);
    const [audioChunks, setAudioChunks] = useState([]);
    const [audioBlob, setAudioBlob] = useState(null)

    const startRecording = () => {
        setAudioChunks([]);
        navigator.mediaDevices
            .getUserMedia({ audio: true })
            .then((stream) => {
                const mediaRecorder = new MediaRecorder(stream);
                mediaRecorder.start();

                const chunks = [];
                mediaRecorder.ondataavailable = (event) => {
                    chunks.push(event.data);
                };

                mediaRecorder.onstop = () => {
                    const audioBlob = new Blob(chunks, { type: "audio/wav" });
                    setAudioBlob(audioBlob)
                    // const audioUrl = URL.createObjectURL(audioBlob);
                    // let link = document.createElement('a')
                    // link.href = audioUrl
                    // link.download = "recording.wav"
                    // link.click()
                    // URL.revokeObjectURL(link.href)

                    console.log('stopping');
                    console.log(audioBlob);
                    setAudioChunks(chunks);
                    // You can upload the audioBlob or do whatever you want with it
                };

                setTimeout(() => {
                    mediaRecorder.stop();
                }, DURATION * 1000);
            })
            .catch((error) => {
                console.error("Error accessing microphone:", error);
            });

        setRecording(true);
    };

    const stopRecording = () => {
        setRecording(false);
    };

    useEffect(() => {
        // Cleanup function
        startRecording()
        return () => {
            if (recording) {
                stopRecording();
            }
        };
    }, [recording]);

    // return (
    //     <div>
    //         <h1>Cute Voice Recorder</h1>
    //         {!recording && (
    //             <button onClick={startRecording}>Start Recording</button>
    //         )}
    //         {recording && (
    //             <button onClick={stopRecording}>Stop Recording</button>
    //         )}
    //         <h2>Recording Duration: {DURATION} seconds</h2>
    //         <h3>Encoding: {ENCODING}</h3>
    //         <h3>Audio Format: {AUDIO_FORMAT}</h3>
    //     </div>
    // );

    return audioBlob
};

export default Recorder;