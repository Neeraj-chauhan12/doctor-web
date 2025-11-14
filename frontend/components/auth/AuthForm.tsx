import React from 'react'


interface AuthFormProps{
    type: 'login' | 'signup';
    role: 'doctor' | 'patient';
}
const AuthForm = ({ type, role }: AuthFormProps) => {
  return (
    <div>
      
    </div>
  )
}

export default AuthForm
