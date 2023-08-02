import React from 'react'
import logo from '../assets/vsync_logo.png'
import vsync from '../assets/vsync_illus.png'
import vaani from '../assets/vaani.png'
import verve from '../assets/verve.png'
import vibe from '../assets/vibe_illus.png'

const Hero = ({ ref_cta }) => {

    const data = [
        {
            id: 1,
            class: 'h-[100vh] justify-start bg-img_1',
            title: 'vsync',
            title_class: 'text-black md:ml-36 ml-10 font-ysa font-semiBold md:text-[150px] text-[80px]',
            text: 'Get ready for a whole new level of fun way to test your vibes in real-time with your significant other,family, and friends!\nPowered by our 2-tier physiological synchronization algorithm, our latest product “V- sync” is the world\'s first health and wellness platform designed to bring people together in a way that\'s never been done before. Using your voice(Vaani) as a guide, this product will help you and your loved ones test your physiological synchrony by analyzing your parasympathatic activity, this product can help you find the synchronization % with your significant other, family, and friends.\nNot only does this product help you feel more connected, it also gives you the chance to win cash prizes!Yes, Verve and Vibes together Whether you\'re a couple looking to strengthen your relationship or a group of friends looking to add some excitement to your gatherings, this technology provides a unique and entertaining way to connect with others.\nSo if you\'re ready to take your relationships to the next level with the help of our cutting - edge technology, don\'t hesitate to try our real - time vibe checker “V - sync” today!',
            illus: vsync
        },
        {
            id: 2,
            class: 'h-[60vh] justify-start bg-img_2 ',
            title: 'Vaani',
            title_class: 'text-white md:ml-52 md:text-9xl text-7xl font-noto font-bold',
            text: 'In Hindi, the word "Vaani" (वाणी) translates to "speech" or "voice". Using your voice(Vaani) as a guide, our 2 tier algorithm will help you and your loved ones test your physiological synchrony. By analyzing your parasympathatic activity during humming, this product can help you find the synchronization % with your significant other, family, and friends..',
            illus: vaani
        },
        {
            id: 3,
            class: 'h-[60vh] justify-start bg-img_3',
            title: 'Verve',
            title_class: 'text-white md:ml-52 md:text-9xl text-7xl font-noto font-bold',
            text: '"Verve" is associated with the dynamic and energetic quality of interpersonal relationships."Verve" can denote the existence of vibrant and engaged interactions when individuals actively and energetically connect with each other in the setting of physiological synchrony or interpersonal connections.It suggests a sense of excitement, passion, and positive engagement, which can help to synchronise physiological responses or improve the quality of interpersonal interactions.',
            illus: verve
        },
        {
            id: 4,
            class: 'h-[60vh] justify-start bg-img_4',
            title: 'Vibes',
            title_class: 'text-white md:ml-52 md:text-9xl text-7xl font-noto font-bold',
            text: '"Vibes" refers to the emotional or intuitive environment or energy that is detected or felt in a certain setting or from a person. When it comes to synchrony or interpersonal connections, "vibes"; can refer to the emotional and intuitive components of interpersonal encounters.In the context of physiological synchrony or interpersonal interactions, "vibes" can refer to the emotional and energetic resonance or connection that persons feel. It indicates a sense of shared emotions, comprehension, or alignment, which can help to synchronise physiological responses or improve the quality of interpersonal interactions.',
            illus: vibe
        }


    ]

    const handleClick = () => {
        ref_cta.current?.scrollIntoView({ behaviour: 'smooth' })
    }

    return (
        <section id='home'>

            <div className='flex flex-col items-center h-full'>
                {data.map((el) => (
                    <div className='flex flex-col md:justify-center justify-end items-center h-full' key={el.id}>
                        <div className={`${el.class} w-full bg-cover bg-no-repeat bg-right bg-fixed flex items-center`}>
                            <div className="md:flex-row flex-col flex items-center w-full">
                                {el.id === 1 ?
                                    <div className="flex-col flex items-center w-full">
                                        <img src={logo} alt='V-sync' className='md:h-[200px] md:w-[350px] md:scale-110 scale-100' />
                                        <button className=' p-5 rounded-2xl bg-purple-600/50 text-xl font-poppins text-white hover:bg-purple-600/70' onClick={handleClick}>Quick Start</button>
                                    </div>
                                    :

                                    <h1 className={`${el.title_class} w-full text-center`}>{el.title}</h1>

                                }

                                <div className='w-full'>
                                    <img src={el.illus} alt={el.title} className='sticky' />
                                </div>

                            </div>

                        </div>
                        <div className='h-[100%] w-[100%] flex items-center leading-7 p-7 text-lg bg-bg'>
                            <p className='text-icons md:ml-36 md:mr-52 align-middle font-noto'>{el.text}</p>
                        </div>
                    </div>
                ))}

            </div>
        </ section>


    )
}

export default Hero
