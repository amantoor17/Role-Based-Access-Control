import React, { useEffect, useState } from "react";

const Moderator = () => {
  const [userData, setUserData] = useState([]);

  const getAllData = async () => {
    try {
      const getPeople = await fetch(
        `${import.meta.env.VITE_API_URL}/getallUsers`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      const res = await getPeople.json();
      if (res.success) {
        setUserData(res.data); // Assuming res.data is the array of users
      } else {
        console.error("Failed to fetch data:", res.message);
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getAllData();
  }, []);

  return (
    <div>
      <section>
        <table className="table-auto w-11/12 bg-richblack-800 py-4 text-richblack-100 rounded-[8px] border border-richblack-700 mx-auto mt-4">
          <thead className="bg-richblack-900 text-richblack-100">
            <tr>
              <th className="py-3.5 px-4 text-sm font-normal text-left">
                Users
              </th>
              <th className="py-3.5 px-4 text-sm font-normal text-left">
                Email
              </th>
              <th className="py-3.5 px-4 text-sm font-normal text-left">
                Role
              </th>
            </tr>
          </thead>

          <tbody>
            {userData && userData.length > 0 ? (
                userData.map((user, index) => (
                <tr key={index} className="bg-richblack-850 text-richblack-50">
                  <td className="py-2 px-4">{user.name}</td>
                  <td className="py-2 px-4">{user.email}</td>
                  <td className="py-2 px-4">{user.role}</td>
                </tr>
              ))
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
  );
};

export default Moderator;
