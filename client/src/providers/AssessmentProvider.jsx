/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { useState } from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import { AssessmentContext } from '../contexts';
// import axios from 'axios';
import { useParams, useNavigate, useLocation } from 'react-router-dom';

export const AssessmentProvider = ({ children }) => {
    const [testQuestions, setTestQuestions] = useState([]);
    const { getAccessTokenSilently, user } = useAuth0();
    const [error, setError] = useState(null);

    const fetchTestQuestions = async () => {
        if (user && user.email) {
            try {
                const response = await fetch(
                    `/api/test/${user.email}/generate`,
                    {
                        method: 'GET',
                        headers: {
                            'Content-Type': 'application/json',
                            Authorization: `Bearer ${await getAccessTokenSilently()}`,
                        },
                    },
                );

                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }

                const data = await response.json();
                setTestQuestions(data.questions);
                console.log(testQuestions)
            } catch (error) {
                console.error('Error fetching profile data:', error);
                setError(error.message);
            }
        }
    };

    //create state for assessment responses
    // const [userAnswers, setUserAnswers] = useState([])
    return (
        <>
            {' '}
            <AssessmentContext.Provider
                value={{
                    fetchTestQuestions,
                    setTestQuestions,
                    testQuestions
                }}
            >
                {children}
            </AssessmentContext.Provider>
        </>
    );
};
