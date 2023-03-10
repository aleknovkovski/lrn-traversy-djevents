import { parseCookies } from '@/helpers'
import Layout from '@/components/Layout'
import { API_URL } from '@/config'
import classes from './Dashboard.module.css'
import DashboardEvent from "@/components/DashboardEvent";
import {toast} from "react-toastify";
import {useRouter} from "next/router";

export default function DashboardPage({events, token}) {

    const router = useRouter()

    async function deleteEvent(eventId) {
        if (confirm('Are you sure?')) {
            const res = await fetch(`${API_URL}/events/${eventId}`, {
                method: 'DELETE',
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            })

            const data = await res.json()

            if (!res.ok) {
                toast.error(data.message)
            } else {
                router.reload()
            }
        }
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

    return {
        props: {
            events,
            token
        },
    }
}
