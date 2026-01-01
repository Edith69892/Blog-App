import React from 'react'
import { Logo, LogoutBtn, Container } from "../index"
import { Link } from "react-router-dom"
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

function Header() {
    const authStatus = useSelector(state => state.auth.status)
    const navigate = useNavigate()

    const navItms = [
        {
            name: 'Home',
            slug: "/",
            active: true
        },
        {
            name: 'login',
            slug: "/login",
            active: !authStatus
        },
        {
            name: 'signup',
            slug: "/signup",
            active: !authStatus
        },
        {
            name: 'All Posts',
            slug: "/all-posts",
            active: authStatus
        },
        {
            name: 'Add Post',
            slug: "/add-posts",
            active: authStatus
        },
    ]

    return (
        <header className='py-e shadow bg-gray-500'>
            <Container>
                <nav className='flex'>
                    <div className='mr-4'>
                        <Link to='/'>
                            <Logo width='70px' />
                        </Link>
                    </div>

                    <ul className='flex ml-auto'>
                        {navItms.map((itm) =>
                            itm.active ? (
                                <li key={itm.name}>
                                    <button className='inline-blok px-6 py-32 duration-2-- hover:bg-blue-100 rounded-full' onClick={() => navigate(itm.slug)}>{itm.name}</button>
                                </li>
                            ) : null)}

                        {authStatus && (
                            <li>
                                <LogoutBtn />
                            </li>
                        )}
                    </ul>
                </nav>
            </Container>

        </header>
    )
}

export default Header
