/* eslint-disable react/prop-types */

import { useNavigate } from 'react-router-dom';

export const PractitionerCard = (props) => {

    const navigate = useNavigate();
    const {
        firstName,
        lastName,

        location,
        image,
        phone,
        email,
        website,
    } = props;

    return (
        <div className="flex flex-col sm:flex-row w-full sm:w-[49%] h-auto items-start gap-2 p-6 bg-[#ececec] rounded shadow-[0px_4px_4px_#00000040]">
            <div className="flex flex-col sm:flex-row gap-4 items-center w-full">
                <img
                    className="w-[150px] h-[150px] sm:w-[200px] sm:h-[200px] rounded-full object-cover"
                    alt={`${firstName} ${lastName}`}
                    src={image}
                />
                <div className="flex flex-col w-full sm:w-auto gap-2">
                    <div className="text-black text-2xl font-bold tracking-[-0.48px] leading-normal">
                        {firstName} {lastName}
                    </div>

                    <div className="text-black text-base font-normal tracking-[-0.32px] leading-normal">
                        {location}
                    </div>
                    <div className="flex flex-col gap-1">
                        <div className="text-[#4f72af] text-base font-medium tracking-[-0.32px] leading-normal">
                            {phone}
                        </div>
                        <div className="text-[#4f72af] text-base font-medium tracking-[-0.32px] leading-normal">
                            {email}
                        </div>
                        <div className="flex flex-col gap-2 pt-5 justify-start items-center">
                            <button className="text-white border px-4 py-2 bg-green-is-good hover:bg-green-500  border-gray mx-3 rounded-md" onClick={() => navigate(`/practitioner/${email}`)}>
                                View Details
                            </button>

                            {website && (
                                <button className="text-white border px-4 py-2 bg-green-is-good hover:bg-green-500  border-gray mx-3 rounded-md">
                                    <a
                                        href={website}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                    >
                                        View Practitioner Site
                                    </a>
                                </button>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
