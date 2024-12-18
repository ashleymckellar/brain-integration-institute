import { Navbar } from '../components/header/Navbar';
import { Footer } from '../components/Footer';
import debbie from '../assets/images/debbie.png';
import map from '../assets/icons/map-pin.png';
import phone from '../assets/icons/phone.png';
import mail from '../assets/icons/mail.png';

export const DebbieBio = () => {
    return (
        <div>
            <Navbar />
            <div className="p-20">
                <div className="flex flex-col lg:flex-row gap-10">
                    {/* Left Column */}
                    <div className="flex flex-col items-center lg:items-start gap-10 lg:basis-1/2">
                        <img
                            src={debbie}
                            className="w-75% h-[650px] object-cover"
                            alt="Debbie Luke"
                        />
                        <div className="flex flex-col gap-5">
                            <div className="flex items-center gap-3">
                                <img
                                    src={map}
                                    alt="map pin"
                                    className="w-8 h-8"
                                />
                                <span className="font-bold">Midvale, UT</span>
                            </div>
                            <div className="flex items-center gap-3">
                                <img
                                    src={phone}
                                    alt="phone"
                                    className="w-8 h-8"
                                />
                                <a
                                    href="tel:1-801-577-4182"
                                    className="text-blue-600 hover:underline font-bold"
                                >
                                    1-801-577-4182
                                </a>
                            </div>
                            <div className="flex items-center gap-3">
                                <img
                                    src={mail}
                                    alt="email"
                                    className="w-8 h-8"
                                />
                                <a
                                    href="mailto:julissa@optimizebrain.com"
                                    className="text-blue-600 hover:underline font-bold"
                                >
                                    julissa@optimizebrain.com
                                </a>
                            </div>
                        </div>
                    </div>

                    {/* Right Column */}
                    <div className="flex flex-col gap-6  px-[200px]">
                        <h1 className="text-6xl font-bold">Debbie Luke</h1>
                        <h2 className="text-xl font-semibold">CEnK2, LMT</h2>
           <p>Debbie is dedicated to guiding students in building a foundational understanding of energy kinesiology, preparing them for advanced training in brain integration. She collaborates with Tami Davis and Ronald Wayman to create and deliver accessible, engaging course materials that introduce the principles of Chinese Medicine to beginners. Her focus is primarily on introductory and prerequisite courses, where she provides a strong knowledge base for students.
           Debbie’s approach combines scientific insight with intuitive practices, equipping students and clients alike with tools that foster personal growth and a deeper understanding of energy as a transformative force.</p>
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    );
};
