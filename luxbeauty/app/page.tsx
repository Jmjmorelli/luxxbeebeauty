import Image from "next/image";
import Logo from "./images/luxLogo.jpeg";
import Link from 'next/link';
import styles from "./page.module.css"
import BottomSheetNav from "./components/BottomSheetNav"
import { Geist, Geist_Mono, Inter, Instrument_Serif, Shadows_Into_Light} from "next/font/google";

	

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
						<div className="hero-bg"></div>
						<div className="hero-particles-container">
							<canvas id="hero-particles"></canvas>
						</div>
						<div className="container-sm">
							<div className="hero-inner">
								<div className="hero-copy">
											<h1 className="hero-title mt-0 brand"> LuxxBeeBeauty</h1>
									<p className="hero-paragraph"> Looking for a cosmetic upgrade? Browse below for amazing services.</p>
									<div className="hero-cta">
										<Link className="button button-primary button-wide-mobile" href="/bookings">BOOK APPOINTMENT NOW</Link>
									</div>
								</div>
								<div className="mockup-container">
									<p className="services">Services</p>
								</div>
							</div>
						</div>
					</section>


					{/* MAIN CONTENT AREA */}
					<section className="features-extended section">
						<div className="features-extended-inner section-inner">
							<div className="features-extended-wrap">
								<div className="container">
									<div className="feature-extended">
										<div className="feature-extended-image">
											<div className=""></div>
											{/* <div className="mockup-bg"> IMAGE HERE
										<img src="dist/images/iphone-feature-bg-01.svg" alt="iPhone Feature 01 illustration"/>
									</div>
									<img className="device-mockup is-revealing" src="dist/images/iphone-feature-01.png" alt="iPhone Feature 01"/> */}
										</div>
										<div className="feature-extended-body is-revealing">
											<h3 className="mt-0 mb-16">Lashes</h3>
											<p className="m-0">Quam quisque id diam vel quam elementum pulvinar. Ut etiam sit amet nisl purus in mollis nunc. Odio morbi quis commodo odio aenean sed adipiscing diam donec.</p>
										</div>
									</div>
									<div className="feature-extended">
										<div className="feature-extended-image">
											{/* <div className="mockup-bg">
										<img src="dist/images/iphone-feature-bg-02.svg" alt="iPhone Feature 02 illustration"/>
									</div>
									<img className="device-mockup is-revealing" src="dist/images/iphone-feature-02.png" alt="iPhone Feature 02"/> */}
										</div>
										<div className="feature-extended-body is-revealing">
											<h3 className="mt-0 mb-16">Eyebrows</h3>
											<p className="m-0">Quam quisque id diam vel quam elementum pulvinar. Ut etiam sit amet nisl purus in mollis nunc. Odio morbi quis commodo odio aenean sed adipiscing diam donec.</p>
										</div>
									</div>
									<div className="feature-extended">
										<div className="feature-extended-image">
											{/* <div className="mockup-bg">
										<img src="dist/images/iphone-feature-bg-03.svg" alt="iPhone Feature 03 illustration"/>
									</div>
									<img className="device-mockup is-revealing" src="dist/images/iphone-feature-03.png" alt="iPhone Feature 03"/> */}
										</div>
										<div className="feature-extended-body is-revealing">
											<h3 className="mt-0 mb-16">Waxing</h3>
											<p className="m-0">Quam quisque id diam vel quam elementum pulvinar. Ut etiam sit amet nisl purus in mollis nunc. Odio morbi quis commodo odio aenean sed adipiscing diam donec.</p>
										</div>
									</div>
									<div className="feature-extended">
										<div className="feature-extended-image">
											{/* <div className="mockup-bg">
										<img src="dist/images/iphone-feature-bg-04.svg" alt="iPhone Feature 04 illustration"/>
									</div>
									<img className="device-mockup is-revealing" src="dist/images/iphone-feature-04.png" alt="iPhone Feature 04"/> */}
										</div>
										<div className="feature-extended-body is-revealing">
											<h3 className="mt-0 mb-16">Flat Irons</h3>
											<p className="m-0">Quam quisque id diam vel quam elementum pulvinar. Ut etiam sit amet nisl purus in mollis nunc. Odio morbi quis commodo odio aenean sed adipiscing diam donec.</p>
										</div>
									</div>
								</div>
							</div>
						</div>
					</section>
				</main>

				<footer className="site-footer">
					<div className="footer-particles-container">
						<canvas id="footer-particles"></canvas>
					</div>
					<div className="site-footer-top">
						<section className="cta section text-light">
							<div className="container-sm">
								<div className="cta-inner section-inner">
									<div className="cta-header text-center">
										<h2 className="section-title mt-0">Stay in the know</h2>
										<p className="section-paragraph">Lorem ipsum is common placeholder text used to demonstrate the graphic elements of a document or visual presentation.</p>
										<div className="cta-cta">
											<a className="button button-primary button-wide-mobile" href="#">Get early access</a>
										</div>
									</div>
								</div>
							</div>
						</section>
					</div>
					<div className="site-footer-bottom">
						<div className="container">
							<div className="site-footer-inner">
								<div className="brand footer-brand">
									<a href="#">
										<Image src={Logo} width={50} alt="Logo" />
									</a>
								</div>
								<ul className="footer-links list-reset">
									<li>
										<a href="#">Contact</a>
									</li>
									<li>
										<a href="#">About us</a>
									</li>
									<li>
										<a href="#">FAQ's</a>
									</li>
									<li>
										<a href="#">Support</a>
									</li>
								</ul>
								<ul className="footer-social-links list-reset">
									<li>
										<a href="#">
											<span className="screen-reader-text">Facebook</span>
											<svg width="16" height="16" xmlns="http://www.w3.org/2000/svg">
												<path d="M6.023 16L6 9H3V6h3V4c0-2.7 1.672-4 4.08-4 1.153 0 2.144.086 2.433.124v2.821h-1.67c-1.31 0-1.563.623-1.563 1.536V6H13l-1 3H9.28v7H6.023z" fill="#FFF" />
											</svg>
										</a>
									</li>
									<li>
										<a href="#">
											<span className="screen-reader-text">Twitter</span>
											<svg width="16" height="16" xmlns="http://www.w3.org/2000/svg">
												<path d="M16 3c-.6.3-1.2.4-1.9.5.7-.4 1.2-1 1.4-1.8-.6.4-1.3.6-2.1.8-.6-.6-1.5-1-2.4-1-1.7 0-3.2 1.5-3.2 3.3 0 .3 0 .5.1.7-2.7-.1-5.2-1.4-6.8-3.4-.3.5-.4 1-.4 1.7 0 1.1.6 2.1 1.5 2.7-.5 0-1-.2-1.5-.4C.7 7.7 1.8 9 3.3 9.3c-.3.1-.6.1-.9.1-.2 0-.4 0-.6-.1.4 1.3 1.6 2.3 3.1 2.3-1.1.9-2.5 1.4-4.1 1.4H0c1.5.9 3.2 1.5 5 1.5 6 0 9.3-5 9.3-9.3v-.4C15 4.3 15.6 3.7 16 3z" fill="#FFF" />
											</svg>
										</a>
									</li>
									<li>
										<a href="#">
											<span className="screen-reader-text">Google</span>
											<svg width="16" height="16" xmlns="http://www.w3.org/2000/svg">
												<path d="M7.9 7v2.4H12c-.2 1-1.2 3-4 3-2.4 0-4.3-2-4.3-4.4 0-2.4 2-4.4 4.3-4.4 1.4 0 2.3.6 2.8 1.1l1.9-1.8C11.5 1.7 9.9 1 8 1 4.1 1 1 4.1 1 8s3.1 7 7 7c4 0 6.7-2.8 6.7-6.8 0-.5 0-.8-.1-1.2H7.9z" fill="#FFF" />
											</svg>
										</a>
									</li>
								</ul>
								<div className="footer-copyright">&copy; LuxxBeeBeauty 2026, all rights reserved</div>
							</div>
						</div>
					</div>
				</footer>
			</div>

			      <BottomSheetNav />
		</div>
	);
}
