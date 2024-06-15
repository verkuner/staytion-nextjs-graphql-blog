import Head from "next/head";
import Image from "next/image";
import styles from "./layout.module.css";
import utilStyles from "@/src/styles/bloglist/utils.module.css";
import Link from "next/link";
import React, { ReactNode } from "react";

const name = "Staytion Blog";
export const siteTitle = "Staytion Blog Graphql App";

type Props = {
    children: ReactNode;
    home: boolean;
};

const Layout: React.FC<Props> = (props) => {
    return (
        <div className={styles.container}>
            <Head>
                <link rel="icon" href="/favicon.ico" />
                <meta name="description" content="Staytion Blog Next.js" />
                <meta
                    property="og:image"
                    content={`https://og-image.vercel.app/${encodeURI(
                        siteTitle
                    )}.png?theme=light&md=0&fontSize=75px&images=https%3A%2F%2Fassets.vercel.com%2Fimage%2Fupload%2Ffront%2Fassets%2Fdesign%2Fnextjs-black-logo.svg`}
                />
                <meta name="og:title" content={siteTitle} />
                <meta name="twitter:card" content="summary_large_image" />
            </Head>
            <header className={styles.header}>
                {props.home ? (
                    <>
                        <Image
                            priority
                            src="/coworker-banner.png"
                            className={utilStyles.borderCircle}
                            height={144}
                            width={650}
                            alt="emre"
                        />
                        <h1 className={utilStyles.heading2Xl}>{name}</h1>
                    </>
                ) : (
                    <>
                        <Link href="/">
                            <Image
                                priority
                                src="/coworker-banner.png"
                                className={utilStyles.borderCircle}
                                height={144}
                                width={650}
                                alt="emre"
                            />
                        </Link>
                        <h2 className={utilStyles.headingLg}>
                            <Link href="/blog" className={utilStyles.colorInherit}>
                                {name}
                            </Link>
                        </h2>
                    </>
                )}
            </header>
            <div>{props.children}</div>
            {!props.home && (
                <div className={styles.backToHome}>
                    <Link href="/">← Back to home</Link>
                </div>
            )}
        </div>
    );
}

export default Layout;