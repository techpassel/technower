import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Image from 'next/image'
import React from 'react'
import styles from '../styles/Blogs.module.scss'
import { faArrowRight } from '@fortawesome/free-solid-svg-icons';
import moment from 'moment';

const blogs = () => {
    let postDate = new Date();
    let showSubCategory = false;
    return (
        <div className={styles.container}>
            <div className={styles.innerContainer}>
                {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(e => (
                    <div key={e} className={styles.card}>
                        <div>
                            <Image src="https://source.unsplash.com/600x400/?computer" alt="card__image" width="600" height='400' objectFit='cover' />
                        </div>
                        <div className={styles.cardBody}>
                            <div>
                                <div>
                                    <span className={styles.category}>Technology</span>
                                    <span>
                                        <span><FontAwesomeIcon style={{ 'marginLeft': "5px" }} icon={faArrowRight} />&nbsp; </span>
                                        <span className={styles.subcategory}>Java</span>
                                    </span>
                                </div>
                                <div className={styles.datetime}>{moment(postDate).format('MMMM Do YYYY, h:mm:ss a')}</div>
                            </div>
                            <span className={styles.blogTitle}>What is new in 2022 Tech</span>
                            <span>Lorem ipsum dolor sit amet consectetur adipisicing elit. Sequi perferendis molestiae non nemo doloribus. Doloremque, nihil! At ea atque quidem!</span>
                        </div>
                        <div className={styles.cardFooter}>
                            <div className={styles.user}>
                                <Image className={styles.userImage} alt="Avator" src={`/images/avatar.png`} width="60" height="60" objectFit="cover" />
                                <div className={styles.userInfo}>
                                    <div>
                                        <span>Jane Doe</span><br />
                                        <span className={styles.small}>UI Designer(ABC Technologies Pvt. Ltd.)</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default blogs