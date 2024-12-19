/* eslint-disable react/prop-types */
import {
    createBrowserRouter,
    RouterProvider as ReactRouterProvider,

} from 'react-router-dom';
import { useEffect, useState, useContext } from 'react';
import { CloudinaryContext } from '../contexts';

import { Profile } from '../routes/Profile';
import { Assessment } from '../routes/Assessment';
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
import { PractitionerDetails } from '../components/PractitionerDetails';
import PractitionerManagement from '../routes/PractitionerManagement';
import AdminUploadManagement from '../routes/AdminUploadManagement';
// import MessagingHub from '../routes/MessagingHub';
import UserSpecificAdminView from '../components/UserSpecificAdminView';
import { MockTestQuestionCard } from '../components/MockTestQuestionCard';

const AdminRoute = ({ children }) => {
    const { userMetaData } = useContext(CloudinaryContext);
    const isAdmin = userMetaData?.isAdmin;
    return isAdmin && children 
};

const AssessmentRoute = ({ children }) => {
    const { userMetaData } = useContext(CloudinaryContext);
  

    if (Object.keys(userMetaData).length === 0) {
        return <div>Loading user data, please wait...</div>;
    }

    const hasAssessmentAccess = userMetaData?.assessmentAccess;


    return userMetaData && hasAssessmentAccess ? children : <NotFound />
};



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
            {
                path: '/notifications',
                element: <Notifications />,
            },
            {
                path: '/admin',
                element: (
                    <AdminRoute>
                        <Admin />
                    </AdminRoute>
                ),
                children: [
                    {
                        path: 'practitioner-management',
                        element: (
                            <AdminRoute>
                                <PractitionerManagement />
                            </AdminRoute>
                        ),
                        children: [
                            {
                                path: ':userEmail',
                                element: (
                                    <AdminRoute>
                                        <UserSpecificAdminView />
                                    </AdminRoute>
                                ),
                            },
                        ],
                    },
                    {
                        path: 'add-admins',
                        element: (
                            <AdminRoute>
                                <AddAdmins />
                            </AdminRoute>
                        ),
                    },
                    {
                        path: 'admin-uploads',
                        element: (
                            <AdminRoute>
                                <AdminUploadManagement />
                            </AdminRoute>
                        ),
                    },
                ],
            },
            {
                path: '/assessment',
                element: (
                    <AssessmentRoute>
                        <Assessment />
                    </AssessmentRoute>
                ),
            },

            {
                path: '/assessment/:id',
                element: (
                    <AssessmentRoute>
                        <MockTestQuestionCard />
                    </AssessmentRoute>
                ),
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
        element: <DebbieBio />,
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

export const RouteProvider = () => {
    const { isLoading: isAuthLoading, user } = useAuth0();
    const [isLoadingNeurons, setIsLoadingNeurons] = useState(true); // Controls metadata loading
    const { getUserMetaData, userMetaData } = useContext(CloudinaryContext);

    useEffect(() => {
        if (user?.email) {
            getUserMetaData(user.email).finally(() => setIsLoadingNeurons(false));
        } else {
            setIsLoadingNeurons(false); // Skip if no user is logged in
        }
    }, [user?.email]);

    // Unified loading indicator while awaiting Auth0 or user metadata
    if (isAuthLoading || isLoadingNeurons) {
        return <div>Neurons firing, please wait...</div>;
    }

    // Handle case where metadata couldn't be fetched (optional)
    if (!userMetaData) {
        return <div>Error loading user data. Please try again later.</div>;
    }

    return <ReactRouterProvider router={router} />;
};