import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Timer } from './Timer';

export const MockTestQuestionCard = () => {
    const { id } = useParams();
    const navigate = useNavigate();

    const testQuestions = [
        {
            id: 1,
            type: 'multiple choice',
            question:
                'Which part of the brain is primarily responsible for higher cognitive functions like thinking and memory?',
            options: ['A. Cerebellum', 'B. Brainstem', 'C. Cerebrum', 'D. Spinal Cord'],
            answer: 'c) Cerebrum',
        },
        {
            id: 2,
            type: 'multiple choice',
            question:
                'Which brain structure is associated with higher cognitive functions like reasoning and decision-making?',
            options: [
                'A. Reptilian Brain',
                'B. Neocortex',
                'C. Paleomammalian Brain',
                'D. Amygdala',
            ],
            answer: 'B. Neocortex',
        },
        {
            id: 3,
            type: 'true/false',
            question:
                'Empathy from a practitioner helps build trust and emotional support during a session.',
            options: ['A. True', 'B. False'],
            answer: 'A. True',
        },
        {
            id: 4,
            type: 'true/false',
            question: 'Reflective listening requires only paraphrasing the speaker’s words and not acknowledging their emotions.',
            options: ['A. True', 'B. False'],
            answer: 'B. False',
        },
        {
            id: 5,
            type: 'multiple choice',
            question:
                'What structure do the lacrimal bones help form?',
            options: [
                'A. The optic canal',
                'B. The nasal cavity',
                'C. The nasolacrimal canal',
                'D. The auditory canal',
            ],
            answer: 'C) The nasolacrimal canal',
        },
    ];

    const initializeAnswers = () => {
        const storedAnswers = sessionStorage.getItem('testAnswers');
        if (storedAnswers) {
            console.log('Loaded from sessionStorage:', storedAnswers); 
            return JSON.parse(storedAnswers);
        }

        const initialAnswers = Array(100).fill({
            questionId: null,
            submittedAnswer: '',
        });
        sessionStorage.setItem('testAnswers', JSON.stringify(initialAnswers));
        console.log('Initialized new answers:', initialAnswers); 
        return initialAnswers;
    };

    const [answers, setAnswers] = useState(initializeAnswers);
    const [question, setQuestion] = useState(null);

    console.log(answers, 'answers state')

    const handleChange = (e, questionIndex) => {
        const updatedAnswers = [...answers];
        updatedAnswers[questionIndex] = {
            questionId: testQuestions[questionIndex].id,
            submittedAnswer: e.target.value,
        };
        setAnswers(updatedAnswers);
        console.log('updated answer state')
    };

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

    useEffect(() => {
        if (answers.length > 0) {
            sessionStorage.setItem('testAnswers', JSON.stringify(answers));
            console.log('Updated answers in sessionStorage:', answers); 
        }
    }, [answers]);

    if (!question) {
        return <div>Neurons firing, please wait...</div>;
    }

    if (!question) {
        return <div>Neurons firing, please wait...</div>;
    }

    // const handleTimeout = () => {
    //     alert('Time is up!  Submitting test');
     
    // };
 

    return (
        <div className="flex min-h-screen items-center justify-center min-w-75">
            <Timer seconds={15}  />
     
            <div className="flex flex-col items-center justify-center gap-4 border border-white w-[700px] rounded shadow bg-[#F5F5F5] p-10">
                <h2 className="font-poppins">Question {question.id}</h2>
                <p className="font-poppins">{question.question}</p>
                <ul>
                    {question.options.map((option, i) => (
                        <label key={i} className="flex items-center gap-2">
                            <input
                                type="radio"
                                name={`question-${question.id}`}
                                value={option}
                                checked={answers[question.id - 1]?.submittedAnswer === option}
                                onChange={(e) =>
                                    handleChange(e, question.id - 1)
                                }
                            />
                            <span>{option}</span>
                        </label>
                    ))}
                </ul>
                <div className="flex gap-5">
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
