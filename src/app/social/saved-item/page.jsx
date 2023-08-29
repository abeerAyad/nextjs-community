"use client"

import axios from 'axios'
import Image from 'next/image'
import React, { useEffect, useState } from 'react'
import styles from '../../../styles/socialSavedElements.module.css'
import Link from 'next/link'

const SavedItem = () => {
  const [savedPosts, setSavedPosts] = useState([])

  const getSavedItems = async () => {
    try {
      const {data: {savedItems}} = await axios.get('/api/savedElement');
      console.log(savedItems)
      setSavedPosts(savedItems)
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    getSavedItems()
  })
  return (
    <div className={styles.post}>
      <h1 className={styles.title}>Saved Elements</h1>
     {
        savedPosts.map(post => (
          <Link href={`/social/saved-item/${post._id}`}>
            <div className={styles.postWrapper}>
              <div className={styles.postImage}>
                <Image
                className={styles.postProfileImg}
                  src={post.postId?.images}
                  alt=""
                  width={160}
                  height={160}
                />
              </div>
            <div className={styles.postDetails}>
              <h3 className={styles.postTitle}>{post.postId?.content}</h3>

             
              <span className={styles.postDate}>
                <div className={styles.dot}></div>Saved to <strong>For Later</strong></span>
                <div className={styles.userPost}>
                  <img src={post.userId?.image} alt=''  className={styles.userPhoto} />

              <div className={styles.postUsername}>
                Saved From a post <strong>{post.userId.username}</strong>
              </div>
                </div>
              </div>
                </div>
          </Link>


)
)
}
</div>
  )
}

export default SavedItem
