import React from 'react'
import AppHead from '../components/layout/AppHead'
import styles from '../styles/Contact.module.scss'
import Circle from '../components/Circle'
import Image from 'next/image'
import contactImage from '../public/images/contact.svg'


const contact = () => {
    return (
        <div className={styles.container}>
            <AppHead title="Contact us" description="Contact page of technower." />
            <div className={styles.cardImage}>
                <Circle left="-60vh"/>
                <div className={styles.imageContainer}>
                    <Image src={contactImage} alt="contact" className={styles.image} />
                </div>
            </div>
            <div className={styles.cardForm}>
                {/* <Circle opacity="0.2" top="-50vmin" height="80vmin" width="80vmin" /> */}
                <div className={styles.innerContainer}>
                    <h1 className={styles.title}>GET IN TOUCH</h1>
                    <form className={styles.form}>
                        <input className={styles.inputS} placeholder="Name" />
                        <input className={styles.inputS} placeholder="Phone" />
                        <input className={styles.inputL} placeholder="Email" />
                        <input className={styles.inputL} placeholder="Subject" />
                        <textarea className={styles.textarea} placeholder="Message" rows="6" />
                        <button className={styles.button}>SUBMIT</button>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default contact