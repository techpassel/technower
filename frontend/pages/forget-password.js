import React from 'react'
import FormPageLayout from '../components/FormPageLayout'
import styles from '../styles/FormPageLayout.module.scss'
import authImage from '../public/images/auth.svg'
import Link from 'next/link';

const forgetPassword = () => {
    return (
        <FormPageLayout image={authImage} pageTitle="Forget Password Page">
            <h1 className={styles.title}>Forget Password</h1>
            <form className={styles.form}>
                <span style={{'marginBottom': '15px'}}>Please enter your email address or mobile number to search for your account.</span>
                <input className={styles.inputL} placeholder="Email or Mobile number" />
                <button className={styles.button}>SUBMIT</button>
            </form>
            <span className={styles.authLinkContainer}>Want to retry login? <Link href='/login'><a className={styles.authLink}>Login</a></Link></span>
        </FormPageLayout>
    )
}

export default forgetPassword