/* eslint-disable react/no-unescaped-entities */
import paleBanner from '../assets/icons/PaleGreenPractitionerBackground.png';
import banner from '../assets/icons/PractitionerBackground.png';
import { Navbar } from '../components/header/Navbar';
import { Footer } from '../components/Footer';
import nature2 from '../assets/images/nature2.jpg';
import fists from '../assets/images/fists.png';
import ron from '../assets/images/ron.png';
import julissa from '../assets/images/julissa.png';
import tami from '../assets/images/tami.png';
import steve from '../assets/images/steve.png';
import terri from '../assets/images/terri.png';

export const AboutUs = () => {
    return (
        <>
            <Navbar />
            <div>{/* <img src={nature2} /> */}</div>
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
                    <h1 className="text-white text-3xl sm:text-3xl md:text-4xl lg:text-5xl font-fenix font-normal">
                        About Us
                    </h1>
                </div>
            </div>
            <div className="flex flex-col gap-10 text-center justify-center px-40">
                <h2 className="font-fira text-4xl">
                    We are the Brain Integration Institute
                </h2>
                <div className="flex justify-center">
                    <img
                        src={fists}
                        className="w-[800px]"
                        alt="fists in circle"
                    />
                </div>
                <h3 className="font-fira text-2xl">Our Mission</h3>
                <p className="text-center font-fira">
                    We are dedicated to the excellence of brain integration and
                    services to the public by setting the national standard in
                    certification, providing leadership, education, and
                    advocacy.
                </p>
                <h3 className="font-fira text-2xl">Our Vision</h3>
                <p className="text-center font-fira">
                    The Brain Integration Institute’s vision is to unify the
                    profession of Brain Integration, standardize the profession
                    and for the Certified Brain Integration Practitioner to be
                    recognized as the credential of excellence for
                    professionals.
                </p>
                <h3 className="font-fira text-2xl">
                    Certification and Standards
                </h3>
                <div className="flex flex-col gap-10">
                    <p className="text-center font-fira">
                        Certified Brain Integration Practitioners hold a
                        recognized credential representing a level of excellence
                        in the field of brain integration. Those who have
                        achieved the certification have met rigorous academic
                        and professional standards. They have the knowledge,
                        skills, and expertise to provide high-quality services
                        and they actively engage in ongoing professional
                        development to keep their certification current. 
                    </p>
                    <p className="text-center font-fira">
                        {' '}
                        After receiving certification, practitioners are added
                        to the directory on the Brain Integration Institute’s
                        website. Every person deserves great care. That is why
                        we maintain a directory designed to connect clients with
                        qualified practitioners. Clients can be confident that
                        they will be seen by someone experienced and who
                        maintains high professional, ethical, and technical
                        standards. 
                    </p>

                    <p className="text-center font-fira">
                        {' '}
                        The Brain Integration Institute requires high ethical
                        standards for certified practitioners. Expectations for
                        behavior can be found on this website under Code of
                        Ethics. The Institute plays an active role in addressing
                        ethical concerns and helping to maintain respect,
                        honesty, and safety from those it certifies.{' '}
                    </p>
                    <p className="text-center font-fira">
                        By guiding practitioners through the certification
                        process, providing directories of colleges and certified
                        practitioners, and requiring high ethical standards, the
                        Brain Integration Institute helps to unify the brain
                        integration community and increase the standard for
                        quality care.
                    </p>
                </div>
                <div className="flex flex-col border border-[#D9D9D9] rounded-xl p-5 gap-y-10 w-full max-w-[90%] md:max-w-2xl mx-auto mt-20">
                    <h1 className="font-fira text-4xl text-center">
                        Board Members
                    </h1>
                    <div className="flex flex-col gap-5 lg:gap-10">
                        {/* Top Row - Three Images */}
                        <div className="flex justify-center gap-5">
                            <img
                                src={ron}
                                className="w-40 object-cover"
                                alt="Ron"
                            />
                            <img
                                src={julissa}
                                className="w-40 object-cover"
                                alt="Julissa"
                            />
                            <img
                                src={tami}
                                className="w-40 object-cover"
                                alt="Tami"
                            />
                        </div>

                        {/* Bottom Row - Two Images Centered */}
                        <div className="flex justify-center gap-5">
                            <img
                                src={steve}
                                className="w-40 object-cover"
                                alt="Steve"
                            />
                            <img
                                src={terri}
                                className="w-40 object-cover"
                                alt="Terri"
                            />
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </>
    );
};
