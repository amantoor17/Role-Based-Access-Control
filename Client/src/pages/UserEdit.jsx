import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import {toast} from 'react-hot-toast'

const UserEdit = () => {
  const { state } = useLocation(); // Get state from navigation
  const { userId, name, email, role } = state || {}; // Extract userId from the state object
  const navigate = useNavigate();
  console.log('this is user id in EDIT',userId);

  // Initialize form data with empty values
  const [formData, setFormData] = useState({
    name: `${name}`,
    email: `${email}`,
  });

  // Handle form field changes
  const changeHandler = (event) => {
    setFormData((prevData) => ({
      ...prevData,
      [event.target.name]: event.target.value,
    }));
  };

  // Function to handle the update request
  const updateHandler = async (userId, updatedData) => {
    if (!userId) {
      alert("Invalid user ID.");
      return;
    }

    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/updateUser/${userId}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedData), // Send the updated data in the request body
      });

      const result = await response.json();
      

      if (response) {
        // Success notification
        console.log("User updated successfully!");
        toast.success("User updated successfully");

      } else {
        // Error from the backend
        console.error(result.message || "Failed to update user.");
      }
    } catch (error) {
      console.error("Error updating user:", error);
      // toast.error("An error occurred while updating the user.");
    }
  };

  // Handle form submission
  const submitHandler = (event) => {
    event.preventDefault();
    // Call the updateHandler function with userId and form data
    updateHandler(userId, formData);
    navigate(-1)
  
  };

  return (
    <div className='w-5/12 mx-auto'>
      <form onSubmit={submitHandler}>
        {/* Name */}
        <div className='flex gap-x-4 mt-[20px]'>
          <label className='w-full'>
            <p className='text-[0.875rem] text-richblack-5 mb-1 leading-[1.375rem]'>
              Name<sup className='text-pink-200'>*</sup>
            </p>
            <input
              required
              type='text'
              name='name'
              onChange={changeHandler}
              placeholder='Enter Your Name'
              value={formData.name} // Retain name value
              className='bg-richblack-800 rounded-[0.5rem] text-richblack-5 w-full p-[12px]'
            />
          </label>
        </div>

        {/* Email Address */}
        <div className='mt-[20px]'>
          <label className='w-full mt-[20px]'>
            <p className='text-[0.875rem] text-richblack-5 mb-1 leading-[1.375rem]'>
              Email Address<sup className='text-pink-200'>*</sup>
            </p>
            <input
              required
              type='email'
              name='email'
              onChange={changeHandler}
              placeholder='Enter Email Address'
              value={formData.email} // Retain email value
              className='bg-richblack-800 rounded-[0.5rem] text-richblack-5 w-full p-[12px]'
            />
          </label>
        </div>

        {/* Submit Button */}
        <button className='w-full bg-yellow-50 rounded-[8px] font-medium text-richblack-900 px-[12px] py-[8px] mt-6'>
          Update Account
        </button>
      </form>
    </div>
  );
};

export default UserEdit;
