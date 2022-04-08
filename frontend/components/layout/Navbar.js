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
                    <Image src={logo} alt="Technower" width="160vmin" height="35vmin" />
                </a>
            </Link>
            <ul className={styles.list}>
                <li className={styles.listItem}>
                    <Link href="/"><a className={styles.listItemLink}>Home</a></Link>
                </li>
                <li className={styles.listItem}>
                    <Link href="/about"><a className={styles.listItemLink}>About</a></Link>
                </li>
                <li className={styles.listItem}>
                    <Link href="/blogs"><a className={styles.listItemLink}>Blogs</a></Link>
                </li>
                <li className={styles.dropdown}>
                    <span className={styles.dropdownTitle}>Category</span>
                    <FontAwesomeIcon icon={faCaretDown} />
                    <ul className={styles.dropdownMenu} id="sweets-dropdown">
                        <li className={styles.dropdownItem}><a href="#">Donuts</a></li>
                        <li className={styles.dropdownItem}><a href="#">Cupcakes</a></li>
                        <li className={styles.dropdownItem}><a href="#">Chocolate</a></li>
                        <li className={styles.dropdownItem}><a href="#">Bonbons</a></li>
                    </ul>
                </li>
                <li className={styles.listItem}>
                    <Link href="/contact" passHref>
                        <button className={styles.signinButton}>Sign In</button>
                    </Link>
                </li>
            </ul>
        </div>
    )
}

export default Navbar