'use client'
import React, { useState } from 'react'
import { useFormik } from "formik";
import { validateSignUp } from '@/validationSchema/Signup.Schema';
import styles from '@/styles/signup.module.css'
import axios from 'axios';
import Image from 'next/image';
import { convertToBase64 } from '@/utils/convertImage';
const Signup = () => {
  const [image, setImage] = useState('')
  const onSubmit = async (values, actions) => {
    const userData = {
      username: values.username,
      email: values.email,
      password: values.password,
      image: image
    }
    const { data } = await axios.post('/api/signup', userData)
  }
  const handleFileUpload = async (e) => {
    const file = e.target.files[0]
    const base64 = await convertToBase64(file)
    setImage(base64)
  }
  const { values, errors, touched, isSubmitting, handleChange, handleBlur, handleSubmit } = useFormik({
    initialValues: {
      username: '',
      email: '',
      password: '',
      confirmPassword: '',
      image: ''
    },
    validationSchema: validateSignUp,
    onSubmit
  })
  return (
    <div className={styles.signup}>
      <h1>Sign up</h1>
      <form className={styles.form} onSubmit={handleSubmit} autoComplete='off'>
        <div className={styles.inputContainer}>
          <input
            className={styles.input}
            type="text"
            value={values.username}
            placeholder='username'
            onChange={handleChange}
            id='username'
            name='username'
            onBlur={handleBlur}
            style={{
              border: errors.username && touched.username ? '1px solid red' : ''
            }}
          />
          {errors.username && touched.username && <p className={styles.errorMsg}>{errors.username}</p>}
        </div>
        <div className={styles.inputContainer}>
          <input
            className={styles.input}
            type="email"
            value={values.email}
            placeholder='email'
            onChange={handleChange}
            id='email'
            name='email'
            onBlur={handleBlur}
            style={{
              border: errors.email && touched.email ? '1px solid red' : ''
            }}
          />
          {errors.email && touched.email && <p className={styles.errorMsg}>{errors.email}</p>}

        </div>
        <div className={styles.inputContainer}>
          <input
            className={styles.input}
            type="password"
            autoComplete='true'
            value={values.password}
            placeholder='password'
            onChange={handleChange}
            id='password'
            name='password'
            onBlur={handleBlur}
            style={{
              border: errors.password && touched.password ? '1px solid red' : ''
            }}
          />
          {errors.password && touched.password && <p className={styles.errorMsg}>{errors.password}</p>}

        </div>
        <div className={styles.inputContainer}>
          <input
            className={styles.input}
            autoComplete='true'
            type="password"
            value={values.confirmPassword}
            placeholder='confirmPassword'
            onChange={handleChange}
            id='confirmPassword'
            name='confirmPassword'
            onBlur={handleBlur}
            style={{
              border: errors.confirmPassword && touched.confirmPassword ? '1px solid red' : ''
            }}
          />
          {errors.confirmPassword && touched.confirmPassword && <p className={styles.errorMsg}>{errors.confirmPassword}</p>}

        </div>
        <div className={styles.inputContainer}>
          <input
            className={styles.input}
            type="file"
            value={values.image}
            placeholder='image'
            onChange={(e) => handleFileUpload(e)}
            id='image'
            name='image'
            onBlur={handleBlur}
            accept='.jpeg, .png, .jpg'
            style={{
              border: errors.image && touched.image ? '1px solid red' : ''
            }}
          />
          {image &&
            <Image className={styles.img} src={image} alt='img' width={70} height={70} />

          }
          {errors.image && touched.image && <p className={styles.errorMsg}>{errors.image}</p>}

        </div>
        <button className={styles.btn} disabled={isSubmitting} type='submit' > {isSubmitting ? 'signing' : 'sign up'}</button>
      </form>
    </div >
  )
}



export default Signup
