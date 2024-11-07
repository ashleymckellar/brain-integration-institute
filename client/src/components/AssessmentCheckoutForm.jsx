import { PaymentElement } from '@stripe/react-stripe-js';
import { useState } from 'react';
import { useStripe, useElements } from '@stripe/react-stripe-js';
// import { CloudinaryContext } from '../contexts';
import PoweredbyStripe from '../assets/icons/PoweredbyStripe.png'

export default function AssessmentCheckoutForm() {
    const stripe = useStripe();
    const elements = useElements();

    const [message, setMessage] = useState(null);
    const [isProcessing, setIsProcessing] = useState(false);
    const [showModal, setShowModal] = useState(false); 
    // const {  email } = useContext(CloudinaryContext);
    

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!stripe || !elements) {
            return;
        }

        setIsProcessing(true);
        

        const { error } = await stripe.confirmPayment({
            elements,
            confirmParams: {
               
                return_url: `${window.location.origin}/success`,
            },
        });
       
        if (error) {
            setMessage(error.message);
            setIsProcessing(false);
            return;
        }
        setShowModal(true);
        setIsProcessing(false);
    };

    const closeModal = () => {
        setShowModal(false);
    };

    return (
        <div className="flex flex-col gap-10 items-center border border-black rounded-lg shadow-lg p-10 text-center justify-center">
            <form id="payment-form" onSubmit={handleSubmit}>
                <p className='text-xl font-semibold'>Brain Integration Certification Assessment</p>
                <br />
                <div className='flex flex-col gap-10 items-center'>
                    <PaymentElement id="payment-element" />
                    <p className='font-bold text-xl'>Total: $250.00</p>
                    <button
                        disabled={isProcessing || !stripe || !elements}
                        id="submit"
                        className="btn bg-dark-green rounded-3xl text-white h-12 w-48"
                    >
                        <span id="button-text">
                            {isProcessing ? 'Processing ... ' : 'Pay now'}
                        </span>
                    </button>
                    <img src={PoweredbyStripe} className='h-[35px]' />
                </div>
                {message && <div id="payment-message">{message}</div>}
            </form>

            {/* Modal for Payment Success */}
            {showModal && (
                <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center z-50">
                    <div className="bg-white p-8 rounded shadow-lg max-w-sm w-full">
                        <h1 className="text-xl font-bold mb-4">Payment Successful!</h1>
                        <p>Your payment of $250.00 was successful.</p>
                        <button
                            onClick={closeModal}
                            className="block w-full px-4 py-2 text-white bg-green-600 rounded hover:bg-green-700 mt-4"
                        >
                            Close
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
}