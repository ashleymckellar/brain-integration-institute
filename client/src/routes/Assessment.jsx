import { MockTestQuestionCard } from '../components/MockTestQuestionCard';
import { useParams, useNavigate, useLocation, Link } from 'react-router-dom';
// import { MockTestData } from '../components/MockTestData';

export const Assessment = () => {
    const navigate = useNavigate();

    const startTestClick = (id) => {
        navigate(`/assessment/${id}`)

    }
    return (
        <div className="flex flex-col gap-5 justify-center items-center">
            <h1 className="text-center">Assessment</h1>
            <button className=" mt-10 bg-medium-pale-green hover:bg-green-600 rounded-full w-[204px] h-[43px] text-white font-medium px-6 py-2" onClick={() => startTestClick(1)} >
                Start test
            </button>
        
        </div>
    );
};

export default Assessment;
