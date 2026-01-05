import React, { useEffect, useState } from 'react'
import { Postcard, Container } from '../components/index'
import appwriteService from "../appwrite/appwriteConfig"


function AllPost() {
    const [posts, setPost] = useState([])
    useEffect(() => {
        appwriteService.getPost([])
            .then((posts) => {
                if (posts) {
                    setPost(posts.documents)
                }
            })
    },[])

    return (
        <div className='w-full py-8'>
            <Container>
                <div className='flex flex-wrap'>
                    {posts.map((post) => (
                        <div key={post.$id} className='p-2 w-1/4'>
                            <Postcard post={post} />
                        </div>

                    ))}
                </div>
            </Container>


        </div>
    )
}

export default AllPost
