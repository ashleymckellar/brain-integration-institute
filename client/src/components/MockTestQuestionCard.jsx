import { useState, useEffect, useContext, useMemo } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Timer } from './Timer';
import { AssessmentContext } from '../contexts';
import questionFlag from '../assets/icons/questionFlag.svg';
import circleFlag from '../assets/icons/circleFlag.png';
import TestCompletedModal from './TestCompletedModal';
import AreYouSureTestModal from './AreYouSureTestModal';
import checkFlagged from '../assets/icons/checkFlagged.png';
import bookStack from '../assets/images/bookStack.jpg';
import celebrateStudent from '../assets/images/celebrateStudent.png';
import greenArrow from '../assets/icons/GreenArrow.png';
import greenArrowLeft from '../assets/icons/GreenArrowLeft.png';
import blackFlag from '../assets/icons/blackFlag.png';

export const MockTestQuestionCard = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const {
        testQuestions,
        setTestQuestions,
        submitTest,
        testId,
        testCompletedModalOpen,
        setTestCompletedModalOpen,
        areYouSureModalOpen,
        setAreYouSureModalOpen,
        setIsTimeUp,
        score,
    } = useContext(AssessmentContext);

    const [answers, setAnswers] = useState(() => {
        const savedAnswers = sessionStorage.getItem('testAnswers');
        return savedAnswers ? JSON.parse(savedAnswers) : [];
    });
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [isFlagged, setIsFlagged] = useState(false);
    const [flaggedQuestions, setFlaggedQuestions] = useState([]);
    const [time, setTime] = useState(5400);

    // const [loading, setLoading] = useState(false);

    // console.log(time, 'time');
    // console.log(score, 'score');
    // console.log(testId, 'testid');
    useEffect(() => {
        const isPageReload = () => {
            const entries = performance.getEntriesByType('navigation');
            if (entries.length > 0) {
                return entries[0].type === 'reload';
            }
            return false;
        };
    
        const handleBeforeUnload = (e) => {
            if (!isPageReload()) {
                // Call submitTest for tab close or navigation away
                submitTest(testId);
                console.log('Test submitted on navigation or tab close');
    
                // Prevent the default browser behavior for navigating away
                e.preventDefault();
                e.returnValue = ''; // Required for some browsers to show a confirmation dialog
            }
        };
    
        window.addEventListener('beforeunload', handleBeforeUnload);
    
        return () => {
            window.removeEventListener('beforeunload', handleBeforeUnload);
        };
    }, [submitTest, testId]);
    

    // Load initial data
    useEffect(() => {
        if (!testQuestions || testQuestions.length === 0) {
            // Try to retrieve questions from localStorage
            const storedQuestions = sessionStorage.getItem('testQuestions');
            if (storedQuestions) {
                setTestQuestions(JSON.parse(storedQuestions)); // Set from localStorage if available
                console.log(
                    'Loaded questions from sessionStorage:',
                    JSON.parse(storedQuestions),
                );
            } else {
                console.log('No test questions in sessionStorage.');
            }
        } else {
            // Save questions to localStorage if they exist
            sessionStorage.setItem(
                'testQuestions',
                JSON.stringify(testQuestions),
            );
            console.log('Saved questions to sessionStorage:', testQuestions);
        }
    }, [testQuestions, setTestQuestions]);

    useEffect(() => {
        if (time === 0) {
            submitTest(testId);
        }
    }, [time])

    // Set initial answers and determine current question index
    useEffect(() => {
        if (testQuestions.length > 0) {
            const initialAnswers = testQuestions.map((question) => ({
                questionId: question._id,
                questionText: question.questionText,
                questionNumber: question.questionNumber,
                submittedAnswer: '',
                isFlagged: false,
            }));

            if (answers.length === 0) {
                setAnswers(initialAnswers);
            }

            const questionIndex = testQuestions.findIndex((q) => q._id === id);
            setCurrentQuestionIndex(questionIndex !== -1 ? questionIndex : 0);

            if (questionIndex === -1) {
                navigate(`/assessment/${testQuestions[0]._id}`, {
                    replace: true,
                });
            }
        }
    }, [testQuestions, id, answers, navigate]);

    // Save answers to session storage
    useEffect(() => {
        sessionStorage.setItem('testAnswers', JSON.stringify(answers));
    }, [answers]);

    useEffect(() => {
        const savedAnswers = sessionStorage.getItem('testAnswers');
        if (savedAnswers) {
            const parsedAnswers = JSON.parse(savedAnswers);
            const currentAnswer = parsedAnswers[currentQuestionIndex];
            setIsFlagged(currentAnswer?.isFlagged || false);
        }
    }, [currentQuestionIndex]);

    const currentQuestion = useMemo(
        () => testQuestions[currentQuestionIndex] || {},
        [testQuestions, currentQuestionIndex],
    );

    const options = useMemo(() => {
        if (!currentQuestion) return [];
        return [
            { label: 'A', text: `A) ${currentQuestion.optionA}` },
            { label: 'B', text: `B) ${currentQuestion.optionB}` },
            currentQuestion.optionC !== 'N/A' && {
                label: 'C',
                text: `C) ${currentQuestion.optionC}`,
            },
            currentQuestion.optionD !== 'N/A' && {
                label: 'D',
                text: `D) ${currentQuestion.optionD}`,
            },
        ].filter(Boolean);
    }, [currentQuestion]);

    // Handlers
    const handleNavigation = (questionId) => {
        navigate(`/assessment/${questionId}`);
    };

    const handleChange = (e) => {
        const selectedLetter = e.target.value;
        const selectedOption = options.find(
            (option) => option.label === selectedLetter,
        );
        const updatedAnswers = [...answers];

        updatedAnswers[currentQuestionIndex] = {
            ...updatedAnswers[currentQuestionIndex],
            submittedAnswer: selectedOption.text,
        };

        setAnswers(updatedAnswers);
    };

    const handleFlagClick = () => {
        const updatedAnswers = [...answers];
        updatedAnswers[currentQuestionIndex] = {
            ...updatedAnswers[currentQuestionIndex],
            isFlagged: !isFlagged,
        };
        setAnswers(updatedAnswers);
        setIsFlagged(!isFlagged);
        sessionStorage.setItem('testAnswers', JSON.stringify(updatedAnswers));
    };

    const handleNextQuestion = () => {
        const currentIndex = testQuestions.findIndex(
            (question) => question._id === id,
        );

        if (currentIndex < testQuestions.length - 1) {
            const nextQuestionId = testQuestions[currentIndex + 1]._id;
            setIsFlagged(false);

            navigate(`/assessment/${nextQuestionId}`);
        } else {
            alert('You have completed the test!');
            navigate('/assessment');
        }
        setFlaggedQuestions(answers.filter((question) => question.isFlagged));
    };
    const handlePreviousQuestion = () => {
        const currentIndex = testQuestions.findIndex(
            (question) => question._id === id,
        );

        if (currentIndex > 0) {
            const previousQuestionId = testQuestions[currentIndex - 1]._id;
            setIsFlagged(false);
            navigate(`/assessment/${previousQuestionId}`);
        } else {
            alert('You are at the first question!');
        }
        setFlaggedQuestions(answers.filter((question) => question.isFlagged));
    };

    if (!testQuestions || testQuestions.length === 0) {
        return <div>Loading questions, please wait...</div>;
    }

    const handleAreYouSure = () => {
        setAreYouSureModalOpen(false);
        submitTest(testId);
        console.log(testId, 'test ID');
        setIsTimeUp(true);
        setTime(0);
        setTestCompletedModalOpen(true);
    };

    // console.log(currentQuestionIndex)

    //write function that submits the test if time is === 0

    return (
        <div className="flex min-h-screen border border-black mx-[300px] rounded-lg">
            <h2 className="absolute right-[350px] top-[250px] font-poppins text-2xl rounded-md bg-white p-2">
                Question {currentQuestionIndex + 1}
            </h2>
            <div className="absolute top-[220px] right-10 bg-[#F5F5F5] rounded-md shadow p-3">
                <Timer seconds={time} setTime={setTime} />
                <h2 className='text-center'>{currentQuestionIndex + 1}/100</h2>
            </div>
            <div className="flex items-center">
                <div className="absolute top-[220px] left-10 bg-[#F5F5F5] rounded-md shadow p-3 w-60 text-center">
                    <div className="flex flex-col items-center gap-5">
                        <p className="text-2xl">View</p>
                        <img src={blackFlag} className="w-10 h-10" />

                        <ul>
                            {flaggedQuestions.map((question) => (
                                <li key={question.questionId}>
                                    <button
                                        onClick={() =>
                                            handleNavigation(
                                                question.questionId,
                                            )
                                        }
                                        className="hover:text-blue"
                                    >
                                        Question {question.questionNumber}
                                    </button>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            </div>

            <div className="items-center justify-center px-[300px] py-[200px] min-w-75 relative">
                <button
                    onClick={handleFlagClick}
                    className="absolute top-10 left-10"
                >
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

                <div className="flex flex-col items-center justify-center gap-4 border border-white w-[895px] h-[695px] rounded shadow bg-[#F5F5F5] p-10">
                   
                   
                    <p className="font-poppins text-xl">
                        {currentQuestion.questionText}
                    </p>
                    <p>{currentQuestion.isFlagged}</p>
                    <ul>
                        {options.map((option) => (
                            <label
                                key={option.label}
                                className="flex items-center gap-2 text-xl"
                            >
                                <input
                                    type="radio"
                                    value={option.label}
                                    checked={
                                        answers[currentQuestionIndex]
                                            ?.submittedAnswer ===
                                        `${option.label}) ${
                                            option.text.split(') ')[1]
                                        }`
                                    }
                                    name={`question-${currentQuestionIndex}`}
                                    onChange={(e) =>
                                        handleChange(e, currentQuestionIndex)
                                    }
                                />
                                <span>{option.text}</span>
                            </label>
                        ))}
                    </ul>
                    {(currentQuestionIndex > 0 && (
                    <button
                        onClick={handlePreviousQuestion}
                        className="absolute left-[330px] bottom-[450px]"
                    >
                        <img src={greenArrowLeft} alt="green arrow left" />
                    </button>
                    ))}

          

                    <div className="flex gap-10">
                        {areYouSureModalOpen && (
                            <AreYouSureTestModal
                                open={areYouSureModalOpen}
                                onClose={() => setAreYouSureModalOpen(false)}
                            >
                                <div className="text-center justify-center w-[800px] h-80 flex flex-col items-center gap-2 mb-10">
                                    <img
                                        src={circleFlag}
                                        alt="circle with flag"
                                    />
                                    <p className="text-3xl pt-10 text-center">
                                        You have finished the assessment. You
                                        can check flagged questions or submit
                                        assessment.
                                    </p>
                                </div>
                                <div className="flex gap-10 justify-center items-center">
                                    {/* Check Flagged Questions Button */}
                                    <button
                                        onClick={() =>
                                            setAreYouSureModalOpen(false)
                                        }
                                        className="flex items-center justify-center"
                                    >
                                        <img
                                            src={checkFlagged}
                                            alt="check flagged"
                                        />
                                    </button>

                                    {/* Submit Assessment Button */}
                                    <button
                                        className="bg-medium-pale-green hover:bg-green-600 rounded-full px-6 py-2 text-white font-medium"
                                        onClick={() => handleAreYouSure()}
                                    >
                                        Submit Assessment
                                    </button>
                                </div>
                            </AreYouSureTestModal>
                        )}

                        {testCompletedModalOpen && score && score >= 70 ? (
                            <TestCompletedModal
                                open={testCompletedModalOpen}
                                onClose={() => setTestCompletedModalOpen(false)}
                            >
                                <div className="text-center  w-[400px] h-[480px] flex flex-col items-center gap-10 mb-10 pb-10 m-20">
                                    <img
                                        src={celebrateStudent}
                                        alt="celebrating student"
                                        className=" w-[400px] h-[380px]"
                                    />
                                    <p className="text-xl">
                                        Congratulations, you passed!
                                    </p>
                                    <p>Score: {score}%</p>
                                </div>
                                <div className="flex gap-10 justify-center">
                                    <button
                                        className="mt-4 bg-medium-pale-green hover:bg-green-600 rounded-full px-6 py-2 text-white font-medium"
                                        onClick={() =>
                                            setTestCompletedModalOpen(false)
                                        }
                                    >
                                        OK
                                    </button>
                                </div>
                            </TestCompletedModal>
                        ) : (
                            <TestCompletedModal
                                open={testCompletedModalOpen}
                                onClose={() => setTestCompletedModalOpen(false)}
                            >
                                <div className="text-center  w-[400px] h-[480px] flex flex-col items-center gap-10 mb-10 pb-10 m-20">
                                    <img
                                        src={bookStack}
                                        alt="books"
                                        className=" w-[400px] h-[380px]"
                                    />
                                    <p className="text-xl">
                                        Unfortunately, you did not earn a
                                        passing score of 70%.
                                    </p>
                                    <p className="text-xl">
                                        Please try the assessment again in three
                                        months.
                                    </p>
                                    <p className="text-lg">Score: {score}%</p>
                                </div>
                                <div className="flex justify-center gap-10">
                                    <button
                                        className="mt-4 bg-medium-pale-green hover:bg-green-600 rounded-full px-6 py-2 text-white font-medium"
                                        onClick={() =>
                                            setTestCompletedModalOpen(false)
                                        }
                                    >
                                        OK
                                    </button>
                                </div>
                            </TestCompletedModal>
                        )}
                    </div>
                    <button
                        onClick={() => {
                            if (
                                currentQuestionIndex <
                                testQuestions.length - 1
                            ) {
                                handleNextQuestion();
                            } else {
                                setAreYouSureModalOpen(true);
                            }
                        }}
                        className={`absolute right-[330px] bottom-[450px] ${
                            currentQuestionIndex < testQuestions.length - 1
                                ? ''
                                : 'bg-medium-pale-green hover:bg-green-600 rounded-full w-[204px] h-[43px] text-white font-medium px-6 py-2'
                        }`}
                    >
                        {currentQuestionIndex < testQuestions.length - 1 ? (
                            <img src={greenArrow} alt="green arrow" />
                        ) : (
                            'Finish Test'
                        )}
                    </button>
                </div>
            </div>
        </div>
    );
};
