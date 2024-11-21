// /* eslint-disable react/no-unescaped-entities */
// import { useState, useEffect, useContext } from 'react';
// import { AdminContext } from '../contexts';
// import { format } from 'date-fns';

// const MessagingHub = () => {
//     const { fetchAdminNotifications, unreadNotifications } =
//         useContext(AdminContext);

//         useEffect(() => {
//           fetchAdminNotifications()

//         }, [])

//         useEffect(() => {
//           console.log(unreadNotifications);
//       }, [unreadNotifications]);

//         console.log(unreadNotifications)

//         const docTypeMapping = {
//           brainIntegrationTraining: 'Brain Integration Training',
//           videoPresentation: 'Video Presentation',
//           cprCert: 'CPR Certification',
//           clinicalHours: 'Clinical Hours',
//           firstAidTraining: 'First Aid Training',
//           insurance: 'Insurance',
//       };

//       const formatDate = (timestamp) => {
//         console.log('Timestamp received:', timestamp);
//         return format(new Date(timestamp), 'MM/dd/yy');
//     };

//     const getDisplayName = (key) => docTypeMapping[key] || key;
//     return (
//       <>

//          {unreadNotifications && unreadNotifications.length > 0 ? (
//                     <div className="flex flex-col gap-6">
//                         {unreadNotifications.map((notification, index) => {
//                             switch (notification.notificationType) {
//                                 case 'assessmentUpdate':
//                                     return (
//                                         <div
//                                             key={index}
//                                             className={`border border-white rounded-xl p-6 ${
//                                                 notification.notificationStatus ===
//                                                 'passed'
//                                                     ? 'bg-gradient-custom-green'
//                                                     : 'bg-gradient-custom-orange'
//                                             }`}
//                                         >
//                                             <p className="absolute top-2 right-6 cursor-pointer"   onClick={onClose}>
//                                                 X
//                                             </p>
//                                             <p className="pt-8">
//                                                 {notification.notificationStatus ===
//                                                 'passed'
//                                                     ? 'Congratulations! You passed your assessment.'
//                                                     : 'Unfortunately, you did not pass your assessment. Please try again in 30 days.'}
//                                             </p>
//                                         </div>
//                                     );
//                                 case 'docExpirationReminder':
//                                     return (
//                                         <div
//                                             key={index}
//                                             className="border border-black rounded-xl p-6 bg-white shadow-custom-red flex flex-col gap-5 items-start relative"
//                                         >
//                                             <p className="absolute top-2 right-2 cursor-pointer">
//                                                 X
//                                             </p>
//                                             <div className='flex gap-5'>
//                                             <img
//                                                 src={redNotificationIcon}
//                                                 alt="Notification Icon"
//                                             />
//                                             <p>
//                                                 {getDisplayName(
//                                                     notification.category,
//                                                 )}{' '}
//                                                 documentation has expired.
//                                             </p>
//                                             </div>
//                                             <p className="text-sm text-light-grey mt-2">

//                                               {formatDate(
//                                                   notification.timestamp,
//                                               )}
//                                           </p>
//                                           <div className='flex justify-end'>
//                                             <button className="border border-black rounded-lg px-4 py-2">
//                                                 Update Now
//                                             </button>
//                                             </div>

//                                         </div>
//                                     );

//                                 case 'docStatusUpdate':
//                                     return (
//                                         <div
//                                         key={index}
//                                         className="border border-black rounded-xl p-6 bg-white shadow-custom-red flex flex-col relative"
//                                     >
//                                         <p className="absolute top-2 right-2 cursor-pointer">X</p>

//                                         <div className="flex items-center gap-4">
//                                             <img
//                                                 src={redNotificationIcon}
//                                                 alt="Notification Icon"
//                                                 className="w-8 h-8" // Optional: controls the size of the icon
//                                             />
//                                             <p className="flex-1">
//                                                 {getDisplayName(notification.category)} was declined.
//                                             </p>
//                                         </div>

//                                         <div className="flex flex-col mt-4">
//                                             <p>{notification.message}</p>
//                                             <div className="flex justify-between items-center mt-4">
//                                                 <button className="border border-black rounded-lg px-4 py-2">
//                                                     Update Now
//                                                 </button>
//                                                 <p className="text-sm text-gray-500 mt-2">
//                                                    {formatDate(notification.timestamp)}
//                                                 </p>
//                                             </div>
//                                         </div>
//                                     </div>

//                                     );
//                             }
//                         })
//                         </>

// };

// export default MessagingHub;

/* eslint-disable react/no-unescaped-entities */
import { useState, useEffect, useContext } from 'react';
import { AdminContext } from '../contexts';
import { format } from 'date-fns';
import redNotificationIcon from '../assets/icons/red-notification-icon.svg';

const MessagingHub = () => {
    const { fetchAdminNotifications, unreadNotifications } =
        useContext(AdminContext);

    useEffect(() => {
        fetchAdminNotifications();
    }, []);

    useEffect(() => {
        console.log(unreadNotifications);
    }, [unreadNotifications]);

    console.log(unreadNotifications);

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
                                        className={`border border-white rounded-xl p-6 ${
                                            notification.notificationStatus ===
                                            'passed'
                                                ? 'bg-gradient-custom-green'
                                                : 'bg-gradient-custom-orange'
                                        }`}
                                    >
                                        <p
                                            className="absolute top-2 right-6 cursor-pointer"
                                            onClick={() =>
                                                onClose(notification.id)
                                            }
                                        >
                                            X
                                        </p>
                                        <p className="pt-8">
                                            {notification.notificationStatus ===
                                            'passed' ? (
                                                <>
                                                    {notification.userEmail}{' '}
                                                    passed their assessment.{' '}
                                                    <br />
                                                    <button className="border border-black p-2 rounded-xl bg-white mt-2">
                                                        Approve for
                                                        Certification
                                                    </button>
                                                    
                                                </>
                                                
                                            ) : (
                                                `Unfortunately, ${notification.userEmail} did not pass their assessment`
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
                                                {notification.userEmail}'s{' '}
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
