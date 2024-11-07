import banner from '../assets/icons/PractitionerBackground.png';
import paleBanner from '../assets/icons/PaleGreenPractitionerBackground.png';

export const Home = () => {
    return (
        <div>
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
                    <h1 className="text-white text-3xl sm:text-xl md:text-4xl lg:text-5xl font-fenix font-normal">
                        Brain Integration Institute
                    </h1>
                </div>
            </div>
           
        </div>
    );
};

export default Home
