import Layout from '@/components/Layout'
import EventItem from '@/components/EventItem'
import { API_URL } from '@/config'

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

export async function getServerSideProps({ query: { page = 1 } }) {
    const PER_PAGE = 2

    // Fetch events
    const res = await fetch(`${API_URL}/events?populate=*&pagination[page]=${page}&pagination[pageSize]=${PER_PAGE}`)
    const events = await res.json()

    return {
        props: { events: events.data}
    }
}
