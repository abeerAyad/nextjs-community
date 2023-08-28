
import React from 'react'
import styles from '@/styles/socialHome.module.css'
import Posts from '@/components/postComponent'
import Link from 'next/link'
const SocialHome = () => {

  return (

    <div className={styles.postMain}>
      <div className={styles.newPost}>
        <Link href='/social/post'>What's on your mind</Link>
      </div>
      <Posts />
    </div>


  )
}

export default SocialHome
