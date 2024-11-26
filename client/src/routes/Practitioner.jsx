import { useContext, useState, useEffect } from 'react';
import { PractitionerCard } from '../components/PractitionerCard';
import { UserContext } from '../contexts';
import { AdminContext } from '../contexts'
import banner from '../assets/icons/PractitionerBackground.png';
import paleBanner from '../assets/icons/PaleGreenPractitionerBackground.png';

export const Practitioner = () => {
    const { allProfiles, fetchAllProfiles } = useContext(UserContext);
    const {
        getAllUsers,
        users,
      
    } = useContext(AdminContext);

    const [searchQuery, setSearchQuery] = useState({
        name: '',
        location: '',
    });
    const [renderedPractitioners, setRenderedPractitioners] = useState([]);

    const searchHandler = (event) => {
        const { name, value } = event.target;
        setSearchQuery((prevQuery) => ({
            ...prevQuery,
            [name]: value.toLowerCase(),
        }));
    };

    useEffect(() => {
        fetchAllProfiles()
    }, [])

    useEffect(() => {
        getAllUsers();
        console.log(users)
      }, [])

      useEffect(() => {
        console.log('Updated users:', users);
    }, [users]);
  

    useEffect(() => {
        const mergeProfilesWithUsers = () => {
            // Map profiles and merge user data
            const mergedProfiles = allProfiles.map((profile) => {
                const associatedUser = users.find((user) => user._id === profile.userId);
                return {
                    ...profile,
                    practitionerImage: associatedUser?.userProfilePicture || '', // Merge userProfilePicture
                };
            });
    
            const { name, location } = searchQuery;
    
            const displayedPractitioners = mergedProfiles.filter((profile) => {
                const firstName = profile.firstName.toLowerCase();
                const lastName = profile.lastName.toLowerCase();
                const practitionerLocation = profile.city?.toLowerCase() || '';
    
                return (
                    (name === '' ||
                        firstName.includes(name) ||
                        lastName.includes(name)) &&
                    (location === '' || practitionerLocation.includes(location))
                );
            });
    
            setRenderedPractitioners(displayedPractitioners);
        };
    
        mergeProfilesWithUsers();
    }, [allProfiles, users, searchQuery]);
    
    

    const practitionerList = renderedPractitioners.map((person) => (
        <PractitionerCard
            key={person.id || `${person.firstName}-${person.lastName}`}
            firstName={person.firstName}
            lastName={person.lastName}
            location={person.city}
            phone={person.phoneNumber}
            email={person.email}
            image={person.practitionerImage} 
        />
    ));

    return (
        <>
            <div
                className="w-full h-48 sm:h-64 md:h-80 lg:h-96 relative bg-white"
                style={{
                    backgroundImage: `url(${banner}), url(${paleBanner})`,
                    backgroundSize: 'cover, cover',
                    backgroundPosition: 'center, center',
                    backgroundRepeat: 'no-repeat, no-repeat',
                }}
            >
                <div className="absolute inset-0 flex items-center justify-center">
                    <h1 className="text-white text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-fenix font-normal">
                        Find a Certified Practitioner
                    </h1>
                </div>
            </div>
            <div className="w-11/12 sm:w-10/12 md:w-3/4 lg:w-2/3 xl:w-1/2 mx-auto mt-6">
                <h2 className="text-2xl text-gray-800 font-semibold mb-4 text-center">Refine Results</h2>
                <div className="flex flex-col sm:flex-row sm:justify-between gap-4 mb-4">
                    <input
                        className="w-full sm:w-1/2 px-4 py-2 rounded-full border border-gray-400 text-gray-600 text-lg placeholder-gray-500"
                        name="name"
                        onChange={searchHandler}
                        placeholder="Name..."
                    />
                    <input
                        className="w-full sm:w-1/2 px-4 py-2 rounded-full border border-gray-400 text-gray-600 text-lg placeholder-gray-500"
                        name="location"
                        onChange={searchHandler}
                        placeholder="Zip Code, City or State..."
                    />
                </div>
                {(searchQuery.name || searchQuery.location) && (
                    <div className="text-center text-lg font-medium text-gray-700">
                        Results: {renderedPractitioners.length}
                    </div>
                )}
            </div>

            <div className="flex flex-wrap gap-4 justify-center w-11/12 sm:w-10/12 md:w-3/4 lg:w-2/3 xl:w-1/2 mx-auto my-8">
                {practitionerList.length > 0 ? (
                    practitionerList
                ) : (
                    <div className="text-center text-lg font-medium text-gray-700">
                        No practitioners match your search criteria.
                    </div>
                )}
            </div>
        </>
    );
};
