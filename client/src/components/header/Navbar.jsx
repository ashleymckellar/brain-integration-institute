/* eslint-disable no-unused-vars */


import { useEffect, useState, useContext } from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import { Link } from 'react-router-dom';
import { slide as BurgerMenu } from 'react-burger-menu';
import bell from '../../assets/icons/bell.png';
import placeholderProfilePic from '../../assets/icons/placeholderProfilePic.png';
import BrainIntegrationSeal from '../../assets/icons/BrainIntegrationSealCropped.png';
import { CloudinaryContext } from '../../contexts';
import { UserContext } from '../../contexts';
import { Notifications } from '../../routes/Notifications.jsx';

export const Navbar = () => {
    const { loginWithRedirect, logout, isAuthenticated, user } = useAuth0();
    const { imageUrl, getUserMetaData, userMetaData } =
        useContext(CloudinaryContext);

    const [isLargeScreen, setIsLargeScreen] = useState(
        window.innerWidth >= 768,
    );
    const [isAdmin, setIsAdmin] = useState(false);
    const [burgerMenuOpen, setBurgerMenuOpen] = useState(false);
    const { fetchNotifications, activeNotifications, markNotificationAsRead } =
        useContext(UserContext);
    const [showDropdown, setShowDropdown] = useState(false);
    const [isNotificationDrawerOpen, setIsNotificationDrawerOpen] =
        useState(false);
        const [resizeKey, setResizeKey] = useState(0);
        const [isReady, setIsReady] = useState(false);

    const handleLogin = async () => {
        await loginWithRedirect({
            authorizationParams: {
                redirect_uri: window.location.origin + '/profile',
            },
        });
    };


    useEffect(() => {
        console.log('Notification Drawer State:', isNotificationDrawerOpen);
    }, [isNotificationDrawerOpen]);

    const handleLinkClick = () => {
        setBurgerMenuOpen(false);
    };

    // useEffect(() => {
    //     fetchNotifications();
    // }, []);

    const handleLogout = () => {
        logout();
    };

 

    const checkForAdmin = () => {
        if (userMetaData && userMetaData.isAdmin) {
            setIsAdmin(true);
        }
    };

    console.log(activeNotifications, 'active not')

    const filteredNotifications = activeNotifications.reduce(
        (acc, notification) => {
            const existing = acc.find(
                (item) => item.category === notification.category,
            );
            if (
                !existing ||
                new Date(notification.timestamp) > new Date(existing.timestamp)
            ) {
                return acc
                    .filter((item) => item.category !== notification.category)
                    .concat(notification);
            }
            return acc;
        },
        [],
    );

    const handleNotificationsClick = async () => {
        console.log('notifications click')
        try {
            setIsNotificationDrawerOpen((prev) => !prev);
            setBurgerMenuOpen(false);
            await fetchNotifications();
            console.log('notifications click')
        } catch (error) {
            console.error('Error fetching notifications:', error);
        }
    };

    useEffect(() => {
        if (user?.email) {
            getUserMetaData(user.email);
        }
    }, []);

    useEffect(() => {
        checkForAdmin();
    }, [userMetaData]);

    useEffect(() => {
        const handleResize = () => setIsLargeScreen(window.innerWidth >= 768);
        handleResize();
        setIsReady(true); 
        window.addEventListener('resize', handleResize);
        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    if (!isReady) return null;
    const renderLinks = () => (
        <div
            className={`flex ${
                isLargeScreen
                    ? 'flex-row space-x-4'
                    : 'flex-col justify-center items-center gap-3'
            }`}
        >
            <Link
                to="/"
                onClick={handleLinkClick}
                className="py-2 px-4 hover:bg-green-500 rounded-lg hover:text-white"
            >
                Home
            </Link>
            <Link
                to="/about"
                onClick={handleLinkClick}
                className="py-2 px-4 hover:bg-green-500 rounded-lg hover:text-white"
            >
                About Us
            </Link>
            <Link
                to="/practitioner"
                onClick={handleLinkClick}
                className="py-2 px-4 hover:bg-green-500 rounded-lg hover:text-white"
            >
                Find Practitioner
            </Link>
            {isAuthenticated && (
            <Link
                to="/certification"
                onClick={handleLinkClick}
                className="py-2 px-4 hover:bg-green-500 rounded-lg hover:text-white"
            >
                Certification
            </Link>
            )}
            {isAdmin && (
                <div className="dropdown-container">
                    <button
                        onClick={() => setShowDropdown((prev) => !prev)}
                        className="py-2 px-4 hover:bg-green-500 rounded-lg hover:text-white w-full text-left"
                    >
                        Admin Dashboard
                    </button>
                    {showDropdown && (
                        <ul className="dropdown-menu ml-4 mt-2 space-y-1 bg-gray-700 text-sm text-gray-300 rounded-lg shadow-lg">
                            <li className="px-4 py-2 hover:bg-green-500 hover:text-white">
                                <Link
                                    to="/admin/practitioner-management"
                                    onClick={handleLinkClick}
                                >
                                    Practitioner Management
                                </Link>
                            </li>
                            <li className="px-4 py-2 hover:bg-green-500 hover:text-white">
                                <Link
                                    to="/admin/add-admins"
                                    onClick={handleLinkClick}
                                >
                                    Admin Management
                                </Link>
                            </li>
                            <li className="px-4 py-2 hover:bg-green-500 hover:text-white">
                                <Link
                                    to="/admin/admin-uploads"
                                    onClick={handleLinkClick}
                                >
                                   Course Materials
                                </Link>
                            </li>
                        </ul>
                    )}
                </div>
            )}
            <Link
                to="/contact-us"
                className="py-2 px-4 hover:bg-green-500 rounded-lg hover:text-white"
                onClick={handleLinkClick}
            >
                Contact Us
            </Link>

            {isAuthenticated ? (
                <>
                    <button
                        onClick={handleLogout}
                        className="py-2 px-4 hover:bg-red rounded-lg hover:text-white"
                    >
                        Logout
                    </button>

                    <button
                        onClick={handleNotificationsClick}
                        className="relative h-[32px] w-[32px] flex items-center justify-center"
                    >
                        {activeNotifications &&
                            activeNotifications.length > 0 && (
                                <span className="absolute top-0 right-0 text-xs text-white bg-red rounded-full w-5 h-5 flex items-center justify-center">
                                    {activeNotifications.length}
                                </span>
                            )}
                        <img
                            src={bell}
                            alt="Notifications"
                            style={{ minWidth: '32px', minHeight: '32px' }}
                        />
                    </button>

                    <Link to="/profile">
                        <img
                            className="h-[32px] w-[32px] rounded-full"
                            src={imageUrl || placeholderProfilePic}
                            alt="avatar"
                            style={{ minWidth: '32px', minHeight: '32px' }}
                        />
                    </Link>
                </>
            ) : (
                <button
                    onClick={handleLogin}
                    className="py-2 px-4 hover:bg-green-500 rounded-lg hover:text-white"
                >
                    Login
                </button>
            )}
        </div>
    )

    return (
         <header key={resizeKey} className=" flex flex-col w-full bg-white">
            <div className="flex items-center justify-between px-4 ">
                <img src={BrainIntegrationSeal} alt="Logo" className="h-25 px-20 py-10" />
                {isLargeScreen ? (
                    <nav className="flex items-center space-x-6">
                        {renderLinks()}
                    </nav>
                ) : (
                    <BurgerMenu
                        right
                        isOpen={burgerMenuOpen}
                        animation="slide"
                        onStateChange={({ isOpen }) =>
                            setBurgerMenuOpen(isOpen)
                        }
                    >
                        <div className="flex flex-col justify-center space-y-2">
                            {renderLinks()}
                        </div>
                    </BurgerMenu>
                )}
            </div>

        
            {user && (
            <BurgerMenu
            customBurgerIcon={ false}
                right
                isOpen={isNotificationDrawerOpen}
                animation="slide"
                onStateChange={({ isOpen }) =>
                    setIsNotificationDrawerOpen(isOpen)
                }
               
            >
                <Notifications
                    open={isNotificationDrawerOpen}
                   
                    isNotificationDrawerOpen={isNotificationDrawerOpen}
                  
                  
                    fetchNotifications={fetchNotifications}
                    markNotificationAsRead={markNotificationAsRead}
                    filteredNotifications={filteredNotifications}
                />
            </BurgerMenu>)}
        </header>
    )
}

