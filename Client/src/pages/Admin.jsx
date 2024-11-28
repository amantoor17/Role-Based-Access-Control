import React, { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import { IoIosAddCircleOutline } from "react-icons/io";
import { MdDeleteForever } from "react-icons/md";
import { MdModeEdit } from "react-icons/md";
import { useNavigate } from "react-router-dom";

const Admin = ({ setIsLoggedIn }) => {
  const [empData, setEmpData] = useState([]);
  const navigate = useNavigate();

  const deleteHandler = async (userId) => {
    if (!userId) {
      alert("Invalid user ID.");
      return;
    }

    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/deleteUser/${userId}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ userId }), // Ensure userId is correctly sent
        }
      );

      const result = await response.json();

      if (response.ok && result.success) {
        // Remove the deleted user from the state
        setEmpData((prevData) =>
          prevData.filter((user) => user._id !== userId)
        );
        toast.success(result.message || "User deleted successfully!");
      } else {
        toast.success(result.message || "Failed to delete user.");
      }
    } catch (error) {
      console.error("Error deleting user:", error);
      toast.success("An error occurred while deleting the user.");
    }
  };

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
        setEmpData(res.data); // Assuming res.data is the array of users
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
    <section>
      <table className="table-auto w-11/12 bg-richblack-800 py-4 text-richblack-100 rounded-[8px] border border-richblack-700 mx-auto mt-4">
        <thead className="bg-richblack-900 text-richblack-100">
          <tr>
            <th className="py-3.5 px-4 text-sm font-normal text-left">Users</th>
            <th className="py-3.5 px-4 text-sm font-normal text-left">Email</th>
            <th className="py-3.5 px-4 text-sm font-normal text-left">Role</th>
            <th className="py-3.5 px-4 text-sm font-normal text-left">Edit</th>
            <th className="py-3.5 px-4 text-sm font-normal text-left">
              Delete
            </th>
            <th className="text-2xl text-right">
              <IoIosAddCircleOutline
                onClick={() => {
                  setIsLoggedIn(true);
                  navigate("/signup", { state: { isLoggedIn: true } });
                }}
              />
            </th>
          </tr>
        </thead>

        <tbody>
          {empData && empData.length > 0 ? (
            empData.map((user, index) => (
              <tr key={index} className="bg-richblack-850 text-richblack-50">
                <td className="py-2 px-4">{user.name}</td>
                <td className="py-2 px-4">{user.email}</td>
                <td className="py-2 px-4">{user.role}</td>
                <td className="text-2xl pl-4">
                  <MdModeEdit
                    onClick={() => {
                      navigate("/edit", {
                        state: {
                          userId: user._id,
                          name: user.name,
                          email: user.email,
                          role: user.role,
                        },
                      });
                    }}
                  />
                </td>
                <td className="text-2xl pl-4">
                  <MdDeleteForever
                    onClick={() => {
                      deleteHandler(user._id);
                    }}
                  />
                </td>
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
  );
};

export default Admin;
