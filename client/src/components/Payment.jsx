/* eslint-disable react/prop-types */
import { useEffect, useState } from 'react';
// import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';
import CheckoutForm from './CheckoutForm';
import { useAuth0 } from '@auth0/auth0-react';

export const Payment = ({stripePromise, showPayment, studyGuideAccess, setStudyGuideAccess}) => {

    const [clientSecret, setClientSecret] = useState('');
    const {  getAccessTokenSilently } = useAuth0();
   


    console.log(clientSecret);
    console.log(stripePromise);
    console.log(studyGuideAccess)



 

    useEffect(() => {
        if (showPayment) {
         createPaymentIntent()
        }
    }, [showPayment]);


    const createPaymentIntent = async () => {
        const accessToken = await getAccessTokenSilently();
        console.log(accessToken)
        fetch('/api/create-payment-intent', {
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
                    
                    <CheckoutForm setStudyGuideAccess={setStudyGuideAccess} studyGuideAccess={studyGuideAccess}/>
                </Elements>
                </div>
            )}
            
        </>
    );
};

export default Payment;
