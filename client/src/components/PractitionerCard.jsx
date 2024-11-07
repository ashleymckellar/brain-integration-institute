// /* eslint-disable react/prop-types */
// import { useContext, useEffect } from 'react';

// import { UserContext } from '../contexts';
// import { CloudinaryContext } from '../contexts';
// import ProfileList from './ProfileList'
// import placeholderProfilePic from '../assets/icons/placeholderProfilePic.png';

// export const PractitionerCard = () => {
//     // const {
//     //     firstName,
//     //     lastName,
//     //     title,
//     //     location,
//     //     imgURL,
//     //     phone,
//     //     email,
//     //     website,
//     // } = props;

//     const {
//         fetchProfileData,
//         profileData,
//         fetchAllProfiles,
//         allProfiles,
//         setAllProfiles,
//     } = useContext(UserContext);
//     const { imageUrl } = useContext(CloudinaryContext);
//     console.log(profileData);

//     console.log(allProfiles, 'all profiles');

//     // const fetchProfiles = async () => {
//     //     try {
//     //         const profiles = await fetchAllProfiles();
//     //         setAllProfiles(profiles);
//     //     } catch (error) {
//     //         console.error('Error fetching profiles:', error);
//     //     }
//     // };

//     // fetchProfiles()

//     // useEffect(() => {
//     //     fetchAllProfiles();
//     // }, []);

//     return (
//         <div className="flex flex-col gap-4">
//             <h1>hello</h1>
//             {/* {allProfiles.map((profile) => (
//                 <ProfileList {...profile} key={profile._id} />
//             ))} */}
//         </div>
//     );
// };

// export default PractitionerCard


/* eslint-disable react/prop-types */



export const PractitionerCard = (props) => {
    const {
        firstName,
        lastName,
        title,
        location,
        imgURL,
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
                    src={imgURL}
                />
                <div className="flex flex-col w-full sm:w-auto gap-2">
                    <div className="text-black text-2xl font-bold tracking-[-0.48px] leading-normal">
                        {firstName} {lastName}
                    </div>
                    <div className="text-black text-base font-normal tracking-[-0.32px] leading-normal">
                        {title}
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
                        {website && (
                            <div className="text-[#4f72af] text-base font-medium tracking-[-0.32px] leading-normal">
                                <a
                                    href={website}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    Website
                                </a>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};
