import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import axios from '../../api/axios.js'
import ProgressBar from "@ramonak/react-progress-bar";

const QUESTIONS_URL = "/api/room2/questions/"

const Questions = ({ roomId, onClickAudio }) => {
    console.log(roomId)
    const [proximity, setProximity] = useState(0)
    const { register, handleSubmit, getValues } = useForm()
    console.log(getValues('user1_duration'));
    const submit = async () => {
        try {
            // make axios patch request
            const response = await axios.patch(
                QUESTIONS_URL, JSON.stringify({
                    "room_id": roomId,
                    "duration": getValues('user1_duration'),
                    "proximity": proximity
                }),
                {
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": `Bearer ${localStorage.getItem('token')}`
                    }
                }
            );
            console.log(response);
            onClickAudio()

        } catch (error) {
            console.log(error)
        }
    }

    return (
        <form onSubmit={handleSubmit(submit)}>
            <div className='flex flex-col items-center md:h-[100%] justify-around w-full p-10'>
                <h1 className='font-extrabold md:text-5xl text-3xl text-center w-full m-24 text-purple-700 font-noto'>Closeness Index</h1>
                <div className='flex flex-col space-y-9 text-2xl font-ysa'>
                    {/* proximity */}
                    <div className="flex flex-col bg-fuchsia-300">
                        <div className='flex md:space-x-8 md:space-y-0 space-y-8 justify-around items-center md:flex-row flex-col  p-5 rounded-lg'>
                            <p className='w-full text-xl md:text-2xl'>
                                How close do you consider yourself to your partner?
                            </p>
                            <div className='flex items-center w-full'>
                                <label htmlFor='user1_proximity'></label>
                                <input type='number' name='user1_proximity' value={proximity} onChange={(e) => setProximity(e.target.value)} placeholder='Enter between 0 to 100' />
                            </div>
                        </div>
                        <ProgressBar customLabel=" " completed={proximity} maxCompleted={100} className='mb-5 mx-5' />

                    </div>
                    {/* duration */}
                    <div className='flex md:space-x-8 md:space-y-0 space-y-8 justify-around items-center md:flex-row flex-col bg-fuchsia-300 p-5 rounded-lg'>
                        <p className='w-full text-xl md:text-2xl'>
                            How long have you been in relation with each other?
                        </p>
                        <div className='flex items-center w-full'>
                            <label htmlFor='user1_duration'></label>
                            <input type='number' name='user1_duration' placeholder='Months' {...register('user1_duration', {
                                required: true,
                                min: 0
                            })} />
                        </div>
                    </div>
                </div>
                <button type='submit' className='mt-24 text-lg px-9 py-3 bg-purple-900 rounded-full text-white'>Submit</button>
            </div>
        </form >


    )
}

export default Questions

