"use client"
import React, { useEffect } from 'react'
import { userAuthStore } from './Store/authStore'

export const Provider = ({children}:{children:React.ReactNode}) => {
    const {fetchProfile,token} =userAuthStore();

    useEffect(()=>{
        if(token){
            fetchProfile()

        }
    },[token,fetchProfile])
  return <>{children}</>
}

