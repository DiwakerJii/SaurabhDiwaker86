import { axiosPrivate } from "../api/axios";
import useAuth from "./useAuth";
import { useEffect } from "react";

const { auth } = useAuth()

useEffect(() => {
    const requestIntercept = axiosPrivate.interceptors.request.use(
        config => {
            if (!config.headers['Authorization']) {
                config.headers['Authorization'] = `Bearer ${auth?.accessToken}`
            }
        }
    )
}, [auth])