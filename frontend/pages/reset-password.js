import React from 'react'
import FormPageLayout from '../components/FormPageLayout'
import styles from '../styles/FormPageLayout.module.scss'
import authImage from '../public/images/auth.svg'
import Link from 'next/link';

const resetPassword = () => {
    return (
        <FormPageLayout image={authImage} pageTitle="Reset Password Page">
            <h1 className={styles.title}>Reset Password</h1>
            <form className={styles.form}>
                <div className={styles.formItem}>
                    <input className={styles.inputL} placeholder="Enter new password" />
                </div>
                <div className={styles.formItem}>
                    <input className={styles.inputL} placeholder="Confirm new password" />
                </div>
                <button className={styles.button}>SUBMIT</button>
            </form>
            <span className={styles.authLinkContainer}>Want to retry login? <Link href='/login'><a className={styles.authLink}>Login</a></Link></span>
        </FormPageLayout>
    )
}

export default resetPassword;