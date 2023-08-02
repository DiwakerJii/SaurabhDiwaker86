// component which contains the host join not host buttons

import React, { useState, useRef } from 'react'
import demo_video from "../assets/Vsync_instructions.mp4"
import GiveCode from './GiveCode'
import EnterCode from './EnterCode'
import axios from '../api/axios'
import Navbar from './Navbar'
import { useNavigate } from 'react-router-dom'
import Login from './Login'
import Logout from './Logout'
import { useParams, Link } from 'react-router-dom'
import { ImInfo } from 'react-icons/im'
import vsync_instructions from '../assets/vsync_instructions.jpg'

const REQUEST_CODE_URL = '/api/room2/create/'
const REQUEST_INSTANT_ROOM_CODE = '/api/instant/create/'

let ROOM_ID;

const GameType = ({ setRoomId, loginIsVisible, toggleVisibilityLogin, logoutIsVisible, toggleVisibilityLogout }) => {
    const params = useParams()
    const cat = params.cat
    const [giveCodeVisible, toggleGiveCode] = useState(false)
    const [enterCodeVisible, toggleEnterCode] = useState(false)
    const navigate = useNavigate()
    const token = localStorage.getItem('token')
    const scroll_ref = useRef()

    const handleClick_host = async () => {

        try {
            const response = await axios.post(
                REQUEST_CODE_URL,
                JSON.stringify({ relation: '1' }),
                { headers: { 'content-type': 'application/json', 'Authorization': `Bearer ${token}` } }

            )

            ROOM_ID = response?.data?.data.room_id;
            setRoomId(ROOM_ID)
            console.log(cat);
        } catch (error) {
            console.log(error);
        }

        toggleGiveCode((current) => !current)
        toggleEnterCode(false)
    }
    const
        handleClick_join = () => {
            toggleEnterCode((current) => !current)
            toggleGiveCode(false)
        }

    const handleClick_instant = async () => {
        try {
            const response = await axios.post(
                REQUEST_INSTANT_ROOM_CODE,
                JSON.stringify({ relation: '1' }),
                { headers: { 'content-type': 'application/json', 'Authorization': `Bearer ${token}` } }

            )

            ROOM_ID = response?.data?.data.room_id;
            setRoomId(ROOM_ID)
            // console.log(cat);
        } catch (error) {
            console.log(error);
        }

        navigate(`/${cat}/instant/info`, { state: { room_id: ROOM_ID } })
    }

    const handleScroll = (scroll_ref) => {
        window.scrollTo({
            top: scroll_ref.offsetTop,
            left: 0,
            behavior: "smooth",
        });
    }

    return (
        <>
            <Navbar toggleVisibilityLogin={toggleVisibilityLogin} toggleVisibilityLogout={toggleVisibilityLogout} />
            <div className="z-10 flex fixed top-1 w-full items-center justify-center">
                {loginIsVisible && <Login toggleVisibility={toggleVisibilityLogin} />}
                {logoutIsVisible && <Logout toggleVisibility={toggleVisibilityLogout} />}
            </div>
            <div className="flex flex-col h-[100%] bg-Theme_skin flex-1 justify-around w-full p-10 space-y-6">
                <div className='fixed z-20 flex justify-around top-0 md:mt-0 mt-0 md:w-full'>
                    {giveCodeVisible && <GiveCode toggleGiveCode={toggleGiveCode} room_id={ROOM_ID} type='notInstant' cat={cat} />}
                    {enterCodeVisible && <EnterCode toggleEnterCode={toggleEnterCode} setRoomId={setRoomId} type='notInstant' cat={cat} />}
                </div>
                <div className="flex md:space-x-16 md:flex-row flex-col h-[100%] w-full relative">
                    <div id='pic' className=' w-full bg-instruction bg-contain bg-no-repeat bg-center' ref={scroll_ref}>
                        <img src={vsync_instructions} alt='vsync_instructions' className='h-2/3 flex md:hidden' />
                    </div>
                    {/* <div className='fixed w-full z-10 flex md:hidden md:top-20 md:mt-0 mt- mr-10'>
                        {giveCodeVisible && <GiveCode toggleGiveCode={toggleGiveCode} room_id={ROOM_ID} type='notInstant' cat={cat} />}
                        {enterCodeVisible && <EnterCode toggleEnterCode={toggleEnterCode} setRoomId={setRoomId} type='notInstant' cat={cat} />}
                    </div> */}
                    <div className='w-full p-10 space-y-10 flex felx-col justify-around flex-col'>
                        <video controls><source src={demo_video} /></video>
                        <ul className='space-y-2 list-disc'>
                            <li>
                                <p>
                                    <b>Host</b>: The "Host" option is offered to facilitate V-sync participation amongst distant users using various
                                    mobile phones or terminals. The V-sync is initiated by a host. After clicking the &quot;Host&quot; button, a unique
                                    code will be created, which may be copied and shared with the &quot;Joinee&quot; in order for them to participate
                                    in the V-sync game.
                                </p>
                            </li>
                            <li>
                                <p>
                                    <b>Joinee</b>: A joinee is a remote participant in the V-sync. After pressing the "Joinee" button, a dialogue window will appear in which the "Host's" unique code must be entered. After entering the unique code and follow-up instructions in the next page, a joinee is ready to play the V-sync game from his or her
                                    own mobile or terminal.
                                </p>
                            </li>
                            <li>
                                <p>
                                    <b>Instant</b> : If the participants wish to play the V-sync immediately on the same system, click the 'Instant'
                                    option.
                                </p>
                            </li>
                        </ul>
                    </div>
                </div>
                <div className='flex items-center justify-center bg-pink_2/50 rounded-lg md:flex-row flex-col'>
                    <div className="flex items-center m-8 space-x-3">
                        <button onClick={handleClick_host} className='bg-red-500 text-white px-8 py-4 rounded-full  w-60 shadow-lg shadow-slate-600 hover:-translate-y-2'>Host</button>
                        <ImInfo onClick={() => handleScroll(scroll_ref.current)} className='text-fuchsia-300 font-bold bg-black rounded-full' style={{ fontSize: '24px', 'fontWeight': 'bold' }} />
                    </div>
                    <div className="flex m-8 items-center space-x-3">
                        <button onClick={handleClick_join} className='bg-blue-600 text-white px-8 py-4 rounded-full  w-60 shadow-lg shadow-slate-600 hover:-translate-y-2'>Join</button>
                        <ImInfo onClick={() => handleScroll(scroll_ref.current)} className='text-fuchsia-300 font-bold bg-black rounded-full' style={{ fontSize: '24px', 'fontWeight': 'bold' }} />
                    </div>
                    <div className="flex m-8 items-center space-x-3">
                        <button onClick={handleClick_instant} className='bg-green-600 text-white px-8 py-4 rounded-full  w-60 shadow-lg shadow-slate-600 hover:-translate-y-2'>Instant Game</button>
                        <ImInfo onClick={() => handleScroll(scroll_ref.current)} className='text-fuchsia-300 font-bold bg-black rounded-full' style={{ fontSize: '24px', 'fontWeight': 'bold' }} />
                    </div>


                </div>
            </div>

        </>
    )
}

export default GameType

// bg-fuchsia-400/30

// instructions

{/* <ul className='space-y-2 list-disc'>
                            <li>
                                <p>
                                    Choose a calm and distraction-free place where you can fully immerse yourself in the V-sync
                                    experience. Reduce background noise to improve concentration and focus.
                                </p>
                            </li>
                            <li>
                                <p>
                                    Use high-quality headphones or a competent audio system. This will allow you to precisely
                                    measure V-sync.
                                </p>
                            </li>
                            <li>
                                <p>
                                    Communicate and coordinate with your partner: Successful physiological synchronisation
                                    requires effective communication and cooperation with your partner. To attain a larger
                                    proportion of physiological synchronisation, discuss common activities and experiences, and if
                                    feasible, hold each other&#39;s hands during the game.
                                </p>
                            </li>
                            <li>
                                <p>
                                    Pay attention to the visual cues: Pay special attention to the spectrograms presented on the
                                    screen. These visual representations will assist you in synchronising your physiological
                                    synchrony with that of your partner.
                                </p>
                            </li>
                            <li>
                                <p>
                                    Take a deep breath and relax before hitting the "record audio" button. To enhance relaxation
                                    and synchronisation, take calm and deep breaths.
                                </p>
                            </li>
                            <li>
                                <p>
                                    Embrace the challenge and have fun: V-sync is an exciting and one-of-a-kind experience that
                                    promotes connection and pleasure.
                                </p>
                            </li>
                            <li>
                                <p>
                                    Take pauses as needed: If you become exhausted or overwhelmed throughout the game, it is
                                    critical to take small rests.
                                </p>

                            </li>
                            <li>
                                <p>
                                    Respect each other's boundaries: As you participate in physiological synchronisation with your
                                    partner, it's critical that you respect each other's comfort levels and boundaries. Prioritise open
                                    communication and make sure both players feel secure and supported during the game.
                                </p>
                            </li>
                        </ul> */}