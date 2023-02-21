import Layout from "@/components/Layout";
import {API_URL} from "@/config";

export default function HomePage(props) {
    console.log(props)
    return (
        <Layout title="The home page">
            <h1>Home Page</h1>
            <p>This is an app to find the latest DJ and other musical events</p>
            <p>Version: 1.0.0</p>
        </Layout>
    )
}

export async function getStaticProps() {
    const res = await fetch(`${API_URL}/api/events`)
    const events = await res.json()

    return {
        props: { events: events.slice(0, 3) },
        revalidate: 1,
    }
}