import { useState, useEffect } from 'react'
import './App.css'
import { Outlet } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import {setUser, clearUser} from "./store/authSlice"
import Header from "./components/header/Header"
import Footer from "./components/footer/Footer"
import authService from './appwrite/auth'
import Logo from "./components/Logo"


function App() {
  const [loading, setLoading] = useState(true)
  const dispatch = useDispatch()

  // useEffect(() => {
  //   authService.getCurrentUser().then((userData) => {
  //     if (userData) dispatch(setUser({
  //       userData
  //     })); 
  //     else dispatch(clearUser())
  //   })
  //   .finally(() => setLoading(false))
  // }, [dispatch])

  useEffect(() => {
    setLoading(true);
    authService.getCurrentUser()
      .then((userData) => {
        console.log("User data:", userData); // Debug user data
        if (userData) {
          dispatch(setUser({ userData }));
        } else {
          dispatch(clearUser());
        }
      })
      .catch((error) => {
        console.error("Error in getCurrentUser:", error);
        dispatch(clearUser());
      })
      .finally(() => setLoading(false));
  }, [dispatch]);
  

  return !loading ? (
    <div className="min-h-screen flex flex-wrap content-between bg-gray-400">
      <div className="w-full block">
        <Header/>
        <main>
          <Outlet/>
        </main>
      </div>
      <div className="w-full block">
        <Footer />
      </div>
    </div>
  ) : null;
}

export default App
