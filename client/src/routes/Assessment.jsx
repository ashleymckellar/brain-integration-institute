import { useNavigate } from 'react-router-dom';
import important  from '../assets/icons/important.png'


export const Assessment = () => {
    const navigate = useNavigate();

    const startTestClick = (id) => {
        navigate(`/assessment/${id}`);
    };
    return (
        <div className="flex flex-col gap-10 justify-center items-center px-[450px] text-center border border-charcoal shadow rounded-xl w-55 py-20 mx-[200px]">
            <img src={important} alt='exclamation point' />
            <h2 className="text-2xl">
                This is a timed test. Closing the tab or running out of time
                will auto-submit your answers.
            </h2>
            <h2 className="text-2xl">Good luck!</h2>
            <button
                className=" mt-10 bg-medium-pale-green hover:bg-green-600 rounded-full w-[204px] h-[43px] text-white font-medium px-6 py-2"
                onClick={() => startTestClick(1)}
            >
                Start test
            </button>
        </div>
    );
};

export default Assessment;
