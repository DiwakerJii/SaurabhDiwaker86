import ProgressBar from "@ramonak/react-progress-bar";
import React, { useEffect, useState } from 'react'

const FinalBar = ({ percent }) => {
    const RED = "#FF0000";
    const BLUE = "#0000FF";
    const GREEN = "#018749";
    const BLACK = "#000000"
    const [colour, setColour] = useState(null);
    const [barMsg, setBarMsg] = useState()
    console.log(percent);
    // const percentage = 63
    useEffect(() => {
        if (percent < 33) {
            setColour(RED);
            console.log("inred");
            setBarMsg("LOW")
        } else if (percent < 66) {
            setColour(BLUE)
            console.log("inblue");
            setBarMsg("MEDIUM")
        } else if (percent <= 100) {
            console.log("ingreen");
            setColour(GREEN);
            setBarMsg("HIGH")
        } else {
            console.log("innan");
            setColour(BLACK)
            setBarMsg("NAN")
        }

    }, [percent, colour])
    return (
        <div className="w-[100%]">
            <ProgressBar customLabel=" " completed={percent} bgColor={colour} className='m-5' />
            <p className='md:text-4xl text-2xl font-bold w-full text-center mb-4' style={{ color: colour }}>{barMsg}</p>
        </div>
    )
}

export default FinalBar


// import React, { useEffect, useState } from 'react'
// import { CircularProgressbar, buildStyles, CircularProgressbarWithChildren } from 'react-circular-progressbar';
// import 'react-circular-progressbar/dist/styles.css';
// const RED = "#FF0000";
// const BLUE = "#0000FF";
// const GREEN = "#018749";
// let colour;

// const FinalBar = ({ percent }) => {

//     return (
//         <div style={{ width: 200, height: 200 }}>
//             {/* <CircularProgressbar value={percentage} styles={buildStyles({
//                 pathColor= colour,
//                 text= {`${percent}`,
//             }
//             })}/> */}
//             <CircularProgressbar value={percentage} text={percent} styles={buildStyles({
//                 trailColor: '#d6d6d6',
//                 backgroundColor: '#3e98c7'
//             })} />
//         </div>
//     )
// }

// export default FinalBar


