import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import styles from '../../styles/layout/Navbar.module.scss'
import logo from '../../public/images/Technower_name_logo.png'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCaretDown } from '@fortawesome/free-solid-svg-icons'

const Navbar = () => {
    return (
        <div className={styles.container}>
            <Link href="/">
                <a>
                    <Image quality={100} priority={true}src={logo} alt="Technower" width="160vmin" height="35vmin" />
                </a>
            </Link>
            <ul className={styles.list}>
                <li className={styles.listItem}>
                    <Link href="/"><a className={styles.listItemLink}>Home</a></Link>
                </li>
                <li className={styles.listItem}>
                    <Link href="/creation"><a className={styles.listItemLink}>Creation Zone</a></Link>
                </li>
                <li className={styles.dropdown}>
                    <span className={styles.dropdownTitle}>Resourses</span>
                    <FontAwesomeIcon icon={faCaretDown} />
                    <ul className={styles.dropdownMenu} id="sweets-dropdown">
                        <li className={styles.dropdownItem}>
                            <Link href="/categories"><a>Categories</a></Link>
                        </li>
                        <li className={styles.dropdownItem}>
                            <Link href="/blogs"><a>Blogs</a></Link>
                        </li>
                        <li className={styles.dropdownItem}>
                            <Link href="/courses"><a>Courses</a></Link>
                        </li>
                        <li className={styles.dropdownItem}>
                            <Link href="/technowers"><a>Technowers</a></Link>
                        </li>
                    </ul>
                </li>
                <li className={styles.dropdown}>
                    <span className={styles.dropdownTitle}>User</span>
                    <FontAwesomeIcon icon={faCaretDown} />
                    <ul className={styles.dropdownMenu} id="sweets-dropdown">
                        <li className={styles.dropdownItem}>
                            <Link href="/profile"><a>Profile</a></Link>
                        </li>
                        <li className={styles.dropdownItem}>
                            <Link href="/subscribed-categories"><a>Subscribed Categories</a></Link>
                        </li>
                        <li className={styles.dropdownItem}>
                            <Link href="/subscribed-blogs"><a>Subscribed Blogs</a></Link>
                        </li>
                        <li className={styles.dropdownItem}>
                            <Link href="/enrolled-courses"><a>Enrolled Courses</a></Link>
                        </li>
                        <li className={styles.dropdownItem}>
                            <Link href="/user-blogs"><a>Your Blogs</a></Link>
                        </li>
                        <li className={styles.dropdownItem}>
                            <Link href="/user-courses"><a>Your Courses</a></Link>
                        </li>
                    </ul>
                </li>
                <li className={styles.listItem}>
                    <Link href="/login" passHref>
                        <button className={styles.signinButton}>Sign In</button>
                    </Link>
                </li>
            </ul>
        </div>
    )
}

export default Navbar