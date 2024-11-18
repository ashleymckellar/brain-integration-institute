/* eslint-disable no-unused-vars */
/* eslint-disable react/no-unescaped-entities */
import paleBanner from '../assets/icons/PaleGreenPractitionerBackground.png';
import banner from '../assets/icons/PractitionerBackground.png';
import { Navbar } from '../components/header/Navbar';
import { Footer } from '../components/Footer';
import nature2 from '../assets/images/nature2.jpg';
import wheat from '../assets/images/wheat-fields-4439896_1920.jpg';
import fists from '../assets/images/fists.png';
import ron from '../assets/images/ron.png';
import julissa from '../assets/images/julissa.png';
import tami from '../assets/images/tami.png';
import steve from '../assets/images/steve.png';
import terri from '../assets/images/terri.png';
import { useNavigate } from 'react-router-dom';

export const AboutUs = () => {
    const navigate = useNavigate();
    return (
        <>
            <Navbar />
            <div className="relative w-full mt-10 mb-10">
                <img
                    src={wheat}
                    className="w-[2500px] h-[700px]"
                    alt="Nature Background"
                />
                <div
                    className="absolute inset-0 flex flex-col justify-center items-center text-center gap-4 p-4 sm:p-6 md:p-8 lg:p-10 
        bg-white bg-opacity-10 backdrop-blur-lg rounded-2xl 
        max-w-[90%] sm:max-w-[70%] md:max-w-[60%] lg:max-w-[35%] 
        h-auto lg:h-[600px] md:h-[300px] sm:h-[200px] mt-10 sm:mt-20 md:mt-28 lg:mt-10 mx-auto"
                >
                    <h2 className="font-fira text-2xl sm:text-3xl md:text-4xl lg:text-5xl text-white leading-tight sm:leading-snug">
                        We are the Brain Integration Institute
                    </h2>
                    <p className="text-white text-sm sm:text-base md:text-lg lg:text-xl p-4 sm:p-6 md:p-8 font-fira leading-relaxed sm:leading-normal">
                        We are dedicated to the excellence of brain integration
                        and services to the public by setting the national
                        standard in certification, providing leadership,
                        education, and advocacy.
                    </p>
                </div>
            </div>

            <div className="flex flex-col gap-10 text-center justify-center  bg-background-tan pt-10">
                <div className="flex justify-center px-4 sm:px-0 lg:px-10">
                    <img
                        src={fists}
                        className="lg:w-[800px] md:w-[80%] sm:w-[80%]"
                        alt="fists in circle"
                    />
                </div>
                <h3 className="font-fira text-2xl">Our Mission</h3>
                <p className="text-center font-fira lg:px-20">
                    We are dedicated to the excellence of brain integration and
                    services to the public by setting the national standard in
                    certification, providing leadership, education, and
                    advocacy.
                </p>
                <h3 className="font-fira text-2xl">Our Vision</h3>
                <p className="text-center font-fira lg:px-20">
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
                    <p className="text-center font-fira lg:px-20">
                        Certified Brain Integration Practitioners hold a
                        recognized credential representing a level of excellence
                        in the field of brain integration. Those who have
                        achieved the certification have met rigorous academic
                        and professional standards. They have the knowledge,
                        skills, and expertise to provide high-quality services
                        and they actively engage in ongoing professional
                        development to keep their certification current. 
                    </p>
                    <p className="text-center font-fira lg:px-20">
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

                    <p className="text-center font-fira lg:px-20">
                        {' '}
                        The Brain Integration Institute requires high ethical
                        standards for certified practitioners. Expectations for
                        behavior can be found on this website under Code of
                        Ethics. The Institute plays an active role in addressing
                        ethical concerns and helping to maintain respect,
                        honesty, and safety from those it certifies.{' '}
                    </p>
                    <p className="text-center font-fira px-20">
                        By guiding practitioners through the certification
                        process, providing directories of colleges and certified
                        practitioners, and requiring high ethical standards, the
                        Brain Integration Institute helps to unify the brain
                        integration community and increase the standard for
                        quality care.
                    </p>
                </div>
                <div className="flex flex-col border bg-white border-[#D9D9D9] rounded-xl p-5 gap-y-10 w-full max-w-[90%] md:max-w-2xl mx-auto mt-20 mb-20">
                    <h1 className="font-fira text-4xl text-center">
                        Board Members
                    </h1>
                    <div className="flex flex-col gap-5 lg:gap-10">
                        {/* Top Row - Three Images */}
                        <div className="flex flex-wrap justify-center gap-5">
                            <button onClick={() => navigate('/ron-bio')}>
                                <img
                                    src={ron}
                                    className="w-40 object-cover mb-5 md:mb-0"
                                    alt="Ron"
                                />
                            </button>
                            <img
                                src={julissa}
                                className="w-40 object-cover mb-5 md:mb-0"
                                alt="Julissa"
                            />
                            <img
                                src={tami}
                                className="w-40 object-cover mb-5 md:mb-0"
                                alt="Tami"
                            />
                        </div>

                        {/* Bottom Row - Two Images Centered */}
                        <div className="flex justify-center gap-5">
                            <img
                                src={steve}
                                className="w-40 object-cover mb-5 md:mb-0"
                                alt="Steve"
                            />
                            <img
                                src={terri}
                                className="w-40 object-cover mb-5 md:mb-0"
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