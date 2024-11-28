import React from 'react'
import Template from '../components/Template'
import loginImg from '../assets/login.png'

const Login = ({setIsLoggedIn}) => {
  return (
    <Template
      title='Welcome Back'
      desc1='Secure your today, safeguard your tomorrow, and innovate for a resilient digital future.'
      desc2='Empowering you with AI-driven cybersecurity solutions to future-proof your digital landscape.'
      image={loginImg}
      formType='login'
      setIsLoggedIn={setIsLoggedIn}
    />
  )
}

export default Login