import { useEffect, useState } from "react";
import { GET } from "../api/API.js";
import { useStripe, useElements, PaymentElement } from '@stripe/react-stripe-js';

export default function PaymentForm () {

    const stripe = useStripe();
    const elements = useElements();

    const handlePay = async () => {
        if (!stripe || !elements) return;

        const { error, paymentIntent } = await stripe.confirmPayment({
            elements: elements,
            confirmParams: {
                return_url: "http://localhost:5173/costumer-payment-success"
            },
            redirect: "if_required"
        });

        if (error) {
            console.log("Payment failed:", error.message);
            return;
        }

        if (paymentIntent?.status === "succeeded") {
            console.log("Payment successful!");
        }
    };

    return (
        <div className="bg-gray-50">
            <div className="flex bg-orange-500 justify-between py-4 px-8">
                <h1>TODO: some logo</h1>
                <h1>TODO: some logo</h1>
            </div>
            <main className="p-8">
                <div>
                    <button className="mb-6">Back to shop</button>
                </div>
                <div className="grid gap-8 grid-cols-1 sm:grid-cols-[auto_500px]">
                    <div className="shadow p-4 bg-white rounded-[8px]">
                        <h1 className="mb-3 text-2xl font-bold">Complete your payment</h1>
                        <p className="text-base mb-6">Enter your payment details to complete your order.</p>
                        <label className="font-semibold">card information</label>
                        <PaymentElement className="mt-6" />
                        <button
                            className="bg-violet-700 mt-6 text-white font-bold px-4 py-2 mb-3 rounded-2xl"
                            onClick={handlePay}
                        >Pay $49.00</button>
                        <p>your payment is secure and encrypted</p>
                    </div>
                    <div className="bg-white p-4 h-fit shadow rounded-[8px]">
                        <h1 className="text-2xl font-bold">Order summary</h1>
                        <div className="flex items-center justify-between">
                            <div className="flex flex-col gap-2 justify-between my-6">
                                <span>TODO:</span>
                                <span>TODO:</span>
                            </div>
                            <span>$343,300</span>
                        </div>
                        <div className="">
                            <div className="flex mb-3 justify-between items-center">
                                <p>Subtotal</p>
                                <p>$100,000</p>
                            </div>
                            <div className="flex mb-6 justify-between items-center">
                                <p>Tax</p>
                                <p>$100,000</p>
                            </div>
                        </div>
                        <div className="flex mb-6 justify-between items-center">
                            <h2 className="font-bold text-lg">Total</h2>
                            <h2 className="font-bold text-lg text-green-500">$49.00</h2>
                        </div>
                        <div className="flex flex-col gap-3">
                            <div>
                                <div>
                                    <p>Secure Checkout</p>
                                    <p>that your so</p>
                                    <p>Beautiful</p>
                                </div>
                            </div>
                            <div>
                                <div>
                                    <p>Secure Checkout</p>
                                    <p>that your so</p>
                                    <p>Beautiful</p>
                                </div>
                            </div>
                            <div>
                                <div>
                                    <p>Secure Checkout</p>
                                    <p>that your so</p>
                                    <p>Beautiful</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
}