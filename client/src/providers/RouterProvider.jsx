import {
    createBrowserRouter,
    RouterProvider as ReactRouterProvider,
} from 'react-router-dom';
import { Profile } from '../routes/Profile';
import { Root } from '../routes/Root';
import { useAuth0 } from '@auth0/auth0-react';
import { Home } from '../routes/Home';
import { AboutUs } from '../routes/AboutUs';
import { Certification } from '../routes/Certification';
import { Practitioner } from '../routes/Practitioner';
import { PaymentSuccessPage } from '../routes/PaymentSuccessPage';
import { NotFound } from '../routes/NotFound';
import { Admin } from '../routes/Admin';
import { ContactUs } from '../routes/ContactUs';
import { RonBio } from '../routes/RonBio';
import { DebbieBio } from '../routes/DebbieBio';
import { TerriBio } from '../routes/TerriBio';
import { JulissaBio } from '../routes/JulissaBio';
import { SteveBio } from '../routes/SteveBio';
import { TamiBio } from '../routes/TamiBio';
import { Terms } from '../routes/Terms';
import AddAdmins from '../routes/AddAdmins';
import { Notifications } from '../routes/Notifications';
import { PractitionerDetails } from '../components/PractitionerDetails'
import PractitionerManagement from '../routes/PractitionerManagement';
import AdminUploadManagement from '../routes/AdminUploadManagement';
// import MessagingHub from '../routes/MessagingHub';
import UserSpecificAdminView from '../components/UserSpecificAdminView';
import ScrollToTop from '../components/ScrollToTop';

const router = createBrowserRouter([
    {
        path: '/',
        element: <Root />,
        children: [
            {
                index: true,
                element: <Home />,
            },

            {
                path: '/profile',
                element: <Profile />,
            },

            {
                path: '/certification',
                element: <Certification />,
            },

            {
                path: '/success',
                element: <PaymentSuccessPage />,
            },
            // {
            //     path: '/contact-us',
            //     element: <ContactUs />,
            // },

            {
                path: '/notifications',
                element: <Notifications />,
            },
            {
                path: '/admin',
                element: <Admin />,
                children: [
                    {
                        path: 'practitioner-management',
                        element: <PractitionerManagement />,
                        children: [
                            {
                                path: ':userEmail',
                                element: <UserSpecificAdminView />,
                            },
                        ],
                    },
                    { path: 'add-admins', element: <AddAdmins /> },
                    {
                        path: 'admin-uploads',
                        element: <AdminUploadManagement />,
                    },
                ],
            },
        ],
    },
    {
        path: '*',
        element: <NotFound />,
    },
    { path: '/about', element: <AboutUs /> },
    { path: '/', element: <Home /> },

    {
        path: '/practitioner/:email',
        element: <PractitionerDetails />, 
    },
    {
        path: '/contact-us',
        element: <ContactUs />,
    },
    {
        path: '/ron-bio',
        element: <RonBio />,
    },
    {
        path: '/terri-bio',
        element: <TerriBio />,
    },
    {
        path: '/julissa-bio',
        element: <JulissaBio />,
    },
    {
        path: '/steve-bio',
        element: <SteveBio />,
    },
    {
        path: '/tami-bio',
        element: <TamiBio />,
    },
    {
        path: '/debbie-bio',
        element: <DebbieBio />
    },
    {
        path: '/terms',
        element: <Terms />,
    },
    {
        path: '/practitioner',
        element: <Practitioner />,
    },
]);

//changed back to Home component.  Auth0 should handle authentication, but we can add secondary way to authenticate/register using this Auth route.

export const RouteProvider = () => {
    const { isLoading } = useAuth0();
    if (isLoading) return <div>Loading...</div>;
    return   <ReactRouterProvider router={router}>
            <ScrollToTop>
                <ReactRouterProvider router={router} />
            </ScrollToTop>
        </ReactRouterProvider>;
};
