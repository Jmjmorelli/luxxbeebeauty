"use client";
import Image from "next/image";
import TopBarNav from "../components/TopBarNav"
import BottomSheetNav from "../components/BottomSheetNav"
import lashlift1 from "../images/lashlift1.jpeg"
import lashlift2 from "../images/lashlift2.jpeg"
import fullSet1 from "../images/fullSet1.jpeg"
import styles from "./page.module.css"

import { useState } from "react";
import { useCart } from "../context/cardContext";

import Link from 'next/link';



const services = [
  {

    category: "Lashes",
    items: [
      { id: "wet-set", name: "Wet Set", price: 85, description: "TBD" },
      { id: "hybrid-set", name: "Hybrid Set", price: 85, description: "TBD" },
      { id: "light-volume-set", name: "Light Volume Set", price: 85, description: "TBD" },
      { id: "volume-set", name: "Volume Set", price: 85, description: "TBD" },
      { id: "mega-volume-set", name: "Mega Volume Set", price: 85, description: "TBD" },
      { id: "wispy-volume-set", name: "Wispy Volume Set", price: 85, description: "TBD" },
      { id: "full-set", name: "Full Set", price: 85, description: "TBD" },
      { id: "fill", name: "Fill", price: 65, description: "Refill and refresh existing lashes" },
      { id: "lash-lift", name: "Lash Lift", price: 40, description: "Natural lash curl enhancement" },
      { id: "lash-tint", name: "Lash Tint", price: 15, description: "Darkens lashes for fuller look" },
    ]
  },
  {
    category: "Brows",
    items: [
      { id: "brow-wax", name: "Eyebrow Waxing", price: 20, description: "Shapes and cleans brow area" },
      { id: "brow-razor", name: "Eyebrow Razor Clean Up", price: 10, description: "Quick brow touch-up cleanup" },
      { id: "brow-tint", name: "Eyebrow Tint", price: 15, description: "Darkens brows for fuller look" },
      { id: "brow-mapping", name: "Eyebrow Mapping", price: 15, description: "Precision brow shaping guide" },

    ]
  },
  {
    category: "Waxing",
    items: [
      { id: "underarms", name: "Underarms", price: 30, description: "Removes underarm hair smoothly" },
      { id: "legs", name: "Legs", price: 60, description: "Full leg hair removal service" },
    ]
  },
  {
    category: "Hair",
    items: [
      { id: "starter-locs", name: "Starter Locs", price: 150, description: "Begin your loc journey" },
      { id: "retwist", name: "Retwist + Style", price: 150, description: "Maintain and style existing locs" },
      { id: "flat-iron", name: "Flat Iron", price: 80, description: "Smooth and straighten hair finish" },
      { id: "shampoo-blowdry", name: "Shampoo and Blow Dry", price: 30, description: "Cleanse and styled blowout" },]
  }
];




export default function Services() {


  const { cart } = useCart();
  const { addToCart } = useCart();
  const { removeFromCart } = useCart();
  const { clearCart } = useCart();


  const exists = cart.length > 0;


  return (
    <div className="body-wrap boxed-container">
      <main>


        <div className={styles.card}>
          <div className={styles.cardImage}></div>
          <p className={styles.cardTitle}>LuxxBeeBeauty - 1930 Pennsylvania Ave, ste B</p>
          <div className={styles.info}>

            <p className={styles.cardBody}>Tuesday -  Saturday (9 AM - 6 PM)</p>
            <p className={styles.cardBody}>

            </p>

          </div>
          <div className={styles.socials}>

            <svg viewBox="0 0 24 24" width="24" height="24" fill="none" xmlns="http://www.w3.org/2000/svg" stroke="#e100ff"><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g><g id="SVGRepo_iconCarrier"> <path fillRule="evenodd" clipRule="evenodd" d="M12 18C15.3137 18 18 15.3137 18 12C18 8.68629 15.3137 6 12 6C8.68629 6 6 8.68629 6 12C6 15.3137 8.68629 18 12 18ZM12 16C14.2091 16 16 14.2091 16 12C16 9.79086 14.2091 8 12 8C9.79086 8 8 9.79086 8 12C8 14.2091 9.79086 16 12 16Z" fill="#ffffff"></path> <path d="M18 5C17.4477 5 17 5.44772 17 6C17 6.55228 17.4477 7 18 7C18.5523 7 19 6.55228 19 6C19 5.44772 18.5523 5 18 5Z" fill="#ffffff"></path> <path fillRule="evenodd" clipRule="evenodd" d="M1.65396 4.27606C1 5.55953 1 7.23969 1 10.6V13.4C1 16.7603 1 18.4405 1.65396 19.7239C2.2292 20.8529 3.14708 21.7708 4.27606 22.346C5.55953 23 7.23969 23 10.6 23H13.4C16.7603 23 18.4405 23 19.7239 22.346C20.8529 21.7708 21.7708 20.8529 22.346 19.7239C23 18.4405 23 16.7603 23 13.4V10.6C23 7.23969 23 5.55953 22.346 4.27606C21.7708 3.14708 20.8529 2.2292 19.7239 1.65396C18.4405 1 16.7603 1 13.4 1H10.6C7.23969 1 5.55953 1 4.27606 1.65396C3.14708 2.2292 2.2292 3.14708 1.65396 4.27606ZM13.4 3H10.6C8.88684 3 7.72225 3.00156 6.82208 3.0751C5.94524 3.14674 5.49684 3.27659 5.18404 3.43597C4.43139 3.81947 3.81947 4.43139 3.43597 5.18404C3.27659 5.49684 3.14674 5.94524 3.0751 6.82208C3.00156 7.72225 3 8.88684 3 10.6V13.4C3 15.1132 3.00156 16.2777 3.0751 17.1779C3.14674 18.0548 3.27659 18.5032 3.43597 18.816C3.81947 19.5686 4.43139 20.1805 5.18404 20.564C5.49684 20.7234 5.94524 20.8533 6.82208 20.9249C7.72225 20.9984 8.88684 21 10.6 21H13.4C15.1132 21 16.2777 20.9984 17.1779 20.9249C18.0548 20.8533 18.5032 20.7234 18.816 20.564C19.5686 20.1805 20.1805 19.5686 20.564 18.816C20.7234 18.5032 20.8533 18.0548 20.9249 17.1779C20.9984 16.2777 21 15.1132 21 13.4V10.6C21 8.88684 20.9984 7.72225 20.9249 6.82208C20.8533 5.94524 20.7234 5.49684 20.564 5.18404C20.1805 4.43139 19.5686 3.81947 18.816 3.43597C18.5032 3.27659 18.0548 3.14674 17.1779 3.0751C16.2777 3.00156 15.1132 3 13.4 3Z" fill="#ffffff"></path> </g></svg>
            <a href="https://www.instagram.com/luxxbeebeauty/">@luxxbeebeauty</a>
          </div>

          <div className={styles.socials}>
            <svg viewBox="0 0 24 24" width="24" height="24" fill="none" xmlns="http://www.w3.org/2000/svg" stroke="#006af5"><g id="SVGRepo_bgCarrier" strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g><g id="SVGRepo_iconCarrier"> <path fillRule="evenodd" clipRule="evenodd" d="M20 1C21.6569 1 23 2.34315 23 4V20C23 21.6569 21.6569 23 20 23H4C2.34315 23 1 21.6569 1 20V4C1 2.34315 2.34315 1 4 1H20ZM20 3C20.5523 3 21 3.44772 21 4V20C21 20.5523 20.5523 21 20 21H15V13.9999H17.0762C17.5066 13.9999 17.8887 13.7245 18.0249 13.3161L18.4679 11.9871C18.6298 11.5014 18.2683 10.9999 17.7564 10.9999H15V8.99992C15 8.49992 15.5 7.99992 16 7.99992H18C18.5523 7.99992 19 7.5522 19 6.99992V6.31393C19 5.99091 18.7937 5.7013 18.4813 5.61887C17.1705 5.27295 16 5.27295 16 5.27295C13.5 5.27295 12 6.99992 12 8.49992V10.9999H10C9.44772 10.9999 9 11.4476 9 11.9999V12.9999C9 13.5522 9.44771 13.9999 10 13.9999H12V21H4C3.44772 21 3 20.5523 3 20V4C3 3.44772 3.44772 3 4 3H20Z" fill="#009dff"></path> </g></svg>
            <a href="https://www.facebook.com/p/Erykah-Pope-100076393427307/">@luxxbeebeauty</a>

          </div>
          <p className={styles.footer}>Last Updated <span className={styles.byName}>LuxxBeeBeauty</span> on <span className="date">3/19/26</span></p>
        </div>

        <div className={styles.appointmentPage}>

          {services.map((category) => (
            <div key={category.category}>
              <h2>{category.category}</h2>

              {category.items.map((item) => {
                const exists = cart.some((cartItem) => cartItem.id === item.id);

                return (
                  <div key={item.id} className={styles.servicesContainer}>
                    <div>
                      <div className={styles.textContent}>
                        <p
                          style={{ fontWeight: "bold" }}
                          className={styles.heroParagraphServices}
                        >
                          {item.name} - ${item.price}
                        </p>

                        <p className={styles.heroParagraphServices}>
                          {item.description}
                        </p>
                      </div>

                      <button
                        onClick={() =>
                          exists ? removeFromCart(item.id) : addToCart(item)
                        }
                        className={exists ? styles.removeBtn : styles.addBtn}
                      >
                        {exists ? "Remove Service" : "Add Service"}
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>

          ))}



          {exists ? <button style={{ marginTop: "1rem" }} className={styles.btn} onClick={() =>
            clearCart()
          }
          >
            Clear cart
          </button>
            : <h5 style={{ marginTop: "1rem" }}>Cart is empty</h5>}

          <div style={{ marginTop: "1rem", marginBottom: "1rem" }}>
            *Please see my policies if this is your first time booking! Thank you!
          </div>

          <div className={styles.bookBtn}>
            <button style={{ display: "flex", justifyContent: "center", width: "100%", borderRadius: "50px" }} className={styles.btn}><Link  href="/services/book">Book Now</Link></button>
            

          </div>

        </div>
      </main>
      <BottomSheetNav />

    </div>
  )
}