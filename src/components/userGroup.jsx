'use client'
import axios from 'axios'
import Image from 'next/image'
import React, { useEffect, useState } from 'react'
import styles from '@/styles/group/group.module.css'
import Link from 'next/link'
const UserGroup = () => {
  const [userGroups, setUserGroups] = useState([])
  const getUserGroups = async () => {
    const { data: { groups } } = await axios.get('/api/group/user')
    setUserGroups([...userGroups, groups])
  }

  useEffect(() => {
    getUserGroups()
  }, [])
  return (
    <div className={styles.allUserGroups}>
      <h3>your groups</h3>
      <div className={styles.userGroupsContainer}>
        {userGroups[0]?.map((group) =>
          <Link href={`/social/groups/${group._id}`} key={group._id} className={styles.userGroup} >
            <div>
              <Image className={styles.groupImage} src={group?.image} alt='groupImage' width={70} height={70} />
            </div>
            <div className={styles.groupContent}>
              <div>
                <h3 className={styles.owner}>owner: {group?.ownerId?.username}</h3>
                <p className={styles.groupTime}>{group?.createdAt?.slice(0, 10)}</p>
              </div>
              <p className={styles.owner}>title: {group?.title}</p>
            </div>
          </Link>
        )}

      </div>


    </div >
  )
}

export default UserGroup
