/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { useState, useEffect, useContext } from 'react';
// import axios from "axios"
import { PractitionerContext } from '../contexts';
import { UserContext } from '../contexts';
import { AdminContext } from '../contexts'
import { useAuth0 } from '@auth0/auth0-react';

export const PractitionerProvider = ({ children }) => {
    const [practitioners, setPractitioners] = useState([]);
    const { fetchAllProfiles, allProfiles, setAllProfiles } =
        useContext(UserContext);

        const {
          getAllUsers,
          users,
          setIndividualUser,
          individualUser,
          fetchProfileData,
          deleteUser,
      } = useContext(AdminContext);
    useEffect(() => {
        fetchAllProfiles;
        console.log(allProfiles)
    }, []);

    useEffect(() => {
      getAllUsers;
      console.log(users)
    }, [])

    return (
        <PractitionerContext.Provider
            value={{
                allProfiles,
            }}
        >
            {children}
        </PractitionerContext.Provider>
    );
};
