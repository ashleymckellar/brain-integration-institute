/* eslint-disable react/prop-types */
import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AdminContext, UserContext } from '../contexts';

const ReviewButton = ({ userEmail, sectionId, uniqueid, fetchNotifications }) => {
    const { handleReviewClick } = useContext(AdminContext);
    const { markNotificationAsRead } = useContext(UserContext)
    const navigate = useNavigate();

    const onClick = async () => {
        try {
            // Mark notification as read
            await markNotificationAsRead(uniqueid);

            // Refresh notifications list if provided
            if (fetchNotifications) {
                fetchNotifications();
            }

            // Proceed with the review action
            handleReviewClick(navigate, userEmail, sectionId);
        } catch (error) {
            console.error(
                `Error marking notification ${uniqueid} as read:`,
                error,
            );
        }
    };

    return (
        <button
            onClick={onClick}
            className="border rounded-xl p-2  bg-green-is-good hover:bg-green-500  text-white px-4 py-2"
        >
            Review Now
        </button>
    );
};

export default ReviewButton;
