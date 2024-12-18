// import { useState, useEffect, useContext } from 'react';
// import { MockTestQuestions } from '../contexts';
// import { useAuth0 } from '@auth0/auth0-react';
// import { MockTestQuestionCard } from './MockTestQuestionCard';

// export const MockTestData = () => {
//     const { testQuestions } = useContext(MockTestQuestions);
//     console.log(testQuestions, 'test questions')

//     const questionList = testQuestions && testQuestions.length > 0 && testQuestions.map((question) => {
//         <MockTestQuestionCard
//             key={`${question.id}`}
//             question={question.question}
//             options={question.options}
//             answer={question.answer}
//         />;
//     });



//     return <div>{questionList}</div>;
// };
