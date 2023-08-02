import React, { useState } from 'react'
import axios from '../../api/axios'
import Spectrogram from './Spectrogram'
import VoiceBar from './VoiceBar'


const InstantAudio = ({ imgSrc, roomId, onClickResult, user1_name, user2_name }) => {
    const URL = '/api/instant/record_audio/'
    const [showMessage, setShowMessage] = useState('')
    const [audioBlob, setAudioBlob] = useState({})
    const [spectogram, setspectogram] = useState('')
    const [showSpectogram, setVisibilitySpectogram] = useState(false)
    const [voiceBar, setVoiceBar] = useState(false)
    let chunksArr = []
    let initialBlob;
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
    }

    const handleAudioSubmit = async (id) => {
        audioData.append('audio_blob', audioBlob)
        audioData.append('room_id', roomId)
        audioData.append('user', id)
        try {
            const response = await axios.post(
                URL,
                audioData,
                {
                    headers: {
                        'Authorization': `Bearer ${localStorage.getItem('token')}`,
                        'Content-Type': 'multipart/form-data'
                    }
                }
            )
            console.log(response?.data);
            const base64String = `data:graph/jpg;base64,${response?.data?.data.spectrogram_str}`;
            setspectogram(base64String)
            { response?.status === 200 ? setShowMessage(response?.data.message) : setShowMessage(response?.data.message) }
            setVisibilitySpectogram(true)
            setVoiceBar(false)
            console.log(roomId);
        } catch (err) {
            console.log(err);
        }

    }

    const record = () => {
        start_audio_Recording()
    }

    const handleProceed = () => {
        onClickResult()
    }

    return (
        <div className='flex flex-col pb-10 h-[100%] items-center justify-around w-full'>
            <div className='flex h-[100%] items-center justify-around w-full md:flex-row flex-col'>
                {showSpectogram && <Spectrogram setVisibilitySpectogram={(el) => setVisibilitySpectogram(el)} spectogramImg={spectogram} />}

                <div className='flex flex-col items-center h-full justify-around'>
                    <h1 className='font-poppins font-bold text-6xl text-fuchsia-600'>{user1_name}</h1>
                    <button id='user1' onClick={record} className='text-lg px-9 py-3 bg-purple-900 rounded-full text-white'>Record Audio</button>
                    <button id='user1' onClick={(event) => handleAudioSubmit(event.currentTarget.id)} className='text-lg px-9 py-3 bg-purple-900 rounded-full text-white'>Submit Audio</button>
                </div>
                {/* <div className='flex justify-around items-center w-full'> */}
                <div className='bg-fuchsia-500/70 md:h-[90%] md:w-[45%] flex shadow-2xl shadow-black/70 m-10 md:m-0'>
                    <div className=' m-5 md:m-10 w-full flex flex-col items-center space-y-10'>
                        <img src={imgSrc} alt='couple_pic' className='h-full w-full' />
                        {/* <p className='text-purple-700 font-ysa md:text-3xl font-bold'>{user1} & {user2}</p> */}
                    </div>
                </div>
                <p className='md:hidden flex'>{showMessage}</p>
                <div className='m-3 md:hidden w-[100%]'>
                    {voiceBar && <VoiceBar />}
                </div>
                {/* </div> */}
                <div className='flex flex-col items-center h-full justify-around'>
                    <h1 className='font-poppins font-bold text-6xl text-fuchsia-600'>{user2_name}</h1>
                    <button id='user2' onClick={record} className='text-lg px-9 py-3 bg-purple-900 rounded-full text-white w-full'>Record Audio</button>
                    <button id='user2' onClick={(event) => handleAudioSubmit(event.currentTarget.id)} className='text-lg px-9 py-3 bg-purple-900 rounded-full text-white w-full'>Submit Audio</button>
                </div>
            </div>
            <div className='w-[50%] items-center just mx-24'>
                <p className='md:flex hidden items-center justify-center'>{showMessage}</p>
                <div className='md:flex hidden mt-3 w-[100%]'>
                    {voiceBar && <VoiceBar />}
                </div>
            </div>
            <button onClick={handleProceed} className='mt-24 text-lg px-9 py-3 bg-purple-900 rounded-full text-white'>Proceed</button>
        </div>
    )
}

export default InstantAudio
