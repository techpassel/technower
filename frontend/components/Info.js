import { faArrowRight } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React from 'react'
import styles from '../styles/Info.module.scss'

const Info = () => {
    return (
        <div className={styles.container}>
            <hr className={styles.hrBorder} />
            <h1 className={styles.title}>What is Technower?</h1>
            <p className={styles.details}>Technower is a collaboration platform for technophiles.
                It is a platform where technowers collaborate together to make the learning and understanding
                of latest technologies easy and accessible for everyone. They use this platform to share
                their knowledge and skills with the world and to excel their skills by grabing the knowledge
                shared by fellow technowers. They also use this platform for many other purposes like for getting
                assistance from the fellow technowers in the time of need or sometimes just to find technowers with
                matching vigor, passion and interest.
            </p>
            <button className={styles.button}>Learn more
                <FontAwesomeIcon style={{ 'marginLeft': "5px" }} icon={faArrowRight} />
            </button>
            <hr className={styles.hrBorder} />
        </div>
    )
}

export default Info