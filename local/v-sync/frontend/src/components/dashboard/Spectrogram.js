import React from 'react'
import { ImCross } from 'react-icons/im'
import { Link, useParams } from 'react-router-dom'


const Spectrogram = ({ spectogramImg, setVisibilitySpectogram }) => {
    const params = useParams()
    const handleVisibility = () => {
        setVisibilitySpectogram(false)
    }
    return (
        <div className=' absolute p-10 bg-slate-500/70 flex items-center justify-between top-2'>
            <div className=' flex flex-col items-center justify-around'>
                <div className="flex flex-row w-full items-center justify-around mb-9">
                    <div className='w-full flex justify-around items-center'>
                        <h1 className='text-3xl mt-3 font-bold'>Your Recording's Spectrogram</h1>
                    </div>
                    <div>
                        <ImCross style={{ fontSize: '20px' }} className='mt-3 mr-3 hover:cursor-pointer' onClick={handleVisibility} />
                    </div>
                </div>
                <div className='flex flex-col'>
                    <img src={spectogramImg} className=' w-[500px] h-[400px]' alt=' Record audio to see the spectrogram' />
                    <p className='align-center m-5 bg-gray-400 rounded-lg p-5'>
                        <Link target='_blank' to='/spectrogram'>Click here for more information !!</Link>
                    </p>
                </div>
            </div>
        </div >
    )
}
// /:cat/:type/spectrogram

export default Spectrogram
