'use client'

import React, { useState } from 'react'
import styles from '@/styles/socialSidebar.module.css'
import { IoClipboard, IoHomeSharp, IoMenuOutline, IoPersonSharp, IoSaveSharp } from 'react-icons/io5'
import Link from 'next/link'
const SidebarSocial = () => {
  return (
    <div className={styles.sidebarContainer}>
      <div className={styles.sidebar}>
        <h4>menu list</h4>
        <IoMenuOutline className={styles.sidebarIconMenu} />
      </div>
      <ul className={styles.sidebarNav}>
        <li> <Link href='/social'>Home </Link> <IoHomeSharp className={styles.sidebarIcons} /></li>
        <li><Link href='/social/profile'>Profile </Link><IoPersonSharp className={styles.sidebarIcons} /></li>
        <li> <Link href='/social/saved-item'> Saved Items</Link> <IoSaveSharp className={styles.sidebarIcons} /></li>
        <li> <Link  href='/social/groups'>Groups</Link> <IoClipboard className={styles.sidebarIcons} /></li>
      </ul>
    </div>
  )
}

export default SidebarSocial
