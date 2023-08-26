"use client"
import React from 'react'
import { signIn } from 'next-auth/react';
import { useFormik } from 'formik';
import { validateLogin } from '@/validationSchema/Login.Schema';
import styles from '../../styles/login.module.css'
import Image from 'next/image';
import { FcGoogle } from 'react-icons/fc';
import { BsGithub } from 'react-icons/bs';
import { useRouter } from 'next/navigation';

const Login = () => {
    
    const router= useRouter()
    const onSubmit = async (values) => {
        const userData = {
            email: values.email,
            password: values.password,
        }
        signIn("credentials", userData);
        router.push('/')
    }

    const { 
        values, errors, 
        touched, isSubmitting, 
        handleChange, handleBlur, 
        handleSubmit } = useFormik({
            initialValues: {
                email:'',
                password: '',
            },
            validationSchema:validateLogin,
            onSubmit
    })

    return (
        <div className={styles.wrapper}>
        <div className={styles.card}>
            <Image src='../../../logo.svg' width={150} height={150}/>
            <h1 className={styles.title}>Login</h1>
            <div className={styles.auth}>
                    <button type='button' className={styles.btn} onClick={() => signIn('google', { callbackUrl: 'http://localhost:3000' })}><FcGoogle style={{fontSize:'25px', }} /></button>
                    <button type='button' className={styles.btn} onClick={() => signIn('github', { callbackUrl: 'http://localhost:3000' })}><BsGithub style={{fontSize:'25px', }} /></button>

            </div>
            <form onSubmit={handleSubmit} autoComplete='off' className={styles.form}>
             
                <div>
                    <input
                        type="email"
                        className={styles.control}
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
                    {errors.email && touched.email && <p>{errors.email}</p>}

                </div>
                <div>
                    <input
                        type="password"
                        className={styles.control}
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
                    {errors.password && touched.password && <p>{errors.password}</p>}
                </div>
                <button type='submit' className={styles.button}>Login</button>
            </form>
           
            </div>
        </div >
  )
}

export default Login
