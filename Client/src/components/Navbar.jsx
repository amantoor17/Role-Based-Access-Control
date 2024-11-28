import React from 'react'
import { Link, useNavigate } from "react-router-dom"
import { toast } from "react-hot-toast"

const Navbar = (props) => {
  let isLoggedIn = props.isLoggedIn;
  let setIsLoggedIn = props.setIsLoggedIn;
  const navigate = useNavigate();

  // Logout handler function
  const logoutHandler = () => {
    // Clear token from localStorage or cookies
    localStorage.removeItem("token");
    // Optionally clear other session data (if needed)
    // document.cookie = "token=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/";

    // Update state to reflect logged out status
    setIsLoggedIn(false);
    
    // Show a success toast notification
    toast.success("Logged Out");

    // Redirect to the login page
    navigate("/login");
  };

  return (
    <div className='flex justify-between items-center w-11/12 max-w-[1160px] py-4 mx-auto'>
      <Link className='text-white text-3xl '> 
        VRV Security
      </Link>

      {/* Login - SignUp - LogOut */}
      <div className='flex items-center gap-x-4'>
        { !isLoggedIn &&
          <Link to="/login">
            <button className='bg-richblack-800 text-richblack-100 py-[8px] 
            px-[12px] rounded-[8px] border border-richblack-700'>
              Log in
            </button>
          </Link>
        }
        { !isLoggedIn &&
          <Link to="/signup">
            <button className='bg-richblack-800 text-richblack-100 py-[8px] 
            px-[12px] rounded-[8px] border border-richblack-700'>
              Sign up
            </button>
          </Link>
        }
        { isLoggedIn &&
          <button 
            onClick={logoutHandler} 
            className='bg-richblack-800 text-richblack-100 py-[8px] 
            px-[12px] rounded-[8px] border border-richblack-700'>
            Log Out
          </button>
        }
      </div>
    </div>
  )
}

export default Navbar
