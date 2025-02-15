import React from 'react'
import { useDispatch } from 'react-redux'
import authService from "../../appwrite/auth.js"
import { clearUser } from "../../store/authSlice.js"

function LogoutBtn() {
    const dispatch = useDispatch()

    const LogoutHandler = () => {
        authService.clearUser().then(() => {
            dispatch(clearUser());
        })
    }

    return (
        <button className='inline-block px-6 py-2 duration-200 hover:bg-blue-100 rounded-full'
        onClick={LogoutHandler}>
            Logout
        </button>
    )
}

export default LogoutBtn
