import React, { useEffect, useState, useRef } from 'react'
import axios from '../../api/axios.js'
import Spectrogram from './Spectrogram.js'
import VoiceBar from './VoiceBar.js'
// import Recorder from './Recorder.js'
// import Recorder from 'recorder-js';
// const convert = require('pcm-convert')
// import Recorder from './Recorder.js'
const Audio = ({ imgSrc, roomId, onClickResult }) => {
    const [audioBlob, setAudioBlob] = useState({})
    const [spectogram, setspectogram] = useState('')
    const [showSpectogram, setVisibilitySpectogram] = useState(false)
    const [showMessage, setShowMessage] = useState('')
    const [voiceBar, setVoiceBar] = useState(false)

    let chunksArr = []
    let initialBlob;

    // const [showDistortion, setShowDistortion] = useState(false)
    const URL = `/api/room2/record_audio/`
    const audioData = new FormData()
    function start_audio_Recording() {
        // return new Promise((resolve, reject) => {
        navigator.mediaDevices.getUserMedia({ audio: { channelCount: 1, sampleRate: 44100 } })
            .then((mediaStream) => {
                const medRec = new MediaRecorder(mediaStream);
                window.mediaStream = mediaStream;
                window.mediaRecorder = medRec;
                medRec.start()
                setVoiceBar(true)
                setTimeout(() => {
                    stop_Recording()
                    setVoiceBar(false)
                }, 7000);

                medRec.ondataavailable = (e) => {
                    chunksArr.push(e.data)
                }
                medRec.onstop = () => {
                    initialBlob = new Blob(chunksArr, { type: "audio/wav" })
                    chunksArr = []
                    // processAudioBlob(initialBlob)
                    setAudioBlob(initialBlob)

                    // const url = window.URL.createObjectURL(initialBlob);
                    // const a = document.createElement('a');
                    // document.body.appendChild(a);
                    // a.style = 'display: none';
                    // a.href = url;
                    // a.download = 'audio.wav';
                    // a.click();
                    // window.URL.revokeObjectURL(url);


                    // handleAudioUpload()
                }
            })
            .catch((err) => { console.log(`Error accessign microphone: ${err}`) })
    }

    function stop_Recording() {
        // stop all tracks
        window.mediaRecorder.stop();
        window.mediaStream.getTracks().forEach((track) => { track.stop(); });
        // disable the stop button and enable the start button
        // start.disabled = false;
    }




    const submit = async () => {

        console.log(audioBlob);

        try {

            audioData.append('audio_blob', audioBlob)
            audioData.append('room_id', roomId)
            console.log(audioData);
            const response = await axios.post(
                URL,
                audioData,
                { headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}`, 'Content-Type': 'multipart/form-data' } }
            )
            console.log(response?.data);
            const base64String = `data:graph/jpg;base64,${response?.data?.data.spectrogram_str}`;
            setspectogram(base64String)
            { response?.status === 200 ? setShowMessage(response?.data.message) : setShowMessage(response?.data.message) }
            // { response?.data?.data.audio_status === 0 ? setShowDistortion(true) : setShowDistortion(false) }
            // console.log(`hey there ${base64String}`);
            setVisibilitySpectogram(true)

            // onClickResult()
        } catch (err) {
            console.log(err);
        }
    }

    const show = () => {
        onClickResult()
        // downloadWav(initialBlob)
        // console.log(spectogram)
    }
    // console.log(imgSrc);

    const record = () => {
        start_audio_Recording()
    }

    useEffect(() => {
        // console.log(audioBlob);
        // getLocalStream()
        console.log("in use effect");
        console.log(audioBlob);
    }, [audioBlob])


    return (
        <div className='md:h-[100vh] h-[100%] w-full md:flex-row flex-col flex justify-around items-center p-12 '>
            {showSpectogram && <Spectrogram setVisibilitySpectogram={(el) => setVisibilitySpectogram(el)} spectogramImg={spectogram} />}
            <div className='flex flex-col items-center'>
                <div className='bg-fuchsia-500/70 md:h-[400px] md:w-[400px] h-[250px] w-[250px] flex shadow-2xl shadow-black/70 flex-col p-5 md:p-10' >
                    <img src={imgSrc} alt='your_pic' />
                </div>
            </div>
            <div className="flex flex-col">
                <button onClick={record} className='mt-24 text-lg px-9 py-3 bg-purple-900 rounded-full text-white'>Record Audio</button>
                <div className='mt-3'>
                    {voiceBar && <VoiceBar />}
                </div>
                <p>{showMessage}</p>

                {/* {showDistortion && <p>Distortion in voice record again ...</p>} */}
                <button onClick={submit} className='mt-24 text-lg px-9 py-3 bg-purple-900 rounded-full text-white'>Submit Audio</button>
                <p className='text-sm mt-10 mb-2 text-red-700 font-bold'>* Audio can be submitted once only</p>
                <button onClick={show} className='mt-24 text-lg px-9 py-3 bg-purple-900 rounded-full text-white'>Proceed</button>

            </div>
            {/* <input type='file' id='audioInput' value={initialBlob} /> */}
        </div>
    )
}



export default Audio


