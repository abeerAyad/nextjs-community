'use client'
import axios from 'axios'
import { useSession } from 'next-auth/react'
import React, { useState } from 'react'

const Post = () => {
  const session = useSession()
  const [post, setPost] = useState({
    content: '',
    images: '',
    status: ''
  })
  const onSubmit = async (e) => {
    e.preventDefault()
    const { data } = await axios.post('/api/post', post, {
      Authorization: `Bearer${session.data.token}`
    })
  }
  return (
    <form onSubmit={onSubmit}>
      <input type="text" name='content' onChange={(e) => setPost({ ...post, content: e.target.value })} />
      <input type="text" name='images' onChange={(e) => setPost({ ...post, images: e.target.value })} />
      <input type="text" name='status' onChange={(e) => setPost({ ...post, status: e.target.value })} />
      <button type='submit'>ok</button>
    </form>
  )
}

export default Post
