import React from 'react'
import qr_code from '../../assets/qr_code.jpg'
import { useLocation, useNavigate, useParams } from 'react-router-dom'

const Payment = () => {

    const location = useLocation()
    const navigate = useNavigate()
    const params = useParams()
    const imgSrc = location.state?.imgSrc
    const user1_name = location.state?.user1_name
    const user2_name = location.state?.user2_name
    const roomId = location.state?.roomId
    const joinName = location.state?.joinName
    const hostName = location.state?.hostName
    const joinPic = location.state?.joinPic
    const hostPic = location.state?.hostPic

    const handleClick = () => {
        {
            params.type === 'instant'
                ?
                navigate(`/${params.cat}/${params.type}/loading`, { state: { imgSrc: imgSrc, user1_name: user1_name, user2_name: user2_name, roomId: roomId } })
                :
                navigate(`/${params.cat}/${params.type}/loading`, { state: { joinName: joinName, hostName: hostName, joinPic: joinPic, hostPic: hostPic } })

        }
    }

    return (
        <div className='flex-col flex items-center w-full h-[100vh] bg-couple_bg md:justify-around justify-center  p-10'>
            <div className='md:w-[25%] '>
                <img src={qr_code} alt='qr_code' className='' />
            </div>
            <button onClick={handleClick} className='md:mt-16 mt-10 text-lg px-9 py-5 bg-purple-900 rounded-full text-white'>Proceed</button>
        </div>
    )
}

export default Payment
