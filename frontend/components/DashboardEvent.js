import Link from 'next/link'
import {FaPencilAlt, FaTimes} from 'react-icons/fa'
import classes from './DashboardEvent.module.css'

export default function DashboardEvent({evt, handleDelete}) {
    return (
        <div className={classes.event}>
            <h4>
                <Link href={`/events/${evt.slug}`}>
                    {evt.name}
                </Link>
            </h4>
            <Link href={`/events/edit/${evt.id}`} className={classes.edit}>
                <FaPencilAlt/> <span>Edit Event</span>
            </Link>
            <a
                href='#'
                className={classes.delete}
                onClick={() => handleDelete(evt.id)}
            >
                <FaTimes/> <span>Delete</span>
            </a>
        </div>
    )
}