import { Elements, CardElement } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";

const stripe = loadStripe(
    "pk_test_51HtG6uFc6WEwdah25wh7hk6TZxs1Cu0ZfpVDlyWYL8xLxzIBdLx30sHBPRjSI48q7hu6Ek1TAMvryN9Rmw32YU7E00v2Az97iP"
);

export default function Payments() {
    return (
        <Elements stripe={stripe}>
            <CardElement />
        </Elements>
    );
}
