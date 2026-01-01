import React from 'react'
import { useDispatch } from 'react-redux'
import authService from '../../appwrite/auth'
import { logOut } from '../../store/authSlice'
function LogoutBtn() {
    const dispatch = useDispatch()
    const logOutHandler = () => {
        authService.logOut()
            .then(() => {
                dispatch(logOut)
            })
            .catch((error) => {
                console.log("Logoutbbtn error : ", error)
                return <div>LogOut failed</div>
            })
    }
    return (
        <div>Logout Btn</div>
    )
}

export default LogoutBtn
