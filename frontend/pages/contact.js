import React from 'react'
import styles from '../styles/FormPageLayout.module.scss'
import FormPageLayout from '../components/FormPageLayout'
import contactImage from '../public/images/contact.svg';

const contact = () => {
    return (
        <div>
            <FormPageLayout image={contactImage} pageTitle="Contact Page">
                <h1 className={styles.title}>Contact Us</h1>
                <form className={styles.form}>
                    <div className={styles.formItem}>
                        <input className={styles.inputL} placeholder="Name" />
                    </div>
                    <div className={styles.formItem}>
                        <input className={styles.inputL} placeholder="Email" />
                    </div>
                    <div className={styles.formItem}>
                        <input className={styles.inputL} placeholder="Phone Number" />
                    </div>
                    <div className={styles.formItem}>
                        <input className={styles.inputL} placeholder="Subject" />
                    </div>
                    <div className={styles.formItem}>
                        <textarea className={styles.textarea} placeholder="Message" rows="6" />
                    </div>
                    <button className={styles.button}>SUBMIT</button>
                </form>
            </FormPageLayout>
        </div>
    )
}

export default contact