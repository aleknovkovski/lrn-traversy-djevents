import Link from 'next/link'
import classes from './Header.module.css'
import Search from "@/components/Search";
import {FaSignInAlt} from "react-icons/fa";

export default function Header() {
    return (
        <header className={classes.header}>
            <div className={classes.logo}>
                <Link href='/'>
                    DJ Events
                </Link>
            </div>
            <Search />
            <nav>
                <ul>
                    <li>
                        <Link href='/events'>
                            Events
                        </Link>
                    </li>
                    <li>
                        <Link href='/events/add'>
                            Add Event
                        </Link>
                    </li>
                    <li>
                        <Link href='/account/login' className='btn-secondary btn-icon'>
                                <FaSignInAlt /> Login
                        </Link>
                    </li>
                </ul>
            </nav>
        </header>
    )
}
