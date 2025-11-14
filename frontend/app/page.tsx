"use client";
import React from 'react'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'
import Headers from '@/components/landing/Header';
import LandingHero from '@/components/landing/LandingHero';
import TestimonialSection from '@/components/landing/TestimonialSection';
import FAQSection from '@/components/landing/FAQSection';
import Footer from '@/components/landing/Footer';



const page = () => {
  const router=useRouter();
  const user={
    type:"patient",
  }

  useEffect(()=>{
  if(user.type==='docter'){
    router.replace('/doctor/dashboard')
  }
  },[user,router])

  if(user?.type==='doctor'){
    return null
  }
  
  

  return (
    <>
    <div className='h-screen w-screen '>
      <Headers showDashbooardNav={true} />
      <LandingHero />
      <TestimonialSection />
      <FAQSection />
      <Footer />

    </div>

    </>
  )
}

export default page

