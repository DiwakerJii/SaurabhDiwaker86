// it contains the room code
import React, { useState } from 'react'
import { RxCrossCircled } from 'react-icons/rx'
import { Link } from 'react-router-dom';
import { RxCopy } from 'react-icons/rx'

const GiveCode = ({ toggleGiveCode, room_id, type, cat }) => {
    let code = room_id;

    const [messageVisible, toggleMessageVisibility] = useState(false)


    const handleCross = () => {
        toggleGiveCode((current) => !current)
    }

    const copy = () => {
        navigator.clipboard.writeText(code);
        toggleMessageVisibility(true)

        setTimeout(() => {
            toggleMessageVisibility(false)
        }, 1000)
    }
    return (
        <div className='flex items-center justify-around md:mt-0 mt-80 mr-10'>
            <div className='flex flex-col bg-slate-400 w-fit items-center px-10 rounded-xl p-8'>
                <div className='bg-blue-200 items-center px-10 rounded-xl flex flex-col'>

                    <RxCrossCircled onClick={handleCross} className='mb-7 mt-3 text-slate-600 hover:cursor-pointer hover:rotate-[135deg]' style={{ fontSize: '35px' }} />
                    <h1 className='font-poppins text-xl mb-4 '>Room Code</h1>
                    <p>Please copy the code and share it to your partner.</p>
                    <div className='flex items-center space-x-2'>
                        <span className='underline' onClick={copy}>{code}</span>
                        <RxCopy onClick={copy} style={{ fontSize: '20px' }} className='text-slate-600' />
                    </div>
                    {messageVisible && <span className='bg-white/70 rounded-full px-2 p-1 mt-4 font-bold text-slate-800'>Copied</span>}
                    <Link to={`/${cat}/${type}/selfie`} state={{ room_id: room_id }}>
                        <button className='mt-11 text-lg px-9 py-3 bg-purple-700 rounded-full text-white mb-3'>Play</button>
                    </Link>
                </div>
            </div>
        </div>
    )
}

export default GiveCode
