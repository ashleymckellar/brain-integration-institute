import { useContext, useEffect, useState } from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import { UserContext } from '../contexts';
import redNotificationIcon from '../assets/icons/red-notification-icon.svg';

export const Notifications = () => {
    const { fetchNotifications, activeNotifications } = useContext(UserContext);
    const { user } = useAuth0();
    const [category, setCategory] = useState('');

    useEffect(() => {
        fetchNotifications(user);
    }, [user]);

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

    const getDisplayName = (key) => docTypeMapping[key] || key;
    // setSelectedDocumentName(documentName);
    // setSelectedDocumentType(documentType);
    // console.log(documentName);
    // console.log(documentType);

    //makes a get request to notifications router and returns all, filtering out if they've been read or not.  If unread, they'll render on the page.
    //once the x is clicked, a put request is made to notificationsRouter.put('/:email/has-been-read', updating the hasBeenRead boolean to true.
    //this also removes them from state and updates the dom
    return (
        <div className="flex flex-col items-center gap-10">
            <h1 className="text-2xl pt-10">Notifications Panel</h1>
            {activeNotifications && activeNotifications.length > 0 ? (
                // Filter notifications for docStatusUpdate type
                activeNotifications
                    .filter(
                        (notification) =>
                            notification.notificationType === 'docStatusUpdate',
                    )
                    .map((notification, index) => (
                        <div
                            key={index}
                            className="border border-black rounded-xl p-10"
                        >
                            <p>
                                {getDisplayName(notification.category)} document
                                update: '{notification.message}'
                            </p>
                            <p>Click here to re-upload</p>
                        </div>
                    ))
            ) : (
                <div>
                    <p>No unread notifications available.</p>
                </div>
            )}
            {activeNotifications && activeNotifications.length > 0 ? (
                // Filter notifications for docStatusUpdate type
                activeNotifications
                    .filter(
                        (notification) =>
                            notification.notificationType ===
                            'assessmentUpdate',
                    )
                    .map((notification, index) => (
                        <div key={index}>
                            {' '}
                            {notification.notificationStatus === 'passed' ? (
                                <div className="border border-white rounded-xl pb-10 px-10 bg-gradient-custom-green flex flex-col justify-end items-end relative">
                                    <p className="absolute top-2 right-2 cursor-pointer">
                                        X
                                    </p>
                                    <p className="flex flex-col pt-8 justify-end">
                                        Congratulations! You{' '}
                                        {notification.notificationStatus} your
                                        assessment.
                                    </p>{' '}
                                </div>
                            ) : (
                                <div className="border border-white rounded-xl pb-10 px-10 bg-gradient-custom-orange flex flex-col justify-end items-end relative">
                                    <p className="absolute top-2 right-2 cursor-pointer">
                                        X
                                    </p>
                                    <p className="flex flex-col pt-8 justify-end">
                                        Unfortunately, you{' '}
                                        {notification.notificationStatus} your
                                        assessment. Please try again in 30 days.
                                    </p>
                                </div>
                            )}
                        </div>
                    ))
            ) : (
                <div>
                    <p>No unread notifications available.</p>
                </div>
            )}{' '}
            {activeNotifications && activeNotifications.length > 0 ? (
                // Filter notifications for docStatusUpdate type
                activeNotifications
                    .filter(
                        (notification) =>
                            notification.notificationType ===
                            'docExpirationReminder',
                    )
                    .map((notification, index) => (
                        <div key={index}>
                            {' '}
                            {notification.category && (
                                <div className="border border-white rounded-xl pb-10 px-10 bg-white shadow-custom-red flex gap-5 justify-end items-end relative">
                                    <p className="absolute top-2 right-2 cursor-pointer">
                                        X
                                    </p>
                                    <p className="flex pt-8 justify-end">
                                        <img
                                            src={redNotificationIcon}
                                            className="pr-5"
                                        />
                                        <p></p>
                                        {getDisplayName(
                                            notification.category,
                                        )}{' '}
                                        documentation has expired
                                    </p>{' '}
                                    <button className="border-black border rounded-lg p-2 mt-10">
                                        Update Now
                                    </button>
                                </div>
                            )}
                        </div>
                    ))
            ) : (
                <div>
                    <p>No unread notifications available.</p>
                </div>
            )}
        </div>
    );
};
