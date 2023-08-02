// pop up element on clicking the login button

import React, { useState } from 'react'
import { ImCross } from 'react-icons/im'
import SignInForm from './SignInForm'
import SignUpForm from './SignUpForm'
import useAuth from '../hooks/useAuth'

const Login = ({ toggleVisibility }) => {

    const [onSingin, setSignin] = useState(true)
    const [onSingup, setSignup] = useState(false)

    const handleClick_signin = (event) => {
        // console.log(event);
        setSignin(true)
        setSignup(false)
    }

    const handleClick_signup = () => {
        setSignup(true)
        setSignin(false)
    }

    const handle_form_visibility = () => {
        toggleVisibility(false)
    }

    const { auth } = useAuth()

    return (
        <>
            <div className='border-transparent rounded-lg bg-Theme_skin bg-opacity-70 shadow-xl border-2 flex flex-col items-center justify-between px-10'>
                <div className='flex justify-end w-full'>
                    <ImCross style={{ size: '30px' }} className='mt-3 mr-3 hover:cursor-pointer' onClick={handle_form_visibility} />
                </div>
                <div className='flex justify-around items-center w-full text-2xl bg-opacity-50 px-5 space-x-5'>

                    <button className={`bg-icons rounded-lg w-full text-center py-3 px-10 m-3 ${onSingin ? 'formBtnActive' : 'formBtnNotActive'} `} onClick={handleClick_signin}>SignIn</button>

                    <button className={`bg-icons rounded-lg w-full text-center py-3 px-10 m-3 ${onSingup ? 'formBtnActive' : 'formBtnNotActive'} `} onClick={handleClick_signup}>SignUp</button>

                </div>
                <div>
                    {onSingin ? <SignInForm toggleVisibility={toggleVisibility} /> : <SignUpForm setSignin={setSignin} />}
                    {/* <Form /> */}
                </div>
            </div>

        </>
    )
}

export default Login
