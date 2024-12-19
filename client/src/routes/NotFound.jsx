import { Link } from 'react-router-dom';
import Brain404 from '../assets/images/brain404.png';

export const NotFound = () => {
    return (
        <div className="flex flex-col justify-center items-center px-4 sm:px-10 md:px-20 py-10 gap-10 min-h-screen w-full bg-mediumish-green">
            {/* 404 Title */}
            <h1 className="font-fira text-6xl sm:text-7xl md:text-8xl pb-12">404</h1>
            
            {/* Main Message */}
            <h1 className="font-fira text-lg sm:text-xl md:text-3xl text-center pb-6">
                Oops! It looks like you took a detour.
            </h1>
            
            {/* Subtext with Link */}
            <h2 className="font-fira text-md sm:text-lg md:text-2xl text-center pb-10">
                This page isn’t where your neurons were heading. Let’s get you
                back on track! Return to the homepage{' '}
                <span>
                    <Link to="/" className="hover:text-red text-blue">
                        here{' '}
                    </Link>
                </span>{' '}
                and reconnect the dots.
            </h2>
            
            {/* Brain Image */}
            <img 
                src={Brain404} 
                className="h-48 w-48 sm:h-64 sm:w-64 md:h-80 md:w-80 rounded-3xl mt-8" 
                alt="404 Brain Illustration" 
            />
        </div>
    );
};

export default NotFound;
