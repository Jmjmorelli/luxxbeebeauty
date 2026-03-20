"use client"

import { useEffect, useState } from "react"
import Link from 'next/link';



type NavItem = { label: string; href: string }

const items: NavItem[] = [
    { label: "Services", href: "/services" },
    { label: "Book", href: "/book" },
    { label: "About", href: "/about" },
    { label: "Contact", href: "/contact" },
]

export default function BottomSheetNav() {
    const [open, setOpen] = useState(false)

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
                        <Link className="sheetItem" href="/book">Book</Link>
                        <Link className="sheetItem" href="/about">About</Link>
                        <Link className="sheetItem" href="/contact`">Contact </Link>
                    </nav>
                </div>
            </div>

            {/* Fixed bottom button */}


            <div className="fabWrapper">
                <button className={`fab ${open ? "isOpen" : "isClose"}`} onClick={() => setOpen(true)}>Menu</button>
            </div>



        </>
    )
}
