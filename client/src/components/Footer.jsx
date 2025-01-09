import { Link } from 'react-router-dom';
import brainSeal from '../assets/icons/updatedBrainSeal.png';
// import map from '../assets/icons/map-pin.png';
// import phone from '../assets/icons/phone.png';
// import mail from '../assets/icons/mail.png';

export const Footer = () => {
    return (
        <>
            <div className="flex flex-col lg:flex-row justify-around p-5 lg:py-20 bg-white">
                {/* Logo Section */}
                <div className="flex justify-center lg:justify-start mb-10 lg:mb-0 px-10">
                    <img
                        src={brainSeal}
                        alt="Brain Integration Institute"
                      
                        className=" sm:w-40 md:w-48 lg:w-40 xl:w-64 !w-40"
                    />
                </div>

                {/* Links Section - Center justify on small screens */}
                <div className="flex flex-col lg:flex-row gap-5 lg:gap-10 mb-10 lg:mb-0 justify-center lg:justify-center gap-10 w-full">
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

                        <Link className="link font-fira font-bold" to="/terms">
                            Terms of Use
                        </Link>
                    </div>
                </div>
            </div>
        </>
    );
};
