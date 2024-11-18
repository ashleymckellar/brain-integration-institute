

import { useEffect, useState, useContext } from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import { Link } from 'react-router-dom';
import { slide as BurgerMenu } from 'react-burger-menu';
import bell from '../../assets/icons/bell.png';
import placeholderProfilePic from '../../assets/icons/placeholderProfilePic.png';
import BrainIntegrationSeal from '../../assets/icons/BrainIntegrationSeal.png';
import { CloudinaryContext } from '../../contexts';

export const Navbar = () => {
    const {
        loginWithRedirect,
        logout,
        isAuthenticated,
        user,
    } = useAuth0();
    const { imageUrl, getUserMetaData, userMetaData } =
        useContext(CloudinaryContext);

    const [isLargeScreen, setIsLargeScreen] = useState(window.innerWidth >= 768);
    const [isAdmin, setIsAdmin] = useState(false);

    const handleLogin = async () => {
        await loginWithRedirect({
            authorizationParams: { redirect_uri: window.location.origin + '/profile' },
        });
    };

    const handleLogout = () => {
        logout();
    };

    const checkForAdmin = () => {
        if (userMetaData && userMetaData.isAdmin) {
            setIsAdmin(true);
        }
    };

    useEffect(() => {
        if (user?.email) {
            getUserMetaData(user.email);
        }
    }, [user]);

    useEffect(() => {
        checkForAdmin();
    }, [userMetaData]);

    useEffect(() => {
        const handleResize = () => setIsLargeScreen(window.innerWidth >= 768);
        window.addEventListener('resize', handleResize);
        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    const renderLinks = () => (
        <div className={`flex ${isLargeScreen ? 'flex-row space-x-4' : 'flex-col justify-center items-center gap-3'}`}>
            <Link to="/" className="py-2 px-4 hover:bg-green-500 rounded-lg hover:text-white">
                Home
            </Link>
            <Link to="/about" className="py-2 px-4 hover:bg-green-500 rounded-lg hover:text-white">
                About Us
            </Link>
            <Link to="/practitioner" className="py-2 px-4 hover:bg-green-500 rounded-lg hover:text-white">
                Find Practitioner
            </Link>
            <Link to="/certification" className="py-2 px-4 hover:bg-green-500 rounded-lg hover:text-white">
                Certification
            </Link>
            {isAdmin && (
                <Link to="/admin" className="py-2 px-4 hover:bg-green-500 rounded-lg hover:text-white">
                    Admin Dashboard
                </Link>
            )}
            <Link to="/contact-us" className="py-2 px-4 hover:bg-green-500 rounded-lg hover:text-white">
                Contact Us
            </Link>
            {isAuthenticated ? (
                <button
                    onClick={handleLogout}
                    className="py-2 px-4 hover:bg-red rounded-lg hover:text-white"
                >
                    Logout
                </button>
            ) : (
                <button
                    onClick={handleLogin}
                    className="py-2 px-4 hover:bg-green-500 rounded-lg hover:text-white"
                >
                    Login
                </button>
            )}
        </div>
    );

    return (
        <header className="bg-white flex flex-col w-full">
            <div className="flex items-center justify-between px-4 py-2">
                <img src={BrainIntegrationSeal} alt="Logo" className="h-25" />
                {isLargeScreen ? (
                    <nav className="flex items-center space-x-6">{renderLinks()}</nav>
                ) : (
                    <BurgerMenu right>
                        <div className="flex flex-col justify-center space-y-2">{renderLinks()}</div>
                       
                    </BurgerMenu>
                )}
            </div>
        </header>
    );
};


