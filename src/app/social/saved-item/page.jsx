"use client"

import axios from 'axios'
import Image from 'next/image'
import React, { useEffect, useState } from 'react'
import styles from '@/styles/socialSavedElements.module.css'
import Link from 'next/link'

const SavedItem = () => {
  const [savedPosts, setSavedPosts] = useState([])
  console.log("🚀 ~ file: page.jsx:11 ~ SavedItem ~ savedPosts:", savedPosts)

  const getSavedItems = async () => {
    try {
      const { data: { savedItems } } = await axios.get('/api/savedElement');
      setSavedPosts(savedItems)
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    getSavedItems()
  }, [])
  return (
    <div className={styles.post}>
      <h1 className={styles.title}>All saved posts</h1>
      {
        savedPosts.map(post => (
          <Link href={`/social/single-post/${post?.postId?._id}`} key={post._id}>
            <div className={styles.postWrapper}>
              <div className={styles.postImage}>
                <Image
                  className={styles.postProfileImg}
                  src={post.postId?.images[0]}
                  alt=""
                  width={160}
                  height={160}
                />
              </div>
              <div className={styles.postDetails}>
                <div className={styles.userPost}>
                  <img src={post.userId?.image} alt='' className={styles.userPhoto} />

                  <div className={styles.postUsername}>
                    posted by <strong>{post.userId.username}</strong>
                  </div>
                </div>
                <h3 className={styles.postTitle}>{post.postId?.content}</h3>



                <p className={styles.dot}>Saved to For Later</p>

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
