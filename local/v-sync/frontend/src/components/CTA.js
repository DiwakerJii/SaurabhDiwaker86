import React from 'react'
import GameCard from './GameCard'

const gameDetails = [
    {
        type: 'Couple',
        detail: 'Deserunt id cupidatat fugiat adipisicing aliquip minim dolor nostrud.',
        classes: 'bg-card_couple'
    },
    {
        type: 'Friends',
        detail: 'Deserunt id cupidatat fugiat adipisicing aliquip minim dolor nostrud.',
        classes: 'bg-card_friends'
    },
    {
        type: 'Multiplayer',
        detail: 'Deserunt id cupidatat fugiat adipisicing aliquip minim dolor nostrud.',
        classes: 'bg-card_multiplayer'
    }
]

const CTA = ({ ref_cta, toggleVisibility }) => {



    return (
        <section id='cta' className='md:flex-row flex flex-col py-14 justify-around items-center bg-pink_2 bg-opacity-30 px-20 w-full space-y-10 md:space-y-0 ' ref={ref_cta}>
            {gameDetails.map((game) => (
                <GameCard title={game.type.toLowerCase()} detail={game.detail} key={game.type} classes={game.classes} toggleVisibilityLogin={toggleVisibility} />

            ))}


        </section >
    )
}

export default CTA
