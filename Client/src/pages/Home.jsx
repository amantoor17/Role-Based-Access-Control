import React from 'react'
import {Link} from "react-router-dom"

const Home = () => {
  return (
    <div className='flex justify-center items-center mt-64 text-white text-3xl h-full overflow-y-hidden'>

    <Link to="/login">
      <button className='bg-richblack-800 text-richblack-100 py-[8px] 
      px-[12px] rounded-[8px] border border-richblack-700'>CLICK HERE TO CONTINUE</button>
    </Link>
    
    </div>
  )
}

export default Home