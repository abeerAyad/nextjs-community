'use client'
import axios from 'axios'
import { useSession } from 'next-auth/react'
import React, { useState } from 'react'
import styles from '@/styles/postFrom.module.css'
import { convertToBase64 } from '@/utils/convertImage'
import Image from 'next/image'

const GroupPostForm = ({ groupId, getFunction }) => {
  const session = useSession()
  const [image, setImage] = useState([])
  const [post, setPost] = useState({
    content: '',
  })
  const handleFileUpload = async (e) => {
    const file = e.target.files[0]
    const base64 = await convertToBase64(file)
    setImage([...image, base64])
  }
  const onSubmit = async (e) => {
    e.preventDefault()
    const { data } = await axios.post(`/api/group/post/${groupId}`, { ...post, images: image }, {
      Authorization: `Bearer${session?.data?.token}`
    })

    getFunction()
  }
  return (
    <div>
      <form onSubmit={onSubmit} className={styles.form}>
        <textarea
          className={styles.textarea}
          placeholder={`what's on your mind`}
          type="text" name='content'
          onChange={(e) => setPost({ ...post, content: e.target.value })} />
        <input
          multiple
          className={styles.input}
          placeholder='image'
          type="file"
          name='images'
          onChange={(e) => handleFileUpload(e)} />
        <button className={styles.btn} type='submit'>Post</button>
      </form>

      <div style={{
        display: 'grid',
        gridTemplateColumns: image.length > 1 ? 'repeat(2,1fr)' : 'repeat(1,1fr)',

      }}>
        {image.length > 0 &&
          image?.map((img,i) =>
            <Image key={i} className={styles.newPostImage} src={img} alt='imagePost' width={400} height={400} />
          )

        }
      </div>
    </div >

  )
}

export default GroupPostForm
