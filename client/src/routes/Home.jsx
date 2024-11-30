// // import Nature from '../assets/images/Nature.png';
// // import { useAuth0 } from '@auth0/auth0-react';
// // import { Footer } from '../components/Footer.jsx'

// // export const Home = () => {
// //     const { loginWithRedirect } = useAuth0();

// //     const handleLogin = async () => {
// //         await loginWithRedirect({
// //             authorizationParams: { redirect_uri: location.origin + '/profile' },
// //         });
// //     };
// //     return (
// //         <div className="bg-background-tan">
// //             {/* Container for Nature image and overlay text */}
// //             <div className="relative w-full">
// //                 <img
// //                     src={Nature}
// //                     className="w-full h-[70vh] object-cover"
// //                     alt="Nature Background"
// //                 />

// //                 {/* Blurred background only on this text overlay div */}
// //                 <div className="absolute inset-0 flex flex-col justify-center items-center text-center gap-4 p-5 bg-white bg-opacity-10 backdrop-blur-lg rounded-2xl max-w-[55%] h-[400px] mt-40 ml-60">
// //                     <h1 className="text-white text-3xl sm:text-4xl lg:text-5xl font-fira">
// //                         Empowering Minds, Unlocking Potential

// //                     </h1>
// //                     <p className="text-white text-sm sm:text-lg lg:text-xl font-fira px-4">
// //                         Helping you restore balance and improve brain function
// //                         naturally - no medications, no supplements, just
// //                         holistic integration for a better you.
// //                     </p>
// //                 </div>
// //                 <div className="px-4 sm:px-10 lg:px-20 py-10">
// //                     <section className="flex flex-col gap-6">
// //                         <h1 className="font-fira text-2xl sm:text-3xl lg:text-4xl">
// //                             What is Brain Integration?
// //                         </h1>
// //                         <p className="font-fira text-sm sm:text-base lg:text-lg">
// //                             Brain integration is a support service that assists
// //                             in relieving stress in the brain, helping to empower
// //                             children and adults to function at their best in
// //                             society. Struggling students, unproductive
// //                             teenagers, and overwhelmed parents can each benefit
// //                             from brain integration. Sometimes, mental clarity,
// //                             reduction of stress and noise in the mind, and other
// //                             support services can bring answers and solutions to
// //                             those who are unmotivated, impulsive, inattentive,
// //                             unproductive, scattered, non-adaptive, falling
// //                             behind, lacking concentration, struggling with
// //                             memory, unable to stay on task, etc. Brain
// //                             integration can also serve as a doorway to reducing
// //                             the symptoms of various mental health challenges.
// //                             Brain integration uses light touch, reflexes,
// //                             movements, affirmations, and acupressure points to
// //                             help the brain and the body work together to
// //                             optimally function. This helps the individual be
// //                             self-empowered, connect to others, and find success
// //                             in their lives.
// //                         </p>
// //                     </section>

// //                     <section className="flex flex-col gap-6 pt-10">
// //                         <h1 className="font-fira text-2xl sm:text-3xl lg:text-4xl">
// //                             {' '}
// //                             Why Get Certified?
// //                         </h1>
// //                         <p className="font-fira text-sm sm:text-base lg:text-lg">
// //                             At the Brain Integration Institute, we strive to
// //                             strengthen individuals, families, and communities
// //                             through establishing a reliable system of support
// //                             for brain integration practitioners and clients
// //                             alike. Since we believe that all individuals deserve
// //                             the highest quality of service possible, we also
// //                             maintain a certification program to help individuals
// //                             and families know which practitioners meet our
// //                             standards of practice and knowledge.
// //                         </p>
// //                     </section>
// //                     <section className="flex flex-col gap-6 pt-10">
// //                         <h1 className="font-fira text-2xl sm:text-3xl lg:text-4xl">
// //                             How Do You Get Certified?
// //                         </h1>
// //                         <p className="font-fira text-sm sm:text-base lg:text-lg">
// //                             The certification process is designed to ensure
// //                             safety, professionalism, and expertise. After 500
// //                             hours of educational training, practitioners will be
// //                             asked to demonstrate competency in a brain
// //                             integration assessment and complete 200 clinical
// //                             hours in a brain integration or kinesiology setting.
// //                             Additionally, practitioners are required to take
// //                             safety courses in CPR and first aid, maintain a
// //                             background check, keep updated insurance, pay a
// //                             small fee, and provide current contact information.
// //                             Give yourself a boost in this growing field and meet
// //                             the highest national standards by getting brain
// //                             integration certified.
// //                         </p>
// //                     </section>
// //                     <div className="flex justify-center pt-10">
// //                         <button
// //                             className="py-3 px-4 w-[200px] block transition duration-200 bg-green-500 hover:bg-green-600 rounded-2xl text-white"
// //                             onClick={handleLogin}
// //                         >
// //                             Get Certified
// //                         </button>
// //                     </div>
// //                 </div>
// //             </div>
// //             <Footer />
// //         </div>
// //     );
// // };

// // export default Home;

// import Nature from '../assets/images/Nature.png';
// import { useAuth0 } from '@auth0/auth0-react';
// import { Footer } from '../components/Footer.jsx';

// export const Home = () => {
//     const { loginWithRedirect } = useAuth0();

//     const handleLogin = async () => {
//         await loginWithRedirect({
//             authorizationParams: { redirect_uri: location.origin + '/profile' },
//         });
//     };

//     return (
//         <div className="bg-background-tan">
//             {/* Static Background */}
//             <div
//                 className="h-[70vh] bg-cover bg-center bg-fixed"
//                 style={{
//                     backgroundImage: `url(${Nature})`,
//                 }}
//             >
//                 {/* Empty Div - acts as a placeholder */}
//             </div>

//             {/* Scrollable Content */}
//             <div className="relative -mt-[70vh] pt-[70vh]">
//                 <div className="flex flex-col justify-center items-center text-center gap-4 p-5 bg-white bg-opacity-10 backdrop-blur-lg rounded-2xl max-w-[55%] mx-auto h-[400px] mb-10">
//                     <h1 className="text-white text-3xl sm:text-4xl lg:text-5xl font-fira">
//                         Empowering Minds, Unlocking Potential
//                     </h1>
//                     <p className="text-white text-sm sm:text-lg lg:text-xl font-fira px-4">
//                         Helping you restore balance and improve brain function
//                         naturally - no medications, no supplements, just
//                         holistic integration for a better you.
//                     </p>
//                 </div>

//                 <div className="px-4 sm:px-10 lg:px-20 py-10">
//                     <section className="flex flex-col gap-6">
//                         <h1 className="font-fira text-2xl sm:text-3xl lg:text-4xl">
//                             What is Brain Integration?
//                         </h1>
//                         <p className="font-fira text-sm sm:text-base lg:text-lg">
//                             Brain integration is a support service that assists
//                             in relieving stress in the brain, helping to empower
//                             children and adults to function at their best in
//                             society...
//                         </p>
//                     </section>

//                     <section className="flex flex-col gap-6 pt-10">
//                         <h1 className="font-fira text-2xl sm:text-3xl lg:text-4xl">
//                             Why Get Certified?
//                         </h1>
//                         <p className="font-fira text-sm sm:text-base lg:text-lg">
//                             At the Brain Integration Institute, we strive to
//                             strengthen individuals, families, and communities...
//                         </p>
//                     </section>

//                     <section className="flex flex-col gap-6 pt-10">
//                         <h1 className="font-fira text-2xl sm:text-3xl lg:text-4xl">
//                             How Do You Get Certified?
//                         </h1>
//                         <p className="font-fira text-sm sm:text-base lg:text-lg">
//                             The certification process is designed to ensure
//                             safety, professionalism, and expertise...
//                         </p>
//                     </section>

//                     <div className="flex justify-center pt-10">
//                         <button
//                             className="py-3 px-4 w-[200px] block transition duration-200 bg-green-500 hover:bg-green-600 rounded-2xl text-white"
//                             onClick={handleLogin}
//                         >
//                             Get Certified
//                         </button>
//                     </div>
//                 </div>
//             </div>
//             <Footer />
//         </div>
//     );
// };

import Nature from '../assets/images/Nature.png';
import { useAuth0 } from '@auth0/auth0-react';
import wheat from '../assets/images/wheat-fields-4439896_1920.jpg';
import { Footer } from '../components/Footer.jsx';
import transparentBrain from '../assets/images/transparent-brain.png';

export const Home = () => {
    const { loginWithRedirect } = useAuth0();

    const handleLogin = async () => {
        await loginWithRedirect({
            authorizationParams: { redirect_uri: location.origin + '/profile' },
        });
    };

    return (
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
                        Helping you restore balance and improve brain function
                        naturally - no medications, no supplements, just
                        holistic integration for a better you.
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
                            Brain integration is a support service that assists
                            in relieving stress in the brain, helping to empower
                            children and adults to function at their best in
                            society. Struggling students, unproductive
                            teenagers, and overwhelmed parents can each benefit
                            from brain integration. Sometimes, mental clarity,
                            reduction of stress and noise in the mind, and other
                            support services can bring answers and solutions to
                            those who are unmotivated, impulsive, inattentive,
                            unproductive, scattered, non-adaptive, falling
                            behind, lacking concentration, struggling with
                            memory, unable to stay on task, etc. Brain
                            integration can also serve as a doorway to reducing
                            the symptoms of various mental health challenges.
                            Brain integration uses light touch, reflexes,
                            movements, affirmations, and acupressure points to
                            help the brain and the body work together to
                            optimally function. This helps the individual be
                            self-empowered, connect to others, and find success
                            in their lives.
                        </p>
                    </div>
                    <div className="lg:w-1/3 flex justify-center lg:justify-end">
                        <img
                            src={transparentBrain}
                            alt="brain image"
                            className="w-[637px] h-[469px]"
                        />
                    </div>
                </section>

                <section className="flex flex-col gap-6 pt-10">
                    <h1 className="font-fira text-2xl sm:text-3xl lg:text-4xl text-center">
                        Why Get Certified?
                    </h1>
                    <p className="font-fira text-sm sm:text-base lg:text-lg text-center px-[500px]">
                        At the Brain Integration Institute, we strive to
                        strengthen individuals, families, and communities
                        through establishing a reliable system of support for
                        brain integration practitioners and clients alike. Since
                        we believe that all individuals deserve the highest
                        quality of service possible, we also maintain a
                        certification program to help individuals and families
                        know which practitioners meet our standards of practice
                        and knowledge.
                    </p>
                </section>

                <section className="flex flex-col gap-6 pt-10">
                    <h1 className="font-fira text-2xl sm:text-3xl lg:text-4xl text-center">
                        How Do You Get Certified?
                    </h1>
                    <p className="font-fira text-sm sm:text-base lg:text-lg text-center px-[500px]">
                        The certification process is designed to ensure safety,
                        professionalism, and expertise. After 500 hours of
                        educational training, practitioners will be asked to
                        demonstrate competency in a brain integration assessment
                        and complete 200 clinical hours in a brain integration
                        or kinesiology setting. Additionally, practitioners are
                        required to take safety courses in CPR and first aid,
                        maintain a background check, keep updated insurance, pay
                        a small fee, and provide current contact information.
                        Give yourself a boost in this growing field and meet the
                        highest national standards by getting brain integration
                        certified.
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
        <Footer />
        </div>
    );
};
