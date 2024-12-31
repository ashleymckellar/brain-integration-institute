import { useState, useEffect, useContext } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Timer } from './Timer';
import { AssessmentContext } from '../contexts';
import questionFlag from '../assets/icons/questionFlag.svg';

export const MockTestQuestionCard = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const { testQuestions } = useContext(AssessmentContext);
    const [answers, setAnswers] = useState([]);
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(null);
    const [isFlagged, setIsFlagged] = useState(false);

    useEffect(() => {
        if (testQuestions && testQuestions.length > 0) {
            if (answers.length === 0) {
                const initialAnswers = testQuestions.map((question) => ({
                    questionId: question._id,
                    submittedAnswer: '',
                }));
                setAnswers(initialAnswers);
            }

            const questionIndex = testQuestions.findIndex(
                (question) => question._id === id,
            );

            if (questionIndex !== -1) {
                setCurrentQuestionIndex(questionIndex);
            } else {
                setCurrentQuestionIndex(0);
                navigate(`/assessment/${testQuestions[0]._id}`, {
                    replace: true,
                });
            }
        }
    }, [testQuestions, id, answers.length, navigate]);

    const handleChange = (e, index) => {
        const updatedAnswers = [...answers];
        updatedAnswers[index] = {
            ...updatedAnswers[index],
            submittedAnswer: e.target.value,
        };
        setAnswers(updatedAnswers);
        sessionStorage.setItem('testAnswers', JSON.stringify(updatedAnswers));
    };

    const handleNextQuestion = () => {
        const currentIndex = testQuestions.findIndex(
            (question) => question._id === id,
        );

        if (currentIndex < testQuestions.length - 1) {
            const nextQuestionId = testQuestions[currentIndex + 1]._id;
            setIsFlagged(false)

            navigate(`/assessment/${nextQuestionId}`);
        } else {
            alert('You have completed the test!');
            navigate('/assessment');
        }
    };

    console.log(currentQuestionIndex, 'current question index');

    if (
        !testQuestions ||
        testQuestions.length === 0 ||
        currentQuestionIndex === null
    ) {
        return <div>Loading questions, please wait...</div>;
    }

    const currentQuestion = testQuestions[currentQuestionIndex];
    const options = [
        { label: 'A', text: currentQuestion.optionA },
        { label: 'B', text: currentQuestion.optionB },
        currentQuestion.optionC !== 'N/A' && {
            label: 'C',
            text: currentQuestion.optionC,
        },
        currentQuestion.optionD !== 'N/A' && {
            label: 'D',
            text: currentQuestion.optionD,
        },
    ].filter(Boolean);

    const handleFlagClick = () => {
        const updatedAnswers = [...answers];
        updatedAnswers[currentQuestionIndex] = {
            ...updatedAnswers[currentQuestionIndex],
            isFlagged: !isFlagged, // Toggle the isFlagged value
        };
        setAnswers(updatedAnswers);
        setIsFlagged(!isFlagged); // Update the local state
        sessionStorage.setItem('testAnswers', JSON.stringify(updatedAnswers)); // Save to sessionStorage
    };
    

    return (
        <div className="flex flex-col min-h-screen items-center justify-center min-w-75">
            <button onClick={handleFlagClick}>
                <img
                    src={questionFlag}
                    alt="Flag question"
                    style={{
                        filter: isFlagged
                            ? 'invert(22%) sepia(97%) saturate(6648%) hue-rotate(0deg) brightness(89%) contrast(107%)'
                            : 'none',
                    }}
                />
            </button>
            <Timer seconds={5400} />
            <div className="flex flex-col items-center justify-center gap-4 border border-white w-[700px] rounded shadow bg-[#F5F5F5] p-10">
                <h2 className="font-poppins">
                    Question {currentQuestionIndex + 1}
                </h2>
                <p>Type: {currentQuestion.questionType}</p>
                <p className="font-poppins">{currentQuestion.questionText}</p>
                <ul>
                    {options.map((option, i) => (
                        <label key={i} className="flex items-center gap-2">
                            <input
                                type="radio"
                                name={`question-${currentQuestion._id}`}
                                value={option.text}
                                checked={
                                    answers[currentQuestionIndex]
                                        ?.submittedAnswer === option.text
                                }
                                onChange={(e) =>
                                    handleChange(e, currentQuestionIndex)
                                }
                            />
                            <span>{`${option.label}. ${option.text}`}</span>
                        </label>
                    ))}
                </ul>
                <div className="flex gap-5">
                    <button
                        onClick={handleNextQuestion}
                        className="mt-4 bg-medium-pale-green hover:bg-green-600 rounded-full px-6 py-2 text-white font-medium"
                    >
                        {currentQuestionIndex < testQuestions.length - 1
                            ? 'Next Question'
                            : 'Finish Test'}
                    </button>
                </div>
            </div>
        </div>
    );
};
