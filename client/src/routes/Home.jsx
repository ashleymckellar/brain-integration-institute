import { useAuth0 } from '@auth0/auth0-react';
import wheat from '../assets/images/wheat-fields-4439896_1920.jpg';
import { Footer } from '../components/Footer.jsx';
import transparentBrain from '../assets/images/transparent-brain.png';
import smilingWoman from '../assets/images/smilingwoman.png';
import standingWoman from '../assets/images/standing-smiling-woman.png'
import graduateBoy from '../assets/images/graduateboy.png';
import quotationMarks from '../assets/icons/quotationMarks.png';
import girlBackpack from '../assets/images/girl-backpack.png'
// import readingWoman from '../assets/images/readingwoman.png';
// import curlsGirl from '../assets/images/curlsgirl.png';
// import polskaMan from '../assets/images/polskaman.png';
// import bowtieBoy from '../assets/images/bowtieboy.png';
// import motorcycleMan from '../assets/images/motorcycleman.png';
// import beachMan from '../assets/images/beachman.png';
// import glassesGirl from '../assets/images/glassesgirl.png';
// import blondeBoy from '../assets/images/blondeboy.png';

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
                {/* Container for Nature Image and Overlay */}
                <div
                    className="h-[70vh] bg-cover bg-center bg-fixed flex flex-col"
                    style={{
                        backgroundImage: `url(${wheat})`,
                    }}
                >
                    {/* Transparent Div Over the Image */}
                    <div className="  flex flex-col justify-center items-center text-center gap-4 p-30 pt-10 ml-30 bg-white bg-opacity-10 backdrop-blur-lg rounded-2xl max-w-[35%] mx-auto h-[400px] mt-40">
                        <h1 className="text-white text-3xl sm:text-4xl lg:text-5xl font-fira">
                            Empowering Minds, Unlocking Potential
                        </h1>
                        <p className="text-white text-sm sm:text-lg lg:text-xl font-fira px-4">
                            Helping you restore balance and improve brain
                            function naturally - no medications, no supplements,
                            just holistic integration for a better you.
                        </p>
                    </div>
                </div>

                {/* Scrollable Content Below */}
                <div className="px-4 sm:px-10 lg:px-20 py-10 bg-background-peach">
                    <section className="flex flex-col lg:flex-row gap-6 items-center lg:items-start">
                        <div className="flex flex-col lg:w-2/3 gap-6">
                            {/* Text Content */}
                            <h1 className="font-fira text-2xl sm:text-3xl lg:text-4xl text-start pl-[130px]">
                                What is Brain Integration?
                            </h1>
                            <p className="font-fira text-sm sm:text-base lg:text-lg text-start pl-[130px]">
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
                                <br></br>
                                <br></br>
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
                                className="w-[800px] h-[469px]"
                            />
                        </div>
                    </section>
                    <section>
                        <div className="flex gap-10 mt-10 px-20">
                            <div className="flex flex-col justify-center items-start border border-white rounded-md w-[423px] h-[644px] bg-gradient-custom-blue gap-10">
                                <img
                                    src={quotationMarks}
                                    alt="quotation marks"
                                    className="pt-[50px] flex justify-center]"
                                />
                                <p className="px-[60px] text-xl">
                                    I went from reading on a first grade level
                                    to on grade level after one session.
                                </p>
                                <img src={quotationMarks} />
                                <div className="flex justify-end pl-50">
                                    <img
                                        src={girlBackpack}
                                        alt="Happy Boy"
                                        className="w-[200px] h-[300px] "
                                    />
                                </div>
                                {/* <button className="border border-black rounded-xl m-10 p-2 bg-white">
                                Read More
                            </button> */}
                            </div>
                            <div className="flex flex-col justify-center items-center border border-white rounded-md bg-gradient-custom-blue w-[423px] h-[644px] gap-10">
                                <img src={quotationMarks} />
                                <p className="px-[30px] text-xl">
                                    My parents don’t worry about me getting left
                                    behind anymore.
                                </p>
                                <img src={quotationMarks} />
                                <div className="flex justify-center">
                                    <img
                                        src={graduateBoy}
                                        alt="Graduate Boy"
                                        className="w-[200px] h-[300px] border-black rounded-full"
                                    />
                                </div>
                                {/* <button className="border border-black rounded-xl m-10 p-2 bg-white">
                                Read More
                            </button> */}
                            </div>
                            <div className="flex flex-col justify-center items-center border border-white rounded-md bg-gradient-custom-blue w-[423px] h-[644px]">
                                <img src={quotationMarks} />
                                <p className="px-[30px] text-xl font-fira font-italic">
                                    My anxiety doesn’t control me anymore.
                                </p>
                                <img src={quotationMarks} />
                                <div className="flex justify-center">
                                    <img
                                        src={standingWoman}
                                        alt="Smiling Woman"
                                        className="w-[300px] h-[450px] border-black rounded-full"
                                    />
                                </div>
                                {/* <button className="border border-black rounded-xl m-10 p-2 bg-white">
                                Read More
                            </button> */}
                            </div>
                        </div>
                    </section>
                    {/* <section>
                    <div className="flex">
                        <img src={blondeBoy} alt="blonde boy" />
                        <img src={beachMan} alt="beach man" />
                        <img src={motorcycleMan} alt="motorcycle man" />
                        <img src={glassesGirl} alt="glasses girl" />
                    </div>
                    <div className="flex justify-center pt-[200px]">
                        <h1 className="text-5xl px-[500px] text-center">
                            Real Stories, Real Success - Click to Explore Their
                            Journeys!
                        </h1>
                    </div>
                </section> */}

                    <section className="flex flex-col gap-6 pt-10">
                        <h1 className="font-fira text-2xl sm:text-3xl lg:text-4xl text-center">
                            Why Get Certified?
                        </h1>
                        <p className="font-fira text-sm sm:text-base lg:text-lg text-center px-[500px]">
                            At the Brain Integration Institute, we strive to
                            strengthen individuals, families, and communities
                            through establishing a reliable system of support
                            for brain integration practitioners and clients
                            alike. Since we believe that all individuals deserve
                            the highest quality of service possible, we also
                            maintain a certification program to help individuals
                            and families know which practitioners meet our
                            standards of practice and knowledge.
                        </p>
                    </section>

                    <section className="flex flex-col gap-6 pt-10">
                        <h1 className="font-fira text-2xl sm:text-3xl lg:text-4xl text-center">
                            How Do You Get Certified?
                        </h1>
                        <p className="font-fira text-sm sm:text-base lg:text-lg text-center px-[500px]">
                            The certification process is designed to ensure
                            safety, professionalism, and expertise. After 500
                            hours of educational training, practitioners will be
                            asked to demonstrate competency in a brain
                            integration assessment and complete 200 clinical
                            hours in a brain integration or kinesiology setting.
                            Additionally, practitioners are required to take
                            safety courses in CPR and first aid, maintain a
                            background check, keep updated insurance, pay a
                            small fee, and provide current contact information.
                            Give yourself a boost in this growing field and meet
                            the highest national standards by getting brain
                            integration certified.
                        </p>
                    </section>

                    <div className="flex justify-center pt-10">
                        <button
                            className="py-3 px-4 w-[200px] block transition duration-200 bg-green-500 hover:bg-green-600 rounded-2xl text-white"
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
