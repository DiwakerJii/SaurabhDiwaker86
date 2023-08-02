import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { AiOutlineGoogle } from 'react-icons/ai'
import { FaFacebook, FaInstagram } from 'react-icons/fa'
import axios from '../api/axios'

const REGISTER_URL = "/api/accounts/register/"

const SignUpForm = ({ setSignin }) => {
    const { register, formState: { errors }, handleSubmit, getValues } = useForm()
    const [errMsg, setErrMsg] = useState('')
    const [successMsg, setSuccessMsg] = useState('')
    const setMessage = () => {
        setTimeout(() => {
            setSignin(true)
        }, 1000)
        setSuccessMsg('Successfully Registered')
        setErrMsg('')
    }
    const onSubmit = async () => {
        try {
            // make axios post request
            const response = await axios.post(
                REGISTER_URL,
                JSON.stringify({
                    "email": getValues("email"),
                    "password": getValues("password"),
                    "full_name": getValues("name"),
                    "gender": getValues("gender"),
                    "date_of_birth": getValues("dob")

                }),
                {
                    headers: { "Content-Type": "application/json" },
                    // withCredentials: true
                }
            );
            // console.log(response);
            response?.data?.data.email === undefined ? (response?.data?.data.password === undefined ? setMessage() : setErrMsg(response?.data?.data.password[0])) : setErrMsg(response?.data?.data.email[0])

            // getValues('name') = ''

        } catch (error) {
            console.log(error.message)
        }
    }
    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <div className='flex flex-col w-[100%] p-10 bg-bg mb-5 rounded-md'>
                <div className='flex flex-col space-y-5'>
                    <div>
                        <label></label>
                        <input type='text' placeholder='Full name' name='name' className='shadow-lg px-4 py-2 w-full rounded-lg border-icons border-2 focus:outline-none' {...register('name', {
                            required: "Enter your name"
                        })}></input>
                        {errors.name && (<p className='errorMsg_form'>{errors.name.message}</p>)}
                    </div>

                    <div>
                        <label></label>
                        <input type='text' placeholder='Username' name='email' className='shadow-lg px-4 py-2 w-full rounded-lg border-icons border-2 focus:outline-none' {...register('email', {
                            required: "This field is required"
                        })} />
                        {errors.email && (<p className='errorMsg_form'>{errors.email.message}</p>)}
                    </div>
                    <div className='flex space-x-3 items-center justify-around'>
                        <div className='flex justify-around items-center space-x-2'>
                            <label className='text-lg font-semibold'>Gender</label>
                            <select name='gender' {...register('gender', {
                                required: 'Select one option'
                            })} className='shadow-lg px-4 py-2 rounded-lg border-icons border-2 focus:outline-none'>
                                <option value='1'>Male</option>
                                <option value='2'>Female</option>
                                <option value='3'>Other</option>
                            </select>
                        </div>
                        <div className='flex justify-around items-center space-x-2'>
                            <label className='text-lg font-semibold'>DOB</label>
                            <input type='date' placeholder='Your DOB' name='dob' className='shadow-lg px-4 py-2 w-full rounded-lg border-icons border-2 focus:outline-none' {...register('dob', {
                                required: "Enter your Date of birth",
                                // min: {
                                //     value: 1,
                                //     message: "Please enter proper age"
                                // },
                                // max: {
                                //     value: 120,
                                //     message: "Please enter proper age"
                                // }
                            })}></input>
                            {errors.age && (<p className='errorMsg_form'>{errors.age.message}</p>)}
                        </div>
                    </div>
                    <div >
                        <label></label>
                        <input type='password' placeholder={`Enter Password`} name='password' className='shadow-lg px-4 py-2 w-full rounded-lg border-icons border-2 focus:outline-none' {...register('password', {
                            required: "This field is required",
                            minLength: {
                                value: 8,
                                message: "Min length must be 8"
                            }
                        })}></input>
                        {errors.password && (<p className='errorMsg_form'>{errors.password.message}</p>)}
                    </div>
                    <div >
                        <label></label>
                        <input type='password' placeholder={`Re-enter Password`} name='re_password' className='shadow-lg px-4 py-2 w-full rounded-lg border-icons border-2 focus:outline-none' {...register('re_password', {
                            required: "This field is required",
                            validate: (value) => {
                                const pass = getValues("password")
                                return value === pass || "Password do not match"
                            }
                        })}></input>
                        {errors.re_password && (<p className='errorMsg_form'>{errors.re_password.message}</p>)}
                    </div>
                    <div className='flex flex-col justify-center mt-7 mb-3 w-full m-auto'>
                        <label></label>
                        <button type='submit' className='bg-black text-white px-4 py-2 w-full rounded-lg text-xl'>SignUp</button>
                        <p className='mt-2 errorMsg_form'>{errMsg}</p>
                        <p className='mt-2 successMsg_form'>{successMsg}</p>
                    </div>
                    {/* <div className="flex flex-col items-center">
                        <p className='text-lg font-semibold mb-4'>OR</p>
                        <div className="flex space-x-10 text-icons" style={{ fontSize: '28px' }}>
                            <AiOutlineGoogle />
                            <FaFacebook />
                            <FaInstagram />
                        </div>

                    </div> */}
                </div>
            </div>
        </form >
    )
}

export default SignUpForm
