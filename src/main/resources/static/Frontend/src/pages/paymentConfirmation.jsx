
import { Elements } from '@stripe/react-stripe-js';
import { stripePromise } from "../api/Stripe.js";
import PaymentForm from "./paymentForm.jsx";
import { useSearchParams } from 'react-router-dom';

export default function PaymentConfirmation () {

    const [searchParams] = useSearchParams();

    const client_secret = searchParams.get("client-secret");
   
    const options = {
        clientSecret: client_secret
    };

    return (
        <Elements stripe={stripePromise} options={options}>
            <PaymentForm />
        </Elements>
    );
}