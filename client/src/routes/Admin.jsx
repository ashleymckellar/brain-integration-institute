import { Link, Outlet } from 'react-router-dom';
import paleBanner from '../assets/icons/PaleGreenPractitionerBackground.png';
import banner from '../assets/icons/PractitionerBackground.png';
import { Footer } from '../components/Footer.jsx';

export const Admin = () => {
    return (
        <div>
            {/* Banner Section */}
            <div
                className="w-full sm:h-80 md:h-96 relative bg-white"
                style={{
                    backgroundImage: `url(${banner}), url(${paleBanner})`,
                    backgroundSize: 'cover, cover',
                    backgroundPosition: 'center, center',
                    backgroundRepeat: 'no-repeat, no-repeat',
                }}
            >
                <div className="absolute inset-0 flex items-center justify-center">
                    <h1 className="text-white text-3xl sm:text-3xl md:text-4xl lg:text-5xl font-fenix font-normal">
                        Admin Dashboard
                    </h1>
                </div>
            </div>

            <div className="flex h-[calc(100vh-256px)] items-between p-4">
                {/* Sidebar for Admin Menu */}
                <div className="min-w-[220px] bg-gray p-6 border border-gray rounded-2xl h-full shadow-lg">
                    <h2 className="font-bold text-xl mb-4 text-center text-black">
                        Admin Menu
                    </h2>
                    <ul className="space-y-4 text-center">
                        {[
                            {
                                path: 'practitioner-management',
                                label: 'Practitioner Management',
                            },
                            { path: 'add-admins', label: 'Admin Management' },
                            { path: 'admin-uploads', label: 'Document Uploads' },
                            { path: 'messaging-hub', label: 'Notifications' },
                        ].map((item) => (
                            <li key={item.path}>
                                <Link
                                    to={item.path}
                                    className="py-3 px-4 w-full block transition duration-200 border-b-2 border-transparent hover:bg-green-500 rounded-xl hover:text-white text-lg text-black"
                                >
                                    {item.label}
                                </Link>
                            </li>
                        ))}
                    </ul>
                </div>

                {/* Main Content Area */}
                <div className="flex flex-col flex-1 pl-10">
                    <div className="flex gap-6 flex-wrap justify-start">
                        {/* Main dashboard items */}
                        {[
                            {
                                label: 'Video Presentation',
                                color: 'bg-sky-blue',
                            },
                            {
                                label: 'Brain Integration Training',
                                color: 'bg-mauve',
                            },
                            { label: 'Clinical Hours', color: 'bg-ice-blue' },
                            {
                                label: 'First Aid Certification',
                                color: 'bg-lavender',
                            },
                            {
                                label: 'CPR Certification',
                                color: 'bg-lightest-grey',
                            },
                            { label: 'Insurance', color: 'bg-greyish-blue' },
                            { label: 'Assessment', color: 'bg-pinky-pink' },
                        ].map((item) => (
                            <div
                                key={item.label}
                                className={`w-[189px] h-[102px] rounded-xl ${item.color} shadow-md font-fira font-semibold text-lg flex p-4 items-end justify-center text-center text-black hover:shadow-lg transition-shadow`}
                            >
                                {item.label}
                            </div>
                        ))}
                    </div>

                    <div className="flex flex-col justify-center items-center w-full pt-10 ">
                        <Outlet />
                        <Footer />
                     
                       
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Admin;
