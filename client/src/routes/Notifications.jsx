
/* eslint-disable react/prop-types */
/* eslint-disable react/no-unescaped-entities */
import { useEffect } from 'react';
import { format } from 'date-fns';
import redNotificationIcon from '../assets/icons/red-notification-icon.svg';

export const Notifications = ({
    activeNotifications,
    fetchNotifications,
    onClose,
}) => {
    useEffect(() => {
        console.log(activeNotifications);
    }, [activeNotifications]);

    const docTypeMapping = {
        brainIntegrationTraining: 'Brain Integration Training',
        videoPresentation: 'Video Presentation',
        cprCert: 'CPR Certification',
        clinicalHours: 'Clinical Hours',
        firstAidTraining: 'First Aid Training',
        insurance: 'Insurance',
    };

    const formatDate = (timestamp) => {
        console.log('Timestamp received:', timestamp);
        return format(new Date(timestamp), 'MM/dd/yy');
    };

    console.log(activeNotifications, 'active notifications');

    const getDisplayName = (key) => docTypeMapping[key] || key;

    useEffect(() => {
        if (open) {
            document.body.classList.add('overflow-hidden');
        } else {
            document.body.classList.remove('overflow-hidden');
        }

        return () => {
            document.body.classList.remove('overflow-hidden');
        };
    }, [open]);

    return (
        <div
            onClick={onClose}
            className="fixed inset-0 z-50 bg-black/50 flex justify-center items-center overflow-auto"
            role="dialog"
            aria-modal="true"
        >
            <div
                onClick={(e) => e.stopPropagation()}
                className="relative w-full max-w-3xl bg-white rounded-lg shadow-lg p-6 max-h-[80vh] overflow-y-auto"
            >
                {/* <button
                    onClick={onClose}
                    className="absolute top-3 right-3 text-gray-500 hover:text-gray-700"
                    aria-label="Close"
                >
                    &#x2715;
                </button> */}
                <h2 className="text-2xl font-semibold text-center mb-4">
                    Notifications Panel
                </h2>

                {activeNotifications && activeNotifications.length > 0 ? (
                    <div className="flex flex-col gap-6">
                        {activeNotifications.map((notification, index) => {
                            switch (notification.notificationType) {
                                case 'assessmentUpdate':
                                    return (
                                        <div
                                            key={index}
                                            className={`border border-white rounded-xl p-6 ${
                                                notification.notificationStatus ===
                                                'passed'
                                                    ? 'bg-gradient-custom-green'
                                                    : 'bg-gradient-custom-orange'
                                            }`}
                                        >
                                            <p className="absolute top-2 right-6 cursor-pointer"   onClick={onClose}>
                                                X
                                            </p>
                                            <p className="pt-8">
                                                {notification.notificationStatus ===
                                                'passed'
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
                                            <p className="absolute top-2 right-2 cursor-pointer">
                                                X
                                            </p>
                                            <div className='flex gap-5'>
                                            <img
                                                src={redNotificationIcon}
                                                alt="Notification Icon"
                                            />
                                            <p>
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
                                          <div className='flex justify-end'>
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
                                        className="border border-black rounded-xl p-6 bg-white shadow-custom-red flex flex-col relative"
                                    >
                                        <p className="absolute top-2 right-2 cursor-pointer">X</p>
                                    
                                        <div className="flex items-center gap-4">
                                            <img
                                                src={redNotificationIcon}
                                                alt="Notification Icon"
                                                className="w-8 h-8" // Optional: controls the size of the icon
                                            />
                                            <p className="flex-1">
                                                {getDisplayName(notification.category)} was declined.
                                            </p>
                                        </div>
                                    
                                        <div className="flex flex-col mt-4">
                                            <p>{notification.message}</p>
                                            <div className="flex justify-between items-center mt-4">
                                                <button className="border border-black rounded-lg px-4 py-2">
                                                    Update Now
                                                </button>
                                                <p className="text-sm text-gray-500 mt-2">
                                                   {formatDate(notification.timestamp)}
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                    
                                    );
                            }
                        })}
                    </div>
                ) : (
                    <p className="text-center text-gray-500">
                        No unread notifications available.
                    </p>
                )}
            </div>
        </div>
    );
};
