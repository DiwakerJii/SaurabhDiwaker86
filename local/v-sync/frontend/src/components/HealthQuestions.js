import React from 'react'
import { useForm } from 'react-hook-form'
import axios from '../api/axios'
import { Link } from 'react-router-dom'
import useAuth from '../hooks/useAuth'

const HEALTH_INFO_SUBMIT_URL = "/api/accounts/health_related_info/"

// abhi not working properly
const HealthQuestions = ({ toggleHealthQuestion }) => {

    const { register, formState: { errors }, handleSubmit, getValues } = useForm()

    // const healthData = {
    //     diabetes: getValues('diabetes'),
    //     heart_related_disease: getValues('heart_related_disease'),
    //     hypertension: getValues('hypertension'),
    //     covid19: getValues('covid19'),
    //     smoking: getValues('smoking')
    // }
    const { auth } = useAuth()
    const token = localStorage.getItem('token')
    // console.log(token);
    const submit = async () => {
        // console.log(data);
        try {
            // make axios post request
            const response = await axios.patch(
                HEALTH_INFO_SUBMIT_URL, JSON.stringify({
                    diabetes: getValues('diabetes'),
                    heart_related_disease: getValues('heart_related_disease'),
                    hypertension: getValues('hypertension'),
                    covid19: getValues('covid19'),
                    smoking: getValues('smoking')
                }),
                {
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": `Bearer ${token}`
                    }
                }
            );
            console.log(response);


        } catch (error) {
            console.log(error)
        }

        toggleHealthQuestion(false)
    }

    return (
        <div className='w-full bg-slate-400/70 fixed flex items-center justify-around z-30'>

            <div className='flex flex-col items-center bg-pink_2 md:p-10 py-6 px-5 rounded-lg'>
                <form onSubmit={handleSubmit(submit)} className='items-center flex flex-col'>
                    <h1 className='font-extrabold text-4xl m-10 text-purple-700'>Answer following Questions: </h1>
                    <div className='flex flex-col md:space-y-9 space-y-5 text-2xl font-ysa'>
                        {/* diabetes */}
                        <div className='flex space-x-8'>
                            <p>
                                Have you ever had diabetes?
                            </p>
                            <div>
                                <label htmlFor='diabetes_yes'>Yes </label>
                                <input type='radio' value='True' name='diabetes' id='diabetes_yes' {...register('diabetes', {
                                    required: 'This field is required'
                                })} />
                            </div>
                            <div>
                                <label htmlFor='diabetes_no'>No </label>
                                <input type='radio' value='False' name='diabetes' id='diabetes_no' {...register('diabetes', {
                                    required: 'This field is required'
                                })} />
                            </div>
                            {errors.diabetes && (<p className='errorMsg_form'>{errors.diabetes.message}</p>)}

                        </div>
                        {/* heart */}
                        <div className='flex space-x-8'>
                            <p>
                                Have you ever taken any heart related medication?
                            </p>
                            <div>
                                <label htmlFor='heart_yes'>Yes </label>
                                <input type='radio' value='True' name='heart_related_disease' id='heart_yes' {...register('heart_related_disease', {
                                    required: 'This field is required'
                                })} />
                            </div>
                            <div>
                                <label htmlFor='heart_no'>No </label>
                                <input type='radio' name='heart_related_disease' value='False' id='heart_no' {...register('heart_related_disease', {
                                    required: 'This field is required'
                                })} />
                            </div>
                            {errors.heart_related_disease && (<p className='errorMsg_form'>{errors.heart_related_disease.message}</p>)}

                        </div>
                        {/* hypertension */}
                        <div className='flex space-x-8'>
                            <p>
                                Have you ever had hypertension?
                            </p>
                            <div>
                                <label htmlFor='hypertension_yes'>Yes </label>
                                <input type='radio' value='True' name='hypertension' id='hypertension_yes' {...register('hypertension', {
                                    required: 'This field is required'
                                })} />
                            </div>
                            <div>
                                <label htmlFor='hypertension_no'>No </label>
                                <input type='radio' value='False' name='hypertension' id='hypertension_no' {...register('hypertension', {
                                    required: 'This field is required'
                                })} />
                            </div>
                            {errors.hypertension && (<p className='errorMsg_form'>{errors.hypertension.message}</p>)}


                        </div>
                        {/* covid */}
                        <div className='flex space-x-8'>
                            <p>
                                Have you ever had covid?
                            </p>
                            <div>
                                <label htmlFor='covid_yes'>Yes </label>
                                <input type='radio' name='covid19' value='True' id='covid_yes' {...register('covid19', {
                                    required: 'This field is required'
                                })} />
                            </div>
                            <div>
                                <label htmlFor='covid_no'>No </label>
                                <input type='radio' name='covid19' value='False' id='covid_no' {...register('covid19', {
                                    required: 'This field is required'
                                })} />
                            </div>
                            {errors.covid19 && (<p className='errorMsg_form'>{errors.covid19.message}</p>)}

                        </div>
                        {/* smoking */}
                        <div className='flex space-x-8'>
                            <p>
                                Have you ever smoked?
                            </p>
                            <div>
                                <label htmlFor='smoking_yes'>Yes </label>
                                <input type='radio' name='smoking' value='True' id='smoking_yes' {...register('smoking', {
                                    required: 'This field is required'
                                })} />
                            </div>
                            <div>
                                <label htmlFor='smoking_no'>No </label>
                                <input type='radio' name='smoking' value='False' id='smoking_no' {...register('smoking', {
                                    required: 'This field is required'
                                })} />
                            </div>
                            {errors.smoking && (<p className='errorMsg_form'>{errors.smoking.message}</p>)}

                        </div>
                    </div>
                    {/* <Link to={'/'}> */}
                    <button type='submit' className='md:mt-24 mt-16 text-lg px-9 py-3 bg-purple-900 rounded-full text-white'>Submit</button>
                    {/* </Link> */}
                </form>
            </div>
        </div>
    )
}

export default HealthQuestions
