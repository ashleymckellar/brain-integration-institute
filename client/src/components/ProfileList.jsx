/* eslint-disable react/prop-types */
import placeholderProfilePic from '../assets/icons/placeholderProfilePic.png';

export const ProfileList = (props) => {
    const { firstName, lastName, city, phoneNumber, email } = props;
    return (
        <div className="flex flex-col sm:flex-row gap-4 items-center w-full p-6 bg-[#ececec] rounded shadow-[0px_4px_4px_#00000040]">
            <img
                className="w-[150px] h-[150px] sm:w-[200px] sm:h-[200px] rounded-full object-cover"
                alt={`${firstName} ${lastName}`}
                src={placeholderProfilePic}
            />
            <div className="flex flex-col w-full sm:w-auto gap-2">
                <div className="text-black text-2xl font-bold tracking-[-0.48px] leading-normal">
                    {firstName} {lastName}
                </div>
                <div className="text-black text-base font-normal tracking-[-0.32px] leading-normal">
                    {city}
                </div>
                <div className="flex flex-col gap-1">
                    <div className="text-[#4f72af] text-base font-medium tracking-[-0.32px] leading-normal">
                        {phoneNumber}
                    </div>
                    <div className="text-[#4f72af] text-base font-medium tracking-[-0.32px] leading-normal">
                        {email}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProfileList;
