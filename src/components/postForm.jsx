'use client'
import axios from 'axios'
import { useSession } from 'next-auth/react'
import React, { useState } from 'react'
import styles from '@/styles/postFrom.module.css'
import { convertToBase64 } from '@/utils/convertImage'
import Image from 'next/image'
import { IoAddCircle, IoCameraSharp } from 'react-icons/io5'

const PostForm = () => {
  const session = useSession()
  const [image, setImage] = useState([])
  const [post, setPost] = useState({
    content: '',
    status: ''
  })
  const handleFileUpload = async (e) => {
    const file = e.target.files[0]
    const base64 = await convertToBase64(file)
    setImage([...image, base64])
  }
  const onSubmit = async (e) => {
    e.preventDefault()
    const { data } = await axios.post('/api/post', { ...post, images: image }, {
      Authorization: `Bearer${session?.data?.token}`
    })
  }
  return (
    <div>
      <form onSubmit={onSubmit} className={styles.form}>
        <textarea
          className={styles.textarea}
          placeholder={`what's on your mind`}
          type="text" name='content'
          onChange={(e) => setPost({ ...post, content: e.target.value })} />
        <div style={{
          display: 'grid',
          gridTemplateColumns: image.length > 1 ? 'repeat(2,1fr)' : 'repeat(1,1fr)',
          width: '100%'

        }}>
          {image.length > 0 &&
            image?.map((img) =>
              <Image className={styles.newPostImage} src={img} alt='imagePost' width={400} height={400} />
            )

          }
        </div>
        <div className={styles.inpFileDiv}>
          <div className={styles.fileContainer}>
            <IoCameraSharp className={styles.addFileIcon} />
            <input
              multiple
              className={styles.file}
              placeholder='image'
              type="file"
              name='images'
              onChange={(e) => handleFileUpload(e)} />
          </div>
          <select
            value={post.status}
            name="status"
            className={styles.select}
            onChange={(e) => setPost({ ...post, status: e.target.value })}
          >
            <option value="private">private</option>
            <option value="public">public</option>
          </select>
        </div>

        <button className={styles.btn} type='submit'>Post</button>
      </form>


    </div >

  )
}

export default PostForm
