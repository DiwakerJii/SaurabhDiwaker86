import React from 'react'
import instruction from '../../assets/spectrogram_instruction.jpg'

const SpectrogramDetails = () => {
    return (
        <div className='bg-Theme_skin min-h-[100vh] p-10 w-full'>
            <p className='text-center mb-10 font-noto font-bold text-4xl text-fuchsia-500'>Understanding Spectrogram</p>
            <p className='align-center font-ysa text-lg '>
                The resulting spectrogram in the V-sync game is a visual depiction of the participant's parasympathetic activity, consisting of the frequency and timing components of the recorded humming or vowel "a" sound.
                <br /><br />
                The continuous vocalisation and regulated exhalation while humming activate the vagus nerve, resulting
                in enhanced parasympathetic activity. Vagal tone rises as a result of increased parasympathetic activity.
                As a result, the heart rate decreases, resulting in longer RR intervals. Subsequent wavy bumps or
                evolutions in the spectrogram's horizontal frequency plots correlate to RR intervals.
                The RR interval may be calculated by counting the number of vertical columns between successive bumps in horizontal frequency graphs. Each column indicates a time period of 0.2 seconds.
                <br /><br />
                In adults, the average RR interval during normal breathing is roughly 0.8 to 1.2 seconds. The RR interval
                while humming might be as little as a few tenths of a second. The RR interval may be calculated by
                counting the number of vertical columns between successive bumps in horizontal frequency graphs.
                Each column indicates a time period of 0.2 seconds.
                <br /><br />
                <b>Disclaimer:</b> It is important to note that the variations in the RR pattern while humming give insights into heart rate modulation and vagal tone, but they do not provide precise information regarding underlying cardiac problems.A full assessment, including further tests and a medical review by a healthcare expert
                or cardiologist, is required to appropriately evaluate and diagnose heart issues.
                <br /><br />
                <span className='font-bold text-2xl text-icons'>Check this image to understand spectrogram better</span>

            </p>

            <img src={instruction} className='mt-10'></img>
        </div>
    )
}

export default SpectrogramDetails
