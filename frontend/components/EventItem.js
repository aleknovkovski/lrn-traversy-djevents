import Link from 'next/link'
import Image from 'next/image'
import classes from './EventItem.module.css'

export default function EventItem({ evt }) {
    return (
        <div className={classes.event}>
            <div className={classes.img}>
                <Image
                    src={evt.image ? evt.image.data.attributes.formats.thumbnail.url : '/images/event-default.png'}
                    width={170}
                    height={100}
                    alt={evt.name}
                />
            </div>

            <div className={classes.info}>
        <span>
{new Date(evt.date).toLocaleDateString('en-US')} at {evt.time}
        </span>
                <h3>{evt.name}</h3>
            </div>

            <div className={classes.link}>
                <Link href={`/events/${evt.slug}`} className='btn'>
                    Details
                </Link>
            </div>
        </div>
    )
}
