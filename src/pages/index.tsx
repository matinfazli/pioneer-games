import type { ReactNode } from 'react';
import clsx from 'clsx';
import Link from '@docusaurus/Link';
import Layout from '@theme/Layout';
import Heading from '@theme/Heading';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';

import styles from './index.module.css';
import HomepageFeatures from "@site/src/components/HomepageFeatures";

function HomepageHeader() {
    const {siteConfig} = useDocusaurusContext();
    return (
        <header className={clsx('hero hero--primary', styles.heroBanner)}>
            <div className="container">
                <img src="/img/background.png" alt="" />
            </div>
            <div className="container">
                <Heading as="h1" className="hero__title">Mass Strategy System</Heading>
                <p className="hero__subtitle">{siteConfig.tagline}</p>
                <div className={styles.buttons}>
                    <Link
                        className="button button--secondary button--lg"
                        to="/docs/intro">
                        Get Started
                    </Link>
                    <Link
                        className="button button--secondary button--lg"
                        href="https://fab.com/s/84dc1399c94d">
                        View on Fab
                    </Link>
                </div>
            </div>
        </header>
    );
}

export default function Home(): ReactNode {
    // const {siteConfig} = useDocusaurusContext();
    return (
        <Layout
            description="Description will go into a meta tag in <head />">
            <HomepageHeader/>
            <main>
                <HomepageFeatures />
            </main>
        </Layout>
    );
}
