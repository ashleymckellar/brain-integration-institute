

import { Link } from 'react-router-dom';
import brainSeal from '../assets/icons/BrainIntegrationSeal.png';
import map from '../assets/icons/map-pin.png';
import phone from '../assets/icons/phone.png';
import mail from '../assets/icons/mail.png';

export const Footer = () => {
    return (
        <>
            <div className="flex flex-col lg:flex-row justify-between p-5 lg:p-20 mt-20 bg-background-tan">
                {/* Logo Section */}
                <div className="flex justify-center lg:justify-start mb-10 lg:mb-0 py-10 px-10">
                    <img
                        src={brainSeal}
                        alt="Brain Integration Institute"
                        width="134"
                        height="134"
                        className="w-32 sm:w-40 md:w-48 lg:w-56 xl:w-64" 
                    />
                </div>

                {/* Links Section - Center justify on small screens */}
                <div className="flex flex-col lg:flex-row gap-5 lg:gap-10 mb-10 lg:mb-0 justify-center lg:justify-start w-full">
                    <div className="links flex flex-col gap-5 text-center lg:text-left">
                        <Link className="link font-fira font-bold" to="/">
                            Home
                        </Link>
                        <Link className="link font-fira font-bold" to="/about">
                            About Us
                        </Link>
                        <Link
                            className="link font-fira font-bold"
                            to="/practitioner"
                        >
                            Find Practitioner
                        </Link>
                    </div>

                    <div className="links flex flex-col gap-5 text-center lg:text-left">
                        <Link
                            className="link font-fira font-bold"
                            to="/certification"
                        >
                            Certification
                        </Link>
                        <Link className="link font-fira font-bold" to="/">
                            FAQ
                        </Link>
                        <Link className="link font-fira font-bold" to="/">
                            Resources
                        </Link>
                        <Link className="link font-fira font-bold" to="/terms">
                            Terms of Use
                        </Link>
                    </div>
                </div>

                {/* Contact Info Section */}
                <div className="contact-info flex flex-col text-center gap-5 mb-10 pt-10 lg:mb-0">
                    <h3 className="font-fira text-xl font-bold">Contact Us</h3>
                    <div className="flex gap-5 text-center justify-center">
                        <img src={map} alt="map pin" />
                        West Jordan & Midvale, UT
                    </div>
                    <div className="flex gap-5 justify-center">
                        <img src={phone} alt="phone" />
                        <a
                            href="tel:1-801-910-3400"
                            className="text-blue-600 hover:underline"
                        >
                            1-801-910-3400
                        </a>
                    </div>
                    <div className="flex gap-5 justify-center">
                        <img src={mail} alt="email" />
                        <a
                            href="mailto:info@brainintegration.institute"
                            className="text-blue-600 hover:underline"
                        >
                            info@brainintegration.institute
                        </a>
                    </div>
                </div>
            </div>
        </>
    );
};
