/* eslint-disable react/no-unescaped-entities */
/* eslint-disable react/prop-types */

import { useEffect, useContext } from 'react';
import { format } from 'date-fns';
import redNotificationIcon from '../assets/icons/red-notification-icon.svg';
import successfile from '../assets/icons/successfile.png';
import { UserContext } from '../contexts';
import { useAuth0 } from '@auth0/auth0-react';

export const Notifications = ({ isNotificationDrawerOpen }) => {
    const { markNotificationAsRead, fetchNotifications, filteredNotifications } = useContext(UserContext);
    const { user } = useAuth0();

    useEffect(() => {
        console.log(filteredNotifications, 'filtered not');
    }, [filteredNotifications]);

    const docTypeMapping = {
        brainIntegrationTraining: 'Brain Integration Training',
        videoPresentation: 'Video Presentation',
        cprCert: 'CPR Certification',
        clinicalHours: 'Clinical Hours',
        firstAidTraining: 'First Aid Training',
        insurance: 'Insurance',
    };

    const formatDate = (timestamp) => {
       
        return format(new Date(timestamp), 'MM/dd/yy');
    };

    const onXClick = async (uniqueid) => {
        try {
            await markNotificationAsRead(uniqueid);
            fetchNotifications();
           
        } catch (error) {
            console.error(`Error marking notification ${uniqueid} as read:`, error);
        }
    };

    const getDisplayName = (key) => docTypeMapping[key] || key;

    useEffect(() => {
        if (isNotificationDrawerOpen) {
            document.body.classList.add('overflow-hidden');
        } else {
            document.body.classList.remove('overflow-hidden');
        }

        return () => {
            document.body.classList.remove('overflow-hidden');
        };
    }, [isNotificationDrawerOpen]);

    return (
        <div
            className={`${
                isNotificationDrawerOpen ? 'transform translate-x-0' : 'transform -translate-x-full'
            } fixed top-0 right-0 z-50 w-80 bg-white shadow-lg p-6 transition-transform duration-300 ease-in-out`}
        >
            {user ? (
                <>
                    <h2 className="text-2xl font-semibold text-center mb-4">Notifications</h2>
                    {filteredNotifications && filteredNotifications.length > 0 ? (
                        <div className="flex flex-col gap-6">
                            {filteredNotifications.map((notification, index) => {
                                switch (notification.notificationType) {
                                    case 'assessmentUpdate':
                                        return (
                                            <div
                                                key={index}
                                                className={`border border-white rounded-xl p-6 ${
                                                    notification.notificationStatus === 'passed'
                                                        ? 'bg-gradient-custom-green'
                                                        : 'bg-gradient-custom-orange'
                                                }`}
                                            >
                                                <p
                                                    className="absolute top-4 right-6 cursor-pointer"
                                                    onClick={() => onXClick(notification.uniqueid)}
                                                >
                                                    X
                                                </p>
                                                <p className="pt-8">
                                                    {notification.notificationStatus === 'passed'
                                                        ? 'Congratulations! You passed your assessment.'
                                                        : 'Unfortunately, you did not pass your assessment. Please try again in 30 days.'}
                                                </p>
                                            </div>
                                        );
                                    case 'docExpirationReminder':
                                        return (
                                            <div
                                                key={index}
                                                className="border border-black rounded-xl p-6 bg-white shadow-custom-red flex flex-col gap-5 items-start relative"
                                            >
                                                <p
                                                    className="absolute top-2 right-6 cursor-pointer"
                                                    onClick={() => onXClick(notification.uniqueid)}
                                                >
                                                    X
                                                </p>
                                                <div className="flex gap-5">
                                                    <img src={redNotificationIcon} alt="Notification Icon" />
                                                    <p>
                                                        {getDisplayName(notification.category)} documentation has expired.
                                                    </p>
                                                </div>
                                                <p className="text-sm text-light-grey mt-2">
                                                    {formatDate(notification.timestamp)}
                                                </p>
                                                <div className="flex justify-end">
                                                    <button className="border border-black rounded-lg px-4 py-2">
                                                        Update Now
                                                    </button>
                                                </div>
                                            </div>
                                        );
                                    case 'docStatusUpdate':
                                        return (
                                            <div
                                                key={index}
                                                className="border border-black rounded-xl p-6 bg-white flex flex-col relative"
                                            >
                                                <p
                                                    className="absolute top-2 right-6 cursor-pointer"
                                                    onClick={() => onXClick(notification.uniqueid)}
                                                >
                                                    X
                                                </p>
                                                <div className="flex items-center gap-4">
                                                    <p className="flex-1">
                                                        {getDisplayName(notification.category)} {notification.message}
                                                    </p>
                                                </div>
                                                {notification.notificationStatus === 'declined' && (
                                                    <div className="flex flex-col mt-4">
                                                        <img src={redNotificationIcon} className="h-[40px]" />
                                                        <div className="flex justify-between items-center mt-4">
                                                            <button className="border border-black rounded-lg px-4 py-2">
                                                                Update Now
                                                            </button>
                                                            <p className="text-sm text-gray-500 mt-2">
                                                                {formatDate(notification.timestamp)}
                                                            </p>
                                                        </div>
                                                    </div>
                                                )}
                                                {notification.notificationStatus === 'approved' && (
                                                    <div className="flex gap-10">
                                                        <img src={successfile} alt="file icon" />
                                                    </div>
                                                )}
                                            </div>
                                        );
                                    default:
                                        return null;
                                }
                            })}
                        </div>
                    ) : (
                        <div className="flex flex-col gap-5">
                            <p className="text-center text-gray-500 text-xl">
                                You're all caught up!{' '}
                            </p>
                            <p className="text-center text-gray-500 text-xl">
                                No unread notifications.{' '}
                                {String.fromCodePoint(0x1f389)}
                            </p>
                        </div>
                    )}
                </>
            ) : (
                <div className="flex flex-col items-center">
                    <p className="text-center text-gray-500 text-xl">
                        Please log in to view notifications.
                    </p>
                </div>
            )}
        </div>
    );
};
