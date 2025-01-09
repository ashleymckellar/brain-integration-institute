/* eslint-disable no-unused-vars */
import { useNavigate } from 'react-router-dom';
import { useContext, useState, useEffect } from 'react';
import important from '../assets/icons/important.png';
import { AssessmentContext } from '../contexts';
import { Timer, Flag, RefreshCw, AlertTriangle, DollarSign } from 'lucide-react';

export const Assessment = () => {
    const navigate = useNavigate();
    const { testQuestions, startTest } = useContext(AssessmentContext);
    const [loading, setLoading] = useState(false);





    // useEffect(() => {
    //     fetchTestQuestions();
    //     console.log(testQuestions)
    // }, []);

    const startTestClick = async () => {
        setLoading(true); 
        try {
            await startTest(); 
            console.log('test started!')
            console.log(testQuestions, 'test questions')
    
            if (testQuestions && testQuestions.length > 0) {
                localStorage.setItem('testQuestions', JSON.stringify(testQuestions));
                const questionId = testQuestions[0]._id;
                navigate(`/assessment/${questionId}`);
            } else {
                console.error('Test questions not loaded yet.');
             
            }
        } catch (error) {
            console.error('Error starting the test:', error);
            alert('An error occurred while starting the test. Please try again.');
        } finally {
            setLoading(false); 
        }
    };
    return (
        <div className="max-w-3xl mx-auto bg-sky-blue rounded-lg shadow-lg overflow-hidden">
        <div className="p-6">
          <h2 className="text-2xl font-bold text-center mb-6">
            90-Minute Timed Test Instructions
          </h2>
          
          <div className="space-y-6">
            <div className="bg-blue-50 p-4 rounded-lg">
              <p className="text-lg mb-2 font-medium text-center">Test Overview:</p>
              <p className="mb-4">You are about to begin a 90-minute assessment consisting of 100 questions (multiple choice and true/false).</p>
            </div>
  
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <RefreshCw className="w-5 h-5 mt-1 text-blue-600 flex-shrink-0" />
                <p>You may refresh the page at any time - your progress will be automatically saved.</p>
              </div>
  
              <div className="flex items-start gap-3">
                <AlertTriangle className="w-5 h-5 mt-1 text-amber-500 flex-shrink-0" />
                <p>If you navigate away or close the test tab, your test will be automatically submitted and scored based on your answers up to that point.</p>
              </div>
  
              <div className="flex items-start gap-3">
                <Flag className="w-5 h-5 mt-1 text-red flex-shrink-0" />
                <p>Use the flag icon in the upper left of each question to mark it for review. You can return to flagged questions any time before submission or time expiration.</p>
              </div>
  
              <div className="flex items-start gap-3">
                <Timer className="w-5 h-5 mt-1 text-purple-600 flex-shrink-0" />
                <p>You may modify any answers until you submit the test or time runs out.</p>
              </div>
  
              <div className="flex items-start gap-3">
                <DollarSign className="w-5 h-5 mt-1 text-red-600 flex-shrink-0" />
                <div>
                  <p className="font-medium">Retake Policy:</p>
                  <ul className="list-disc ml-5 mt-2 space-y-2">
                    <li>A score below 70% is considered failing</li>
                    <li>First retake is free after a 3-week waiting period</li>
                    <li>Second and subsequent retakes require a 3-week wait and cost $250.00</li>
                  </ul>
                </div>
              </div>
            </div>
  
            <div className="text-center mt-8">
              <p className="text-lg font-semibold text-green-700">Good luck!</p>
            </div>
          </div>
        </div>
        <div className='flex justify-center pb-5'>
            <button
                className=" mt-10 bg-medium-pale-green hover:bg-green-600 rounded-full w-[204px] h-[43px] text-white font-medium px-6 py-2"
                onClick={() => startTestClick()}
            >
                Start test
            </button>
            </div>
        </div>
    );
};

export default Assessment;
