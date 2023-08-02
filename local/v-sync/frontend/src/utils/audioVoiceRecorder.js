// import React from 'react'
// import { AudioRecorder } from 'react-audio-voice-recorder'

// const audioVoiceRecorder = () => {

//     const sendAudio = (blob) => {

//     }

//     <AudioRecorder
//         onRecordingComplete={sendAudio}
//         audioTrackConstraints={{
//             noiseSuppression: true,
//             echoCancellation: true,
//         }}
//         downloadOnSavePress={true}
//         downloadFileExtension="mp3"
//         onStop={this.onStop}
//     />

//     onStop(recordedBlob) {
//         const chunkSize = 4096;
//         const chunks = [];
//         let i = 0;

//         while (i < recordedBlob.size) {
//             chunks.push(recordedBlob.slice(i, i + chunkSize));
//             i += chunkSize;
//         }

//         console.log(chunks);
//     }

//     const options = {
//         mimeType: 'audio/wav',
//         sampleRate: 44100,
//         numberOfChannels: 1
//     };

// }

// export default audioVoiceRecorder
