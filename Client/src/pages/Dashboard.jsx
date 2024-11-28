import React from "react";
import { useLocation, useNavigate } from "react-router-dom";

const Dashboard = () => {
  const location = useLocation();
  const userData = location.state?.userData;
  const navigate = useNavigate();

  function clickHandler(event) {
    event.preventDefault();

     // Redirect to page based on user role
     const role = userData?.user.role || role;

     if (role === "Admin") {
       navigate("/admin");
     } else if (role === "Moderator") {
       navigate("/moderator");
     } else {
       navigate("/user");
     }

  }

  return (
    <div className="flex flex-col mt-20 justify-center items-center text-white text-3xl h-full">
      <h1>Welcome to VRV Security</h1>
      <p className="uppercase mt-10">You are Logged In as : { userData?.user.role || role } </p>
      <button className='bg-richblack-800 mt-10 text-richblack-100 py-[8px] 
      px-[12px] rounded-[8px] border border-richblack-700'
      onClick={clickHandler}
      >
      CLICK HERE TO CONTINUE
      </button>
    </div>
  );
};

export default Dashboard;
