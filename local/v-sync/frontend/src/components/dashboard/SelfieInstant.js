import React from 'react'

const SelfieInstant = ({ imgSrc, user1_name, user2_name, onCLickQues }) => {

    const user1 = user1_name
    const user2 = user2_name
    // console.log(imgSrc);
    // console.log(user1_name, user2_name);
    const handleClick = () => {
        onCLickQues()
    }

    return (
        <>
            <div className='h-[100vh] flex md:justify-around justify-evenly items-center w-full p-10 md:flex-row flex-col'>
                <div className='bg-fuchsia-500/70 md:h-[80%] md:w-[45%] flex  shadow-2xl shadow-black/70'>
                    <div className=' m-5 md:m-10 w-full flex flex-col items-center md:space-y-10'>
                        <img src={imgSrc} alt='couple_pic' className='h-full w-full md:m-0 mb-3' />
                        <p className='text-purple-700 font-ysa text-3xl font-bold'>{user1} & {user2}</p>
                    </div>
                </div>
                <div>
                    <button onClick={handleClick} className='text-lg px-9 py-3 bg-purple-900 rounded-full text-white w-full'>Proceed</button>
                </div>
            </div>
        </>

    )
}

export default SelfieInstant
