import React from 'react'
import Circle from './Circle'
import Image from 'next/image'
import styles from '../styles/Testimonial.module.scss'

const Testimonial = ({ users }) => {
    return (
        <div className={styles.container}>
            <div className={styles.titleContainer}>
                <Circle backgroundColor="#16b800" width="90vmin" height="90vmin" opacity="0.5" top="-70vh" />
                <h1 className={styles.title}>Testimonials</h1>
            </div>
            <div className={styles.wrapper}>
                {users.map(user => (
                    <div key={user.id} className={styles.card}>
                        <Image className={styles.logo} alt='User image' src={`/images/${user.logo}`} width="30" height="30" />
                        <p className={styles.comment}>
                            {user.comment}
                        </p>
                        <div className={styles.person}>
                            <Image className={styles.avatar} alt="Avator" src={`/images/${user.avatar}`} width="60" height="60" objectFit="cover" />
                            <div className={styles.info}>
                                <span className={styles.username}>{user.name}</span>
                                <span className={styles.jobTitle}>{user.title}</span>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default Testimonial