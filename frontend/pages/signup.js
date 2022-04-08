import React from 'react'
import FormPageLayout from '../components/FormPageLayout'
import styles from '../styles/FormPageLayout.module.scss'
import authImage from '../public/images/auth.svg'
import Link from 'next/link';

const signup = () => {
    return (
        <FormPageLayout image={authImage} pageTitle="Signup Page">
            <h1 className={styles.title}>Sign Up</h1>
            <form className={styles.form}>
                <input className={styles.inputL} placeholder="Name" />
                <input className={styles.inputL} placeholder="Email" />
                <input className={styles.inputL} placeholder="Phone number" />
                <input className={styles.inputL} placeholder="Password" />
                <input className={styles.inputL} placeholder="Confirm Password" />
                <button className={styles.button}>SUBMIT</button>
            </form>
            <span className={styles.authLinkContainer}>Already have an account? <Link href='/login'><a className={styles.authLink}>Login</a></Link></span>
        </FormPageLayout>
    )
}

export default signup