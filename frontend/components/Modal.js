import { useState, useEffect } from 'react'
import ReactDOM from 'react-dom'
import { FaTimes } from 'react-icons/fa'
import classes from './Modal.module.css'

export default function Modal({ show, onClose, children, title }) {
    const [isBrowser, setIsBrowser] = useState(false)

    useEffect(() => setIsBrowser(true),[])

    const handleClose = (e) => {
        e.preventDefault()
        onClose()
    }

    const modalContent = show ? (
        <div className={classes.overlay}>
            <div className={classes.modal}>
                <div className={classes.header}>
                    <a href='#' onClick={handleClose}>
                        <FaTimes />
                    </a>
                </div>
                {title && <div>{title}</div>}
                <div className={classes.body}>{children}</div>
            </div>
        </div>
    ) : null

    if (isBrowser) {
        return ReactDOM.createPortal(
            modalContent,
            document.getElementById('modal-root')
        )
    } else {
        return null
    }
}

// https://devrecipes.net/modal-component-with-next-js/