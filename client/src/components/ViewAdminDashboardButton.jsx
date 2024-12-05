/* eslint-disable react/prop-types */
import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../contexts';

const ViewAdminDashboardButton = () => {
    const { handleAdminPromoteClick } = useContext(UserContext);
    const navigate = useNavigate();

    const onClick = () => {
        handleAdminPromoteClick(navigate);
    };

    return (
        <button
            onClick={onClick}
            className="border rounded-xl p-2  bg-green-is-good hover:bg-green-500  text-white px-4 py-2 font-fira whitespace-nowrap"
        >
            View Admin Dashboard
        </button>
    );
};

export default ViewAdminDashboardButton;
