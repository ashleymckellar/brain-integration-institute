// import { AccordionComponent } from '../components/AccordionComponent';
import AccordionCard from '../components/AccordionCard';
// import GreenBannerCertPage from '../assets/icons/GreenBannerCertPage.png';
import banner from '../assets/icons/PractitionerBackground.png';
import paleBanner from '../assets/icons/PaleGreenPractitionerBackground.png';

export const Certification = () => {
    return (
        <>
           <div
                className="w-full h-64 sm:h-80 md:h-96 relative bg-white"
                style={{
                    backgroundImage: `url(${banner}), url(${paleBanner})`,
                    backgroundSize: 'cover, cover',
                    backgroundPosition: 'center, center',
                    backgroundRepeat: 'no-repeat, no-repeat',
                }}
            >
                <div className="absolute inset-0 flex items-center justify-center">
                    <h1 className="text-white text-3xl sm:text-xl md:text-4xl lg:text-5xl font-fenix font-normal">
                        Integration Certification
                    </h1>
                </div>
            </div>
            <div className="flex pl-5 pt-1 pr-30">
                {/* <img className="h-48 w-48" src={ProgressRing} /> */}
                <div className="flex flex-col pt-5 pl-5 mb-7">
                    <AccordionCard />
                </div>
            </div>
        </>
    );
};
