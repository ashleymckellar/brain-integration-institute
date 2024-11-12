// import banner from '../assets/icons/PractitionerBackground.png';
// import paleBanner from '../assets/icons/PaleGreenPractitionerBackground.png';
// import BrainIntegrationSeal from '../assets/icons/BrainIntegrationSeal.png';
import Nature from '../assets/images/Nature.png';
import { useAuth0 } from '@auth0/auth0-react';
// import { Link, useLocation } from 'react-router-dom';

export const Home = () => {

    const {
        loginWithRedirect,
     
    } = useAuth0();

    const handleLogin = async () => {
        await loginWithRedirect({
            authorizationParams: { redirect_uri: location.origin + '/profile' },
        });
    };
    return (
        <div className="bg-[#e6d5c5]">
            {/* Container for Nature image and overlay text */}
            <div className="relative w-full">
                <img src={Nature} className="w-full" alt="Nature Background" />

                {/* Blurred background only on this text overlay div */}
                <div className="absolute inset-0 flex flex-col justify-center items-center text-center gap-4 p-10 bg-white bg-opacity-10 backdrop-blur-lg rounded-2xl max-w-[35%] h-[400px] mt-40 ml-60">
                    <h1 className="text-white text-5xl font-fira">
                        Empowering Minds, Unlocking Potential
                    </h1>
                    <p className="text-white text-xl p-10 font-fira">
                        Helping you restore balance and improve brain function
                        naturally - no medications, no supplements, just
                        holistic integration for a better you.
                    </p>
                </div>
                <div className="flex flex-col gap-10 text-left pt-20 px-20">
                    <h1 className="font-fira text-4xl px-20">
                        What is Brain Integration?
                    </h1>
                    <p className="font-fira py-10 px-20">
                        Brain integration is a support service that assists in
                        relieving stress in the brain, helping to empower
                        children and adults to function at their best in
                        society. Struggling students, unproductive teenagers,
                        and overwhelmed parents can each benefit from brain
                        integration. Sometimes, mental clarity, reduction of
                        stress and noise in the mind, and other support services
                        can bring answers and solutions to those who are
                        unmotivated, impulsive, inattentive, unproductive,
                        scattered, non-adaptive, falling behind, lacking
                        concentration, struggling with memory, unable to stay on
                        task, etc. Brain integration can also serve as a doorway
                        to reducing the symptoms of various mental health
                        challenges. Brain integration uses light touch,
                        reflexes, movements, affirmations, and acupressure
                        points to help the brain and the body work together to
                        optimally function. This helps the individual be
                        self-empowered, connect to others, and find success in
                        their lives.
                    </p>
                </div>
                <div className="flex flex-col gap-10 pt-20 px-20 text-left">
                    <h1 className="font-fira text-4xl px-20">
                        Why Get Certified?
                    </h1>
                    <p className="font-fira py-10 px-20">
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
                </div>
                <div className="flex flex-col gap-10 text-left px-20 pt-20">
                    <h1 className="font-fira text-4xl px-20">
                        How Do You Get Certified?
                    </h1>
                    <p className="font-fira py-10 px-20">
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
                </div>
                <div className='flex justify-center mb-20 pb-20 pt-10'>
                    <button className="py-3 px-4 w-[200px] block transition duration-200 border-b-2 bg-green-500 hover:bg-green-500 rounded-2xl text-white mb-20" onClick={handleLogin}>
                        Get Certified
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Home;
