import { useAuth0 } from '@auth0/auth0-react';
import wheat from '../assets/images/wheat-fields-4439896_1920.jpg';
import { Footer } from '../components/Footer.jsx';
import transparentBrain from '../assets/images/transparent-brain.png';
import standingWoman from '../assets/images/standing-smiling-woman.png';
import graduateBoy from '../assets/images/graduateboy.png';
import quotationMarks from '../assets/icons/quotationMarks.png';
import girlBackpack from '../assets/images/girl-backpack.png';

export const Home = () => {
    const { loginWithRedirect } = useAuth0();

    const handleLogin = async () => {
        await loginWithRedirect({
            authorizationParams: { redirect_uri: location.origin + '/profile' },
        });
    };

    return (
        <>
            <div className="bg-background-tan">
                {/* Hero Section */}
                <div
                    className="h-[70vh] bg-cover bg-center bg-fixed flex flex-col"
                    style={{
                        backgroundImage: `url(${wheat})`,
                    }}
                >
                    <div className="flex flex-col justify-center items-center text-center gap-4 p-6 sm:p-10 lg:p-20 bg-white bg-opacity-10 backdrop-blur-lg rounded-2xl max-w-[90%] sm:max-w-[70%] lg:max-w-[35%] mx-auto h-auto lg:h-[400px] mt-20 lg:mt-40">
                        <h1 className="text-white text-xl sm:text-3xl lg:text-5xl font-fira">
                            Empowering Minds, Unlocking Potential
                        </h1>
                        <p className="text-white text-xs sm:text-sm lg:text-lg font-fira px-4">
                            Helping you restore balance and improve brain
                            function naturally - no medications, no supplements,
                            just holistic integration for a better you.
                        </p>
                    </div>
                </div>

                {/* Scrollable Content */}
                <div className="px-4 sm:px-10 lg:px-20 py-10 bg-background-peach">
                    <section className="flex flex-col lg:flex-row gap-6 items-center lg:items-start">
                        <div className="flex flex-col lg:w-2/3 gap-6">
                            <h1 className="font-fira text-2xl sm:text-3xl lg:text-4xl text-center lg:text-start">
                                What is Brain Integration?
                            </h1>
                            <p className="font-fira text-sm sm:text-base lg:text-lg text-justify lg:text-start">
                                Brain integration is a support service that
                                assists in relieving stress in the brain,
                                helping to empower children and adults to
                                function at their best in society. Struggling
                                students, unproductive teenagers, and
                                overwhelmed parents can each benefit from brain
                                integration. Sometimes, mental clarity,
                                reduction of stress and noise in the mind, and
                                other support services can bring answers and
                                solutions to those who are unmotivated,
                                impulsive, inattentive, unproductive, scattered,
                                non-adaptive, falling behind, lacking
                                concentration, struggling with memory, unable to
                                stay on task, etc. Brain integration can also
                                serve as a doorway to reducing the symptoms of
                                various mental health challenges.
                                <br />
                                <br />
                                Brain integration uses light touch, reflexes,
                                movements, affirmations, and acupressure points
                                to help the brain and the body work together to
                                optimally function. This helps the individual be
                                self-empowered, connect to others, and find
                                success in their lives.
                            </p>
                        </div>
                        <div className="flex justify-center lg:justify-end">
                            <img
                                src={transparentBrain}
                                alt="brain image"
                                className="w-full sm:w-2/3 lg:w-[800px] h-auto"
                            />
                        </div>
                    </section>

                    <section>
                        <div className="flex flex-col lg:flex-row gap-10 mt-10 px-4 sm:px-10 lg:px-20">
                            {[
                                {
                                    text: "I went from reading on a first grade level to on grade level after one session.",
                                    img: girlBackpack,
                                },
                                {
                                    text: "My parents don’t worry about me getting left behind anymore.",
                                    img: graduateBoy,
                                },
                                {
                                    text: "My anxiety doesn’t control me anymore.",
                                    img: standingWoman,
                                },
                            ].map((testimonial, index) => (
                                <div
                                    key={index}
                                    className="flex flex-col justify-center items-center border border-white rounded-md w-full sm:w-3/4 lg:w-[423px] h-auto lg:h-[644px] bg-gradient-custom-blue gap-6 p-4"
                                >
                                    <img
                                        src={quotationMarks}
                                        alt="quotation marks"
                                        className="w-8 sm:w-12"
                                    />
                                    <p className="text-sm sm:text-base lg:text-xl px-4 text-center">
                                        {testimonial.text}
                                    </p>
                                    <img
                                        src={testimonial.img}
                                        alt="Testimonial image"
                                        className="w-40 sm:w-48 lg:w-[200px] h-auto rounded-full"
                                    />
                                </div>
                            ))}
                        </div>
                    </section>

                    {/* Certification Sections */}
                    {[
                        {
                            title: "Why Get Certified?",
                            content:
                                "At the Brain Integration Institute, we strive to strengthen individuals, families, and communities through establishing a reliable system of support for brain integration practitioners and clients alike. Since we believe that all individuals deserve the highest quality of service possible, we also maintain a certification program to help individuals and families know which practitioners meet our standards of practice and knowledge.",
                        },
                        {
                            title: "How Do You Get Certified?",
                            content:
                                "The certification process is designed to ensure safety, professionalism, and expertise. After 500 hours of educational training, practitioners will be asked to demonstrate competency in a brain integration assessment and complete 200 clinical hours in a brain integration or kinesiology setting. Additionally, practitioners are required to take safety courses in CPR and first aid, maintain a background check, keep updated insurance, pay a small fee, and provide current contact information. Give yourself a boost in this growing field and meet the highest national standards by getting brain integration certified.",
                        },
                    ].map((section, index) => (
                        <section key={index} className="flex flex-col gap-6 pt-10">
                            <h1 className="font-fira text-xl sm:text-2xl lg:text-3xl text-center">
                                {section.title}
                            </h1>
                            <p className="font-fira text-sm sm:text-base lg:text-lg text-justify sm:text-center lg:text-justify px-4 sm:px-10 lg:px-[500px]">
                                {section.content}
                            </p>
                        </section>
                    ))}

                    <div className="flex justify-center pt-10">
                        <button
                            className="py-3 px-6 w-full sm:w-[200px] bg-green-500 hover:bg-green-600 rounded-2xl text-white transition duration-200"
                            onClick={handleLogin}
                        >
                            Get Certified
                        </button>
                    </div>
                </div>
            </div>
            <Footer />
        </>
    );
};
