/* eslint-disable react/prop-types */
import { useEffect, useState } from 'react';
// import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';
import AssessmentCheckoutForm from './AssessmentCheckoutForm';
import { useAuth0 } from '@auth0/auth0-react';

export const AssessmentPayment = ({stripePromise, showPayment, }) => {

    const [clientSecret, setClientSecret] = useState('');
    const {  getAccessTokenSilently } = useAuth0();
   


    console.log(clientSecret);
    console.log(stripePromise);




 

    useEffect(() => {
        if (showPayment) {
         createAssessmentPaymentIntent()
        }
    }, [showPayment]);


    const createAssessmentPaymentIntent = async () => {
        const accessToken = await getAccessTokenSilently();
        console.log(accessToken)
        fetch('/api/create-assessment-payment-intent', {
            method: 'POST',
            headers: {
                            'Content-Type': 'application/json',
                            Authorization: `Bearer ${accessToken}`,
                        },
            body: JSON.stringify({}),
        }).then(async (response) => {
            const { clientSecret } = await response.json();
            setClientSecret(clientSecret);
           
        });

    }


    return (
        <>
         
            
            {clientSecret && stripePromise && (
                <div className='flex flex-col'>
                <Elements stripe={stripePromise} options={{ clientSecret }} >
                    
                    <AssessmentCheckoutForm/>
                </Elements>
                </div>
            )}
            
        </>
    );
};

export default AssessmentPayment;
