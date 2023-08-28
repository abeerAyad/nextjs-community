'use client'

import Image from 'next/image'
import React from 'react'
import styles from '@/styles/socialNav.module.css'
import { useSession } from 'next-auth/react'

const SocialNav = () => {
  const { data } = useSession()
  return (
    <nav className={styles.socialNav}>
      <h2>home</h2>
      <input className={styles.search} type="text" name="username" placeholder='search' />
      <div className={styles.userData}>
        <h3 className={styles.owner}>{data?.user?.name}</h3>
      </div>
    </nav>
  )
}

export default SocialNav
