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
    const [testId, setTestId] = useState(null);
    const baseUrl = import.meta.env.VITE_API_BASE_URL;
    const [loading, setLoading] = useState(false);
    const [testCompletedModalOpen, setTestCompletedModalOpen] = useState(false);
    const [areYouSureModalOpen, setAreYouSureModalOpen] = useState(false);
    const [score, setScore] = useState(null);
    const [isTimeUp, setIsTimeUp] = useState(false);

    //below function is called when user purchases test.  It generates the 100 test questions and unique test ID
    const fetchTestQuestions = async () => {
        if (user && user.email) {
            try {
                const response = await fetch(
                    `${baseUrl}/api/test/${user.email}/generate`,
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
                setTestId(data._id);
                console.log(testQuestions);
                console.log(testId, 'test id');
            } catch (error) {
                console.error('Error fetching profile data:', error);
                setError(error.message);
            }
        }
    };

    const startTest = async () => {
        console.log('starting test');
        const accessToken = await getAccessTokenSilently();
        if (user && user.email) {
            try {
                setLoading(true);
                const response = await fetch(
                    `${baseUrl}/api/user/${user.email}`,
                    {
                        method: 'GET',
                        headers: {
                            'Content-Type': 'application/json',
                            Authorization: `Bearer ${accessToken}`,
                        },
                    },
                );

                if (!response.ok) {
                    throw new Error('Unable to retrieve user data');
                }

                const userData = await response.json();
                const { assessments } = userData;

                if (!assessments) {
                    throw new Error('Test ID not found for this user.');
                }
                const testResponse = await fetch(
                    `${baseUrl}/api/test/${user.email}/start-test/${assessments}`,
                    {
                        method: 'PATCH',
                        headers: {
                            'Content-Type': 'application/json',
                            Authorization: `Bearer ${accessToken}`,
                        },
                    },
                );

                if (testResponse.ok) {
                    const data = await testResponse.json();
                    console.log('Successfully updated:', data.test.questions);
                    setTestQuestions(data.test.questions);
                    setTestId(data.test._id);
                    console.log('test question state updated!');
                    console.log(testId, 'test ID');
                } else {
                    const errorData = await testResponse.json();
                    console.error('Error starting test:', errorData.message);
                    alert(`Error: ${errorData.message}`);
                }
            } catch (error) {
                console.error('Failed to start test', error);
                alert('An error occurred. Please try again.');
            } finally {
                setLoading(false);
            }
        } else {
            alert('Unable to start test. Please log in.');
        }
    };

    const submitTest = async (testId) => {
        try {
            const submittedAnswers =
                JSON.parse(sessionStorage.getItem('testAnswers')) || [];
            console.log(submittedAnswers, 'answers from session storage');

            const payload = {
                testId,
                submittedAnswers,
            };

            const response = await axios.patch(
                `${baseUrl}/api/test/${testId}/submit`,
                payload,
                {
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${await getAccessTokenSilently()}`,
                    },
                },
            );
            console.log('Test Submitted:', response.data);
            const testScore = response.data.updatedTest.score;
            const endDate = response.data.updatedTest.endDate;

            setScore(testScore);
            setTestCompletedModalOpen(true);
            if (testScore < 70) {
                await setRetestDate(endDate);
            }
        } catch (error) {
            console.error(
                'Error submitting test:',
                error.response?.data || error.message,
            );
        }
    };


    //user.updatedTest.endTime is the end date
    const setRetestDate = async (endDate) => {
        try {
            // Get the current timestamp (same as endDate in this case)
            const now = Date.now();
            // const newNow = now.toString()
            // console.log(now, "date.now")
            // console.log(newNow, 'new now')
        
            // Add 21 days in milliseconds
            const retestDate = new Date(now + 21 * 24 * 60 * 60 * 1000);
        
            console.log(retestDate);
        
            const payload = {
                retestDate: retestDate.toISOString(),
                freeRetestUsed: true
            };

        
            const response = await axios.patch(
                `${baseUrl}/api/user/${user.email}/retest`,
                payload,
                {
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${await getAccessTokenSilently()}`,
                    },
                },
            );

            console.log('Retest date set:', response.data);
        } catch (error) {
            console.error(
                'Error setting retest date:',
                error.response?.data || error.message,
            );
        }
    };

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
                    setTestId,
                    startTest,
                    loading,
                    setLoading,
                    testCompletedModalOpen,
                    setTestCompletedModalOpen,
                    score,
                    setScore,
                    isTimeUp,
                    setIsTimeUp,
                    areYouSureModalOpen,
                    setAreYouSureModalOpen,
                }}
            >
                {children}
            </AssessmentContext.Provider>
        </>
    );
};
