import { Navbar } from '../components/header/Navbar';
import { Footer } from '../components/Footer';
import wheat from '../assets/images/wheat-fields-4439896_1920.jpg';
import fists from '../assets/images/fists.png';
import ron from '../assets/images/ron.png';
import julissa from '../assets/images/julissa.png';
import tami from '../assets/images/tami.png';
import steve from '../assets/images/steve.png';
import terri from '../assets/images/terri.png';
import circleDebbie from '../assets/images/debbie-with-name.png';
import { useNavigate } from 'react-router-dom';

export const AboutUs = () => {
    const navigate = useNavigate();
    return (
        <>
            <Navbar />
            {/* Hero Section */}
            <div
                className="h-[70vh] bg-cover bg-center bg-fixed flex flex-col"
                style={{
                    backgroundImage: `url(${wheat})`,
                }}
            >
                <div className="flex flex-col justify-center items-center text-center gap-4 p-6 sm:p-10 bg-white bg-opacity-10 backdrop-blur-lg rounded-2xl max-w-[90%] sm:max-w-[75%] lg:max-w-[50%] mx-auto h-auto mt-20">
                    <h2 className="font-fira text-2xl sm:text-3xl md:text-4xl lg:text-5xl text-white leading-tight">
                        We are the Brain Integration Institute
                    </h2>
                    <p className="text-white text-sm sm:text-base md:text-lg lg:text-xl px-4 leading-relaxed">
                        We are dedicated to the excellence of brain integration
                        and services to the public by setting the national
                        standard in certification, providing leadership,
                        education, and advocacy.
                    </p>
                </div>
            </div>

            {/* Mission, Vision, and Certification Section */}
            <div className="flex flex-col gap-10 text-center justify-center bg-background-tan py-10">
                <div className="flex justify-center px-4">
                    <img
                        src={fists}
                        className="w-full sm:w-[80%] lg:w-[60%]"
                        alt="fists in circle"
                    />
                </div>
                <h3 className="font-fira text-2xl">Our Mission</h3>
                <p className="font-fira px-4 sm:px-10 lg:px-20 text-base sm:text-lg">
                    We are dedicated to the excellence of brain integration and
                    services to the public by setting the national standard in
                    certification, providing leadership, education, and
                    advocacy.
                </p>
                <h3 className="font-fira text-2xl">Our Vision</h3>
                <p className="font-fira px-4 sm:px-10 lg:px-20 text-base sm:text-lg">
                    The Brain Integration Institute’s vision is to unify the
                    profession of Brain Integration, standardize the profession
                    and for the Certified Brain Integration Practitioner to be
                    recognized as the credential of excellence for
                    professionals.
                </p>
                <h3 className="font-fira text-2xl">
                    Certification and Standards
                </h3>
                <div className="flex flex-col gap-6 px-4 sm:px-10 lg:px-20">
                    <p className="font-fira text-base sm:text-lg">
                        Certified Brain Integration Practitioners hold a
                        recognized credential representing a level of excellence
                        in the field of brain integration. Those who have
                        achieved the certification have met rigorous academic
                        and professional standards.
                    </p>
                    <p className="font-fira text-base sm:text-lg">
                        After receiving certification, practitioners are added
                        to the directory on the Brain Integration Institute’s
                        website. Every person deserves great care. That is why
                        we maintain a directory designed to connect clients with
                        qualified practitioners.
                    </p>
                    <p className="font-fira text-base sm:text-lg">
                        The Brain Integration Institute requires high ethical
                        standards for certified practitioners. Expectations for
                        behavior can be found on this website under Code of
                        Ethics.
                    </p>
                    <p className="font-fira text-base sm:text-lg">
                        By guiding practitioners through the certification
                        process, providing directories of colleges and certified
                        practitioners, and requiring high ethical standards, the
                        Brain Integration Institute helps to unify the brain
                        integration community and increase the standard for
                        quality care.
                    </p>
                </div>
            </div>

            {/* Board Members Section */}
            <div className="flex flex-col border bg-white border-[#D9D9D9] rounded-xl p-5 gap-10 w-full max-w-[90%] md:max-w-2xl mx-auto my-20">
                <h1 className="font-fira text-4xl text-center">
                    Board Members
                </h1>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-5 justify-center items-center">
                    <button onClick={() => navigate('/ron-bio')}>
                        <img
                            src={ron}
                            className="w-24 sm:w-32 md:w-40 object-cover"
                            alt="Ron"
                        />
                    </button>
                    <button onClick={() => navigate('/julissa-bio')}>
                        <img
                            src={julissa}
                            className="w-24 sm:w-32 md:w-40 object-cover"
                            alt="Julissa"
                        />
                    </button>
                    <button onClick={() => navigate('/tami-bio')}>
                        <img
                            src={tami}
                            className="w-24 sm:w-32 md:w-40 object-cover"
                            alt="Tami"
                        />
                    </button>
                    <button onClick={() => navigate('/steve-bio')}>
                        <img
                            src={steve}
                            className="w-24 sm:w-32 md:w-40 object-cover"
                            alt="Steve"
                        />
                    </button>
                    <button onClick={() => navigate('/terri-bio')}>
                        <img
                            src={terri}
                            className="w-24 sm:w-32 md:w-40 object-cover"
                            alt="Terri"
                        />
                    </button>

                    <button onClick={() => navigate('/debbie-bio')}>
                        <img
                            src={circleDebbie}
                            className="w-40 sm:w-40 md:w-40 object-cover"
                            alt="Debbie Luke"
                        />
                    </button>
                </div>
            </div>
            <Footer />
        </>
    );
};
