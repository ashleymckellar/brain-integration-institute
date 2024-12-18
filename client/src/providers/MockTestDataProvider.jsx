/* eslint-disable react/prop-types */
import { useState, useEffect, useContext } from 'react';
import { MockTestQuestions } from '../contexts';
import { useAuth0 } from '@auth0/auth0-react';

export const MockTestDataProvider = ({ children }) => {
    const [testQuestions, setTestQuestions] = useState([]);

    useEffect(() => {
        setTestQuestions([
            {
                id: 1,
                type: 'true/false',
                question:
                    'The left hemisphere of the brain is responsible for controlling the left side of the body.',
                options: ['True', 'False'],
                answer: false,
            },
            {
                id: 2,
                type: 'multiple choice',
                question:
                    'Which of the following parts of the brain is primarily responsible for regulating vital functions such as breathing and heart rate?',
                options: [
                    'A. Cerebellum',
                    'B. Medulla oblongata',
                    'C. Hippocampus',
                    'D. Frontal lobe',
                ],
                answer: 'B. Medulla oblongata',
            },
            {
                id: 3,
                type: 'true/false',
                question:
                    'The prefrontal cortex is responsible for higher-order functions such as decision-making and problem-solving.',
                    options: ['True', 'False'],
                answer: true,
            },
            {
                id: 4,
                type: 'multiple choice',
                question:
                    'What is the primary function of the corpus callosum?',
                options: [
                    'A. Regulating hormones in the body',
                    'B. Facilitating communication between the left and right hemispheres of the brain',
                    'C. Storing long-term memories',
                    'D. Controlling balance and coordination',
                ],
                answer: 'B. Facilitating communication between the left and right hemispheres of the brain',
            },
            {
                id: 5,
                type: 'multiple choice',
                question:
                    'Which of the following neurotransmitters is most closely associated with mood regulation?',
                options: [
                    'A. Dopamine',
                    'B. Acetylcholine',
                    'C. Serotonin',
                    'D. GABA',
                ],
                answer: 'C. Serotonin',
            },
        ]);
    }, []);

    console.log(testQuestions, 'test questions')

    return (
        <MockTestQuestions.Provider value={{ testQuestions }}>
            {children}
        </MockTestQuestions.Provider>
    );
};
