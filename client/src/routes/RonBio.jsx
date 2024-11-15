import { Navbar } from '../components/header/Navbar';
import { Footer } from '../components/Footer';
import rectangleRon from '../assets/images/rectangle-ron.png';
import map from '../assets/icons/map-pin.png';
import phone from '../assets/icons/phone.png';
import mail from '../assets/icons/mail.png';

export const RonBio = () => {
    return (
        <>
            <Navbar />
            <div className="flex flex-col p-20">
                <img src={rectangleRon} className='w-[600px] h-[650px]'/>
                <div className="flex flex-col gap-5 pt-10">
                        <img src={map} alt="map pin" className='w-10 h-10'/>
                        West Jordan, UT
                    </div>
                    <div className="flex gap-5">
                        <img src={phone} alt="phone" className='w-10 h-10'/>
                        <a
                            href="tel:1-801-910-3400"
                            className="text-blue-600 hover:underline"
                        >
                            1-801-566-6262
                        </a>
                    </div>
                    <div className="flex gap-5">
                        <img src={mail} alt="email" className='w-10 h-10'/>
                        <a
                            href="mailto:info@brainintegration.institute"
                            className="text-blue-600 hover:underline"
                        >
                            info@brainintegration.institute
                        </a>
                    </div>

            </div>
            <Footer />
        </>
    );
};
