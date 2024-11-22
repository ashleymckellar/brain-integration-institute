
import { useEffect, useState, useContext } from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import { Link } from 'react-router-dom';
import { slide as BurgerMenu } from 'react-burger-menu';
import bell from '../../assets/icons/bell.png';
import placeholderProfilePic from '../../assets/icons/placeholderProfilePic.png';
import BrainIntegrationSeal from '../../assets/icons/BrainIntegrationSeal.png';
import { CloudinaryContext } from '../../contexts';
import { UserContext } from '../../contexts';
import { Notifications } from '../../routes/Notifications.jsx';

export const Navbar = () => {
    const { loginWithRedirect, logout, isAuthenticated, user } = useAuth0();
    const { imageUrl, getUserMetaData, userMetaData } = useContext(CloudinaryContext);

    const [isLargeScreen, setIsLargeScreen] = useState(window.innerWidth >= 768);
    const [isAdmin, setIsAdmin] = useState(false);
    const [notificationModalOpen, setNotificationModalOpen] = useState(false);
    const [burgerMenuOpen, setBurgerMenuOpen] = useState(false); // Add burger menu state
    const { fetchNotifications, activeNotifications, markNotificationAsRead } = useContext(UserContext);

    const handleLogin = async () => {
        await loginWithRedirect({
            authorizationParams: {
                redirect_uri: window.location.origin + '/profile',
            },
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

    console.log(activeNotifications.length) //render this number on top of bell

    const handleClick = async () => {
        try {
            setBurgerMenuOpen(false); // Close burger menu
            setNotificationModalOpen(false);
            await fetchNotifications();
            setNotificationModalOpen(true);
        } catch (error) {
            console.error('Error fetching notifications:', error);
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
        <div
            className={`flex ${
                isLargeScreen
                    ? 'flex-row space-x-4'
                    : 'flex-col justify-center items-center gap-3'
            }`}
        >
            <Link
                to="/"
                className="py-2 px-4 hover:bg-green-500 rounded-lg hover:text-white"
            >
                Home
            </Link>
            <Link
                to="/about"
                className="py-2 px-4 hover:bg-green-500 rounded-lg hover:text-white"
            >
                About Us
            </Link>
            <Link
                to="/practitioner"
                className="py-2 px-4 hover:bg-green-500 rounded-lg hover:text-white"
            >
                Find Practitioner
            </Link>
            <Link
                to="/certification"
                className="py-2 px-4 hover:bg-green-500 rounded-lg hover:text-white"
            >
                Certification
            </Link>
            {isAdmin && (
                <Link
                    to="/admin"
                    className="py-2 px-4 hover:bg-green-500 rounded-lg hover:text-white"
                >
                    Admin Dashboard
                </Link>
            )}
            <Link
                to="/contact-us"
                className="py-2 px-4 hover:bg-green-500 rounded-lg hover:text-white"
            >
                Contact Us
            </Link>
    
            {isAuthenticated ? (
                <>
                    {/* Logout Button */}
                    <button
                        onClick={handleLogout}
                        className="py-2 px-4 hover:bg-red rounded-lg hover:text-white"
                    >
                        Logout
                    </button>
    
                    {/* Bell Icon with Notification Count */}
                    <button
                        onClick={handleClick}
                        className="relative h-[32px] w-[32px] flex items-center justify-center"
                    >
                        {activeNotifications && activeNotifications.length > 0 && (
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
    
                    {/* Profile Image */}
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
                // Login Button
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
                    <nav className="flex items-center space-x-6">
                        {renderLinks()}
                    </nav>
                ) : (
                    <BurgerMenu
                        right
                        isOpen={burgerMenuOpen}
                        onStateChange={({ isOpen }) => setBurgerMenuOpen(isOpen)}
                    >
                        <div className="flex flex-col justify-center space-y-2">
                            {renderLinks()}
                        </div>
                    </BurgerMenu>
                )}
                {notificationModalOpen && (
                    <Notifications
                        open={notificationModalOpen}
                        onClose={() => setNotificationModalOpen(false)}
                        activeNotifications={activeNotifications}
                        fetchNotifications={fetchNotifications}
                        markNotificationAsRead={markNotificationAsRead}
                        setNotificationModalOpen={setNotificationModalOpen}
                        notificationModalOpen={notificationModalOpen}
                    />
                )}
            </div>
        </header>
    );
};

