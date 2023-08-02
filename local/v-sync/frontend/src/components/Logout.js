import React from 'react'
import useAuth from '../hooks/useAuth'

const Logout = ({ toggleVisibility }) => {
    const { setAuth } = useAuth()

    const handle_proceed = () => {
        toggleVisibility(false)
        setAuth({})
        localStorage.removeItem('token')
    }
    const handle_cancel = () => {
        toggleVisibility(false)
    }
    return (
        <div className='w-full h-[100vh] bg-slate-600/30 flex flex-col items-center justify-around'>
            <div className='flex flex-col bg-bg w-fit items-center p-10 border-black border-2 rounded-xl '>
                <h1 className='font-poppins text-xl mb-4 '>Are yout sure you want to logout?</h1>
                <div className='flex space-x-5 justify-around w-full'>
                    <button className='mt-11 text-lg px-9 py-3 bg-icons rounded-full text-white mb-3' onClick={handle_proceed}>Proceed</button>
                    <button className='mt-11 text-lg px-10 py-3 bg-icons rounded-full text-white mb-3' onClick={handle_cancel}>Cancel</button>
                </div>
            </div>
        </div>

    )
}

export default Logout
