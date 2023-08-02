import React, { useEffect, useState } from 'react'
import InstantInfo_form from './InstantInfo_form'
import { useLocation, useNavigate, useParams } from 'react-router-dom'
import Navbar from './Navbar'

const InstantUserInfo = () => {

    const [formVisible, setFormVisible] = useState(null)
    const [user1_name, setUser1Name] = useState('')
    const [user2_name, setUser2Name] = useState('')
    // const [formResponse, setFormResponse] = useState('')
    const [error, setError] = useState(false)
    const location = useLocation()
    const navigate = useNavigate()
    const roomId = location.state.room_id
    const params = useParams()

    const users = [
        {
            id: 1,
            title: 'User 1',
            data: 'user1'

        },
        {
            id: 2,
            title: 'User 2',
            data: 'user2'
        }
    ]

    const handleClick = (el) => {
        console.log(el);
        setFormVisible(<InstantInfo_form user={el.data} user_title={el.title} setFormVisible={setFormVisible} room_id={roomId} setUser1Name={setUser1Name} setUser2Name={setUser2Name} />)
    }

    const handleClick_submit = () => {
        if (user1_name != '' && user2_name != '') {
            setError(false)
            navigate(`/${params.cat}/instant/selfie`, { state: { 'user1_name': user1_name, 'user2_name': user2_name, 'room_id': roomId } })
        } else {
            // console.log(`user1: ${user1_name} user2: ${user2_name}`);
            setError(true)
        }
    }


    return (
        <>
            <Navbar />
            <div className='flex flex-col items-center justify-around h-[100vh] bg-purple-300 w-full pt-16'>
                <div className='flex items-center justify-around w-full md:flex-row flex-col'>
                    <div className='flex flex-col items-center justify-around w-full space-y-20'>
                        {users.map((el) => (
                            <div key={el.id} onClick={() => handleClick(el)} className='p-5 w-[30%] text-center flex items-center justify-center bg-purple-600 text-white text-lg rounded-xl'>{el.title}</div>
                        ))}
                    </div>

                    <div className={`flex items-center p-5 ${formVisible ? "w-full" : ""}`}>
                        {formVisible}
                    </div>
                </div>
                {error && <p className='text-red-500'>Complete Both users' form to proceed</p>}
                <button onClick={handleClick_submit} className='p-5 w-[30%] bg-black text-white text-xl rounded-xl'>Proceed</button>
            </div >
        </>
    )
}

export default InstantUserInfo
