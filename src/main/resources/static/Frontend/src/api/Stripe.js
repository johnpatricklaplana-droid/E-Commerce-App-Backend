import { loadStripe } from '@stripe/stripe-js';

export const stripePromise = loadStripe(
    "pk_test_51TSy4CFnkxYjRDkVOFn4CGKHorSZOkJeJGLKXB7VXRRXBs4dWJvRYLmMzayD6H79gsCaC8RVWDaiEzgbPfJUE4xf00VqNYDgef"
);