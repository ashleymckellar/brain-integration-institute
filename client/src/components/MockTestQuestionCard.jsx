import { useState, useEffect, useContext } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Timer } from './Timer';
import { AssessmentContext } from '../contexts';

export const MockTestQuestionCard = () => {
    const { id } = useParams(); // URL param to determine the current question
    const navigate = useNavigate();
    const { testQuestions } = useContext(AssessmentContext); // testQuestions from context

    const [answers, setAnswers] = useState([]);
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);

    // Initialize answers state
    useEffect(() => {
        if (testQuestions) {
            const initialAnswers = testQuestions.map((question) => ({
                questionId: question._questionId,
                submittedAnswer: '',
            }));
            setAnswers(initialAnswers);
        }
    }, [testQuestions]);

    const handleChange = (e, index) => {
        const updatedAnswers = [...answers];
        updatedAnswers[index] = {
            ...updatedAnswers[index],
            submittedAnswer: e.target.value,
        };
        setAnswers(updatedAnswers);
        sessionStorage.setItem('testAnswers', JSON.stringify(updatedAnswers));
        console.log(updatedAnswers, "updated answers session storage")
    };

    const handleNextQuestion = () => {
        if (currentQuestionIndex < testQuestions.length - 1) {
            setCurrentQuestionIndex((prev) => prev + 1);
        } else {
            alert('You have completed the test!');
            navigate('/assessment');
        }
    };

  console.log(testQuestions)
    if (!testQuestions || testQuestions.length === 0) {
        return <div>Loading questions, please wait...</div>;
    }

 
    const currentQuestion = testQuestions[currentQuestionIndex];
    const options = [
        { label: "A", text: currentQuestion.optionA },
        { label: "B", text: currentQuestion.optionB },
        currentQuestion.optionC !== "N/A" && { label: "C", text: currentQuestion.optionC },
        currentQuestion.optionD !== "N/A" && { label: "D", text: currentQuestion.optionD },
    ].filter(Boolean);

      return (
        <div className="flex min-h-screen items-center justify-center min-w-75">
            <Timer seconds={90} />

            <div className="flex flex-col items-center justify-center gap-4 border border-white w-[700px] rounded shadow bg-[#F5F5F5] p-10">
                <h2 className="font-poppins">Question {currentQuestionIndex + 1}</h2>
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
                                    answers[currentQuestionIndex]?.submittedAnswer ===
                                    option.text
                                }
                                onChange={(e) => handleChange(e, currentQuestionIndex)}
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