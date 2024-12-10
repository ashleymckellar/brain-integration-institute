/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
/* eslint-disable react/no-unescaped-entities */
import { useContext, useEffect, useState } from 'react';
import { Link, Outlet } from 'react-router-dom';
import { AdminContext } from '../contexts.js';
import paleBanner from '../assets/icons/PaleGreenPractitionerBackground.png';
import banner from '../assets/icons/PractitionerBackground.png';
import { Footer } from '../components/Footer.jsx';
import { slide as Menu } from 'react-burger-menu';
import { format } from 'date-fns';
import { useNavigate, useLocation } from 'react-router-dom';
import redNotificationIcon from '../assets/icons/red-notification-icon.svg';
import ReviewButton from '../components/ReviewButton.jsx';

export const Admin = () => {
    const {
        unreadNotifications,
        isNotificationDrawerOpen,
        setisNotificationDrawerOpen,
        fetchAdminNotifications,
        markNotificationAsRead,
        users,
        handleReviewClick,
    } = useContext(AdminContext);

    console.log(unreadNotifications, 'unread notifications')
    console.log(isNotificationDrawerOpen, 'is drawer open')

    const groupedNotifications = unreadNotifications.reduce(
        (acc, notification) => {
            acc[notification.category] = (acc[notification.category] || 0) + 1;
            return acc;
        },
        {},
    );

    const handleNotificationsClick = () => {
        setisNotificationDrawerOpen((prev) => !prev);
        console.log(isNotificationDrawerOpen, 'is not drawer open')
    };

    const formatDate = (timestamp) => {
        return format(new Date(timestamp), 'MM/dd/yy');
    };

    const docTypeMapping = {
        brainIntegrationTraining: 'brain integration training',
        videoPresentation: 'video presentation',
        cprCert: 'CPR certification',
        clinicalHours: 'clinical hours',
        firstAidTraining: 'first aid training',
        insurance: 'insurance',
    };

    const getDisplayName = (key) => docTypeMapping[key] || key;

    const [isLargeScreen, setIsLargeScreen] = useState(
        window.innerWidth >= 768,
    );

    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const toggleDropdown = () => setIsDropdownOpen((prev) => !prev);

    useEffect(() => {
        fetchAdminNotifications();
    }, []);

    useEffect(() => {
        const handleResize = () => setIsLargeScreen(window.innerWidth >= 768);
        window.addEventListener('resize', handleResize);
        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);
    const dashboardItems = [
        {
            label: 'Video Presentation',
            color: 'bg-sky-blue',
            category: 'videoPresentation',
        },
        {
            label: 'Brain Integration Training',
            color: 'bg-mauve',
            category: 'brainIntegrationTraining',
        },
        {
            label: 'Clinical Hours',
            color: 'bg-ice-blue',
            category: 'clinicalHours',
        },
        {
            label: 'First Aid Certification',
            color: 'bg-lavender',
            category: 'firstAidTraining',
        },
        {
            label: 'CPR Certification',
            color: 'bg-lightest-grey',
            category: 'cprCert',
        },
        { label: 'Insurance', color: 'bg-greyish-blue', category: 'insurance' },
        {
            label: 'Assessment',
            color: 'bg-pinky-pink',
            category: 'assessmentUpdate',
        },
    ];

    const menuItems = [
        {
            label: 'Admin Notifications',
            badge: unreadNotifications.length,
            onClick: handleNotificationsClick,
        },
        {
            path: 'practitioner-management',
            label: 'Practitioner Management',
        },
        { path: 'add-admins', label: 'Admin Management' },
        {
            path: 'admin-uploads',
            label: 'Course Materials',
        },
    ];

    const onClose = async (uniqueid) => {
        try {
            await markNotificationAsRead(uniqueid);
            fetchAdminNotifications();
        } catch (error) {
            console.error(
                `Error marking notification ${uniqueid} as read:`,
                error,
            );
        }
    };

    // const handleNotificationsClick = () => {
    //     setisNotificationDrawerOpen((prev) => !prev);
    // };

    return (
        <div>
            <Menu
                right
                isOpen={isNotificationDrawerOpen}
                onStateChange={({ isOpen }) =>
                    setisNotificationDrawerOpen(isOpen)
                }
                customBurgerIcon={false}
                className="z-50 "
                width={'30%'}
                styles={{
                    bmMenu: {
                        background: '#fff',
                        width: '100%',
                    },
                    bmOverlay: {
                        background: 'rgba(0, 0, 0, 0.3)',
                    },
                }}
            >
                <div className="flex flex-col gap-6">
                    {isNotificationDrawerOpen &&
                     Array.isArray(unreadNotifications)  &&
                    unreadNotifications.length > 0 ? (
                        unreadNotifications.map((notification) => {
                              console.log('Rendering notification:', notification);
                            switch (notification.notificationType) {
                                case 'assessmentUpdate':
                                    return (
                                        <div
                                            key={notification.uniqueid}
                                            className={`border border-black rounded-xl p-6 bg-white flex gap-5 items-start relative ${
                                                notification.notificationStatus ===
                                                'passed'
                                                    ? 'shadow-custom-green'
                                                    : 'shadow-custom-red'
                                            }`}
                                        >
                                            <p
                                                className="absolute top-2 right-2 z-10 cursor-pointer text-lg font-bold text-gray-500 hover:text-red-500"
                                                onClick={() =>
                                                    onClose(
                                                        notification.uniqueid,
                                                    )
                                                }
                                            >
                                                X
                                            </p>

                                            <p className="pt-8">
                                                {notification.notificationStatus ===
                                                'passed' ? (
                                                    <>
                                                        <span className="font-bold">
                                                            {
                                                                notification.userEmail
                                                            }
                                                        </span>{' '}
                                                        passed their assessment.{' '}
                                                        <br />
                                                        <div className="flex flex-col justify-center">
                                                            <button
                                                                className="py-2 px-4 mt-5 bg-green-500 rounded-lg text-white"
                                                                onClick={() =>
                                                                    handleReviewClick(
                                                                        notification.userEmail,
                                                                    )
                                                                }
                                                            >
                                                                Approve for
                                                                Certification
                                                            </button>
                                                            <p className="text-sm text-light-grey mt-2">
                                                                {formatDate(
                                                                    notification.timestamp,
                                                                )}
                                                            </p>
                                                        </div>
                                                    </>
                                                ) : (
                                                    <>
                                                        <span className="font-bold">
                                                            {
                                                                notification.userEmail
                                                            }
                                                        </span>{' '}
                                                        failed their assessment.{' '}
                                                        <br />
                                                        <p className="text-sm text-light-grey mt-2">
                                                            {formatDate(
                                                                notification.timestamp,
                                                            )}
                                                        </p>
                                                    </>
                                                )}
                                            </p>
                                        </div>
                                    );
                                case 'docExpirationReminder':
                                    return (
                                        <div
                                        key={notification.uniqueid}
                                            className="border border-black rounded-xl p-6 bg-white shadow-custom-red flex flex-col gap-5 items-start relative"
                                        >
                                            <p
                                                className="absolute top-2 right-2 cursor-pointer"
                                                onClick={() =>
                                                    onClose(
                                                        notification.uniqueid,
                                                    )
                                                }
                                            >
                                                X
                                            </p>
                                            <div className="flex gap-5">
                                                <img
                                                    src={redNotificationIcon}
                                                    alt="Notification Icon"
                                                />
                                                <p>
                                                    <span className="font-bold">
                                                        {notification.userEmail}
                                                        's{' '}
                                                    </span>
                                                    {getDisplayName(
                                                        notification.category,
                                                    )}{' '}
                                                    documentation has expired.
                                                </p>
                                            </div>
                                            <p className="text-sm text-light-grey mt-2">
                                                {formatDate(
                                                    notification.timestamp,
                                                )}
                                            </p>
                                        </div>
                                    );
                                case 'docStatusUpdate':
                                    return (
                                        <div
                                        key={notification.uniqueid}
                                            className="border border-black rounded-xl p-6 bg-white shadow-custom-red flex flex-col relative"
                                        >
                                            <p
                                                className="absolute top-2 right-2 cursor-pointer"
                                                onClick={() =>
                                                    onClose(
                                                        notification.uniqueid,
                                                    )
                                                }
                                            >
                                                X
                                            </p>
                                            <div className="flex items-center gap-4">
                                                <img
                                                    src={redNotificationIcon}
                                                    alt="Notification Icon"
                                                    className="w-8 h-8"
                                                />
                                                <p className="flex-1">
                                                    <span className="font-bold">
                                                        {notification.userEmail}{' '}
                                                    </span>{' '}
                                                    has uploaded a new{' '}
                                                    {getDisplayName(
                                                        notification.category,
                                                    )}{' '}
                                                    file.
                                                </p>
                                            </div>
                                            <div className="flex flex-col mt-4">
                                                <p>{notification.message}</p>
                                                <div className="flex justify-between items-center mt-4">
                                                    <ReviewButton
                                                        userEmail={
                                                            notification.userEmail
                                                        }
                                                        sectionId={
                                                            notification.category
                                                        }
                                                    />

                                                    <p className="text-sm text-gray-500 mt-2">
                                                        {formatDate(
                                                            notification.timestamp,
                                                        )}
                                                    </p>
                                                </div>
                                            </div>
                                        </div>
                                    );
                                default:
                                    return null;
                            }
                        })
                    ) : (
                        <div className="flex flex-col gap-5 pt-20">
                            <p className="text-center text-gray-500 text-xl">
                                You're all caught up.
                            </p>
                            <p className="text-center text-gray-500 text-xl">
                                No unread notifications.{' '}
                                {String.fromCodePoint(0x1f389)}
                            </p>
                        </div>
                    )}
                </div>
            </Menu>
            <div
                className="w-full sm:h-80 md:h-96 relative bg-white"
                style={{
                    backgroundImage: `url(${banner}), url(${paleBanner})`,
                    backgroundSize: 'cover, cover',
                    backgroundPosition: 'center, center',
                    backgroundRepeat: 'no-repeat, no-repeat',
                }}
            >
                <div className="absolute inset-0 flex items-center justify-center">
                    {isLargeScreen && (
                        <h1 className="text-white text-3xl sm:text-3xl md:text-4xl lg:text-5xl font-fenix font-normal">
                            Admin Dashboard
                        </h1>
                    )}
                </div>
            </div>

            <div className="flex flex-col h-screen">
                <div className="flex-1 flex">
                    {/* Admin Menu */}
                    <div
                        className={`${
                            isLargeScreen
                                ? 'min-w-[200px] bg-gray p-6 h-full'
                                : 'w-full bg-gray'
                        } border border-gray rounded-lg shadow-lg`}
                    >
                        <div
                            className={`bg-charcoal ${
                                isLargeScreen
                                    ? 'min-w-[200px] h-10 flex items-center justify-center'
                                    : 'py-3 px-4'
                            } text-white font-bold`}
                            onClick={!isLargeScreen ? toggleDropdown : null}
                        >
                            Admin Menu
                        </div>

                        {isLargeScreen || isDropdownOpen ? (
                            <ul className="space-y-4 text-center font-bold mt-4">
                                {menuItems.map((item) => (
                                    <li key={item.label} className="relative">
                                        {item.label ===
                                        'Admin Notifications' ? (
                                            <button
                                                onClick={item.onClick}
                                                className="py-3 px-4 w-full transition duration-200 border-b-2 border-transparent hover:bg-green-500 rounded-xl hover:text-white text-lg text-black flex justify-between items-center"
                                            >
                                                {item.label}
                                                {item.badge > 0 && (
                                                    <span className="bg-blue text-white text-sm font-bold rounded-full h-6 w-6 flex items-center justify-center">
                                                        {item.badge}
                                                    </span>
                                                )}
                                            </button>
                                        ) : (
                                            <Link
                                                to={item.path}
                                                className="py-3 px-4 w-full transition duration-200 border-b-2 border-transparent hover:bg-green-500 rounded-xl hover:text-white text-lg text-black"
                                            >
                                                {item.label}
                                            </Link>
                                        )}
                                    </li>
                                ))}
                            </ul>
                        ) : null}
                    </div>

                    {/* Main Content Area */}
                    <div className="flex-1 p-6">
                        <Outlet />
                        <Footer />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Admin;
