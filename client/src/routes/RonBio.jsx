// import { Navbar } from '../components/header/Navbar';
// import { Footer } from '../components/Footer';
// import rectangleRon from '../assets/images/rectangle-ron.png';
// import map from '../assets/icons/map-pin.png';
// import phone from '../assets/icons/phone.png';
// import mail from '../assets/icons/mail.png';

// export const RonBio = () => {
//     return (
//         <div>
//             <div>
//                 <Navbar />
//                 <div className="relative p-20">
//                     <div>
//                         <div className="relative">
//                             <img
//                                 src={rectangleRon}
//                                 className="w-[600px] h-[650px]"
//                                 alt="Ron Wayman"
//                             />

//                             <h1 className="absolute top-0 right-80 text-6xl text-right pt-5">
//                                 Ron Wayman
//                             </h1>
//                             <h1 className="font-fira absolute top-20 right-20 text-xl text-right pt-5">
//                                 Neuro-Energy Kinesiologist, Empowerlife
//                                 Co-Founder, Certified Instructor, and Director
//                             </h1>
//                             <div className='flex flex-col gap-2 px-40'>
//                                 <p>
//                                     With over 30 years of experience in energy
//                                     kinesiology, emotional coaching, and
//                                     integrative wellness, Ronald Wayman is a
//                                     leader in the field of brain integration and
//                                     holistic health. Holding a Bachelor of
//                                     Science in Secondary Education with
//                                     specializations in Mathematics, Computer
//                                     Science, and Applied Statistics, Ron’s
//                                     diverse academic and professional background
//                                     provides a strong foundation for his work in
//                                     learning, behavior, and brain integration
//                                     techniques.
//                                 </p>

//                                 <p>
//                                     Ron is certified as a Level 3 Energy
//                                     Kinesiologist and has held prominent roles
//                                     in the field, including former President of
//                                     the Energy Kinesiology Association. He is
//                                     also a Certified Enzyme Nutrition
//                                     Specialist, a Kalos Health Facilitation
//                                     Specialist, and a Nutritional Microscopy
//                                     professional through the American Institute
//                                     of Certified Microscopists. He co-founded
//                                     the Brain Integration Institute and serves
//                                     as the Director of Empowerlife Brain
//                                     Integration and Empowerlife Kinesiology.
//                                 </p>

//                                 <p>
//                                     Over his career, Ron has created and taught
//                                     numerous courses addressing learning and
//                                     behavioral challenges, recognizing the
//                                     transformative potential within each
//                                     individual. His Empowerlife Brain
//                                     Integration approach draws on a wide range
//                                     of methods, including NeuroEnergetic
//                                     Kinesiology (NK), LEAP, Sensory Learning,
//                                     Qigong, enzyme nutrition, and emotional
//                                     coaching, all designed to foster an
//                                     integrated, empowered life. His work
//                                     frequently partners with traditional Chinese
//                                     methodologies to develop new energy
//                                     kinesiology techniques that support
//                                     physical, emotional, and energetic
//                                     transformation.
//                                 </p>
//                             </div>
//                         </div>

//                         {/* Contact Info */}
//                         <div className="flex flex-col gap-5 pt-10">
//                             <div className="flex items-center gap-3">
//                                 <img
//                                     src={map}
//                                     alt="map pin"
//                                     className="w-10 h-10"
//                                 />
//                                 <span>West Jordan, UT</span>
//                             </div>
//                             <div className="flex items-center gap-3">
//                                 <img
//                                     src={phone}
//                                     alt="phone"
//                                     className="w-10 h-10"
//                                 />
//                                 <a
//                                     href="tel:1-801-910-3400"
//                                     className="text-blue-600 hover:underline"
//                                 >
//                                     1-801-566-6262
//                                 </a>
//                             </div>
//                             <div className="flex items-center gap-3">
//                                 <img
//                                     src={mail}
//                                     alt="email"
//                                     className="w-10 h-10"
//                                 />
//                                 <a
//                                     href="mailto:info@brainintegration.institute"
//                                     className="text-blue-600 hover:underline"
//                                 >
//                                     info@brainintegration.institute
//                                 </a>
//                             </div>
//                         </div>
//                     </div>
//                 </div>
//                 <Footer />
//             </div>
//         </div>
//     );
// };

import { Navbar } from '../components/header/Navbar';
import { Footer } from '../components/Footer';
import rectangleRon from '../assets/images/rectangle-ron.png';
import map from '../assets/icons/map-pin.png';
import phone from '../assets/icons/phone.png';
import mail from '../assets/icons/mail.png';

export const RonBio = () => {
    return (
        <div>
            <Navbar />
            <div className="p-20">
                <div className="flex flex-col lg:flex-row gap-10">
                    {/* Left Column */}
                    <div className="flex flex-col items-center lg:items-start gap-10 lg:basis-1/2">
                        <img
                            src={rectangleRon}
                            className="w-full h-[650px] object-cover"
                            alt="Ron Wayman"
                        />
                        <div className="flex flex-col gap-5">
                            <div className="flex items-center gap-3">
                                <img
                                    src={map}
                                    alt="map pin"
                                    className="w-8 h-8"
                                />
                                <span>West Jordan, UT</span>
                            </div>
                            <div className="flex items-center gap-3">
                                <img
                                    src={phone}
                                    alt="phone"
                                    className="w-8 h-8"
                                />
                                <a
                                    href="tel:1-801-910-3400"
                                    className="text-blue-600 hover:underline"
                                >
                                    1-801-566-6262
                                </a>
                            </div>
                            <div className="flex items-center gap-3">
                                <img
                                    src={mail}
                                    alt="email"
                                    className="w-8 h-8"
                                />
                                <a
                                    href="mailto:info@brainintegration.institute"
                                    className="text-blue-600 hover:underline"
                                >
                                    info@brainintegration.institute
                                </a>
                            </div>
                        </div>
                    </div>

                    {/* Right Column */}
                    <div className="flex flex-col gap-6 lg:basis-1/2 px-10">
                        <h1 className="text-6xl font-bold">Ron Wayman</h1>
                        <h2 className="text-xl font-semibold">
                            Neuro-Energy Kinesiologist, Empowerlife Co-Founder,
                            Certified Instructor, and Director
                        </h2>
                        <p>
                            With over 30 years of experience in energy
                            kinesiology, emotional coaching, and integrative
                            wellness, Ronald Wayman is a leader in the field of
                            brain integration and holistic health. Holding a
                            Bachelor of Science in Secondary Education with
                            specializations in Mathematics, Computer Science,
                            and Applied Statistics, Ron’s diverse academic and
                            professional background provides a strong foundation
                            for his work in learning, behavior, and brain
                            integration techniques.
                        </p>
                        <p>
                            Ron is certified as a Level 3 Energy Kinesiologist
                            and has held prominent roles in the field, including
                            former President of the Energy Kinesiology
                            Association. He is also a Certified Enzyme Nutrition
                            Specialist, a Kalos Health Facilitation Specialist,
                            and a Nutritional Microscopy professional through
                            the American Institute of Certified Microscopists.
                            He co-founded the Brain Integration Institute and
                            serves as the Director of Empowerlife Brain
                            Integration and Empowerlife Kinesiology.
                        </p>
                        <p>
                            Over his career, Ron has created and taught numerous
                            courses addressing learning and behavioral
                            challenges, recognizing the transformative potential
                            within each individual. His Empowerlife Brain
                            Integration approach draws on a wide range of
                            methods, including NeuroEnergetic Kinesiology (NK),
                            LEAP, Sensory Learning, Qigong, enzyme nutrition,
                            and emotional coaching, all designed to foster an
                            integrated, empowered life. His work frequently
                            partners with traditional Chinese methodologies to
                            develop new energy kinesiology techniques that
                            support physical, emotional, and energetic
                            transformation.
                        </p>
                        <h1 className="font-bold text-xl">
                            Certifications and Specialized Training:
                        </h1>
                        <ul className="flex flex-col gap-5 list-disc list-inside">
                            <li>
                                <span className="font-bold">
                                    Certified Instructor:{' '}
                                </span>
                                NeuroEnergetic Kinesiology (NK Institute),
                                Kinergetics, LEAP, Kalos Health Facilitation
                            </li>
                            <li>
                                <span className="font-bold">
                                    Functional Wellness Techniques:{' '}
                                </span>
                                Metagenics Educational Programs
                            </li>
                            <li>
                                <span className="font-bold">
                                    Sensory Learning Facilitation:{' '}
                                </span>
                                Sensory Learning Institute, Boulder, CO
                            </li>
                            <li>
                                <span className="font-bold">
                                    Neural Organization Technique:{' '}
                                </span>
                                Association of the Neural Organization
                                Technique-North America
                            </li>
                            <li>
                                <span className="font-bold">
                                    SIPS Kinesiology, LEAP:{' '}
                                </span>
                                Melbourne Applied Physiology
                            </li>
                            <li>
                                <span className="font-bold">
                                    Primitive and Postural Reflexes:{' '}
                                </span>
                                International Neurokinesiology Institute of
                                Movement and Reflex Integration with Dr.
                                Svetlana Masgutova
                            </li>
                            <li>
                                <span className="font-bold">
                                    Touch for Health 1-4:{' '}
                                </span>
                                International Kinesiology College
                            </li>
                            <li>
                                <span className="font-bold">
                                    Additional Modalities:{' '}
                                </span>
                                Brain Gym, Cranial Sacral, Body Management,
                                Healing Touch, Brain Hologram Intensive,
                                Primitive Reflexes and the Brainstem (nK
                                Institute), KABS Series (Dynamic Energies), and
                                many more.
                            </li>
                        </ul>
                        <p>
                            Ron’s groundbreaking contributions incorporate
                            advancements in brain neuroscience, immunology,
                            nutrition, body energy systems, sensory integration,
                            and emotional processing. He collaborates
                            extensively with occupational therapists to enhance
                            sensory integration within his Brain Integration
                            practices. Driven by a passion for holistic
                            empowerment, Ron continues to develop and teach
                            methods that enable practitioners and clients to
                            achieve profound, multidimensional transformation.
                        </p>
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    );
};
