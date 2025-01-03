import { useState, useEffect, useContext } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Timer } from './Timer';
import { AssessmentContext } from '../contexts';
import questionFlag from '../assets/icons/questionFlag.svg';
import bookStack from '../assets/images/bookStack.jpg';
import celebrateStudent from '../assets/images/celebrateStudent.png';
import circleFlag from '../assets/icons/circleFlag.png';
import checkFlagged from '../assets/icons/checkFlagged.png';
import TestCompletedModal from './TestCompletedModal';
import AreYouSureTestModal from './AreYouSureTestModal';

export const MockTestQuestionCard = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const {
        testQuestions,
        submitTest,
        testId,
        testCompletedModalOpen,
        setTestCompletedModalOpen,
        areYouSureModalOpen,
        setAreYouSureModalOpen,
        score,
        setIsTimeUp,
    } = useContext(AssessmentContext);
    const [answers, setAnswers] = useState([]);
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(null);
    const [isFlagged, setIsFlagged] = useState(false);
    const [flaggedQuestions, setFlaggedQuestions] = useState([]);
    const [time, setTime] = useState(5400);

    useEffect(() => {
        const storedQuestions = localStorage.getItem('testQuestions');
        if (storedQuestions) {
           
            const parsedQuestions = JSON.parse(storedQuestions);
            console.log('Loaded questions from local storage:', parsedQuestions);
            
     
            if (!testQuestions || testQuestions.length === 0) {
                // Assuming your context has a method to set questions
                // setTestQuestions(parsedQuestions);
            }
        }
    }, []); 
    

    useEffect(() => {
        console.log(testQuestions, 'testQuestions from context');
        console.log(testId, 'test ID');
        if (testQuestions && testQuestions.length > 0) {
            localStorage.setItem('testQuestions', JSON.stringify(testQuestions));
            console.log('saved questions to local storage')

            if (answers.length === 0) {
                const initialAnswers = testQuestions.map((question) => ({
                    questionId: question._id,
                    questionText: question.questionText,
                    questionNumber: question.questionNumber,
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

    useEffect(() => {
        const savedAnswers = sessionStorage.getItem('testAnswers');
        if (savedAnswers) {
            const parsedAnswers = JSON.parse(savedAnswers);
            const currentQuestionFlagged =
                parsedAnswers[currentQuestionIndex]?.isFlagged || false;
            setIsFlagged(currentQuestionFlagged);
            setAnswers(parsedAnswers);
        }
    }, [currentQuestionIndex]);

    useEffect(() => {
        const storedQuestions = localStorage.getItem('testQuestions');
        if (storedQuestions) {
            const parsedQuestions = JSON.parse(storedQuestions);
            if (parsedQuestions && parsedQuestions.length > 0) {
                const questionId = parsedQuestions[0]._id;
                navigate(`/assessment/${questionId}`);
            }
        }
    }, []); 

    console.log(testQuestions, 'test questions');
    console.log(testId, 'test id');

    const handleNavigation = (questionId) => {
        navigate(`/assessment/${questionId}`);
    };

    const handleAreYouSure = () => {
        setAreYouSureModalOpen(false);
        submitTest(testId);
        setIsTimeUp(true);
        setTime(0);
        testCompletedModalOpen(true);
    };

    const handleChange = (e, index) => {
        console.log(testQuestions[index].questionNumber, 'questionNumber');
        const selectedLetter = e.target.value;
        const selectedOption = options.find(
            (option) => option.label === selectedLetter,
        );
        const formattedAnswer = selectedOption.text;

        const updatedAnswers = [...answers];
        updatedAnswers[index] = {
            ...updatedAnswers[index],
            questionText: testQuestions[index].questionText,
            questionNumber: testQuestions[index]?.questionNumber || null,
            submittedAnswer: formattedAnswer,
            isFlagged: isFlagged,
        };

        setAnswers(updatedAnswers);
        setFlaggedQuestions(answers.filter((question) => question.isFlagged));
        sessionStorage.setItem('testAnswers', JSON.stringify(updatedAnswers));
    };

    console.log(flaggedQuestions, 'flagged questions');

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
            setIsFlagged(false); // Reset flag state
            navigate(`/assessment/${previousQuestionId}`);
        } else {
            alert('You are at the first question!');
        }
        setFlaggedQuestions(answers.filter((question) => question.isFlagged));
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

    console.log(answers, 'answers');

    return (
        <div>
            <div className="relative">
                <Timer seconds={time} setTime={setTime} />
            </div>
            <div className="flex items-center">
                <div className="flex flex-col justify-center items-center pl-20 border border-charcoal rounded-xl bg-[#f0ebe1] p-2 ml-10 text-center">
                    <p className="pb-10">Flagged Questions</p>
                    <ul>
                        {flaggedQuestions.map((question) => (
                            <li key={question.questionId}>
                                <button
                                    onClick={() =>
                                        handleNavigation(question.questionId)
                                    }
                                    className="text-blue-500 hover:text-blue-700"
                                >
                                    Question {question.questionNumber}
                                </button>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>

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

                <div className="flex flex-col items-center justify-center gap-4 border border-white w-[700px] rounded shadow bg-[#F5F5F5] p-10">
                    <h2 className="font-poppins">
                        Question {currentQuestionIndex + 1}
                    </h2>

                    <p className="font-poppins">
                        {currentQuestion.questionText}
                    </p>
                    <p>{currentQuestion.isFlagged}</p>
                    <ul>
                        {options.map((option) => (
                            <label
                                key={option.label}
                                className="flex items-center gap-2"
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

                    <div className="flex gap-5">
                        <button
                            onClick={handlePreviousQuestion}
                            className="mt-4 bg-medium-pale-green hover:bg-green-600 rounded-full px-6 py-2 text-white font-medium"
                        >
                            Previous Question
                        </button>

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
                            className="mt-4 bg-medium-pale-green hover:bg-green-600 rounded-full px-6 py-2 text-white font-medium"
                        >
                            {currentQuestionIndex < testQuestions.length - 1
                                ? 'Next Question'
                                : 'Finish Test'}
                        </button>

                        {areYouSureModalOpen && (
                            <AreYouSureTestModal
                                open={areYouSureModalOpen}
                                onClose={() => setAreYouSureModalOpen(false)}
                            >
                                <div className="text-center justify-center w-80 h-80 flex flex-col items-center gap-2 mb-10">
                                    <img
                                        src={circleFlag}
                                        alt="circle with flag"
                                    />
                                    <p className="text-3xl pt-10 text-center">
                                        Are you sure?
                                    </p>
                                </div>
                                <div className="flex gap-10 justify-center ">
                                    <button
                                        onClick={() =>
                                            setAreYouSureModalOpen(false)
                                        }
                                    >
                                        <img
                                            src={checkFlagged}
                                            alt="check flagged"
                                        />
                                    </button>
                                    <button
                                        className="mt-4 mb-10 bg-medium-pale-green hover:bg-green-600 rounded-full px-6 py-2 text-white font-medium"
                                        onClick={() => handleAreYouSure()}
                                    >
                                        Yes
                                    </button>
                                </div>
                            </AreYouSureTestModal>
                        )}

                        {testCompletedModalOpen && score && score >= 70 ? (
                            <TestCompletedModal
                                open={testCompletedModalOpen}
                                onClose={() => setTestCompletedModalOpen(false)}
                            >
                                <div className="text-center w-80 h-80 flex flex-col items-center gap-2 mb-10">
                                    <img
                                        src={celebrateStudent}
                                        alt="celebrating student"
                                    />
                                    <p>Congratulations, you passed!</p>
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
                                <div className="text-center w-80 h-80 flex flex-col items-center gap-10 mb-10">
                                    <img src={bookStack} alt="books" />
                                    <p>
                                        Unfortunately, you did not earn a
                                        passing score of 70%. Please try the
                                        assessment again in three months.
                                    </p>
                                    <p>Score: {score}%</p>
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
                </div>
            </div>
        </div>
    );
};


// import { useState, useEffect, useContext, useMemo, useCallback } from 'react';
// import { useParams, useNavigate } from 'react-router-dom';
// import { Timer } from './Timer';
// import { AssessmentContext } from '../contexts';
// import questionFlag from '../assets/icons/questionFlag.svg';
// import TestCompletedModal from './TestCompletedModal';
// import AreYouSureTestModal from './AreYouSureTestModal';

// export const MockTestQuestionCard = () => {
//     const { id } = useParams();
//     const navigate = useNavigate();
//     const {
//         testQuestions,
//         submitTest,
//         testId,
//         testCompletedModalOpen,
//         setTestCompletedModalOpen,
//         areYouSureModalOpen,
//         setAreYouSureModalOpen,
//         setIsTimeUp,
//     } = useContext(AssessmentContext);

//     const [answers, setAnswers] = useState(() => {
//         const savedAnswers = sessionStorage.getItem('testAnswers');
//         return savedAnswers ? JSON.parse(savedAnswers) : [];
//     });
//     const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
//     const [isFlagged, setIsFlagged] = useState(false);
//     const [time, setTime] = useState(5400);

//     // Load initial data
//     useEffect(() => {
//         if (!testQuestions || testQuestions.length === 0) {
//             const storedQuestions = localStorage.getItem('testQuestions');
//             if (storedQuestions) {
//                 // Assuming setTestQuestions is available in the context
//                 // setTestQuestions(JSON.parse(storedQuestions));
//             }
//         }
//     }, [testQuestions]);

//     // Set initial answers and determine current question index
//     useEffect(() => {
//         if (testQuestions.length > 0) {
//             const initialAnswers = testQuestions.map((question) => ({
//                 questionId: question._id,
//                 questionText: question.questionText,
//                 questionNumber: question.questionNumber,
//                 submittedAnswer: '',
//                 isFlagged: false,
//             }));

//             if (answers.length === 0) {
//                 setAnswers(initialAnswers);
//             }

//             const questionIndex = testQuestions.findIndex((q) => q._id === id);
//             setCurrentQuestionIndex(questionIndex !== -1 ? questionIndex : 0);

//             if (questionIndex === -1) {
//                 navigate(`/assessment/${testQuestions[0]._id}`, { replace: true });
//             }
//         }
//     }, [testQuestions, id, answers, navigate]);

//     // Save answers to session storage
//     useEffect(() => {
//         sessionStorage.setItem('testAnswers', JSON.stringify(answers));
//     }, [answers]);

//     // Derived values
//     const currentQuestion = useMemo(() => testQuestions[currentQuestionIndex] || {}, [
//         testQuestions,
//         currentQuestionIndex,
//     ]);

//     const options = useMemo(() => {
//         if (!currentQuestion) return [];
//         return [
//             { label: 'A', text: `A) ${currentQuestion.optionA}` },
//             { label: 'B', text: `B) ${currentQuestion.optionB}` },
//             currentQuestion.optionC !== 'N/A' && { label: 'C', text: `C) ${currentQuestion.optionC}` },
//             currentQuestion.optionD !== 'N/A' && { label: 'D', text: `D) ${currentQuestion.optionD}` },
//         ].filter(Boolean);
//     }, [currentQuestion]);

//     // Handlers
//     const handleNavigation = useCallback(
//         (index) => {
//             const question = testQuestions[index];
//             if (question) {
//                 setCurrentQuestionIndex(index);
//                 navigate(`/assessment/${question._id}`);
//             }
//         },
//         [testQuestions, navigate]
//     );

//     const handleChange = (e) => {
//         const selectedLetter = e.target.value;
//         const selectedOption = options.find((option) => option.label === selectedLetter);
//         const updatedAnswers = [...answers];

//         updatedAnswers[currentQuestionIndex] = {
//             ...updatedAnswers[currentQuestionIndex],
//             submittedAnswer: selectedOption.text,
//         };

//         setAnswers(updatedAnswers);
//     };

//     const handleFlagClick = () => {
//         const updatedAnswers = [...answers];
//         updatedAnswers[currentQuestionIndex] = {
//             ...updatedAnswers[currentQuestionIndex],
//             isFlagged: !isFlagged,
//         };

//         setAnswers(updatedAnswers);
//         setIsFlagged(!isFlagged);
//     };

//     const handleNextQuestion = () => handleNavigation(currentQuestionIndex + 1);
//     const handlePreviousQuestion = () => handleNavigation(currentQuestionIndex - 1);

//     if (!testQuestions || testQuestions.length === 0) {
//         return <div>Loading questions, please wait...</div>;
//     }

//     return (
//         <div>
//             <Timer seconds={time} setTime={setTime} />
//             <div>
//                 <button onClick={handleFlagClick}>
//                     <img
//                         src={questionFlag}
//                         alt="Flag question"
//                         style={{ filter: isFlagged ? 'invert(50%)' : 'none' }}
//                     />
//                 </button>
//             </div>

//             <div>
//                 <h2>Question {currentQuestionIndex + 1}</h2>
//                 <p>{currentQuestion.questionText}</p>

//                 <ul>
//                     {options.map((option) => (
//                         <label key={option.label}>
//                             <input
//                                 type="radio"
//                                 value={option.label}
//                                 checked={
//                                     answers[currentQuestionIndex]?.submittedAnswer === option.text
//                                 }
//                                 onChange={handleChange}
//                             />
//                             {option.text}
//                         </label>
//                     ))}
//                 </ul>

//                 <button onClick={handlePreviousQuestion} disabled={currentQuestionIndex === 0}>
//                     Previous
//                 </button>
//                 <button
//                     onClick={
//                         currentQuestionIndex < testQuestions.length - 1
//                             ? handleNextQuestion
//                             : () => setAreYouSureModalOpen(true)
//                     }
//                 >
//                     {currentQuestionIndex < testQuestions.length - 1
//                         ? 'Next'
//                         : 'Finish Test'}
//                 </button>
//             </div>

//             {areYouSureModalOpen && (
//                 <AreYouSureTestModal
//                     onClose={() => setAreYouSureModalOpen(false)}
//                     onConfirm={() => {
//                         submitTest(testId);
//                         setTestCompletedModalOpen(true);
//                         setIsTimeUp(true);
//                     }}
//                 />
//             )}

//             {testCompletedModalOpen && <TestCompletedModal />}
//         </div>
//     );
// };

