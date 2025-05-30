import React, { useState } from 'react'
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-hot-toast';


const LoginForm = ({setIsLoggedIn}) => {

    const navigate = useNavigate();
    const token = localStorage.getItem('authToken');

    const [formData, setFormData] = useState( {
        email:"", password:""
    })

    const[showPassword, setShowPassword] = useState(false);

    function changeHandler(event) {

        setFormData( (prevData) =>(
            {
                ...prevData,
                [event.target.name]:event.target.value
            }
        ) )

    }

    // Function to handle login API call
    const checkForLogin = async () => {
        const baseUrl = import.meta.env.VITE_API_URL;
        console.log("Base URL:", baseUrl);

        try {
          const response = await fetch(`${baseUrl}/login`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(formData), // Sending formData as payload
          });
      
          const data = await response.json();
      
          console.log("Response Status:", response.status); // Log response status
          console.log("Response USER Data:", data); // Log the actual response data
      
          if (response.ok) {
            setIsLoggedIn(true);
            localStorage.setItem('authToken', data.token);

            
            const role = data?.user.role || role;
            toast.success("Logged In Successfully as "+`${role}`, {
                duration: 5000,
            });

            if (role === "Admin") {
            navigate("/admin");
            } else if (role === "Moderator") {
            navigate("/moderator");
            } else {
            navigate("/user", { state: { data } });
            }

            // navigate("/dashboard", { state: { userData:data } });
          } else {
            // Show API-specific error message or default error
            toast.error(data.message || "Login failed. Please try again.");
          }
        } catch (error) {
          console.error("Error during login:", error); // Log error details
          toast.error("An error occurred. Please try again later.");
        }
      };
      

    function submitHandler(event) {
        event.preventDefault();
        checkForLogin(); 
    }

  return (
    <form onSubmit={submitHandler}
    className="flex flex-col w-full gap-y-4 mt-6">

        <label className='w-full'>
            <p className='text-[0.875rem] text-richblack-5 mb-1 leading-[1.375rem]'>
                Email Address<sup className='text-pink-200'>*</sup>
            </p>
            <input 
                required
                type="email"
                value = {formData.email}
                onChange={changeHandler}
                placeholder="Enter email address"
                name="email"
                className='bg-richblack-800 rounded-[0.5rem] text-richblack-5 w-full p-[12px]'
            />
        </label>

        <label className='w-full relative'>
            <p className='text-[0.875rem] text-richblack-5 mb-1 leading-[1.375rem]'>
                Password<sup className='text-pink-200'>*</sup>
            </p>
            <input 
                required
                type= {showPassword ? ("text") : ("password")}
                value = {formData.password}
                onChange={changeHandler}
                placeholder="Enter Password"
                name="password"
                className='bg-richblack-800 rounded-[0.5rem] text-richblack-5 w-full p-[12px]'
            />

            <span 
            className='absolute right-3 top-[38px] cursor-pointer'
            onClick={() => setShowPassword((prev) => !prev)}>
                {showPassword ? 

                (<AiOutlineEyeInvisible fontSize={24} fill='#AFB2BF'/>) : 

                (<AiOutlineEye fontSize={24} fill='#AFB2BF'/>)}
            </span>

            {/* <Link to="#">
                <p className='text-xs mt-1 text-blue-100 max-w-max ml-auto'>
                    Forgot Password
                </p>
            </Link> */}
        </label>

        <button className='bg-yellow-50 rounded-[8px] font-medium text-richblack-900 px-[12px] py-[8px] mt-6'>
            Sign In
        </button>

    </form>
  )
}

export default LoginForm
