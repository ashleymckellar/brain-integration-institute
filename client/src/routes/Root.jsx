/* eslint-disable no-unused-vars */
import { Outlet } from 'react-router-dom';
import { useAuth0 } from '@auth0/auth0-react';
import { Navbar } from '../components/header/Navbar';
import { Home } from './Home';
// import { CloudinaryProvider } from './CloudinaryProvider';

export const Root = () => {
    const { user, isLoading } = useAuth0();

    if (!user) {
        return (
            <div>
                <Navbar />;
                <Home />
            </div>
        );
    }
    return (
        <div>
            <Navbar />
            <section>
                <Outlet />
            </section>
        </div>
    );
};
