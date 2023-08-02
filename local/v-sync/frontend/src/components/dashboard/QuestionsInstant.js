import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
// import axios from 'axios'
import axios from '../../api/axios.js'
import ProgressBar from "@ramonak/react-progress-bar";

const Questions = ({ roomId, onClickAudio }) => {

    const QUESTIONS_URL = '/api/instant/room_details/'
    const { handleSubmit, register, getValues } = useForm()
    const [proximity, setProximity] = useState(0)

    const submit = async (data) => {
        // console.log(data.);
        console.log(JSON.stringify({ ...data, "room_id": roomId }));
        try {
            const response = await axios.patch(
                QUESTIONS_URL,
                JSON.stringify({ ...data, room_id: roomId }),
                {
                    headers: {
                        'Authorization': `Bearer ${localStorage.getItem('token')}`,
                        'Content-Type': 'application/json'
                    }
                }
            )
            console.log(response?.data);
            onClickAudio()

        } catch (error) {
            console.log(error);
        }

    }
    return (
        <form onSubmit={handleSubmit(submit)}>


            <div className='flex flex-col items-center overflow-x-hidden h-[100%] justify-around w-full p-10 text-purple-900 font-semibold'>
                <h1 className='md:text-5xl text-3xl text-center w-full m-24 text-purple-700 font-ysa font-bold'>Closeness Index: </h1>
                <div className='flex flex-col space-y-9 text-2xl font-ysa'>
                    {/* proximity */}
                    <div className='flex flex-col bg-fuchsia-300'>
                        <div className='flex md:space-x-8 md:space-y-0 space-y-8 justify-around items-center md:flex-row flex-col  p-5 rounded-lg'>
                            <p className='w-full text-xl md:text-2xl'>
                                How much close you think you both are?
                            </p>
                            <div className='flex items-center'>
                                <label className='hidden'></label>
                                <input type='number' name='proximity' value={proximity} onChange={(e) => setProximity(e.target.value)} placeholder='Enter between 0 to 100' />
                                {/* <input type='number' name='proximity' id='proximity' {...register('proximity', {
                                required: 'This field is required',
                                min: 0,
                            })} /> */}
                            </div>
                        </div>
                        <ProgressBar customLabel=" " completed={proximity} maxCompleted={100} className='mb-5 mx-5' />
                    </div>
                    {/* duration */}
                    <div className='flex md:space-x-8 md:space-y-0 space-y-8 justify-around items-center md:flex-row flex-col bg-fuchsia-300 p-5 rounded-lg'>
                        <p className='w-full text-xl md:text-2xl'>
                            How long have been in relaiton with each other?
                        </p>
                        <div>
                            <label htmlFor='duration'></label>
                            <input type='number' name='duration' placeholder='Months' id='duration' {...register('duration', {
                                required: 'This field is required',
                                min: 0
                            })} />
                        </div>
                    </div>
                </div>
                <button type='submit' className='mt-24 text-lg px-9 py-3 bg-purple-900 rounded-full text-white'>Submit</button>
            </div>
        </form>
    )
}

export default Questions
