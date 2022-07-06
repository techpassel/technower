import React from 'react';
import AppHead from './layout/AppHead';
import styles from '../styles/FormPageLayout.module.scss';
import Circle from './Circle';
import Image from 'next/image';

const FormPageLayout = ({ children, image={image}, pageTitle={title} }) => {
    //Here variable name for child element as "children" is important.
    //If you take some other name then you will get error.  
    return (
        <div className={styles.container}>
            <AppHead title={pageTitle} description={`${pageTitle} of technower.`} />
            <div className={styles.cardImage}>
                <Circle left="-60vh" opacity="0.4" />
                <div className={styles.imageContainer}>
                    <Image src={image} alt="contact" className={styles.image} />
                </div>
            </div>
            <div className={styles.cardForm}>
                <div className={styles.innerContainer}>
                    {children}
                </div>
            </div>
        </div>
    )
}

export default FormPageLayout