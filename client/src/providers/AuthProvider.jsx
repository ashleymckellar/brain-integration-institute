/* eslint-disable react/prop-types */

import { Auth0Provider } from '@auth0/auth0-react';

export const AuthProvider = ({ children }) => {
    
    return (
        <Auth0Provider
            domain={import.meta.env.VITE_AUTH0_DOMAIN}
            clientId={import.meta.env.VITE_AUTH0_CLIENT_ID}
            authorizationParams={{
                redirect_uri: location.origin,
                audience: import.meta.env.VITE_AUTH0_AUDIENCE_SPA,
                scope: import.meta.env.VITE_AUTH0_SCOPE
            }}
        >
            {children}
        </Auth0Provider>
    )
}
