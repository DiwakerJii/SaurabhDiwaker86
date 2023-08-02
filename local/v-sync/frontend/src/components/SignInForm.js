import React, { useState, useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { AiOutlineGoogle } from 'react-icons/ai'
import { FaFacebook, FaInstagram } from 'react-icons/fa'
import axios from '../api/axios'
import useAuth from '../hooks/useAuth'

const LOGIN_URL = '/api/accounts/login/'

const SignInForm = ({ toggleVisibility }) => {
    const { setAuth, auth } = useAuth()
    const { register, formState: { errors }, handleSubmit, getValues } = useForm()
    const [errMsg, setErrMsg] = useState('')
    const [successMsg, setSuccessMsg] = useState('')
    const setMessage = () => {
        setTimeout(() => {
            toggleVisibility(false)
        }, 800)
        setSuccessMsg('Login Successful')
        setErrMsg('')
    }
    const onSubmit = async () => {
        // console.log(getValues("data"));

        try {
            // make axios post request
            const response = await axios({
                method: "post",
                url: LOGIN_URL,
                data: {
                    "email": getValues("email"),
                    "password": getValues("password")
                },
                headers: { "Content-Type": "application/json" },
            });
            console.log(response);
            console.log(response?.data);
            const accessToken = response?.data.access_token
            const health_related_info = response?.data.health_related_info
            setAuth({ email: getValues("email"), accessToken, health_related_info })


            // console.log(localStorage.getItem('token'));
            response?.data.status === 200 ? setMessage() : setErrMsg(response?.data.message)
            localStorage.setItem('token', accessToken)



        } catch (error) {
            setErrMsg(error.message)
        }
    }
    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <div className='flex flex-col w-[100%] p-10 bg-bg mb-5 rounded-md'>
                <div className='flex flex-col space-y-5'>
                    <div className='flex flex-col'>
                        <label></label>
                        <input type='text' placeholder='Username' name='email' className='shadow-lg px-4 py-2 w-full rounded-lg border-icons border-2 focus:outline-none' {...register('email', {
                            required: "This field is required"
                        })} />
                        {errors.email && (<p className='errorMsg_form'>{errors.email.message}</p>)}
                    </div>
                    <div className='flex flex-col'>
                        <label></label>
                        <input type='password' placeholder={`Your password here`} name='password' className='shadow-lg px-4 py-2 w-full rounded-lg border-icons border-2 focus:outline-none' {...register('password', {
                            required: "This field is required",
                        })}></input>
                        {errors.password && (<p className='errorMsg_form'>{errors.password.message}</p>)}
                    </div>
                    <div className='flex flex-col justify-center mt-7 mb-3 w-full m-auto'>
                        <label></label>
                        <button type='submit' className='bg-black text-white px-4 py-2 w-full rounded-lg text-xl'>SignIn</button>
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
        </form>

    )
}

export default SignInForm
