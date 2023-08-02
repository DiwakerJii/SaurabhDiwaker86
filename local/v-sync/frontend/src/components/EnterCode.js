import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { RxCrossCircled } from 'react-icons/rx'
import axios from '../api/axios'
import { useNavigate } from 'react-router-dom'


const SEND_CODE_URL = '/api/room2/join/'

const EnterCode = ({ toggleEnterCode, setRoomId, type, cat }) => {
    const { register, formState: { errors }, handleSubmit, getValues } = useForm()
    const navigate = useNavigate()
    const [errorMsg, setErrorMsg] = useState()

    const handle_onSubmit = async (data) => {
        // console.log(JSON.stringify(data));
        try {
            const response = await axios.post(
                SEND_CODE_URL,
                JSON.stringify(data),
                {
                    headers: {
                        'content-type': 'application/json',
                        'Authorization': `Bearer ${localStorage.getItem('token')}`
                    }
                }
            )
            console.log(response?.data);
            response?.data.status === 200 ? navigate(`/${cat}/${type}/selfie`, { state: { room_id: getValues('room_id') } }) : setErrorMsg(response?.data?.data.Error);
            setRoomId(getValues('room_id'))
            // console.log(getValues('room_id'));

        } catch (error) {
            console.log(error);
        }
    }

    const handleCross = () => {
        toggleEnterCode(false)

    }


    return (
        <div className='bg-transparent flex items-center justify-around md:mt-0 mt-80'>
            <form onSubmit={handleSubmit(handle_onSubmit)}>
                <div className='flex flex-col bg-slate-400 w-fit items-center px-10 rounded-xl p-8'>
                    <div className='bg-blue-200 items-center px-10  rounded-xl flex flex-col'>
                        <RxCrossCircled onClick={handleCross} className='mb-7 mt-3 text-slate-600 hover:cursor-pointer hover:rotate-[135deg]' style={{ fontSize: '35px' }} />
                        <h1 className='font-poppins text-xl mb-4 '>Enter Room Code</h1>
                        <label htmlFor='code'>Please enter the code shared by your partner.</label>

                        <input type='text' id='code' className='p-2 rounded-lg bg-slate-200 mt-5 border-[1px] border-black focus:outline:none' name='room_id' {...register('room_id', {
                            required: 'This Field is required.',
                            pattern: {
                                value: /^[A-Za-z0-9]+$/i,
                                message: 'Invalid RoomId'
                            },
                            minLength: {
                                value: 8,
                                message: 'Invalid RoomId'
                            },
                            maxLength: {
                                value: 8,
                                message: 'Invalid RoomId'
                            }
                        })}></input>
                        {errors.code && (<p className='text-red-600 text-sm mt-1'>{errors.code.message}</p>)}
                        <p className='text-red-600 text-sm mt-1'>{errorMsg}</p>
                        <button type='submit' className='mt-11 text-lg px-9 py-3 bg-purple-700 rounded-full text-white mb-5'>Play</button>
                        {/* <p className='text-sm mt-10 mb-2 self-start text-red-700 font-bold'>* RoomId is case sensitve</p> */}
                    </div>
                </div>
            </form>
        </div >

    )
}

export default EnterCode

// alpha numeric check and lenght 8