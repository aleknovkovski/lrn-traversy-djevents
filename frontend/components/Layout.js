import Head from 'next/head'
import classes from "./Layout.module.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
export default function Layout({ title, keywords, description, children }) {
    return (
        <>
            <Head>
                <title>{title}</title>
                <meta name='description' content={description} />
                <meta name='keywords' content={keywords} />
            </Head>

            <Header />
            <div className={classes.container}>{children}</div>
            <Footer />
        </>
    )
}

Layout.defaultProps = {
    title: 'DJ Events | Find the hottest parties',
    description: 'Find the latest DJ and other musical events',
    keywords: 'music, dj, edm, events',
}