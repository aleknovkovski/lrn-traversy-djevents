import { parseCookies } from '@/helpers'
import Layout from '@/components/Layout'
import { API_URL } from '@/config'
import classes from './Dashboard.module.css'
import DashboardEvent from "@/components/DashboardEvent";

export default function DashboardPage({ events }) {
    console.log(events)
    function deleteEvent(eventId) {
        console.log('to delete event with id: ' + eventId)
    }

    return (
        <Layout title='User Dashboard'>
            <div className={classes.dash}>
                <h1>Dashboard</h1>
                <h3>My Events</h3>

                {events.map((evt) => (
                    <DashboardEvent key={evt.id} evt={evt} handleDelete={deleteEvent} />
                ))}
            </div>
        </Layout>
    )
}

export async function getServerSideProps({ req }) {
    const { token } = parseCookies(req)

    const res = await fetch(`${API_URL}/myevents`, {
        method: 'GET',
        headers: {
            Authorization: `Bearer ${token}`,
        },
    })

    const events = await res.json()
    console.log(events)
    return {
        props: {
            events,
        },
    }
}
