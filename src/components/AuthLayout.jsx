import React from 'react'
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom'


function AuthLayout({ children, authentication = true }) {
    const navigate = useNavigate();
    const authStatus = useSelector(state => state.auth.status)

    if (authentication && authStatus !== authentication) {
        navigate("/login")
    } else if (!authentication && authStatus !== authentication) {
        navigate('/')
    }

    return (
        <div>auth</div>
    )
}

export default AuthLayout
