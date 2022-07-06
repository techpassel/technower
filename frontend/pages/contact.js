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
                    <input className={styles.inputS} placeholder="Name" />
                    <input className={styles.inputS} placeholder="Phone" />
                    <input className={styles.inputL} placeholder="Email" />
                    <input className={styles.inputL} placeholder="Subject" />
                    <textarea className={styles.textarea} placeholder="Message" rows="6" />
                    <button className={styles.button}>SUBMIT</button>
                </form>
            </FormPageLayout>
        </div>
    )
}

export default contact