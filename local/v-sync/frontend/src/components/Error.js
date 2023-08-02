import React from 'react'

const Error = () => {
    return (
        <div className='flex items-center flex-col justify-center bg-pink-300 h-[100vh]'>
            <p className='text-5xl text-purple-600 '>Unauthorised page</p>
            <p>Check out whether you have logged in or not.</p>
            <p>Check you are not trying to access some unauthorised links</p>
        </div>
    )
}

export default Error
