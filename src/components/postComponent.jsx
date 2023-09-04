"use client"
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import styles from '@/styles/socialHome.module.css'
import { useSession } from 'next-auth/react';
import SinglePost from './singlePost';

const Posts = () => {
    const [posts, setPosts] = useState([]);
    const getPosts = async () => {
        try {
            const { data: { posts } } = await axios.get('/api/post');
            setPosts(posts);
        } catch (error) {
            console.log(error);
        }
    };
    useEffect(() => {
        getPosts();
    }, []);


    return (
        <div className={styles.postContainer}>
            {
                posts.map(postItem => (
                    <SinglePost
                        key={postItem._id}
                        postItem={postItem}
                    />

                ))
            }
        </div >
    );
};

export default Posts;
