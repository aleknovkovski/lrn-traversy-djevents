import Layout from '@/components/Layout'
import EventItem from '@/components/EventItem'
import { API_URL } from '@/config'
import qs from "qs";

export default function EventsPage({ events }) {
    return (
        <Layout>
            <h1>Events</h1>
            {events.length === 0 && <h3>No events to show</h3>}

            {events.map((evt) => (
                <EventItem key={evt.id} evt={evt.attributes} />
            ))}
        </Layout>
    )
}

export async function getServerSideProps({ query: { term } }) {
    const query = qs.stringify({
        filters: {
            $or: [
                { name: {$contains: term} },
                { performers: {$contains: term} },
                { description: {$contains: term} },
                { venue: {$contains: term} }
            ],
        },
    })


    const res = await fetch(`${API_URL}/events?${query}&populate=*`)
    const events = await res.json()

    return {
        props: { events: events.data }
    }
}
