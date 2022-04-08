import React from 'react'
import FormPageLayout from '../components/FormPageLayout'
import styles from '../styles/FormPageLayout.module.scss'
import authImage from '../public/images/auth.svg'
import Link from 'next/link';

const login = () => {
    return (
        <FormPageLayout image={authImage} pageTitle="Login Page">
            <h1 className={styles.title}>Sign In</h1>
            <form className={styles.form}>
                <input className={styles.inputL} placeholder="Email" />
                <input className={styles.inputL} placeholder="Password" />
                <button className={styles.button}>SUBMIT</button>
            </form>
            <span  className={styles.authLinkContainer}><Link href='/forget-password'><a className={styles.authLink}>Forget password?</a></Link></span>
            <span  className={styles.authLinkContainer}>Not a technower yet? <Link href='/signup'><a className={styles.authLink}>Join now</a></Link></span>
        </FormPageLayout>
    )
}

export default login