import React from 'react'
import Template from '../components/Template'
import signupImg from '../assets/signup.png'

const Signup = ({setIsLoggedIn}) => {
  return (
    <Template
      title='Secure Your Digital Journey with VRV Security'
      desc1='Learn to protect, innovate, and build a safer tomorrow.'
      desc2='Empowering you with skills to future-proof your career in cybersecurity.'
      image={signupImg}
      formtype='signup'
      setIsLoggedIn={setIsLoggedIn}
    />
  )
}

export default Signup