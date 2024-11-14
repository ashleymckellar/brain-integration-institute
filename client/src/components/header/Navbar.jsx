/* eslint-disable react-hooks/exhaustive-deps */
import { useContext, useEffect, useState } from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import { Link, useLocation } from 'react-router-dom';
import bell from '../../assets/icons/bell.png';
import placeholderProfilePic from '../../assets/icons/placeholderProfilePic.png';
import { CloudinaryContext } from '../../contexts';
import { Menu, X } from 'lucide-react';
import axios from 'axios';
import BrainIntegrationSeal from '../../assets/icons/BrainIntegrationSeal.png';

export const Navbar = () => {
    const {
        loginWithRedirect,
        logout,
        isAuthenticated,
        user,
        getAccessTokenSilently,
    } = useAuth0();
    const { imageUrl, getUserMetaData, userMetaData } =
        useContext(CloudinaryContext);

    const [isOpen, setIsOpen] = useState(false);
    const [isAdmin, setIsAdmin] = useState(false);
    const [isLargeScreen, setIsLargeScreen] = useState(
        window.innerWidth >= 768,
    );

    const handleLogin = async () => {
        await loginWithRedirect({
            authorizationParams: { redirect_uri: location.origin + '/profile' },
        });
    };

    const checkForAdmin = () => {
        if (userMetaData && userMetaData.isAdmin) {
            setIsAdmin(true);
        }
    };
    console.log('Is Admin:', isAdmin);
    console.log(userMetaData, 'user metadata');

    const getAuth0Token = async (targetAudience, scope) => {
        try {
            return await getAccessTokenSilently({
                audience:
                    targetAudience ||
                    `https://${import.meta.env.VITE_AUTH0_DOMAIN}/api/v2/`,
                scope: scope || 'read:roles',
                cacheMode: 'off',
            });
        } catch (error) {
            console.error('Error fetching token:', error);
        }
    };

    const toggleMenu = () => setIsOpen(!isOpen);

    const handleLogout = () => {
        logout();
        console.log('logged out');
    };

    useEffect(() => {
        if (user?.email) {
            getUserMetaData(user.email);
        }
    }, [user]);

    useEffect(() => {
        window.scrollTo(0, 0);
    }, [useLocation()]);

    useEffect(() => {
        checkForAdmin();
    }, [userMetaData]);

    // const fetchUserRoles = async () => {
    //     try {
    //         const token = await getAuth0Token(
    //             `https://${import.meta.env.VITE_AUTH0_DOMAIN}/api/v2/`,
    //             'read:roles',
    //         );
    //         if (token) {
    //             const userId = user.sub; // User ID from Auth0
    //             const response = await axios.get(
    //                 `https://${
    //                     import.meta.env.VITE_AUTH0_DOMAIN
    //                 }/api/v2/users/${userId}/roles`,
    //                 {
    //                     headers: {
    //                         Authorization: `Bearer ${token}`,
    //                     },
    //                 },
    //             );
    //             console.log('User Roles from Management API:', response.data);
    //         }
    //     } catch (error) {
    //         console.error('Error fetching user roles:', error);
    //     }
    // };

    // useEffect(() => {
    //     if (isAuthenticated && user) {
    //         fetchUserRoles();
    //     }
    // }, [isAuthenticated, user]);

    useEffect(() => {
        const handleResize = () => setIsLargeScreen(window.innerWidth >= 768);
        window.addEventListener('resize', handleResize);
        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    const renderLinks = () => {
        if (isAuthenticated) {
            return (
                <div className="flex justify-between pr-10">
                    <Link
                        className="py-3 px-4 w-full block transition duration-200 border-b-2 border-transparent hover:bg-green-500 rounded-2xl hover:text-white text-xl whitespace-nowrap"
                        to="/"
                    >
                        Home
                    </Link>
                    <Link
                        className="py-3 px-4 w-full block transition duration-200 border-b-2 border-transparent hover:bg-green-500 rounded-2xl hover:text-white text-xl whitespace-nowrap"
                        to="/about"
                    >
                        About Us
                    </Link>

                    <Link
                        className="py-3 px-4 w-full block transition duration-200 border-b-2 border-transparent hover:bg-green-500 rounded-2xl hover:text-white text-xl whitespace-nowrap"
                        to="/practitioner"
                    >
                        Find Practitioner
                    </Link>
                    <Link
                        className="py-3 px-4 w-full block transition duration-200 border-b-2 border-transparent hover:bg-green-500 rounded-2xl hover:text-white text-xl whitespace-nowrap"
                        to="/certification"
                    >
                        Certification
                    </Link>
                    {isAdmin && (
                        <Link
                            className="py-3 px-4 w-full block transition duration-200 border-b-2 border-transparent hover:bg-green-500 rounded-2xl hover:text-white text-xl whitespace-nowrap"
                            to="/admin"
                        >
                            Admin Dashboard
                        </Link>
                    )}
                    <Link
                        className="py-3 px-4 w-full block transition duration-200 border-b-2 border-transparent hover:bg-green-500 rounded-2xl hover:text-white text-xl whitespace-nowrap"
                        to="/contact-us"
                    >
                        Contact Us
                    </Link>
                    <button
                        className="py-2 px-10 transition duration-200 border-b-2 border-transparent hover:bg-red rounded-2xl hover:text-white text-xl whitespace-nowrap"
                        onClick={handleLogout}
                    >
                        Logout
                    </button>
                    <div className="flex space-x-2">
                        <img
                            className="h-[32px] w-[32px]"
                            src={bell}
                            alt="Notifications"
                        />
                        <Link to="/profile">
                            <img
                                className="h-[32px] w-[32px] rounded-full "
                                src={imageUrl || placeholderProfilePic}
                                alt="avatar"
                                style={{ minWidth: '32px', minHeight: '32px' }}
                            />
                        </Link>
                    </div>
                </div>
            );
        } else {
            return (
                <div className="flex justify-between">
                    <Link
                        to="/"
                        className="py-3 px-4 w-full block transition duration-200 border-b-2 border-transparent hover:bg-green-500 rounded-2xl hover:text-white text-xl whitespace-nowrap"
                    >
                        Home
                    </Link>
                    <Link
                        className="py-3 px-4 w-full block transition duration-200 border-b-2 border-transparent hover:bg-green-500 rounded-2xl hover:text-white text-xl whitespace-nowrap"
                        to="/about"
                    >
                        About Us
                    </Link>
                    <Link
                        className="py-3 px-4 w-full block transition duration-200 border-b-2 border-transparent hover:bg-green-500 rounded-2xl hover:text-white text-xl whitespace-nowrap"
                        to="/contact-us"
                    >
                        Contact Us
                    </Link>
                    <button
                        className="py-3 px-4 w-full block transition duration-200 border-b-2 border-transparent hover:bg-green-500 rounded-2xl hover:text-white text-xl whitespace-nowrap"
                        onClick={handleLogin}
                    >
                        Login
                    </button>
                </div>
            );
        }
    };

    return (
        <header className="bg-white w-full">
            <div className="flex items-center">
                <img src={BrainIntegrationSeal} className="pl-10 pt-10" />
                <nav className="flex items-center justify-between text-dark-gray p-4 w-full pt-20">
                    <div className="flex items-center justify-between w-full">
                        {/* Hamburger button for mobile view */}
                        {!isLargeScreen && (
                            <button
                                className="md:hidden flex items-center justify-center focus:outline-none"
                                onClick={toggleMenu}
                                aria-expanded={isOpen}
                                aria-label="Toggle menu"
                            >
                                {isOpen ? <X size={24} /> : <Menu size={24} />}
                            </button>
                        )}
                    </div>

                    <div
                        className={`${
                            isOpen || isLargeScreen ? 'flex' : 'hidden'
                        } flex-col md:flex md:flex-row items-center w-full justify-between`}
                    >
                        {renderLinks()}
                    </div>
                </nav>
            </div>
        </header>
    );
};
