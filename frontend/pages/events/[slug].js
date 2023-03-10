import Layout from "@/components/Layout";
import {API_URL} from "@/config";
import classes from './[slug].module.css'
import Link from "next/link";
import Image from 'next/image'
import {FaPencilAlt, FaTimes} from "react-icons/fa";
import {toast} from "react-toastify";
import {useRouter} from "next/router";

export default function EventPage({ evt }) {

    const router = useRouter()
    const deleteEvent = async (e) => {
        if (confirm('Are you sure?')) {
            const res = await fetch(`${API_URL}/events/${evt.id}`, {
                method: 'DELETE',
            })

            const data = await res.json()

            if (!res.ok) {
                toast.error(data.message)
            } else {
                router.push('/events')
            }
        }
    }
    console.log(evt)
    return (
        <Layout>
            <div className={classes.event}>
                <div className={classes.controls}>
                    <Link href={`/events/edit/${evt.id}`}>
                            <FaPencilAlt /> Edit Event

                    </Link>
                    <a href='#' className={classes.delete} onClick={deleteEvent}>
                        <FaTimes /> Delete Event
                    </a>
                </div>

                <span>
          {evt.date} at {evt.time}
        </span>
                <h1>{evt.name}</h1>
                {evt.image.data && (
                    <div className={classes.image}>
                        <Image src={evt.image.data.attributes.formats.medium.url} width={960} height={600}  alt={evt.name}/>
                    </div>
                )}

                <h3>Performers:</h3>
                <p>{evt.performers}</p>
                <h3>Description:</h3>
                <p>{evt.description}</p>
                <h3>Venue: {evt.venue}</h3>
                <p>{evt.address}</p>

                <Link href='/events' className={classes.back}>
                    {'<'} Go Back
                </Link>
            </div>
        </Layout>
    )
}

export async function getStaticPaths() {
    const res = await fetch(`${API_URL}/events`)
    const events = await res.json()
    console.log(events)
    const paths = events.data.map((evt) => ({
        params: { slug: evt.attributes.slug },
    }))

    return {
        paths,
        fallback: true,
    }
}

export async function getStaticProps({ params: { slug } }) {
    console.log(slug)
    const res = await fetch(`${API_URL}/events/?filters[slug]=${slug}&populate=*`)
    const events = await res.json()

    return {
        props: {
            evt: {...events.data[0].attributes, id: events.data[0].id},
        },
        revalidate: 1,
    }
}