import Image from "next/image";
import Logo from "./images/luxLogo.jpeg";
import Eyelash1 from "./images/eyelash1.jpeg"
import Eyelash2 from "./images/eyelash2.jpeg"
import Eyelash3 from "./images/eyelash3.jpeg"
import Eyelash4 from "./images/eyelash4.jpeg"
import Eyelash5 from "./images/eyelash5.jpeg"
import Eyelash6 from "./images/eyelash6.jpeg"
import Eyebrow1 from "./images/eyebrow1.jpeg"
import Eyebrow2 from "./images/eyebrow2.jpeg"
import Link from 'next/link';
import styles from "./page.module.css"
import BottomSheetNav from "./components/BottomSheetNav"
import { Geist, Geist_Mono, Inter, Instrument_Serif, Shadows_Into_Light } from "next/font/google";



export default function Home() {
	return (
		<div className='antialiased' suppressHydrationWarning>
			<div className="body-wrap boxed-container">
				<header className="site-header text-light">
					<div className="container">
						<div className="site-header-inner">
							<div className="brand header-brand">
								<h1 className="m-0">
									<a href="#">
										<Image className="header-logo-image" src={Logo} alt="Logo" width={100} height={100} />
									</a>
								</h1>
							</div>
						</div>
					</div>
				</header>

				<main>
					<section className="hero text-center text-light">
								<div className="hero-copy">
									<h1 className="hero-title mt-0 brand"> LuxxBeeBeauty</h1>
									{/* <h1 className="hero-title mt-0 brand"> Testing</h1> */}
									<p className="hero-paragraph"> Looking for a cosmetic upgrade? Browse below for amazing services.</p>
									<div className="hero-cta">
										<Link className="button button-primary button-wide-mobile" href="/services">BOOK APPOINTMENT NOW</Link>
									</div>
						</div>
					</section>
					<div className="mockup-container">
						<p className="services">Lashes</p>
					</div>

					<section className="gallery">
						<div className="container">
							<div className="grid">

								<div className="column-xs-12 column-md-4" style={{ width: '33%' }}>
									<figure className="img-container">
										<Image src={Eyelash1} alt="Logo" />
									</figure>
								</div>
								<div className="column-xs-12 column-md-6" style={{ width: '33%' }}>
									<figure className="img-container">
										<Image style={{ objectPosition: "center 35%" }} src={Eyelash6} alt="Logo" />
									</figure>
								</div>
								<div className="column-xs-12 column-md-6" style={{ width: '33%' }}>
									<figure className="img-container">
										<Image style={{ objectPosition: "center 60%" }} src={Eyelash3} alt="Logo" />
									</figure>
								</div>
								<div style={{ width: '50%' }}>
									<figure className="img-container" >
										<Image style={{ objectPosition: "center 65%", objectFit: "cover", }} src={Eyelash5} alt="Logo" />
									</figure>
								</div>
								<div className="column-xs-12 column-md-4" style={{ width: '50%' }}>
									<figure className="img-container"  >
										<Image style={{ objectPosition: "center 75%" }} src={Eyelash4} alt="Logo" />
									</figure>
								</div>

								<div className="column-xs-12" style={{ width: '100%' }}>
									<figure className="img-container">
										<Image style={{ objectPosition: "center 55%" }} src={Eyelash2} alt="Logo" />
									</figure>
								</div>
							</div>
						</div>
					</section>


					<div className="mockup-container">
						<p className="services">Eyebrows</p>
					</div>

					<section className="gallery">
						<div className="container">
							<div className="grid">

								<div className="column-xs-12 column-md-4" style={{ width: '50%' }}>
									<figure className="img-container">
										<Image src={Eyebrow1} alt="Logo" />
									</figure>
								</div>
								<div className="column-xs-12 column-md-4" style={{ width: '50%' }}>
									<figure className="img-container">
										<Image src={Eyebrow2} alt="Logo" />
									</figure>
								</div>
								
							</div>
						</div>
					</section>


					{/* MAIN CONTENT AREA */}
					{/* <section className="features-extended section">
						<div className="features-extended-inner section-inner">
							<div className="features-extended-wrap">
								<div className="container">
									<div className="feature-extended">
										<div className="feature-extended-image">
											<div className="imageStyle">
											<Image className="" src={Eyelash1} alt="Logo" width={150} height={150} />
											</div>
										</div>
										<div className="feature-extended-body is-revealing">
											<h3 className="mt-0 mb-16">Lashes</h3>
											<p className="m-0">Wake up your eyes effortlessly</p>
										</div>
									</div>
									<div className="feature-extended">
										<div className="feature-extended-image">
																						<div className="imageStyle">
											<Image className="" src={Eyebrow1} alt="Logo" width={150} height={150} />
											</div>

										</div>
										<div className="feature-extended-body is-revealing">
											<h3 className="mt-0 mb-16">Eyebrows</h3>
											<p className="m-0">Bring life back to your natural beauty</p>
										</div>
									</div>
									<div className="feature-extended">
										<div className="feature-extended-image">

										</div>
										<div className="feature-extended-body is-revealing">
											<h3 className="mt-0 mb-16">Waxing</h3>
											<p className="m-0">Polished skin, effortless glow</p>
										</div>
									</div>
									<div className="feature-extended">
										<div className="feature-extended-image">
										</div>
										<div className="feature-extended-body is-revealing">
											<h3 className="mt-0 mb-16">Flat Irons</h3>
											<p className="m-0">A polished finish for a refined look</p>
										</div>
									</div>
								</div>
							</div>
						</div>
						
					</section> */}
				</main>


			</div>

			<BottomSheetNav />
		</div>
	);
}
