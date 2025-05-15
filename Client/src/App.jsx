import { Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar"
import Home from "./pages/Home"
import Login from "./pages/Login"
import Signup from "./pages/Signup"
import Dashboard from "./pages/Dashboard"
import { useState } from 'react'
import PrivateRoute from "./components/PrivateRoute";
import Admin from "./pages/Admin";
import Moderator from "./pages/Moderator";
import User from "./pages/User";
import UserEdit from "./pages/UserEdit";
import UserProfile from "./pages/UserProfile";


function App() {

  const [isLoggedIn, setIsLoggedIn] = useState(false);
 

  return (
    <div className=" w-screen min-h-screen bg-richblack-900 flex flex-col">
      <Navbar isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn}/>
      
      <Routes>

        <Route path="/" element= {<Login isLoggedIn={isLoggedIn}/>} />
        <Route path="/login" element = {<Login  setIsLoggedIn={setIsLoggedIn} />} />
        <Route path="/signup" element={<Signup  setIsLoggedIn={setIsLoggedIn} />} />
        <Route path="/dashboard" element = {
          <PrivateRoute isLoggedIn={isLoggedIn}>
            <Dashboard/>
          </PrivateRoute>
       
        } />

        <Route path="/admin" element={
          <PrivateRoute isLoggedIn={isLoggedIn}>
            <Admin setIsLoggedIn={setIsLoggedIn}/>
          </PrivateRoute>
        } />

        <Route path="/moderator" element={
          <PrivateRoute isLoggedIn={isLoggedIn}>
            <Moderator/>
          </PrivateRoute>
        } />

        <Route path="/user" element={
        <PrivateRoute isLoggedIn={isLoggedIn}>
          <User/>
        </PrivateRoute>
        } />

        <Route path="/edit" element={
        <PrivateRoute isLoggedIn={isLoggedIn}>
          <UserEdit/>
        </PrivateRoute>
        } />

        <Route path="/user-profile" element={
        <PrivateRoute isLoggedIn={isLoggedIn}>
          <UserProfile/>
        </PrivateRoute>
        } />

      </Routes>

    </div>
    )
}

export default App;
