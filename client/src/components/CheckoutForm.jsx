import { PaymentElement } from '@stripe/react-stripe-js';
import { useState, useContext } from 'react';
import { useStripe, useElements } from '@stripe/react-stripe-js';
import { CloudinaryContext } from '../contexts';
import PoweredbyStripe from '../assets/icons/PoweredbyStripe.png'

export default function CheckoutForm() {
    const stripe = useStripe();
    const elements = useElements();

    const [message, setMessage] = useState(null);
    const [isProcessing, setIsProcessing] = useState(false);
    const { updateUserStudyGuide, email } = useContext(CloudinaryContext);
    

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!stripe || !elements) {
            return;
        }

        setIsProcessing(true);
        updateUserStudyGuide(email);

        const { error } = await stripe.confirmPayment({
            elements,
            confirmParams: {
               
                return_url: `${window.location.origin}/success?studyGuideAccess=true`,
            },
        });
       
        if (error) {
            setMessage(error.message);
            setIsProcessing(false);
            return;
        }
    };

    return (
        <div className="flex flex-col gap-10 items-center border border-black rounded-lg shadow-lg p-10 text-center justify-center">
            <form id="payment-form" onSubmit={handleSubmit}>
                <p className='text-xl font-semibold'>Brain Integration Study Guide</p>
                <br></br>
                {/* <h2> $65.00 USD plus tax</h2> */}
                <br></br>
            
                <br></br>
                <div className='flex flex-col gap-10 items-center'>
                    
                    <PaymentElement id="payment-element" />
                    <p className='font-bold text-xl'>Total: $65.00</p>
                    <button
                        disabled={isProcessing || !stripe || !elements}
                        id="submit"
                        className="btn bg-dark-green rounded-3xl text-white h-12 w-48"
                    >
                        <span id="button-text">
                            {isProcessing ? 'Processing ... ' : 'Pay now'}
                        </span>
                        
                    </button>
                  
                    <img src={PoweredbyStripe} className='h-[35px]'/>
                </div>
                {/* Show any error or success messages */}
                {message && <div id="payment-message">{message}</div>}
            </form>
        </div>
    );
}
