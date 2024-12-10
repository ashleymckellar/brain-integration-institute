/* eslint-disable no-unused-vars */
import { useState, useContext, useEffect } from "react";
import { AdminContext } from '../contexts';
import { AdminManagementModal } from '../components/AdminManagementModal'

const AddAdminForm = () => {
    const [email, setEmail] = useState("");
    const [searchResults, setSearchResults] = useState([]);
    const [isCurrentAdmin, setIsCurrentAdmin] = useState(false);
    const [isAdmin, setIsAdmin] = useState(false);
    const [adminManagementModalOpen, setAdminManagementModalOpen] = useState(false);

    const {
        getAllUsers,
        users,
        changeAdminStatus,
        sendAdminNotification
    } = useContext(AdminContext);

    console.log(searchResults, 'search results')
    const handleSearchChange = (e) => {
        const query = e.target.value;
        setEmail(query);
    
        // Filter users based on email entered and ensure the user is not an admin
        if (query) {
            const filteredResults = users.filter(user =>
                user.userEmail.toLowerCase().includes(query.toLowerCase()) && !user.isAdmin
            );
            setSearchResults(filteredResults);
        } else {
            setSearchResults([]);
        }
    };
    const checkAdminStatus = async (user) => {
        try {
            const isAdmin = !!user.isAdmin;
            setIsCurrentAdmin(isAdmin);
            return isAdmin;
        } catch (error) {
            console.error('Failed to check user admin status:', error);
            return false;
        }
    };

    const handleCloseModal = () => {
        setAdminManagementModalOpen(false);
    };


//add notification here
    const handlePromoteToAdmin = async (user) => {
        try {
            const isCurrentAdmin = await checkAdminStatus(user);
            const isNewAdmin = !isCurrentAdmin;

            await changeAdminStatus(user.userEmail, isNewAdmin);

            setIsAdmin(isNewAdmin);
            setAdminManagementModalOpen(true)
            
                await sendAdminNotification( {
                    userEmail: user.userEmail,
                    message: "You've been promoted to admin!",
                    notificationType: "adminUpdate",
                });
            
            getAllUsers();
            // alert(
            //     isNewAdmin
            //         ? 'User promoted to admin!'
            //         : 'User admin access revoked',
            // );
            setSearchResults([])
        } catch (error) {
            console.error('Failed to change admin status:', error);
        }
    };

    // const practitionerList = renderedPractitioners.map((person) => (
    //     <PractitionerCard
    //         key={person.id || `${person.firstName}-${person.lastName}`}
    //         firstName={person.firstName}
    //         lastName={person.lastName}
    //         location={`${person.city} ${person.state}`}
    //         phone={person.phoneNumber}
    //         email={person.email}
    //         image={person.practitionerImage}
    //         website={person.website}
    //     />
    // ));

    // const userList = searchResults.map((person) => {
    //     <div>{person.userEmail}</div>
    // })

    return (
        <div className="flex flex-col gap-10 items-center max-w-4xl w-50  h-[80%] p-6 rounded-xl shadow-lg bg-gray ml-10">
            <h2 className="text-2xl font-semibold text-center mb-6">Promote to Admin</h2>
            <h2 className="text-lg text-center mb-6">New admins must be a registered user of the site before being added</h2>
            
            <div className="flex justify-center gap-5">
                <input
                    type="email"
                    placeholder="Enter email address"
                    value={email}
                    onChange={handleSearchChange}
                    className="border border-white rounded-xl p-2"
                />
            </div>

            {searchResults.length > 0 && (
                <div className="mt-4">
                    <h3 className="font-semibold text-center pb-10">Search Results:</h3>
                    <ul>
                        {searchResults.map((user) => (
                            <li key={user._id} className="flex items-center justify-between border border-white p-6 mb-6 rounded-lg bg-white shadow-sm hover:shadow-md gap-10 font-fira font-medium ">
                                <span>{user.userEmail}</span>
                                <button
                                    onClick={() => handlePromoteToAdmin(user)}
                                    className="bg-blue hover:bg-blue text-white px-[10px] py-[8px] rounded-md font-fira font-light"
                                >
                                    Promote to Admin
                                </button>
                            </li>
                        ))}
                    </ul>
                </div>
            )}
                      {adminManagementModalOpen && (
                        <AdminManagementModal
                            open={adminManagementModalOpen}
                            handleClose={handleCloseModal}
                            isCurrentAdmin={isCurrentAdmin}
                        >
                            <div className="flex flex-col justify-center items-center gap-10">
                            {isCurrentAdmin ? (
                           <h3 className="text-xl sm:text-2xl md:text-3xl text-gray-500 font-bold">User admin access revoked</h3>
                    ) : ( <h3 className="text-xl sm:text-2xl md:text-3xl text-gray-500 font-bold">User promoted to admin</h3>

                    )
                }
                                <button
                                    className="bg-medium-pale-green hover:bg-green-600 rounded-md text-white font-medium px-6 py-2"
                                    onClick={handleCloseModal}
                                >
                                    OK
                                </button>
                            </div>
                        </AdminManagementModal>
                    )}
        </div>
    );
};

export default AddAdminForm;