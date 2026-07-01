"use client";
import Image from "next/image";
import TopBarNav from "../components/TopBarNav"
import BottomSheetNav from "../components/BottomSheetNav"
import lashlift1 from "../images/lashlift1.jpeg"
import lashlift2 from "../images/lashlift2.jpeg"
import fullSet1 from "../images/fullSet1.jpeg"
import pageCSS from "./page.module.css"
import servicesCSS from "./services.module.css"
import { BiMinusCircle } from "react-icons/bi";

import { useRouter } from "next/router";

import { useState } from "react";
import { useCart } from "../context/cartContext";

import Link from 'next/link';



const services = [
  {

    category: "Lashes",
    items: [
      { id: "wet-set", name: "Wet Set", price: 85, description: "A more dramatic look, with a glossy finish", duration: 180 },
      { id: "hybrid-set", name: "Hybrid Set", price: 85, description: "A mix of classic and volume lashes for full and dramatic look", duration: 180 },
      { id: "light-volume-set", name: "Light Volume Set", price: 85, description: "2 or 3 lash extension per natural lash for a subtle enhancement", duration: 180 },
      { id: "volume-set", name: "Volume Set", price: 85, description: "4 or 5 lash extension per natural lash for a voluminous look", duration: 180 },
      { id: "mega-volume-set", name: "Mega Volume Set", price: 85, description: "6 or more lash extension per natural lash for an extremely voluminous look ", duration: 180 },
      { id: "wispy-volume-set", name: "Wispy Volume Set", price: 85, description: "4 or 5 lash extension per natural lash for a spiky look", duration: 180 },
      { id: "full-set", name: "Classic Set", price: 85, description: "1 lash extension per natural lash", duration: 180 },
      { id: "fill", name: "Fill", price: 65, description: "Refill and refresh existing lashes", duration: 120 },
      { id: "lash-lift", name: "Lash Lift", price: 40, description: "Natural lash curl enhancement", duration: 30 },
      { id: "lash-tint", name: "Lash Tint", price: 15, description: "Darkens lashes for fuller look", duration: 30 },
    ]
  },
  {
    category: "Brows",
    items: [
      { id: "brow-wax", name: "Eyebrow Waxing", price: 20, description: "Shapes and cleans brow area", duration: 30 },
      { id: "brow-razor", name: "Eyebrow Razor Clean Up", price: 10, description: "Quick brow touch-up cleanup", duration: 30 },
      { id: "brow-tint", name: "Eyebrow Tint", price: 15, description: "Darkens brows for fuller look", duration: 30 },
      { id: "brow-mapping", name: "Eyebrow Mapping", price: 15, description: "Precision brow shaping guide", duration: 30 },

    ]
  },
  {
    category: "Waxing",
    items: [
      { id: "underarms", name: "Underarms", price: 30, description: "Removes underarm hair smoothly", duration: 30 },
      { id: "legs", name: "Legs", price: 60, description: "Full leg hair removal service", duration: 60 }, // TODO: ask how long max;  put 1 hour for the moment
    ]
  },
  {
    category: "Locs",
    items: [
      { id: "starter-locs", name: "Starter Locs", price: 150, description: "Begin your loc journey", duration: 180 },
      { id: "retwist", name: "Retwist ", price: 125, description: "Maintain existing locs", duration: 120 },
      { id: "style", name: "Style ADD ON", price: 25, description: "Style existing locs", duration: 60 },
      { id: "half-head-locs", name: "Half a Head Locs (Retwist)", price: 100, description: "Maintain existing locs", duration: 90 },
      { id: "half-head-style", name: "Style ADD ON", price: 20, description: "Style existing locks (half head)", duration: 60 },
      { id: "flat-top", name: "Flat Top Retwist", price: 80, description: "Style existing locks", duration: 60 },
    ]
  },
  {
    category: "Hair",
    items: [
      { id: "flat-iron", name: "Flat Iron", price: 80, description: "Smooth and straighten hair finish", duration: 60 },
      { id: "shampoo-blowdry", name: "Shampoo and Blow Dry", price: 30, description: "Cleanse and styled blowout", duration: 30 },
      { id: "deep-conditioning", name: "Deep Conditioning", price: 20, description: "Deep Conditioning", duration: 30 },
    ]
  },
  {
    category: "Natural Styles",
    items: [
      { id: "two-strand-small", name: "Two Strand Small Twists", price: 150, description: "A natural two strand style (Small)", duration: 120 },
      { id: "two-strand-medium", name: "Two Strand Medium Twists", price: 150, description: "A natural two strand style (Medium)", duration: 120 },
      { id: "two-strand-large", name: "Two Strand Large Twists", price: 150, description: "A natural two strand style (Large)", duration: 120 },]
  }
];




export default function Services() {

  // const router = useRouter() // used for cleaner redirects as buttons

  const { cart } = useCart();
  const { addToCart } = useCart();
  const { removeFromCart } = useCart();
  const { clearCart } = useCart();
  const { checkCart } = useCart();

  const exists = cart.length > 0;


  const totalPrice = cart.reduce(
    (total, service) => total + service.price,
    0
  );

  const totalDuration = cart.reduce(
    (total, service) => total + service.duration,
    0
  );


  return (
    <div className="body-wrap boxed-container">
      <main>

        <div className={pageCSS.appointmentPage}>
          <div className={servicesCSS.servicesPage}>

            {services.map((category) => (
              <div key={category.category}>
                <h2>{category.category}</h2>

                {category.items.map((item) => {
                  const exists = cart.some((cartItem) => cartItem.id === item.id);

                  return (
                    <div key={item.id} className={servicesCSS.servicesContainer}>
                      <div>
                        <div className={servicesCSS.textContent}>
                          <p
                            style={{ fontWeight: "bold" }}
                            className={servicesCSS.heroParagraphServices}
                          >
                            {item.name} - ${item.price}
                          </p>

                          <p className={servicesCSS.heroParagraphServices}>
                            {item.description}
                          </p>
                        </div>

                        <div style={{ display: "flex", justifyContent: "center", width: "8rem" }}
                          onClick={() =>
                            exists ? removeFromCart(item.id) : addToCart(item)
                          }
                          className={exists ? servicesCSS.removeBtn : servicesCSS.addBtn}
                        >
                          {exists ? "Remove Service" : "Add Service"}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>

            ))}
          </div>


          <div className={pageCSS.cartContainer}>
            {exists &&
              <h2 className={pageCSS.cartTitle}>Selected Services</h2>
            }

            {exists &&
              <table className={pageCSS.cartTable}>
                <thead>
                  <tr>
                    <th>Service</th>
                    <th>Duration</th>
                    <th>Price</th>
                    <th></th>
                  </tr>
                </thead>

                <tbody>
                  {cart.map((service) => (
                    <tr key={service.id}>
                      <td>
                        <p className={pageCSS.serviceName}>{service.name}</p>
                      </td>

                      <td style={{ paddingLeft: "1rem" }}>{service.duration} min</td>
                      <td style={{ paddingLeft: "1rem" }}>${service.price}</td>

                      <td>
                        <BiMinusCircle onClick={() => removeFromCart(service.id)} className={pageCSS.removeButton} />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            }
            {exists ?
              <div className={pageCSS.cartSummary}>
                <p>Total Duration: {totalDuration} min</p>
                <p>Total: ${totalPrice}</p>
              </div>
              :
              <div></div>
            }


            {exists ?

              <div className={servicesCSS.checkoutButton} style={{ display: "flex", marginTop: "1rem", justifyContent: "center", padding: "1rem" }}>
                <Link href="/services/book" className={pageCSS.bookBtn} style={{ pointerEvents: "auto", color: "rgb(198, 153, 134)", width: "auto", fontWeight: "bold" }}>
                  Book Now
                </Link>
              </div>

              : <h5 style={{ display: "flex", marginTop: "1rem", justifyContent: "center", padding: "1rem" }}>Cart is empty {":("} </h5>
            }


          </div>

          <div style={{ marginTop: "1rem", marginBottom: "1rem" }}>
            *Please see my policies if this is your first time booking!
          </div>

          <div style={{ marginTop: "1rem", marginBottom: "1rem" }}>
            *Durations are estimated
          </div>



        </div>
      </main>
      <BottomSheetNav />

    </div>
  )
}