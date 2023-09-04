'use client'
import React, { useState } from 'react'
import styles from '@/styles/group/group.module.css'
import axios from 'axios'
import { useSession } from 'next-auth/react'
import { convertToBase64 } from '@/utils/convertImage'
const GroupForm = () => {
  const [group, setGroup] = useState({
    title: '',
    image: '',
    description: '',
    status: '',
  })
  const session = useSession()

  const onSubmit = async (e) => {
    e.preventDefault()
    const { data } = await axios.post('/api/group', group, {
      Authorization: `Bearer${session?.data?.token}`
    })
  }

  const handleFileUpload = async (e) => {
    const file = e.target.files[0]
    const base64 = await convertToBase64(file)
    setGroup({ ...group, image: base64 })
  }
  return (
    <div>
      <h3>Create a new group...</h3>
      <form className={styles.form} onSubmit={onSubmit}>
        <input
          className={styles.input}
          name='title'
          type="text"
          placeholder='write group title'
          onChange={(e) => setGroup({ ...group, title: e.target.value })}
        />

        <input
          className={styles.input}
          name='image'
          type="file"
          placeholder='choose your image group'
          onChange={(e) => handleFileUpload(e)}
        />

        <textarea
          className={styles.textarea}
          name='description'
          type="text"
          placeholder='write a description about your group'
          onChange={(e) => setGroup({ ...group, description: e.target.value })}

        ></textarea>
        <select
          name="status"
          className={styles.input}
          onChange={(e) => setGroup({ ...group, status: e.target.value })}

        >
          <option value="private">private</option>
          <option value="public">public</option>
        </select>
        <button type='submit' className={styles.btn}>create</button>
      </form>
    </div>
  )
}

export default GroupForm
