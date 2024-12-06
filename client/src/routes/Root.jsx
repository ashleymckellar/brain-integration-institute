/* eslint-disable no-unused-vars */
import { Outlet } from 'react-router-dom';
import { useAuth0 } from '@auth0/auth0-react';
import { Navbar } from '../components/header/Navbar';
import { Home } from './Home';
import { Footer } from '../components/Footer';
import { ContactUs } from './ContactUs';

export const Root = () => {
    const { user, isLoading } = useAuth0();

    if (!user) {
        return (
            <div>
                <Navbar />
                <Home />
                {/* <Footer /> */}
            </div>
        );
    }
    return (
        <div className="min-h-screen">
            <Navbar />
            <section>
                <Outlet />
            </section>
            {/* <Footer className="min-h-screen flex flex-col" /> */}
        </div>
    );
};
