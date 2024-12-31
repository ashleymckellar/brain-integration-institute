import { PaymentElement } from '@stripe/react-stripe-js';
import { useState, useContext } from 'react';
import {  useNavigate } from 'react-router-dom';
import { useStripe, useElements } from '@stripe/react-stripe-js';
import PoweredbyStripe from '../assets/icons/PoweredbyStripe.png';
import { CloudinaryContext, AssessmentContext } from '../contexts';

export default function AssessmentCheckoutForm() {
    const stripe = useStripe();
    const elements = useElements();
    const [message, setMessage] = useState(null);
    const [isProcessing, setIsProcessing] = useState(false);
    const [showModal, setShowModal] = useState(false);
    const { updateUserAssessmentAccess, email } = useContext(CloudinaryContext);
    const { fetchTestQuestions, testQuestions } = useContext(AssessmentContext)
    const navigate = useNavigate();

    

    
    console.log(showModal, 'show modal')
    //i need to change this to where it doesn't redirect to the separate page
    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!stripe || !elements) {
            return;
        }
        setIsProcessing(true);
        updateUserAssessmentAccess(email);
        const { error } = await stripe.confirmPayment({
            elements,
            redirect: 'if_required',
        });
        if (error) {
            setMessage(error.message);
            setIsProcessing(false);
            return;
        }
        await fetchTestQuestions(); 
   
        setShowModal(true);
        setIsProcessing(false);
        // console.log(testQuestions, 'test questions')
    };
    const closeModal = () => {
        setShowModal(false);
        navigate('/assessment')
        //route to test page

    };

    // const handleSubmit = async (e) => {
    //     e.preventDefault();
    //     if (!stripe || !elements) {
    //         return;
    //     }
    //     setIsProcessing(true);
    //     updateUserStudyGuide(email);

    //     const { error } = await stripe.confirmPayment({
    //         elements,
    //         redirect: 'if_required',
    //     });
    //     if (error) {
    //         setMessage(error.message);
    //         setIsProcessing(false);
    //         return;
    //     } else {
    //         setShowModal(true);
    //     }
    // };

    return (
        <div className="flex flex-col gap-10 items-center border border-black rounded-lg shadow-lg p-10 text-center justify-center">
            <form id="payment-form" onSubmit={handleSubmit}>
                <p className="text-xl font-semibold">
                    Brain Integration Certification Assessment
                </p>
                <br />
                <div className="flex flex-col gap-10 items-center">
                    <PaymentElement id="payment-element" />
                    <p className="font-bold text-xl">Total: $250.00</p>
                    <button
                        disabled={isProcessing || !stripe || !elements}
                        id="submit"
                        className="btn bg-dark-green rounded-3xl text-white h-12 w-48"
                    >
                        <span id="button-text">
                            {isProcessing ? 'Processing ... ' : 'Pay now'}
                        </span>
                    </button>
                    <img src={PoweredbyStripe} className="h-[35px]" />
                </div>
                {message && <div id="payment-message">{message}</div>}
            </form>
            {showModal && (
                <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center z-50">
                    <div className="bg-white p-8 rounded shadow-lg max-w-sm w-full">
                        <h1 className="text-3xl font-bold mb-4">Success!</h1>
                        <p>Your assessment has been purchased.</p>
                        <div className="flex justify-around mt-4 gap-2">
                            <button className='block w-1/2 border border-black rounded-3xl px-4'>Main Page</button>
                            <button
                                onClick={closeModal}
                                className="block w-1/2 px-4 py-2 text-white bg-green-600 rounded-3xl whitespace-nowrap hover:bg-green-700"
                            >
                                Proceed to Test
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
