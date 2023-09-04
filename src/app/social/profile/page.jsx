'use client'

import { useSession } from 'next-auth/react'
import Image from 'next/image'
import React, { useEffect, useState } from 'react'
import { IoEllipse } from 'react-icons/io5'
import styles from '@/styles/profile/profile.module.css'
import Link from 'next/link'
import axios from 'axios'
import SinglePost from '@/components/singlePost'

const Profile = () => {
  const session = useSession()
  const [userPosts, setUserPosts] = useState([])
  console.log("🚀 ~ file: page.jsx:16 ~ Profile ~ userPosts:", userPosts[0])
  const getUserPost = async () => {
    try {
      const { data: { posts } } = await axios.get('/api/post/user');
      console.log("🚀 ~ file: page.jsx:19 ~ getUserPost ~ posts:", posts)
      setUserPosts([...userPosts, posts])
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    getUserPost();
  }, []);

  return (
    <div className={styles.profile}>
      <div className={styles.userProfile}>
        <div className={styles.userProfileWall}>
          <Image src alt='userImage' width={500} height={100} />
        </div>

        <div className={styles.userProfileData}>
          <Image src alt='userImage' width={200} height={100} />
          <div className={styles.userData}>
            <h3>Name: {session?.data?.user?.name}</h3>
            <div className={styles.statusProfile}>
              <p>Email: {session?.data?.user?.email}</p>
              <p className={styles.spanStatus}>
                {session?.status === 'authenticated' ? 'online' : 'offline'}

                <IoEllipse
                  style={{
                    color: session?.status === 'authenticated' ? 'green' : 'red'
                  }}
                />

              </p>
            </div>

          </div>
        </div>
      </div>
      <div className={styles.newPost}>
        <Link href='/social/post'>What's on your mind</Link>
      </div>
      <div className={styles.userPostsContainer}>
        {userPosts[0]?.length > 0 ?
         userPosts[0]?.map((postItem) =>
          <SinglePost postItem={postItem} />
        ) :
          <h2>there is no posts</h2>}
      </div>
    </div>
  )
}

export default Profile
