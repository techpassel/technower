import React from 'react'
import styles from '../styles/Intro.module.scss'
import sideImageOriginal from '../public/images/original.svg';
import Image from 'next/image'
import Circle from './Circle';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRight } from '@fortawesome/free-solid-svg-icons';
import Link from 'next/link';

const Intro = () => {
    return (
        <div className={styles.container}>
            <Circle backgroundColor="#16b800" width="90vmin" height="90vmin" opacity="0.5" top="-50vmin" left="-50vmin" />
            <Circle width="150vmin" height="150vmin" opacity="0.4" top="-29vmin" right="-87vmin" />
            <div className={styles.card}>
                <div className={styles.brandContainer}>
                    <div className={styles.title}>
                        <span className={styles.brand}>Technower </span>
                        <span className={styles.tagline}>- A Passel of Technophiles.</span>
                    </div>
                    <p className={styles.desc}>
                        Are you a knower of technology or wanna be the one? Join us and be the part of growing community of technowers.
                    </p>
                    <div>
                        <button className={styles.button}>
                            <Link href="/signup">
                                <a>Join<FontAwesomeIcon style={{ 'marginLeft': "5px" }} icon={faArrowRight} /></a>
                            </Link>
                        </button>
                    </div>
                </div>
            </div>
            <div className={styles.card}>
                <div className={styles.imageContainer}>
                    <Image quality={100} priority={true}src={sideImageOriginal} alt="Technower image" />
                </div>
            </div>
        </div>
    )
}

export default Intro;