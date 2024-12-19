import { Navbar } from '../components/header/Navbar';
import { Footer } from '../components/Footer';
import rectangleSteve from '../assets/icons/rectanglesteve.png';
import map from '../assets/icons/map-pin.png';
import phone from '../assets/icons/phone.png';
import mail from '../assets/icons/mail.png';

export const SteveBio = () => {
    return (
        <div>
            <Navbar />
            <div className="p-4 md:p-10 lg:p-20 pb-20">
                <div className="flex flex-col lg:flex-row gap-10">
                    {/* Left Column */}
                    <div className="flex flex-col items-center lg:items-start gap-10 lg:basis-1/2">
                        <img
                            src={rectangleSteve}
                            className="w-full sm:w-[800px] md:w-[600px] lg:w-[800px] h-auto object-cover"
                            alt="Steve Hansen"
                        />
                        <div className="flex flex-col gap-5">
                            <div className="flex items-center gap-3">
                                <img
                                    src={map}
                                    alt="map pin"
                                    className="w-8 h-8"
                                />
                                <span className="font-bold">San Diego, CA</span>
                            </div>
                            <div className="flex items-center gap-3">
                                <img
                                    src={phone}
                                    alt="phone"
                                    className="w-8 h-8"
                                />
                                <a
                                    href="tel:1-801-444-1309"
                                    className="text-blue-600 hover:underline font-bold"
                                >
                                    1-801-444-1309
                                </a>
                            </div>
                            <div className="flex items-center gap-3">
                                <img
                                    src={mail}
                                    alt="email"
                                    className="w-8 h-8"
                                />
                                <a
                                    href="steve@dynamicenergies.com"
                                    className="text-blue-600 hover:underline font-bold"
                                >
                                    steve@dynamicenergies.com
                                </a>
                            </div>
                        </div>
                    </div>

                    {/* Right Column */}
                    <div className="flex flex-col gap-10 sm:w-[800px] md:w-[600px] lg:w-[1800px] h-auto object-cover">
                        <h1 className="text-6xl font-bold text-center lg:text-start lg:px-10">
                            Steve Hansen
                        </h1>
                        <h2 className="text-xl font-semibold text-center lg:text-start lg:px-10">
                            Kinesiology Innovator, Practitioner, Researcher, and
                            Teacher
                        </h2>
                        <p className="px-2 md:px-6 lg:px-10">
                            W. Steve Hansen is a pioneering figure in Energy
                            Kinesiology with nearly three decades of experience
                            advancing the field as a practitioner, researcher,
                            and educator. As the creator of the KABS series,
                            Steve developed an innovative curriculum designed to
                            guide individuals in healing the body, mind, and
                            spirit through Energy Kinesiology. He further
                            expanded his impact with the Infection Pathways
                            series, a specialized course series focused on the
                            body’s immune functions, offering a deep dive into
                            targeted immune health.
                        </p>
                        <p className="px-2 md:px-6 lg:px-10">
                            With 28 years in Energy Kinesiology and 20 years
                            dedicated specifically to Neuroenergetic
                            Kinesiology, Steve has established himself as a
                            leading authority in these areas. His practice at
                            the Institute for Specialized Medicine in San Diego
                            allows him to collaborate closely with medical
                            professionals in a rheumatology clinic setting,
                            bridging integrative health approaches with
                            conventional medicine.
                        </p>
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    );
};
