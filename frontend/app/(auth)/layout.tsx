"use client"
import { useRouter } from 'next/navigation';
import React, { useEffect } from 'react'

const layout = ({children}:{children:React.ReactNode}) => {

    const redirect=useRouter();;

    const isAuthenticarted=false;
    const user={
        type:'patient',
        name:"neeraj",
        profileImage:"/profile.png",
        email:"nc1676639@gmail.com"
    };

    useEffect(()=>{
        if(isAuthenticarted && user){
            const redirectPath=isAuthenticarted && user?.type==='doctor' ? '/doctor/dashboard' : '/patient/dashboard';
            redirect(redirectPath);
            

        }

    },[isAuthenticarted,user])

  return (
    <div className='min-h-screen flex'>
        <div className='w-full  lg:w-1/2 flex items-center  justify-center p-6 bg-white'>
            {children}
        </div>
      
      <div className=' hidden lg:block w-1/2 relative overflow-hidden'>
        <div className='absolute inset-0 bg-gradient-to-tr from-blue-600 to-purple-600  '></div>
      </div>

      <div className='w-full h-full bg-gradient-to-br from bg-blue-600 via-blue-700 to-blue-600'>
        <div className='text-center text-white p-8 max-w-md'>
            <div className='w-20 h-20 bg-white/20 rounded-2xl flex items-center justify-center'>
            <svg className="w-12 h-12 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
             </svg>

            </div>
            <div>
                <h2 className='text-4xl font-bold mb-4'>Welcome to Medicare+</h2>
                <h2 className='text-2xl opacity-80'>Your health, our priority</h2>
                <p className='text-sm opacity-80 '>Connecting patients with certified healthcare providers for quality medical consultations.</p>

            </div>
            
            

        </div>

      </div>
    </div>
  )
}

export default layout
