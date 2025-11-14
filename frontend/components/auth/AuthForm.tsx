"use client"
import React, { useState } from 'react'
import { userAuthStore } from '../Store/authStore';
import { useRouter } from 'next/navigation';


interface AuthFormProps{
    type: 'login' | 'signup';
    role: 'doctor' | 'patient';
}
const AuthForm = ({ type, role }: AuthFormProps) => {

  const router=useRouter()

  const [formData, setFormData]=useState({
    name:'',
    email:'',
    password:''
  })

  const [showPassword,setShowPassword]=useState(false);
  const [agreeTerms,setAgreeTerms]=useState(false);

  const {loginDoctor, loginPatient, signupDoctor, signupPatient,loading,error} =userAuthStore();

  const handleSubmit=async(e:React.FormEvent)=>{
    e.preventDefault();
    if(type==='signup' && !agreeTerms)return alert("You must agree to the terms and conditions");
    try {
      if(type==='signup'){
        if(role==='doctor'){
          await signupDoctor({
            name:formData.name,
            email:formData.email,
            password:formData.password
          })
        }else{
          await signupPatient({
            name:formData.name,
            email:formData.email,
            password:formData.password
          })
        }
        router.push(`/onboarding/${role}`)

      }else{
        if(role==='doctor'){
          await loginDoctor(formData.email,formData.password)
          router.push('/doctor/dashboard')
        }else{
          await loginPatient(formData.email,formData.password)
          router.push('/patient/dashboard')
        }
      }
      
    } catch (error) {
      
    }
  }

  const handleGoogleAuth=()=>{
    window.location.href=`${process.env.BASE_URL}/auth/google?type=${role}`;
  }

  const isSignup=type==='signup';
  const title=isSignup? "Create your account" : "Welcome back";
  const buttonText=isSignup? "Create Account" : "Sign in";
  const altTextLink=isSignup? "Already have an account?":"Don't have an account?";
  const altLinkPath=isSignup? `/login/${role}` : `/signup/${role}`;
  const altLinkText=isSignup? "Sign in" : "Create an account";

  return (
    <div>
      
    </div>
  )
}

export default AuthForm
