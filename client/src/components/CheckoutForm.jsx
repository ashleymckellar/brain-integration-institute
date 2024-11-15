import { PaymentElement } from '@stripe/react-stripe-js';
import { useState, useContext, useEffect } from 'react';
import { useStripe, useElements } from '@stripe/react-stripe-js';
import { useAuth0 } from '@auth0/auth0-react';
import { CloudinaryContext } from '../contexts';
import PoweredbyStripe from '../assets/icons/PoweredbyStripe.png';

export default function CheckoutForm() {
    const stripe = useStripe();
    const elements = useElements();
    const [message, setMessage] = useState(null);
    const [isProcessing, setIsProcessing] = useState(false);
    const [showModal, setShowModal] = useState(false);
    const { updateUserStudyGuide, email } = useContext(CloudinaryContext);
    const { getAccessTokenSilently } = useAuth0();

    useEffect(() => {
        if (showModal) {
            document.body.classList.add('overflow-hidden');
        } else {
            document.body.classList.remove('overflow-hidden');
        }

        return () => {
            document.body.classList.remove('overflow-hidden');
        };
    }, [showModal]);

    const closeModal = () => {
        setShowModal(false);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!stripe || !elements) {
            return;
        }
        setIsProcessing(true);
        updateUserStudyGuide(email);

        const { error } = await stripe.confirmPayment({
            elements,
            redirect: 'if_required',
        });
        if (error) {
            setMessage(error.message);
            setIsProcessing(false);
            return;
        } else {
            setShowModal(true);
        }
    };

    const redirectToStudyGuide = async () => {
        if (!email) {
            console.error('Email not found in CloudinaryContext');
            return;
        }

        try {
            // const accessToken = await getAccessTokenSilently();
            // const response = await fetch('/api/get-signed-url', {
            //     method: 'POST',
            //     headers: {
            //         'Content-Type': 'application/json',
            //         Authorization: `Bearer ${accessToken}`,
            //     },
            //     body: JSON.stringify({
            //         userEmail: email,
            //         publicId: 'BII_study_guide_demo_2_zg7zlv',
            //         format: 'pdf',
            //     }),
            // });

            // if (!response.ok) {
            //     throw new Error('Failed to get the signed URL');
            // }

            // const { signedUrl } = await response.json();
            // window.open(signedUrl, '_blank');
            window.open(
                'https://docs.google.com/document/d/1HViDMRIWzM24VBCWd4FBqmMC1gjccx-LL4TbCW5_egY/edit?tab=t.0',
                '_blank',
            );
        } catch (err) {
            console.error('Error redirecting to study guide:', err);
        }
    };

    return (
        <>
            <div className="flex flex-col gap-10 items-center border border-black rounded-lg shadow-lg p-10 text-center justify-center">
                <form id="payment-form" onSubmit={handleSubmit}>
                    <p className="text-xl font-semibold">
                        Brain Integration Study Guide
                    </p>
                    <br></br>
                    <br></br>
                    <br></br>
                    <div className="flex flex-col gap-10 items-center">
                        <PaymentElement id="payment-element" />
                        <p className="font-bold text-xl">Total: $65.00</p>
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
            </div>
            {showModal && (
                <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center z-50">
                    <div className="bg-white p-8 rounded shadow-lg max-w-sm w-full border-black flex flex-col gap-5">
                        <h1 className="text-xl text-center font-bold mb-4">
                            Payment Successful!
                        </h1>
                        <div className="flex gap-10 justify-center">
                            <button
                                onClick={redirectToStudyGuide}
                                className=" h-[50px] px-4 py-2 text-white items-center bg-dark-green rounded-3xl mb-4"
                            >
                                View Study Guide
                            </button>
                            <button
                                onClick={closeModal}
                                className="w-1/3 px-4 py-2 text-white items-center bg-red rounded-3xl mb-4"
                            >
                                Close
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}
