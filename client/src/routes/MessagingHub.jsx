/* eslint-disable react/no-unescaped-entities */
import { useEffect, useContext, useState } from 'react';
import { AdminContext } from '../contexts';
import { format } from 'date-fns';
import { slide as Menu } from 'react-burger-menu';
import redNotificationIcon from '../assets/icons/red-notification-icon.svg';

const MessagingHub = () => {
    const { fetchAdminNotifications, unreadNotifications } =
        useContext(AdminContext);
        const [isOpen, setIsOpen] = useState(false);

    useEffect(() => {
        fetchAdminNotifications();
    }, []);

    const handleMenuStateChange = (state) => {
      setIsOpen(state.isOpen);
  };

    useEffect(() => {
        console.log(unreadNotifications);
    }, [unreadNotifications]);

    console.log(unreadNotifications);

    const handleClick = (e) => {
      console.log(e)
    }

    const docTypeMapping = {
        brainIntegrationTraining: 'brain integration training',
        videoPresentation: 'video presentation',
        cprCert: 'CPR certification',
        clinicalHours: 'clinical hours',
        firstAidTraining: 'first aid training',
        insurance: 'insurance',
    };

    const formatDate = (timestamp) => {
        console.log('Timestamp received:', timestamp);
        return format(new Date(timestamp), 'MM/dd/yy');
    };

    const getDisplayName = (key) => docTypeMapping[key] || key;

    const onClose = (notificationId) => {
        // Placeholder for your close logic, for example, dismissing the notification
        console.log(`Closing notification with ID: ${notificationId}`);
    };

    return (
        <>
            {unreadNotifications && unreadNotifications.length > 0 ? (
                <div className="flex flex-col gap-6">
                    {unreadNotifications.map((notification, index) => {
                        switch (notification.notificationType) {
                            case 'assessmentUpdate':
                                return (
                                  <div
                                  key={index}
                                  className={`border border-black rounded-xl p-6 bg-white flex gap-5 items-start relative ${
                                      notification.notificationStatus === 'passed'
                                          ? 'shadow-custom-green'
                                          : 'shadow-custom-red'
                                  }`}
                              >
                                  <p
                                      className="absolute top-2 right-2 z-10 cursor-pointer text-lg font-bold text-gray-500 hover:text-red-500"
                                      onClick={() => handleClick(notification._id)}
                                  >
                                      X
                                  </p>
                              
                                  <p className="pt-8">
                                      {notification.notificationStatus === 'passed' ? (
                                          <>
                                              <span className="font-bold">
                                                  {notification.userEmail}
                                              </span>{' '}
                                              passed their assessment. <br />
                                              <div className="flex flex-col justify-center">
                                                  <button className="py-2 px-4 mt-5 bg-green-500 rounded-lg text-white">
                                                      Approve for Certification
                                                  </button>
                                                  <p className="text-sm text-light-grey mt-2">
                                                      {formatDate(notification.timestamp)}
                                                  </p>
                                              </div>
                                          </>
                                      ) : (
                                          <>
                                              <span className="font-bold">
                                                  {notification.userEmail}
                                              </span>{' '}
                                              failed their assessment. <br />
                                              <p className="text-sm text-light-grey mt-2">
                                                  {formatDate(notification.timestamp)}
                                              </p>
                                          </>
                                      )}
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
                                            className="absolute top-2 right-2 cursor-pointer"
                                            onClick={() =>
                                                onClose(notification.id)
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
                                                    {' '}
                                                    {
                                                        notification.userEmail
                                                    }'s{' '}
                                                </span>
                                                {getDisplayName(
                                                    notification.category,
                                                )}{' '}
                                                documentation has expired.
                                            </p>
                                        </div>
                                        <p className="text-sm text-light-grey mt-2">
                                            {formatDate(notification.timestamp)}
                                        </p>
                                    </div>
                                );

                            case 'docStatusUpdate':
                                return (
                                    <div
                                        key={index}
                                        className="border border-black rounded-xl p-6 bg-white shadow-custom-red flex flex-col relative"
                                    >
                                        <p
                                            className="absolute top-2 right-2 cursor-pointer"
                                            onClick={() =>
                                                onClose(notification.id)
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
                                                {getDisplayName(
                                                    notification.category,
                                                )}{' '}
                                                was declined.
                                            </p>
                                        </div>
                                        <div className="flex flex-col mt-4">
                                            <p>{notification.message}</p>
                                            <div className="flex justify-between items-center mt-4">
                                                <button className="border border-black rounded-lg px-4 py-2">
                                                    Update Now
                                                </button>
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
                    })}
                </div>
            ) : (
                <p>No unread notifications</p>
            )}
        </>
    );
};

export default MessagingHub;
