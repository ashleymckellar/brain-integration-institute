import { Navbar } from '../components/header/Navbar';
import { useParams } from 'react-router-dom';
import { useEffect, useContext } from 'react';
import { Footer } from '../components/Footer';
// import rectangleRon from '../assets/images/rectangle-ron.png';
import map from '../assets/icons/map-pin.png';
import phone from '../assets/icons/phone.png';
// import mail from '../assets/icons/mail.png';
import { UserContext } from '../contexts';

export const PractitionerDetails = () => {
    const { email } = useParams();
    const { fetchSingleProfile, singleProfile } =
        useContext(UserContext);

    useEffect(() => {
        fetchSingleProfile(email);
    }, []);

    console.log(singleProfile);
    return (
        <div>
            <Navbar />

            {singleProfile ? (
                <div className="p-20">
                    <div className="flex flex-col lg:flex-row gap-10">
                        {/* Left Column */}
                        <div className="flex flex-col items-center lg:items-start gap-10 lg:basis-1/2">
                            <img
                                src={singleProfile.userProfilePicture}
                                className="w-50 h-[650px] object-cover"
                                alt="Profile Image"
                            />
                            <div className="flex flex-col gap-5">
                                <div className="flex items-center gap-3">
                                    <img
                                        src={map}
                                        alt="map pin"
                                        className="w-8 h-8"
                                    />
                                    <span className="font-bold">
                                        {singleProfile.city} {singleProfile.state} {singleProfile.zip} {singleProfile.country}
                                    </span>
                                </div>
                                <div className="flex items-center gap-3">
                                    <img
                                        src={phone}
                                        alt="phone"
                                        className="w-8 h-8"
                                    />
                                    <a
                                        href={`tel:${singleProfile.phoneNumber}`}
                                        className="text-blue-600 hover:underline font-bold"
                                    >
                                        {singleProfile.phoneNumber}
                                    </a>
                                </div>
                        
                            </div>
                        </div>

                        {/* Right Column */}
                        <div className="flex flex-col gap-6 lg:basis-1/2 px-10">
                            <h1 className="text-6xl font-bold">{singleProfile.firstName} {singleProfile.lastName}</h1>
                            <p>{singleProfile.bio}</p>
                        </div>
                    </div>
                </div>
            ) : (
                <div>No profile data found</div>
            )}
            <Footer />
        </div>
    );
};
