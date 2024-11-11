import { Link } from 'react-router-dom';
import brainSeal from '../assets/icons/BrainIntegrationSeal.png';
import map from '../assets/icons/map-pin.png';
import phone from '../assets/icons/phone.png';
import mail from '../assets/icons/mail.png';

export const Footer = () => {
    return (
        <>
            <div className="flex justify-between p-20">
                <img
                    className="logo"
                    width="134"
                    height="134"
                    src={brainSeal}
                    alt="Brain Integration Institute"
                />

                <div className="links flex flex-col gap-5">
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
                <div className="links flex flex-col gap-5">
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
                </div>

                <div className="contact-info flex flex-col gap-5">
                    <h3 className="font-fira text-xl font-bold">Contact Us</h3>
                    <div className="flex gap-5">
                        <img src={map} alt="map pin" />
                        West Jordan & Midvale, UT
                    </div>
                    <div className="flex gap-5">
                        <img src={phone} alt="phone" />
                        <a
                            href="tel:1-801-910-3400"
                            className="text-blue-600 hover:underline"
                        >
                            1-801-910-3400
                        </a>
                    </div>
                    <div className="flex gap-5">
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
