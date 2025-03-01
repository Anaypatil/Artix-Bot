// src/Components/Payment/Payment.jsx
import React, { useState } from 'react';
import './Payment.css';
import { processPayment } from './paymentService';

const Payment = () => {
    const [amount, setAmount] = useState('');
    const [paymentStatus, setPaymentStatus] = useState(null);

    const handlePayment = async () => {
        try {
            const response = await processPayment(amount);
            if (response.success) {
                setPaymentStatus('Payment Successful!');
            } else {
                setPaymentStatus('Payment Failed. Please try again.');
            }
        } catch (error) {
            setPaymentStatus('Error processing payment.');
        }
    };

    return (
        <div className="payment-container">
            <h2>Complete Your Payment</h2>
            <input
                type="number"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                placeholder="Enter Amount"
            />
            <button onClick={handlePayment}>Pay Now</button>
            {paymentStatus && <p>{paymentStatus}</p>}
        </div>
    );
};

export default Payment;
