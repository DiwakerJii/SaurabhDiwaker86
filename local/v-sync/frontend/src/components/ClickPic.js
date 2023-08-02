import React, { useState } from 'react'
import Webcam from 'react-webcam'
import { Link, useParams, useLocation, useNavigate } from 'react-router-dom';
import axios from '../api/axios';
import Navbar from './Navbar';
import Login from './Login';
import Logout from './Logout';


const ClickPic = ({ imgSrc, setImgSrc, roomId, loginIsVisible, toggleVisibilityLogin, logoutIsVisible, toggleVisibilityLogout }) => {
    const webcamRef = React.useRef(null);
    const params = useParams()
    const location = useLocation()
    const navigate = useNavigate()
    const [errMsg, setErrMsg] = useState('')
    var user1_name;
    var user2_name;
    var roomid;
    var POST_URL;

    console.log('roomid in clickpic: ' + location.state.room_id);

    if (params.type == 'instant') {

        user1_name = location.state.user1_name
        user2_name = location.state.user2_name
        roomid = roomId;
        POST_URL = '/api/instant/image/'
    } else {
        POST_URL = '/api/room2/image/'
        roomid = location.state.room_id
        user1_name = ''
        user2_name = ''
        // roomCode = roomid.room_id
        // console.log(roomid);
    }


    const capture = React.useCallback(() => {
        setImgSrc(null);
        setErrMsg('')
        const imageSrc = webcamRef.current.getScreenshot();
        setImgSrc(imageSrc);
    }, [webcamRef, setImgSrc]);

    const handleClick = async () => {
        // console.log(imgSrc);
        try {
            const response = await axios.post(
                POST_URL,
                JSON.stringify({
                    "room_id": roomid,
                    "user_image_string": imgSrc
                }),
                {
                    headers: {
                        'Authorization': `Bearer ${localStorage.getItem('token')}`,
                        'Content-Type': 'application/json',
                        // Accept: 'application/json'
                        // 'Content-Transfer-Encoding': 'base64'
                    }
                }
            )
            console.log(response?.data);

            if (imgSrc) {
                console.log(imgSrc);
                navigate(`/${params.cat}/${params.type}/dashboard`, { state: { 'user1_name': user1_name, 'user2_name': user2_name } })
            } else {
                setErrMsg('Click Pic to Proceed')
            }
            // console.log(roomCode);

        } catch (err) {
            console.log(err);
        }
    }

    return (
        <><div className=''>
            <Navbar toggleVisibilityLogin={toggleVisibilityLogin} toggleVisibilityLogout={toggleVisibilityLogout} />
            <div className="z-10 flex fixed top-1 w-full items-center justify-center">
                {loginIsVisible && <Login toggleVisibility={toggleVisibilityLogin} />}
                {logoutIsVisible && <Logout toggleVisibility={toggleVisibilityLogout} />}
            </div>
        </div>
            <div className="flex flex-col bg-couple_bg items-center justify-around min-h-[100vh] space-y-10 p-10 pt-24">

                <div className="md:flex-1 space-y-10 md:space-x-14 flex md:flex-row flex-col w-full items-center justify-around">

                    <div className='border-8 border-red-500 '>
                        <Webcam
                            audio={false}
                            ref={webcamRef}
                            screenshotFormat="image/jpeg"
                            imageSmoothing={true}
                            mirrored={true}
                        />
                    </div>
                    <div className='space-y-7'>
                        <button onClick={capture} className='px-9 py-5 rounded-full text-white text-2xl bg-fuchsia-900'>Capture</button>
                        <div className='hidden md:flex flex-col'>
                            <button onClick={handleClick} className='py-5 px-9 rounded-full text-white text-2xl bg-fuchsia-600'>Proceed</button>
                            <p className={`${errMsg ? 'border-purple-600' : 'border-transparent'} text-fuchsia-600  border-2 font-bold text-lg p-2 mt-5`}>{errMsg}</p>
                        </div>
                    </div>

                    <div className=' bg-black border-8 border-green-500'>
                        {imgSrc ?
                            <img
                                src={imgSrc}
                                alt="your selfie"
                            />
                            :
                            <p className='text-white text-3xl justify-around font-semibold h-full items-center flex'>Click Photo</p>
                        }
                    </div>
                </div>
                <div className='md:hidden flex flex-col'>
                    <button onClick={handleClick} className='py-5 px-9 rounded-full text-white text-2xl bg-fuchsia-700'>Proceed</button>
                    <p className={`${errMsg ? 'border-purple-600' : 'border-transparent'} text-fuchsia-600  border-2 font-bold text-lg p-2 mt-5`}>{errMsg}</p>
                </div>
            </div>

            {console.log(imgSrc)}
        </>
    );
}

export default ClickPic
