import React, { useEffect, useState } from 'react'
import appwriteService from "../appwrite/appwriteConfig"
import { Container } from '../components/index'
import {Postcard} from '../components/index'
import { useDispatch, useSelector } from 'react-redux'
import { logOut } from '../store/authSlice'

function Home() {
    const [posts, setPost] = useState([])
    const dispatch = useDispatch()
    const authStatus = useSelector((state) => state.auth.status)
    useEffect(() => {
        if(authStatus){
            appwriteService.getActivePosts()
        .then((post) =>{
            setPost(post?.documents || [])  
        })
        .catch((error) => {
            console.log(error)
        })
        }else{
            dispatch(logOut())
        }
    },[authStatus])
     if(!authStatus){
        return (
            <div className="w-full py-8 mt-4 text-center">
                <Container>
                    <div className="flex flex-wrap">
                        <div className="p-2 w-full">
                            <h1 className="text-2xl font-bold hover:text-gray-500">
                                Login to read posts
                            </h1>
                        </div>
                    </div>
                </Container>
            </div>
        )
     }

     return (
        <div className='w-full py-8'>
            <Container>
                <div className='flex flex-wrap'>
                    {posts.map((post) => (
                        <div key={post.$id} className='p-2 w-full sm:w-1/2 md:w-1/3 lg:w-1/4'>
                            <Postcard post={post} />
                        </div>
                    ))}
                </div>
            </Container>
        </div>
     )
}

export default Home
