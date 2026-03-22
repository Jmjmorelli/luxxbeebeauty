"use client"

import { useEffect, useState } from "react"
import { useCart } from "../context/cardContext";
import Link from 'next/link';

import styles from './shoppingCart.module.css'



type NavItem = { label: string; href: string }

const items: NavItem[] = [
    { label: "Services", href: "/services" },
    { label: "Book", href: "/book" },
    { label: "About", href: "/about" },
    { label: "Contact", href: "/contact" },
]

export default function BottomSheetNav() {



    const [open, setOpen] = useState(false)
    const { cart } = useCart();

    // Close on Escape
    useEffect(() => {
        function onKeyDown(e: KeyboardEvent) {
            if (e.key === "Escape") setOpen(false)
        }
        window.addEventListener("keydown", onKeyDown)
        return () => window.removeEventListener("keydown", onKeyDown)
    }, [])

    function goTo(hash: string) {
        setOpen(false)
        // Let the sheet start closing before scrolling
        setTimeout(() => {
            const el = document.querySelector(hash)
            el?.scrollIntoView({ behavior: "smooth", block: "start" })
        }, 50)
    }

    return (
        <>
            {/* Backdrop */}
            <div
                className={`sheetBackdrop ${open ? "isOpen" : ""} buttonFont`}
                onClick={() => setOpen(false)}
                aria-hidden={!open}
            />

            {/* Bottom sheet */}
            <div
                className={`bottomSheet ${open ? "isOpen" : ""}`}
                role="dialog"
                aria-modal="true"
                aria-label="Navigation menu"
            >
                <div className="sheetHandleRow">
                    {/* <div className="sheetHandle" /> */}
                    <button className="sheetClose" onClick={() => setOpen(false)} aria-label="Close menu">
                        ✕
                    </button>
                </div>

                <div className="sheetContent">
                    <h3 className="sheetTitle"></h3>
                    <nav className="sheetNav">
                        <Link className="sheetItem" href="/ ">Home</Link>
                        <Link className="sheetItem" href="/services">Services</Link>
                        <Link className="sheetItem" href="/policies">Policies</Link>
                        {/* <Link className="sheetItem" href="/about">About</Link> */}
                        {/* <Link className="sheetItem" href="/contact`">Contact </Link> */}
                    </nav>
                </div>
            </div>

            {/* Fixed bottom button */}


            <div className="fabWrapper">
                <button className={`fab ${open ? "isOpen" : "isClose"}`} onClick={() => setOpen(true)}>Menu</button>
            </div>

            {/* <div className={styles.fabWrapper2}>
                <button data-quantity={cart?.length} className={styles.btnCart}>
                    <svg className={styles.iconCart} viewBox="0 0 24.38 30.52" height="25.52" width="22.38" xmlns="http://www.w3.org/2000/svg">
                        <path transform="translate(-3.62 -0.85)" d="M28,27.3,26.24,7.51a.75.75,0,0,0-.76-.69h-3.7a6,6,0,0,0-12,0H6.13a.76.76,0,0,0-.76.69L3.62,27.3v.07a4.29,4.29,0,0,0,4.52,4H23.48a4.29,4.29,0,0,0,4.52-4ZM15.81,2.37a4.47,4.47,0,0,1,4.46,4.45H11.35a4.47,4.47,0,0,1,4.46-4.45Zm7.67,27.48H8.13a2.79,2.79,0,0,1-3-2.45L6.83,8.34h3V11a.76.76,0,0,0,1.52,0V8.34h8.92V11a.76.76,0,0,0,1.52,0V8.34h3L26.48,27.4a2.79,2.79,0,0,1-3,2.44Zm0,0"></path>
                    </svg>
                    <span className={styles.quantity}></span>
                </button>

            </div> */}




        </>
    )
}
