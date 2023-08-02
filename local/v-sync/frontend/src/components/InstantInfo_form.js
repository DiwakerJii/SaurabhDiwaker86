import React from 'react'
import { useForm } from 'react-hook-form'
import axios from '../api/axios'

const InstantInfo_form = ({ user, setFormVisible, room_id, setUser1Name, setUser2Name, user_title }) => {

    const SUBMIT_URL = '/api/instant/room_details/'
    const { handleSubmit, register, getValues } = useForm()
    const fullName = `${user}_full_name`
    const gender = `${user}_gender`
    const dob = `${user}_date_of_birth`



    const submit = async (data) => {
        setFormVisible(null)
        // console.log(data.);
        console.log(JSON.stringify({ ...data, room_id: room_id }));
        if (user === 'user1') {
            setUser1Name(getValues(`${user}_full_name`))
        } else {
            setUser2Name(getValues(`${user}_full_name`))
        }
        try {
            const response = await axios.patch(
                SUBMIT_URL,
                JSON.stringify({ ...data, room_id: room_id }),
                {
                    headers: {
                        'Authorization': `Bearer ${localStorage.getItem('token')}`,
                        'Content-Type': 'application/json'
                    }
                }
            )
            console.log(response?.data);

        } catch (error) {
            console.log(error);
        }

    }



    console.log(user);
    return (
        <div className=' bg-purple-500 p-2 rounded-lg'>
            <h1 className='text-2xl text-center text-white font-bold'>{user_title}</h1>
            <form onSubmit={handleSubmit(submit)} className='space-y-6 p-16 bg-purple-400'>
                {/* name */}
                <div className='flex justify-around items-center space-x-2'>
                    <label className='text-xl font-semibold w-full text-white '>Full Name</label>
                    <input type='text' placeholder='abc' className='shadow-lg px-4 py-2 w-full rounded-lg border-icons border-2 focus:outline-none' name={fullName} {...register(fullName, { required: true })} required />
                </div>
                {/* gender */}
                <div className='flex justify-around items-center space-x-2'>
                    <label className='text-xl font-semibold w-full text-white'>Gender</label>
                    <select name={gender} {...register(gender, { required: true })} required className='shadow-lg px-4 py-2 rounded-lg border-icons border-2 focus:outline-none'>
                        <option value='1'>Male</option>
                        <option value='2'>Female</option>
                        <option value='3'>Other</option>
                    </select>
                </div>
                {/* dob */}
                <div className='flex justify-around items-center space-x-2'>
                    <label className='text-xl font-semibold w-full text-white'>Date Of Birth</label>
                    <input type='date' placeholder='Your DOB' name={dob} className='shadow-lg px-4 py-2 w-full rounded-lg border-icons border-2 focus:outline-none' {...register(dob, { required: true })}></input>
                </div>
                <button className='p-3 text-white font-bold text-lg rounded-xl bg-purple-600 w-full'>Submit</button>
            </form >
        </div >

    )
}

export default InstantInfo_form
// "room_id" : "UBWbUxQ2",
//     "user1_full_name" : "kite",
//     "user1_gender" : "1",
//     "user1_date_of_birth" : "2022-03-19",
//     "user2_full_name" : "kite",
//     "user2_gender" : "1",
//     "user2_date_of_birth" : "2022-03-19"