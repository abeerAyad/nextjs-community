'use client'

import axios from 'axios'
import Image from 'next/image'
import React, { useEffect, useState } from 'react'
import styles from '@/styles/profile/profileImages.module.css'
const ImagesComponent = () => {
  const [userPosts, setUserPosts] = useState([])
  const images = userPosts.map((post) => post?.images).flat()

  const getUserPostsImages = async () => {
    const { data: { posts } } = await axios.get('/api/post/user')
    setUserPosts(posts)
  }

  useEffect(() => {
    getUserPostsImages()

  }, [])

  return (
    <div>
      <div>
        <p>user profile images</p>
      </div>
      <div className={styles.postImages}>
        <p>user posts images</p>
        <div className={styles.postsImagesContainer}>

          {images?.map((img, i) =>
            <div key={i} className={styles.postImageDiv}>

              <Image src={img} alt='allUserImage' width={100} height={100} />

            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default ImagesComponent
