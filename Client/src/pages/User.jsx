import React, { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom';
import { MdModeEdit } from "react-icons/md";

const User = () => {

    const { state } = useLocation();
    const navigate = useNavigate();
    // const data = state?.data; // we have user data here and their is no need to fetch

    // If the state is passed, extract user data directly from it
    const [userData, setUserData] = useState(state?.data || {});
    console.log('USER DATA IN USER', userData);

    const getUser = async () => {
        try {
          const getPeople = await fetch(
            `${import.meta.env.VITE_API_URL}/getuser/${userData.user._id}`,
            {
              method: "GET",
              headers: {
                "Content-Type": "application/json",
              },
            }
          );
    
          const res = await getPeople.json();
          if (res.success) {
            setUserData(res); // Assuming res.data is the array of users
          } else {
            console.error("Failed to fetch data:", res.message);
          }
        } catch (error) {
          console.error(error);
        }
      };

    useEffect(() => {
        getUser();
      }, []);

    return(
        <div>
      <section>
        <table className="table-auto w-11/12 bg-richblack-800 py-4 text-richblack-100 rounded-[8px] border border-richblack-700 mx-auto mt-4">
          <thead className="bg-richblack-900 text-richblack-100">
            <tr>
              <th className="py-3.5 px-4 text-sm font-normal text-left">
                Your Name
              </th>
              <th className="py-3.5 px-4 text-sm font-normal text-left">
                Your Email
              </th>
              <th className="py-3.5 px-4 text-sm font-normal text-left">
                Your Role
              </th>
              <th className="py-3.5 px-4 text-sm font-normal text-left">Edit</th>
            </tr>
          </thead>

          <tbody>
            {userData?.user ? (
                <tr className="bg-richblack-850 text-richblack-50">
                  <td className="py-2 px-4">{userData.user.name}</td>
                  <td className="py-2 px-4">{userData.user.email}</td>
                  <td className="py-2 px-4">{userData.user.role}</td>
                  <td className="text-2xl pl-4">
                  <MdModeEdit
                    onClick={() => {
                      navigate("/edit", {
                        state: {
                          userId: userData.user._id,
                          name: userData.user.name,
                          email: userData.user.email,
                          role: userData.user.role,
                        },
                      });
                    }}
                  />
                </td>
                </tr>
            ) : (
              <tr>
                <td colSpan="3" className="py-2 px-4 text-center">
                  No data available
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </section>
    </div>
    )
}

export default User