/* eslint-disable react/prop-types */
import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AdminContext } from '../contexts';

const UpdateNowButton = ({ sectionName }) => {
    const { handleUpdateClick } = useContext(AdminContext);
    const navigate = useNavigate();

    const onClick = () => {
        handleUpdateClick(navigate, sectionName);
    };

    return <button onClick={onClick} className='border rounded-xl p-2  bg-green-is-good hover:bg-green-500  text-white px-4 py-2'>Update Now</button>;
};

export default UpdateNowButton;
