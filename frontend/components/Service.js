import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import styles from '../styles/Service.module.scss'

const Service = ({ services }) => {
    return (
        <div className={styles.container}>
            <h1 className={styles.title}>How can you use this platform?</h1>
            <h1 className={styles.subtitle}>You can use this platform for following purposes.</h1>
            <div className={styles.services}>
                {services.map((service, i) => (
                    <Link passHref key={i} href={`/features/${service.name}`}>
                        <div className={styles.service}>
                            <div className={styles.desc}>{service.desc}</div>
                            <span className={styles.cat}>{service.title}</span>
                            <div className={styles.media}>
                                {service.video && false ? (
                                    <video src={service.video} autoPlay loop className={styles.video} />
                                ) : (
                                    <Image className={styles.image} alt={service.title} src={`/images/${service.photo}`} width="350vmin" height="350vmin" />
                                )}
                            </div>
                        </div>
                    </Link>))}
            </div>
        </div>
    )
}

export default Service