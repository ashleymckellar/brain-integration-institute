import { Link } from 'react-router-dom';
import Brain404 from '../assets/images/brain404.png';

export const NotFound = () => {
  
    return (
        <div className="flex flex-col justify-center items-center gap-10 pt-20 min-h-screen w-full bg-mediumish-green">
            <h1 className="font-fira text-8xl pb-20">404</h1>
            <h1 className="font-fira text-3xl">
                Oops! It looks like you took a detour
            </h1>

            <h2 className="font-fira text-3xl">
                This page isn’t where your neurons were heading. Let’s get you
                back on track! Return to the homepage{' '}
                <span>
                    <Link to="/" className="hover:text-red text-blue">
                        here{' '}
                    </Link>
                </span>{' '}
                and reconnect the dots.
            </h2>
            <img src={Brain404} className="h-[500px] w-[500px] rounded-3xl" />
        </div>
    );
};

export default NotFound;
