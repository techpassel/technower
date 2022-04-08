import { faFacebookSquare, faInstagramSquare, faLinkedin, faTwitterSquare } from '@fortawesome/free-brands-svg-icons'
import { faArrowUpRightFromSquare, faCopyright, faEnvelope, faLocationDot, faPhoneSquare } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import styles from '../../styles/layout/Footer.module.scss'

const Footer = () => {
  return (
    <div className={styles.container}>
      <div className={styles.cardL}>
        <Link href="/">
          <a>
            <Image src="/images/Technower_name_logo.png" alt='Technower logo' width="210vmin" height="45vmin" />
          </a>
        </Link>
        <p>Have any question, query or doubt?</p>
        <div className={styles.linkTitle}>
          <Link href='/contact' passHref>
            <a>
              <span className={styles.linkText}>Contact Us</span>
              <FontAwesomeIcon icon={faArrowUpRightFromSquare} />
            </a>
          </Link>
        </div>
      </div>
      <div className={styles.cardS}>
        <div className={styles.cardItem} style={{ marginBottom: "2vmin" }}>
          <FontAwesomeIcon icon={faLocationDot} /> Aman Tech Park, First Floor, Sector 126, Noida, UP, India - 201301
        </div>
        <div className={styles.cardItem}>
          <FontAwesomeIcon icon={faEnvelope} /> contact@technower.com <br />
          <FontAwesomeIcon icon={faPhoneSquare} /> +91-65454643312
        </div>
      </div>
      <div className={styles.cardS}>
        <div className={styles.cardItem} style={{ marginBottom: "2vmin" }}>
          Follow us<br />
          <FontAwesomeIcon icon={faFacebookSquare} /> &nbsp;
          <FontAwesomeIcon icon={faTwitterSquare} /> &nbsp;
          <FontAwesomeIcon icon={faInstagramSquare} /> &nbsp;
          <FontAwesomeIcon icon={faLinkedin} />
        </div>
        <div className={styles.cardItem}>
          <FontAwesomeIcon icon={faCopyright} /> 2022 Technower <br />All rights reserved
        </div>
      </div>
    </div>
  )
}

export default Footer