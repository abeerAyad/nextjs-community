'use client'

import PostForm from '@/components/postForm'
import { useSession } from 'next-auth/react'
import Image from 'next/image'
import React from 'react'
import { IoEllipse, IoMail } from 'react-icons/io5'
import styles from '@/styles/profile/profile.module.css'
import Posts from '@/components/postComponent'
import Link from 'next/link'

const Profile = () => {
  const session = useSession()
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
      <div>
        <Posts userId={session?.data?.user?.id} />
      </div>
    </div>
  )
}

export default Profile
