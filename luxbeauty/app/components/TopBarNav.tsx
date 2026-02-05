
import Link from 'next/link';


export default function TopBarNav() {
    return (
        <>
            <div className="topBar">
                <div className="topBarContainer">
                    <div className="topBarContent">
                        <Link href="/" className="topBarItem">Home</Link>

                        {/* cart will maybe take to bookings?`` */}

                        <Link href='/bookings' className="topBarItem">Cart</Link> 
                        <Link href='/contact' className="topBarItem">Contact</Link>

                    </div>
                </div>



            </div>


        </>
    )
}