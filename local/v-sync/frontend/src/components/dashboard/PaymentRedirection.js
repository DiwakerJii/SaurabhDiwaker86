import React, { useEffect } from 'react'
import { useLocation, useParams, useNavigate } from 'react-router-dom'
import VoiceBar from './VoiceBar'

const PaymentRedirection = () => {
    const params = useParams()
    const orderStatus = params.status
    const roomId = params.roomId
    const navigate = useNavigate()
    // console.log(orderStatus);
    useEffect(() => {
        setTimeout(() => {
            if (orderStatus === 'Success') {
                navigate(`/${params.cat}/${params.type}/loading`, { state: { roomId: roomId } })
            } else {
                navigate(`/`, { state: { roomId: roomId } })
            }
            // navigate(`/${params.cat}/${params.type}/loading`, { state: { roomId: roomId } })
        }, 6000)

        return
    }, [])
    return (
        <>
            <div className='bg-Theme_skin min-h-screen w-full flex flex-col justify-center items-center space-y-24 p-10'>
                <p className='font-poppins text-3xl text-icons font-medium'>Your Payment is <span className='text-red-500'>{orderStatus}</span></p>
                <VoiceBar />
                <p className='text-xl text-purple-600'>You are being Redirected..</p>

            </div>
        </>
    )
}

export default PaymentRedirection
