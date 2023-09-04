'use client'
import SinglePost from '@/components/singlePost';
import axios from 'axios';
import React, { useEffect, useState } from 'react'

const SinglePostPage = ({ params: { id } }) => {
  const [post, setPost] = useState({});

  const getPost = async () => {
    try {
      const { data } = await axios.get(`/api/post/user/${id}`);
      setPost(data.post);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getPost();
  }, []);
  return (
    <div style={{
      width: '85%',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center'
    }}>
      <SinglePost postItem={post} />
    </div>
  )
}

export default SinglePostPage
