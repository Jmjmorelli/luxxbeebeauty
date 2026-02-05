
import TopBarNav from "../components/TopBarNav"
import BottomSheetNav from "../components/BottomSheetNav"

export default function Services() {
  return (
    <div className="body-wrap boxed-container">
      {/* <TopBarNav /> */}
      <main>
        <div className="hero-bg"></div>

        <div className="servicesContainer">
          <p className="servicesPage">Lash Extensions</p>
          <p className="hero-paragraph-services"> Full Set - $85</p>
          <p className="hero-paragraph-services">Fill - $65</p>
          <p className="hero-paragraph-services"> Lash Lift - $40</p>
          <p className="hero-paragraph-services"> Lash Tint - $15</p>
        </div>

        <div className="servicesContainer">
          <p className="servicesPage">Eyebrows</p>
          <p className="hero-paragraph-services"> Eyebrow Waxing - $20</p>
          <p className="hero-paragraph-services"> Eyebrow (Razor) clean up - $10</p>
          <p className="hero-paragraph-services"> Eyebrow tint - $15</p>
          <p className="hero-paragraph-services"> Eyebrow mapping - $15</p>

        </div>
        <div className="servicesContainer">
          <p className="servicesPage">Waxing </p>
          <p className="hero-paragraph-services"> Underarms - $30</p>
          <p className="hero-paragraph-services"> Legs - $60</p>

        </div>
        <div className="servicesContainer">
          <p className="servicesPage">Hair</p>
          <p className="hero-paragraph-services"> Starter Locs - $150</p>
          <p className="hero-paragraph-services"> Retwist - $130 Style + $20</p>
          <p className="hero-paragraph-services"> Retwist - $130 Style + $20</p>
          <p className="hero-paragraph-services"> Flat Iron - $80</p>
          <p className="hero-paragraph-services"> Shampoo and Blow Dry - $30</p>
          <p className="hero-paragraph-services"></p>
          <p className="hero-paragraph-services"> </p>
          <p className="hero-paragraph-services"> </p>
          <p className="hero-paragraph-services"> </p>

        </div>

      </main>
            <BottomSheetNav />
      
    </div>
  )
}