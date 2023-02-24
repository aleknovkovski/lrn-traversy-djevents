import Link from 'next/link'
import classes from './Header.module.css'
import Search from "@/components/Search";

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
                </ul>
            </nav>
        </header>
    )
}
