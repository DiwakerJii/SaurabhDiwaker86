let blob;
const CHUNK_SIZE = 1024
const SAMPLE_RATE = 44100
let chunksArr = [];

export default function start_audio_Recording() {
    chunksArr = [];
    // return new Promise((resolve, reject) => {
    navigator.mediaDevices.getUserMedia({ audio: { channelCount: 1, sampleRate: SAMPLE_RATE }, video: false })
        // navigator.mediaDevices.getUserMedia({ audio: true, video: false })
        .then((mediaStream) => {
            // const options = {
            //     audioBitsPerSecond: 44100
            // }
            // const medRec = new MediaRecorder(mediaStream, options);
            const medRec = new MediaRecorder(mediaStream);
            window.mediaStream = mediaStream;
            window.mediaRecorder = medRec;
            // medRec.setAudioChannels(1)
            medRec.start()

            setTimeout(() => {
                stop_Recording()
            }, 6000);


            // when recorded data is available then push into chunkArr array
            // medRec.ondataavailable = (e) => {
            //     const chunk = e.data.slice(0, CHUNK_SIZE);
            //     chunksArr.push(chunk);

            // };
            medRec.ondataavailable = (e) => {
                chunksArr.push(e.data);
            };



            //stop the audio recording
            medRec.onstop = () => {
                blob = new Blob(chunksArr, { type: "audio/wav" });
                // chunksArr = [];
                // console.log(blob);
                // saveRecording(blob);
                // const trying = blob;
                // console.log(trying);
            };
        });
    return blob
    // resolve(blob)
    // } else {
    //     const error = "buddhuuuuu"
    //     reject(error)
    // }
    // })
}


// export const myAudio = new Promise((resolve, reject) => {
//     start_audio_Recording()
//     resolve(blob)
// })

function saveRecording(blob) {
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "recording.wav";
    link.click();
    URL.revokeObjectURL(url);
}


function stop_Recording() {
    //stop all tracks
    window.mediaRecorder.stop();
    window.mediaStream.getTracks().forEach((track) => { track.stop(); });
    //disable the stop button and enable the start button
    // start.disabled = false;
}