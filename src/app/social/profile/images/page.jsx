import ImagesComponent from '@/components/profile/images'
import React from 'react'
import styles from '@/styles/profile/profileImages.module.css'

const ImagesPage = () => {
  return (
    <div className={styles.imagesPage}>
      <ImagesComponent />
    </div>
  )
}

export default ImagesPage
