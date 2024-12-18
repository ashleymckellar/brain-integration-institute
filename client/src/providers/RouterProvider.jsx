/* eslint-disable react/prop-types */
import {
    createBrowserRouter,
    RouterProvider as ReactRouterProvider,
    Navigate,
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

    return isAdmin ? children : <NotFound />;
};

const AssessmentRoute = ({ children }) => {
  
    const { userMetaData } = useContext(CloudinaryContext);

  
    const hasAssessmentAccess = userMetaData?.assessmentAccess;

    return hasAssessmentAccess ? children : <NotFound />;
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
                path: 'assessment',
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
    const { isLoading, user } = useAuth0();
    const { getUserMetaData, userMetaData } = useContext(CloudinaryContext);

    useEffect(() => {
        if (user?.email) {
            getUserMetaData(user.email);
        }
    }, []);

    if (isLoading) return <div>Neurons firing, please wait...</div>;

    return <ReactRouterProvider router={router} />;
};
