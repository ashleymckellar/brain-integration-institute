import { Navbar } from '../components/header/Navbar';
import { Footer } from '../components/Footer';
import rectangleTami from '../assets/images/rectangletami.png';
import map from '../assets/icons/map-pin.png';
import phone from '../assets/icons/phone.png';
import mail from '../assets/icons/mail.png';

export const TamiBio = () => {
    return (
        <div>
            <Navbar />
            <div className="p-4 md:p-10 lg:p-20 pb-20">
                <div className="flex flex-col lg:flex-row gap-10">
                    <div className="flex flex-col items-center lg:items-start gap-10 lg:basis-1/2">
                        <img
                            src={rectangleTami}
                              className="w-full sm:w-[800px] md:w-[600px] lg:w-[800px] h-auto object-cover"
                            alt="Tami Davis"
                        />
                        <div className="flex flex-col gap-5">
                            <div className="flex items-center gap-3">
                                <img
                                    src={map}
                                    alt="map pin"
                                    className="w-8 h-8"
                                />
                                <span className='font-bold'>West Jordan, UT</span>
                            </div>
                            <div className="flex items-center gap-3">
                                <img
                                    src={phone}
                                    alt="phone"
                                    className="w-8 h-8"
                                />
                                <a
                                    href="tel:1-801-891-6678"
                                    className="text-blue-600 hover:underline font-bold"
                                >
                                    1-801-891-6678
                                </a>
                            </div>
                            <div className="flex items-center gap-3">
                                <img
                                    src={mail}
                                    alt="email"
                                    className="w-8 h-8"
                                />
                                <a
                                    href="mailto:tamidavis4@gmail.com"
                                    className="text-blue-600 hover:underline font-bold"
                                >
                                    tamidavis4@gmail.com
                                </a>
                            </div>
                        </div>
                    </div>

                    {/* Right Column */}
                    <div className="flex flex-col gap-10 sm:w-[800px] md:w-[600px] lg:w-[1800px] h-auto object-cover">
                    <h1 className="text-6xl font-bold text-center lg:text-start lg:px-10">Tami Davis</h1>
                    <h2 className="text-xl font-semibold text-center lg:text-start lg:px-10">
                            MA, BS, CRC (ret), SSW, BI Practitioner
                        </h2>
                        <p className="px-2 md:px-6 lg:px-10">
                            Tami Davis, a Level 3 Certified Energy
                            Kinesiologist, brings over 20 years of expertise in
                            teaching, course development, and client
                            facilitation within energy kinesiology. As an
                            instructor and class coordinator with Empowerlife
                            Trainings, she plays a pivotal role in the
                            Empowerlife Brain and Body Integration programs.
                            Tami is dedicated to training students and
                            practitioners in energy-based healing, specializing
                            in holistic transformation, trauma support, and
                            nervous system balance to help clients reconnect and
                            center through somatic tools.
                        </p>
                        <p className="px-2 md:px-6 lg:px-10">
                            In collaboration with Ron Wayman, Tami has used her
                            graphic design skills to shape and enhance
                            Empowerlife’s Brain Integration curriculum, creating
                            clear, accessible learning materials that make
                            advanced kinesiology concepts approachable and
                            impactful. Her organizational and creative talents
                            ensure that course manuals and training resources
                            support comprehensive learning for both students and
                            practitioners.
                        </p>
                        <p className="px-2 md:px-6 lg:px-10">
                            As an experienced Empowerlife Kinesiology
                            Facilitator, Tami has spent two decades working with
                            children and adults using Empowerlife protocols, as
                            well as advanced techniques from NeuroEnergetic
                            Kinesiology, LEAP, and the Feldenkrais Method. Her
                            approach fosters alignment across mental, physical,
                            and emotional dimensions, guiding clients toward
                            integrated well-being.
                        </p>
                        <h1 className="font-bold text-xl text-center lg:text-start ">
                            Specialized Training:
                        </h1>
                        <ul className="flex flex-col gap-5 list-disc list-inside px-2 md:px-6 lg:px-10">
                        <li className="font-bold">Body Management</li>
                        <li className="font-bold">Brain Gym Level 1</li>
                        <li className="font-bold">
                                Brain Hologram Intensive and Neurotransmitter
                                Hologram (nK Institute) iLs Focus Systems Online
                                Training and Safe & Sound Protocol Training
                                (Integrated Listening Systems)
                            </li>
                            <li className="font-bold">Birth and Post-Birth Reflex Integration</li>
                            <li className="font-bold">
                                My Inner Child: Integration of Lifelong Reflexes
                                into Movement Development (International
                                Neurokinesiology Institute with Dr. Svetlana
                                Masgutova)
                            </li>
                            <li className="font-bold">KABS Series (Dynamic Energies)</li>
                            <li className="font-bold">LEAP (Melbourne Applied Physiology)</li>
                            <li className="font-bold">Massage Therapy Apprenticeship Training</li>
                            <li className="font-bold">
                                Neural Organization Technique (Association of
                                the Neural Organization Technique- North
                                America)
                            </li>
                            <li className="font-bold">
                                Neurolinguistic Training (The Fullness of Life
                                Foundation)
                            </li>
                            <li className="font-bold">
                                Primitive Reflexes and the Brainstem 1-2 (nK
                                Institute)
                            </li>
                            <li className="font-bold">
                                SIPS Kinesiology - Level 1
                            </li>
                            <li className="font-bold">
                                Touch for Health 1-2 (International Kinesiology
                                College)
                            </li>
                            <li className="font-bold">
                                Trauma Healing Accelerated (Biology of Training
                                w Dr Aimie)
                            </li>
                        </ul>
                        <p className="px-2 md:px-6 lg:px-10">
                            Tami’s extensive experience, dedication to
                            empowerment, and commitment to holistic health make
                            her a highly respected leader in energy kinesiology
                            and brain integration. Her work supports individuals
                            on their healing journeys, helping them unlock their
                            potential for growth and well-being through
                            transformative practices.
                        </p>
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    );
};
