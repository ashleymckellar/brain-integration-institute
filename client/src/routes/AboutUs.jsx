/* eslint-disable react/no-unescaped-entities */
import paleBanner from '../assets/icons/PaleGreenPractitionerBackground.png';
import banner from '../assets/icons/PractitionerBackground.png';
import { Navbar } from '../components/header/Navbar';

export const AboutUs = () => {
    return (
        <>
        <Navbar />
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
            <div className="flex flex-col gap-10 text-center justify-center">
                <h2>About Us</h2>
                <p>
                    Welcome to our Brain Integration App, where we believe in
                    unlocking the full potential of the mind. Our mission is to
                    enhance cognitive function, promote mental well-being, and
                    empower individuals through innovative technology.
                </p>
                <p>
                    At the heart of our approach lies the science of
                    neuroplasticity, the brain's remarkable ability to
                    reorganize itself by forming new neural connections
                    throughout life. Our team of neuroscientists, psychologists,
                    and tech enthusiasts have developed a comprehensive platform
                    that integrates mindfulness practices, cognitive training,
                    and personalized assessments.
                </p>
                <h3>Our Philosophy</h3>
                <p>
                    In an ever-evolving world, mental agility and emotional
                    resilience are paramount. We strive to create a supportive
                    environment that fosters growth and transformation. Our app
                    offers a variety of features designed to challenge your
                    brain, improve focus, and enhance memory. With engaging
                    activities rooted in cognitive science, users can explore
                    the vast landscapes of their minds.
                </p>
                <h3>Why Choose Us?</h3>
                <ul>
                    <li>
                        <strong>Evidence-Based Practices</strong>: Our methods
                        are grounded in the latest research on brain health and
                        cognitive enhancement.
                    </li>
                    <li>
                        <strong>Personalized Experience</strong>: We tailor our
                        programs to meet the unique needs and goals of each
                        user, ensuring a journey of self-discovery.
                    </li>
                    <li>
                        <strong>Community and Support</strong>: Join a vibrant
                        community of like-minded individuals, sharing
                        experiences and tips to boost mental performance.
                    </li>
                </ul>
                <p>
                    Embrace the power of your mind with our Brain Integration
                    App. Together, let’s embark on a journey towards greater
                    awareness, sharper focus, and a deeper understanding of the
                    human experience.
                </p>
            </div>
        </>
    );
};
