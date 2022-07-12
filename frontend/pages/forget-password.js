import React from 'react'
import FormPageLayout from '../components/FormPageLayout'
import styles from '../styles/FormPageLayout.module.scss'
import authImage from '../public/images/auth.svg'
import Link from 'next/link';

const forgetPassword = () => {
    return (
        <FormPageLayout image={authImage} pageTitle="Forget Password Page">
            <h1 className={styles.title}>Forget Password</h1>
            <span style={{ 'marginBottom': '15px', 'width': '30vw' }}>Please enter your email address or mobile number to search your account.</span>
            <form className={styles.form}>
                <div className={styles.formItem}>
                    <input className={styles.inputL} placeholder="Email or Mobile number" />
                </div>
                <button className={styles.button}>SUBMIT</button>
            </form>
            <span className={styles.authLinkContainer}>Want to retry login?
                <Link href='/login'><a className={styles.authLink}>Click here</a></Link>
            </span>
        </FormPageLayout>
    )
}

export default forgetPassword