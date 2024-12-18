import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

export const MockTestQuestionCard = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [question, setQuestion] = useState(null);
    const [selectedAnswer, setSelectedAnswer] = useState('')

    const testQuestions = [
        {
            id: 1,
            type: 'true/false',
            question:
                'The left hemisphere of the brain is responsible for controlling the left side of the body.',
                options: ['A. True', 'B. False'],
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
            options: ['A. True', 'B. False'],
            answer: true,
        },
        {
            id: 4,
            type: 'multiple choice',
            question: 'What is the primary function of the corpus callosum?',
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
    ];

    const handleNextQuestion = () => {
        const nextId = question.id + 1;
        if (nextId <= testQuestions.length) {
            navigate(`/assessment/${nextId}`);
        } else {
            alert('You have completed the test!');
            navigate('/assessment');
        }
    };

    useEffect(() => {
        const currentId = parseInt(id);
        const currentQuestion = testQuestions.find((q) => q.id === currentId);

        if (currentQuestion) {
            setQuestion(currentQuestion);
        } else {
            setQuestion(null);
        }
    }, [id]);

    if (!question) {
        return <div>Neurons firing, please wait...</div>;
    }

    return (
        <div className="flex min-h-screen items-center justify-center bg-gray-100">
            <div className="flex flex-col items-center justify-center gap-4 p-4 border border-white w-[500px] rounded shadow bg-[#F5F5F5]">
                <h2 className='font-poppins'>Question {question.id}</h2>
                <p className='font-poppins'>{question.question}</p>
                <ul>
                    {question.options.map((option, idx) => (
                        <li
                            key={idx}
                            className="mt-4 font-poppins"
                        >
                            {option}
                        </li>
                    ))}
                </ul>
                <div className="flex gap-5">
                    <button className="mt-4 bg-medium-pale-green hover:bg-green-600 rounded-full px-6 py-2 text-white font-medium">
                        Submit
                    </button>
                    <button
                        onClick={handleNextQuestion}
                        className="mt-4 bg-medium-pale-green hover:bg-green-600 rounded-full px-6 py-2 text-white font-medium"
                    >
                        {question.id < testQuestions.length
                            ? 'Next Question'
                            : 'Finish Test'}
                    </button>
                </div>
            </div>
        </div>
    );
};
