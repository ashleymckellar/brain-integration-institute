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
    const [showFlagged, setShowFlagged] = useState(false);

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
    }, [time]);

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

    const toggleFlag = () => {
        setShowFlagged(!showFlagged);
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
        <div className="min-h-screen p-4 md:p-8 relative">
            {/* Timer - Outside black border */}
            <div className="fixed right-4 top-4 md:absolute md:right-10 md:top-10 bg-[#F5F5F5] rounded-md shadow p-3 z-10">
                <Timer seconds={time} setTime={setTime} />
                <h2 className="text-center text-sm md:text-base">
                    {currentQuestionIndex + 1}/100
                </h2>
            </div>

            {/* Flagged Questions View - Outside black border */}
            <div className="fixed left-4 top-20 md:absolute md:left-10 md:top-10 bg-[#F5F5F5] rounded-md shadow p-3 w-auto md:w-60 text-center z-10">
                <div className="flex flex-col items-center gap-3 md:gap-5">
                    {showFlagged ? (
                        <>
                            <button
                                onClick={toggleFlag}
                                className="flex flex-col items-center text-lg md:text-2xl gap-2"
                            >
                                Hide
                                <img
                                    src={blackFlag}
                                    className="w-8 h-8 md:w-10 md:h-10"
                                />
                            </button>
                            <ul className="max-h-40 overflow-y-auto">
                                {flaggedQuestions.map((question) => (
                                    <li key={question.questionId}>
                                        <button
                                            onClick={() =>
                                                handleNavigation(
                                                    question.questionId,
                                                )
                                            }
                                            className="hover:text-blue text-sm md:text-base"
                                        >
                                            Question {question.questionNumber}
                                        </button>
                                    </li>
                                ))}
                            </ul>{' '}
                        </>
                    ) : (
                        <>
                            <button
                                onClick={toggleFlag}
                                 className="flex flex-col items-center text-lg md:text-2xl gap-2"
                            >
                                Show
                                <img
                                    src={blackFlag}
                                    className="w-8 h-8 md:w-10 md:h-10"
                                />
                            </button>{' '}
                        </>
                    )}
                </div>
            </div>

            {/* Main Content Area with black border */}
            <div className="mt-40 md:mt-0 mx-2 sm:mx-4 md:mx-[300px] border border-black rounded-lg relative">
                {/* Question number inside black border */}
                <h2 className="absolute right-4 top-4 font-poppins text-lg md:text-2xl rounded-md bg-white p-2">
                    Question {currentQuestionIndex + 1}
                </h2>

                {/* Main Question Card */}
                <div className="w-full px-4 md:px-[300px] py-4 md:py-[200px] relative">
                    <div className="flex flex-col items-center justify-center gap-4 border border-white w-full md:w-[895px] min-h-[500px] md:h-[695px] rounded shadow bg-[#F5F5F5] p-4 md:p-10 relative">
                        {/* Flag Button */}
                        <button
                            onClick={handleFlagClick}
                            className="absolute top-4 left-4"
                        >
                            <img
                                src={questionFlag}
                                alt="Flag question"
                                className="w-6 h-6 md:w-auto md:h-auto"
                                style={{
                                    filter: isFlagged
                                        ? 'invert(22%) sepia(97%) saturate(6648%) hue-rotate(0deg) brightness(89%) contrast(107%)'
                                        : 'none',
                                }}
                            />
                        </button>

                        <p className="font-poppins text-base md:text-xl text-center">
                            {currentQuestion.questionText}
                        </p>
                        <p>{currentQuestion.isFlagged}</p>

                        {/* Options */}
                        {/* Options */}
                        {/* Options */}
                        {/* Options */}
                        <div
                            className={`w-full flex justify-center ${
                                options.length === 2 &&
                                options[0].text.toLowerCase() === 'true'
                                    ? 'items-center' // Center True/False options vertically
                                    : ''
                            }`}
                        >
                            <ul
                                className={`flex flex-col items-center gap-6 w-full ${
                                    options.length === 2 &&
                                    options[0].text.toLowerCase() === 'true'
                                        ? 'max-w-sm' // Narrower width for True/False
                                        : 'max-w-md' // Wider for regular options
                                }`}
                            >
                                {options.map((option) => (
                                    <li
                                        key={option.label}
                                        className="w-full flex justify-center"
                                    >
                                        <label
                                            className={`flex items-center gap-4 text-base md:text-xl cursor-pointer w-full ${
                                                options.length === 2 &&
                                                options[0].text.toLowerCase() ===
                                                    'a) true'
                                                    ? 'justify-center' // True/False options centered
                                                    : ''
                                            }`}
                                        >
                                            <input
                                                type="radio"
                                                value={option.label}
                                                checked={
                                                    answers[
                                                        currentQuestionIndex
                                                    ]?.submittedAnswer ===
                                                    `${option.label}) ${
                                                        option.text.split(
                                                            ') ',
                                                        )[1]
                                                    }`
                                                }
                                                name={`question-${currentQuestionIndex}`}
                                                onChange={(e) =>
                                                    handleChange(
                                                        e,
                                                        currentQuestionIndex,
                                                    )
                                                }
                                                className="w-5 h-5 md:w-6 md:h-6"
                                            />
                                            <span className="leading-tight">
                                                {option.text}
                                            </span>
                                        </label>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        {/* Navigation Buttons - Inside grey card */}
                        {currentQuestionIndex > 0 && (
                            <button
                                onClick={handlePreviousQuestion}
                                className="absolute left-8 bottom-8"
                            >
                                <img
                                    src={greenArrowLeft}
                                    alt="green arrow left"
                                    className="w-8 h-8 md:w-auto md:h-auto"
                                />
                            </button>
                        )}

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
                            className={`absolute right-8 bottom-8 ${
                                currentQuestionIndex < testQuestions.length - 1
                                    ? ''
                                    : 'bg-medium-pale-green hover:bg-green-600 rounded-full w-[150px] md:w-[204px] h-[40px] md:h-[43px] text-white font-medium px-4 md:px-6 py-1 md:py-2'
                            }`}
                        >
                            {currentQuestionIndex < testQuestions.length - 1 ? (
                                <img
                                    src={greenArrow}
                                    alt="green arrow"
                                    className="w-8 h-8 md:w-auto md:h-auto"
                                />
                            ) : (
                                'Finish Test'
                            )}
                        </button>
                    </div>
                </div>

                {/* Modals */}
                <div className="flex gap-10">
                    {areYouSureModalOpen && (
                        <AreYouSureTestModal
                            open={areYouSureModalOpen}
                            onClose={() => setAreYouSureModalOpen(false)}
                        >
                            <div className="text-center justify-center w-full md:w-[800px] h-80 flex flex-col items-center gap-2 mb-10">
                                <img
                                    src={circleFlag}
                                    alt="circle with flag"
                                    className="w-16 h-16 md:w-auto md:h-auto"
                                />
                                <p className="text-xl md:text-3xl pt-10 text-center">
                                    You have finished the assessment. You can
                                    check flagged questions or submit
                                    assessment.
                                </p>
                            </div>
                            <div className="flex gap-4 md:gap-10 justify-center items-center">
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
                                        className="w-12 h-12 md:w-auto md:h-auto"
                                    />
                                </button>

                                {/* Submit Assessment Button */}
                                <button
                                    className="bg-medium-pale-green hover:bg-green-600 rounded-full px-4 md:px-6 py-2 text-white font-medium text-sm md:text-base"
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
                            <div className="text-center w-full md:w-[400px] h-[400px] md:h-[480px] flex flex-col items-center gap-6 md:gap-10 mb-10 pb-10 mx-4 md:m-20">
                                <img
                                    src={celebrateStudent}
                                    alt="celebrating student"
                                    className="w-[300px] h-[280px] md:w-[400px] md:h-[380px]"
                                />
                                <p className="text-lg md:text-xl">
                                    Congratulations, you passed!
                                </p>
                                <p className="text-base md:text-lg">
                                    Score: {score}%
                                </p>
                            </div>
                            <div className="flex gap-10 justify-center">
                                <button
                                    className="mt-4 bg-medium-pale-green hover:bg-green-600 rounded-full px-4 md:px-6 py-2 text-white font-medium text-sm md:text-base"
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
                            <div className="text-center w-full md:w-[400px] h-[400px] md:h-[480px] flex flex-col items-center gap-6 md:gap-10 mb-10 pb-10 mx-4 md:m-20">
                                <img
                                    src={bookStack}
                                    alt="books"
                                    className="w-[300px] h-[280px] md:w-[400px] md:h-[380px]"
                                />
                                <p className="text-lg md:text-xl">
                                    Unfortunately, you did not earn a passing
                                    score of 70%.
                                </p>
                                <p className="text-lg md:text-xl">
                                    Please try the assessment again in three
                                    months.
                                </p>
                                <p className="text-base md:text-lg">
                                    Score: {score}%
                                </p>
                            </div>
                            <div className="flex justify-center gap-10">
                                <button
                                    className="mt-4 bg-medium-pale-green hover:bg-green-600 rounded-full px-4 md:px-6 py-2 text-white font-medium text-sm md:text-base"
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
            </div>
        </div>
    );
};
