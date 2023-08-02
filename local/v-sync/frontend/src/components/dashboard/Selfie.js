import React, { useEffect } from 'react'

const Selfie = ({ hostPic, joinPic, hostName, joinName, onCLickQues }) => {

    return (
        <>
            <div className='h-[100vh] flex flex-col justify-around items-center p-5'>
                <div className='h-[100vh] flex md:flex-row flex-col justify-around items-center md:space-x-28'>
                    <div className='bg-fuchsia-500/70 md:h-[450px] md:w-[400px] w-[250px] h-[250px] flex shadow-2xl shadow-black/70 md:-rotate-12'>
                        <div className=' md:m-10 m-2 w-full flex flex-col items-center md:space-y-10 space-y-3'>
                            <img src={hostPic} alt='host_pic' />
                            <p className='text-purple-700 font-ysa text-4xl font-bold text-center'>{hostName}</p>
                        </div>
                    </div>
                    <div className='bg-fuchsia-500/70 md:h-[450px] md:w-[400px] w-[250px] h-[250px] flex shadow-2xl shadow-black/70 md:rotate-12'>
                        {/* of second participant through hooks */}
                        <div className=' md:m-10 m-2 w-full flex flex-col items-center md:space-y-10 space-y-3'>
                            <img src={joinPic} alt='joiners_pic' />
                            <p className='text-purple-700 font-ysa text-4xl font-bold text-center'>{joinName}</p>
                        </div>
                    </div>
                </div>
                <button onClick={onCLickQues} className=' text-lg px-9 py-3 bg-purple-900 rounded-full text-white'>Proceed</button>
            </div>
        </>

    )
}

export default Selfie
