import React from 'react'
import logo from '../assets/vsync_logo.png'
import useAuth from '../hooks/useAuth'

const Navbar = ({ toggleVisibilityLogin, toggleVisibilityLogout }) => {
    const navItems = [
        {
            item: 'Home',
            url: '/#home'
        },

        {
            item: 'Contact',
            url: '/#contact'
        }
    ]


    const { auth, setAuth } = useAuth()

    const handleClickLogin = () => {
        toggleVisibilityLogin(true)
    }

    const handleClickLogout = () => {
        console.log("logout clicked");
        toggleVisibilityLogout(true)
    }


    return (
        <>

            <header>
                <div className='fixed top-0 z-10 bg-bg_nav font-bold backdrop-filter backdrop-blur-lg w-full bg-opacity-30 h-16 shadow-lg'>
                    <div className='flex items-center justify-between p-4 h-16 '>
                        <div className='pl-4 flex'>
                            {/* <span className='font-extrabold text-2xl text-fuchsia-800'>VSync</span> */}
                            <img src={logo} alt="V-sync" className='h-15 w-20' />
                        </div>
                        <div className='justify-around items-center flex'>
                            <ul className='flex justify-center items-center space-x-10 text-white'>
                                {navItems.map((el) => (
                                    <a key={el.item} smooth href={el.url}>{el.item}</a>
                                ))}
                                <button className='bg-fuchsia-800 px-5 py-1.5 hover:bg-fuchsia-500 rounded-lg' onClick={() => {
                                    { auth?.accessToken != null ? handleClickLogout() : handleClickLogin() }
                                }}>
                                    {auth?.accessToken ? 'Logout' : 'Login'}
                                </button>
                                {/* <button className='border-fuchsia-800 border-2 px-5 py-1.5 hover:bg-fuchsia-500 rounded-lg'>
                                    <a smooth href='/#cta'>SignUp</a>
                                </button> */}
                            </ul>
                        </div>
                    </div>
                </div>

            </header>
        </>

    )
}

export default Navbar
