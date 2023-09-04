'use client'

import Image from 'next/image'
import React, { useEffect, useState } from 'react'
import styles from '@/styles/group/singleGroup.module.css'
import GroupPostForm from '@/components/groupPostForm'
import SinglePost from '@/components/singlePost'
import axios from 'axios'
const SingleGroup = ({ params: { id } }) => {
  const [groupPosts, setGroupPosts] = useState([])

  const getGroupPosts = async () => {
    const { data: { groupPosts } } = await axios.get(`/api/group/post/${id}`)
    setGroupPosts(groupPosts)
  }

  useEffect(() => {
    getGroupPosts()
  }, [])
  return (
    <div className={styles.SingleGroupContainer}>
      <div className={styles.groupWallpaper}>
        {/* <Image src='/a' alt='groupWallpaper' width={100} height={100} /> */}
      </div>
      <div className={styles.groupDetailsContainer}>
        <div className={styles.groupDetails}>
          <h3>group name</h3>
          <h4>group owner</h4>
        </div>
        <button className={styles.groupJoinBtn}>Join Group</button>
      </div>

      <main className={styles.groupPageMain}>
        <div>
          <GroupPostForm groupId={id} getFunction={getGroupPosts}/>
        </div>

        <div className={styles.groupPosts}>

          {groupPosts?.length > 0 && groupPosts?.map((postItem) =>
            <SinglePost postItem={postItem} key={postItem._id} />

          )}
        </div>
      </main>
    </div>
  )
}

export default SingleGroup
