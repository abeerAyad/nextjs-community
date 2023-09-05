'use client'

import { useSession } from 'next-auth/react'
import Image from 'next/image'
import React, { useEffect, useState } from 'react'
import { IoEllipse } from 'react-icons/io5'
import styles from '@/styles/profile/profile.module.css'
import Link from 'next/link'
import axios from 'axios'
import SinglePost from '@/components/singlePost'
import Posts from '@/components/postComponent'

const Profile = () => {
  const session = useSession()
  const [userPosts, setUserPosts] = useState([])
  const [sharePost, setSharePost] = useState([])
  
  const getUserPost = async () => {
    try {
      const { data: { posts } } = await axios.get('/api/post/user');
      const { data: { sharePostData } } = await axios.get('/api/share');
      console.log(sharePostData,'djdjjd')
      const sharedPosts = sharePostData?.map(shareData => ({
        _id: shareData?._id,
        content: shareData.postId?.content,
        status: shareData.postId?.status,
        images: shareData.postId?.images,
        userId: shareData?.postId?.userId,
        isShared: shareData.isShared,
        userSharedPostId: shareData.userId
      }));
     

      const allPosts = sharedPosts ? [...posts, ...sharedPosts] : posts
      console.log(allPosts)
      setUserPosts(allPosts);

    } catch (error) {
      console.error(error);
    }
  }

  

  console.log(sharePost, 'posts')

  console.log(userPosts,'jjj')
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
          <div className={styles.followers}>
            <p>followers : 25</p>
            <p>following : 50</p>
          </div>
        </div>
      </div>
      <div className={styles.userInfosContainer}>
        <nav className={styles.userInfosNav}>
          <ul className={styles.userInfosNavList}>
            <li> <Link href='/social/profile/about'>about</Link> </li>
            <li> <Link href='/social/profile/friends'>friends</Link></li>
            <li><Link href='/social/profile/statistics'>statistics</Link></li>
            <li><Link href='/social/profile/images'>images</Link></li>
          </ul>
        </nav>
        <div className={styles.userInfos}>
          <div>
            <p>university :</p>
            <span>al-Azhar</span>
          </div>
          <div>
            <p>country :</p>
            <span>palestine</span>
          </div>
          <div>
            <p>major :</p>
            <span>Software Developer</span>
          </div>
          <div>
            <p>whatsApp :</p>
            <span>542533111</span>
          </div>
          <div>
            <p>Jop :</p>
            <span>sleeping</span>
          </div>
        </div>
      </div>
      <div className={styles.newPost}>
        <Link href='/social/post'>What's on your mind</Link>
      </div>
      <div className={styles.userPostsContainer}>
      

        {userPosts?.length > 0 ?
          userPosts?.map((postItem) =>{

          return ( <SinglePost postItem={postItem}  />)
         }
        ) :
          <h2>there is no posts</h2>}
      </div>
    </div>
  )
}

export default Profile
