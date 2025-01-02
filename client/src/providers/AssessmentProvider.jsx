/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { useState } from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import { AssessmentContext } from '../contexts';
import axios from 'axios';
import { useParams, useNavigate, useLocation } from 'react-router-dom';

export const AssessmentProvider = ({ children }) => {
    const [testQuestions, setTestQuestions] = useState([]);
    const { getAccessTokenSilently, user } = useAuth0();
    const [error, setError] = useState(null);
    const [testId, setTestId] = useState(null)

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
                setTestId(data._id)
                console.log(testQuestions);
                console.log(testId, "test id")
            } catch (error) {
                console.error('Error fetching profile data:', error);
                setError(error.message);
            }
        }
    };

    const submitTest = async (testId) => {
        try {
            const submittedAnswers = JSON.parse(sessionStorage.getItem('testAnswers')) || [];

            // Create payload to send to the backend
            const payload = {
                testId,
                submittedAnswers,
              
            };
    
            // Send the payload in the request body
            const response = await axios.patch(
                `/api/test/${testId}/submit`,
                payload,  
                {
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${await getAccessTokenSilently()}`, 
                    },
                }
            );
            console.log('Test Submitted:', response.data);
        } catch (error) {
            console.error(
                'Error submitting test:',
                error.response?.data || error.message,
            );
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
                    testQuestions,
                    submitTest,
                    testId,
                    setTestId
                }}
            >
                {children}
            </AssessmentContext.Provider>
        </>
    );
};
