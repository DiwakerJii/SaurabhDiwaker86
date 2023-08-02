import React from 'react'
import { useNavigate } from 'react-router-dom'
import { useParams } from 'react-router-dom'
import axios from '../../api/axios'

const ResultInstant = ({ roomId }) => {
    const CHECKPOINT_URL = `http://127.0.0.1:8000/api/payment/ccavRequestHandler/${roomId}`

    const handleClick = async () => {
        try {
            const response = await axios.get(
                CHECKPOINT_URL,
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
    return (
        <div className='flex items-center flex-col justify-center h-[100vh] space-y-24 '>
            <p className='font-poppins font-bold md:text-7xl text-4xl text-center text-fuchsia-600'>Ready to know your <span className='text-fuchsia-800'>V-SYNC</span>?</p>
            <button onClick={handleClick} className='w-36 h-36 rounded-full bg-purple-800 font-poppins text-white hover:bg-purple-600 text-xl font-semibold border-4 border-white'>V-SYNC</button>
        </div>
    )
}

export default ResultInstant
