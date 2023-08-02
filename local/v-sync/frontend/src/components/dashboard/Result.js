import React, { useEffect, useState } from 'react'
import axios from '../../api/axios'
import { useParams, useNavigate } from 'react-router-dom'
// const CHECKPOINT_URL = '/api/room2/checkpoint/'

const Result = ({ roomId }) => {
    const REDIRECT_URL = `http://127.0.0.1:8000/api/payment/ccavRequestHandler/${roomId}`
    // const REDIRECT_URL = `http://vsync.techatriocare.com/api/payment/ccavRequestHandler/${roomId}`
    var CHECKPOINT_URL;
    const params = useParams()
    const [error, setError] = useState([])
    const [allowed, setAllowed] = useState(true)
    const [user, setUser] = useState(null)
    const navigate = useNavigate()

    if (params.type === 'instant') {
        // yhn gdbd h in this url non - instant is correct
        CHECKPOINT_URL = `/api/instant/checkpoint/`
    } else {
        CHECKPOINT_URL = `/api/room2/checkpoint/`
    }



    useEffect(() => {
        const handleClick = async () => {
            try {
                const response = await axios.post(
                    CHECKPOINT_URL,
                    JSON.stringify({ room_id: roomId }),
                    {
                        headers: {
                            'Authorization': `Bearer ${localStorage.getItem('token')}`,
                            'Content-Type': 'application/json'
                        }
                    }
                )
                console.log(response?.data);
                setError(response?.data?.data)
                // console.log(error);
                setAllowed(response?.data?.message)
                setUser(response?.data?.user)
                console.log();
            } catch (error) {
                console.log(error);
            }

        }
        handleClick();
    }, [error, allowed, CHECKPOINT_URL, roomId])

    const handleJoinee = () => {

        navigate(`/${params.cat}/${params.type}/loading`, { state: { roomId: roomId } })

    }

    return (

        <div className='flex items-center flex-col justify-center min-h-[100vh] space-y-24 p-20'>
            <h1 className='font-poppins font-bold text-7xl text-fuchsia-600'>Ready ? </h1>
            {
                params.type !== 'instant'
                    ?
                    allowed
                        ?
                        user === 'host'
                            ?
                            <form id="nonseamless" name="redirect" action={REDIRECT_URL} >
                                <button className='text-3xl border-4 border-white font-bold px-28 py-10 bg-gradient-to-r from-pink_1 to-purple-600 rounded-full text-white'>V-sync</button>
                            </form>
                            :
                            <button onClick={handleJoinee} className='text-3xl border-4 border-white font-bold px-28 py-10 bg-gradient-to-r from-pink_1 to-purple-600 rounded-full text-white'>V-sync</button>

                        :
                        <div className='text-center space-y-2 p-8 bg-purple-400/70 rounded-lg'>
                            <p className='text-4xl font-ysa font-bold text-purple-800'>Sort these to proceed</p>
                            {error.map((err) => (<p className='text-2xl font-ysa font-bold text-red-700'>{err}</p>))}
                        </div>

                    :
                    allowed
                        ?
                        <form id="nonseamless" name="redirect" action={REDIRECT_URL} >
                            <button className='text-3xl border-4 border-white font-bold px-28 py-10 bg-gradient-to-r from-pink_1 to-purple-600 rounded-full text-white'>V-sync</button>
                        </form>
                        :
                        <div className='text-center space-y-2 p-8 bg-purple-400/70 rounded-lg'>
                            <p className='text-4xl font-ysa font-bold text-purple-800'>Sort these to proceed</p>
                            {error.map((err) => (<p className='text-2xl font-ysa font-bold text-red-700'>{err}</p>))}
                        </div>
            }
            {/* {
                allowed && user === 'joinee'
                    ?
                    
                    :
                    <div className='text-center space-y-2 p-8 bg-purple-400/70 rounded-lg'>
                        <p className='text-4xl font-ysa font-bold text-purple-800'>Sort these to proceed</p>
                        {error.map((err) => (<p className='text-2xl font-ysa font-bold text-red-700'>{err}</p>))}
                    </div>

            } */}
            {/* <form id="nonseamless" name="redirect" action={REDIRECT_URL} >
                <button className='text-3xl border-4 border-white font-bold px-28 py-10 bg-gradient-to-r from-pink_1 to-purple-600 rounded-full text-white'>V-sync</button>
            </form> */}

        </div>
        // <div className="flex flex-col items-start">
        //     <div className='bg-fuchsia-500/70 h-[450px] w-[400px] flex shadow-2xl shadow-black/70'>
        //         <div className=' m-10 w-full flex flex-col items-center space-y-10'>
        //             <img src={imgSrc} alt='host_pic' />
        //             <p className='text-purple-700 font-ysa text-4xl font-bold'>######</p>
        //         </div>
        //     </div>
        // </div>

        // </div>
    )
}

export default Result


{/* {
        error.map((err) => (
            <p>err</p>
        ))
    } */}