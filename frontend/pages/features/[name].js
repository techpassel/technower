import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import { data } from '../../data';
import styles from '../../styles/Feature.module.scss';
import AppHead from '../../components/layout/AppHead'

const Feature = ({ feature }) => {
    return (
        <div className={styles.container}>
            <AppHead title="Features" description="Features of technower." />
            <div className={styles.cardL}>
                <div className={styles.imageCard}>
                    {feature.images.map(img => (
                        <div key={img.id} className={styles.imgContainer}>
                            {/* to use external images we need to set "images: { domains: ['images.pexels.com']}" 
                        in 'next.config.js' */}
                            <Image src={img.url}
                                className={styles.image}
                                alt={`img-${img.id}`}
                                width="100%"
                                height="100%"
                                objectFit="cover"
                                layout="responsive"
                            />
                        </div>
                    ))}
                </div>
            </div>
            <div className={styles.cardS}>
                <h1 className={styles.title}>{feature.title}</h1>
                <p className={styles.desc}>{feature.longDesc}</p>
                <button className={styles.button}>
                    <Link href="/contact">Contact</Link>
                </button>
            </div>
        </div>
    )
}
/*
   When exporting a function called getStaticPaths from a page that uses Dynamic Routes, 
   Next.js will statically pre-render all the paths specified by getStaticPaths.
   If fallback is false, then any paths not returned by getStaticPaths will result in a 404 page.
   For details check - https://nextjs.org/docs/api-reference/data-fetching/get-static-paths
*/
export const getStaticPaths = () => {
    const features = data;
    const paths = features.map((post) => ({ params: { name: post.name } }));

    return { paths, fallback: false };
}

export const getStaticProps = ({ params }) => {
    const name = params.name;
    const feature = data.filter((item) => item.name === name)[0];
    return {
        props: { feature },
    };
}

export default Feature;
