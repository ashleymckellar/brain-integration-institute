import { Navbar } from '../components/header/Navbar';
import { Footer } from '../components/Footer';
import rectangleJulissa from '../assets/images/rectanglejulissa.png';
import map from '../assets/icons/map-pin.png';
import phone from '../assets/icons/phone.png';
import mail from '../assets/icons/mail.png';

export const JulissaBio = () => {
    return (
        <div>
            <Navbar />
            <div className="p-20">
                <div className="flex flex-col lg:flex-row gap-10">
                    {/* Left Column */}
                    <div className="flex flex-col items-center lg:items-start gap-10 lg:basis-1/2">
                        <img
                            src={rectangleJulissa}
                            className="w-full h-[650px] object-cover"
                            alt="Julissa Byington"
                        />
                        <div className="flex flex-col gap-5">
                            <div className="flex items-center gap-3">
                                <img
                                    src={map}
                                    alt="map pin"
                                    className="w-8 h-8"
                                />
                                <span>Midvale, UT</span>
                            </div>
                            <div className="flex items-center gap-3">
                                <img
                                    src={phone}
                                    alt="phone"
                                    className="w-8 h-8"
                                />
                                <a
                                    href="tel:1-801-577-4182"
                                    className="text-blue-600 hover:underline"
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
                                    href="julissa@optimizebrain.com"
                                    className="text-blue-600 hover:underline"
                                >
                                    julissa@optimizebrain.com
                                </a>
                            </div>
                        </div>
                    </div>

                    {/* Right Column */}
                    <div className="flex flex-col gap-6 lg:basis-1/2 px-10">
                        <h1 className="text-6xl font-bold">Julissa Byington</h1>
                        <h2 className="text-xl font-semibold">
                            MA, BS, CRC (ret), SSW, BI Practitioner
                        </h2>
                        <p>
                            Julissa is a Brain Integration practitioner, with an
                            emphasis in improving cognitive delays. Working with
                            all ability levels, she assists children and adults
                            with Learning and Development issues.
                        </p>
                        <p>
                            She has a knack with children, particularly ones
                            with special needs. Her specialties include ADHD,
                            ASD, and learning delays. She also works with adults
                            to improve mental states and well-being, as well as
                            cognitive functioning.
                        </p>
                        <p>
                            Julissa has studied LEAP, Crossinology, Kinergetics,
                            NeuroEnergetic Kinesiology, and Empowerlife
                            Kinesiology, Neuro-Sensory-Motor and Reflex
                            Integration, Primitive Reflexes, and more.
                        </p>
                        <p>
                            Julissa is on the Brain Integration Certification
                            Board, as well as working with the Empowerlife
                            Kinesiology team to create a training program for
                            practitioners interested in working in the field of
                            Brain Integration.
                        </p>
                        <h1 className="font-bold text-xl">
                            Certifications and Specialized Training:
                        </h1>
                        <ul className="flex flex-col gap-5 list-disc list-inside">
                            <li>
                                <span className="font-bold">
                                    Melbourne Applied Physiology (Leap):
                                </span>
                                Leap Brain Integration training I,II,III, IV and
                                V FT 3 glial cells.
                            </li>
                            <li>
                                <span className="font-bold">
                                    Empowerlife Kinesiology:{' '}
                                </span>
                                MRT, Neurovascular pairs, Element Stabilizer
                                system, Gui 1 and 2, Navigating the Qi,
                                Elementos, Navigating the Immune System Series
                                #1 immune system map, #2 Lymph System Pathways,
                                #3 Going Deeper into the Lymph system, #4
                                Chronic Fatigue Identity and the Complement
                                System, #5 Virus Interference, #6 & 7
                                Vaccination and Holograms, #8 Bacteria
                                Recognition and Release, Approaching the Bridge,
                                Immune Primer with Formats.
                            </li>
                            <li>
                                <span className="font-bold">
                                    NK institute:{' '}
                                </span>
                                Mast Cell Activation Syndrome, Alzheimer’s
                                stress protocol, Vaccine Stress, Microbiome,
                                Chronic Inflammation Resolution Pathways,
                                Advanced Physiology, Advanced Pyrrole Pathways,
                                Immune & Vaccination Pathways 1 and 2,
                                Coronavirus, Neps 1, Leaky Gut, Pyrrole and
                                Methylation, Burnout, Histamine Intolerance, EMF
                                stress, Mammary - ERSa protocol, Mucous Membrane
                                balancing, Acid Base balancing, Nutrition
                                Hologram A & B, Balancing Borrelia, Lockdown
                                Series.
                            </li>
                            <li>
                                <span className="font-bold">
                                    Svetlana Masgutova Education Institute for
                                    Neuro-Sensory-Motor and Reflex Integration
                                    LLC:
                                </span>
                                MNRI Dynamic & Postural Reflex Pattern
                                Integration.
                            </li>
                            <li>
                                <span className="font-bold">
                                    International Institute of Applied
                                    Kinesiology:
                                </span>
                                7 Chi Keys.
                            </li>
                            <li>
                                <span className="font-bold">Kinergetics:</span>
                                1-6, Reset 1.
                            </li>
                            <li>
                                <span className="font-bold">
                                    Learning Enhancement Center (Crossinology):
                                </span>
                                Pre BIT Training, Brain Integration Technique,
                                Brain Physiology 1 & 2, Advanced Brain
                                Integration Technique.
                            </li>
                            <li>
                                <span className="font-bold">KABS:</span>
                                Pathways, Powers of stress.
                            </li>
                        </ul>
                        <p>
                            Julissa has been dedicated to practicing and
                            studying Brain Integration since 2015. As a business
                            owner and mother, she brings both expertise and
                            empathy to her role as the owner and lead
                            practitioner at Optimize Brain Integration.
                        </p>
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    );
};
