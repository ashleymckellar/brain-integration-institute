/* eslint-disable react/prop-types */
import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AdminContext } from '../contexts';

const ReviewButton = ({ userEmail, sectionId }) => {
    const { handleReviewClick } = useContext(AdminContext);
    const navigate = useNavigate();

    const onClick = () => {
        handleReviewClick(navigate, userEmail, sectionId);
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
