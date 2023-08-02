import ProgressBar from "@ramonak/react-progress-bar";
import React, { useEffect, useState } from 'react'

const VoiceBar = () => {
    const [percent, setPercent] = useState(0)


    const timer = setInterval(() => {
        const newPercent = percent + 10;
        setPercent(newPercent)
    }, 1000)



    setTimeout(() => {
        clearInterval(timer)
    }, 6000)




    return (
        <div className="w-full">
            {percent <= 60
                ?
                <ProgressBar customLabel=" " completed={percent} maxCompleted={60} />
                :
                <ProgressBar customLabel="Completed" maxCompleted={60} completed={100} />

            }
        </div>
    )
}

export default VoiceBar
