import React from 'react';
import './RazorPayment.css'; // Ensure this path is correct

const handlePayment = () => {
  try {
    const options = {
      key: 'rzp_test_PJr8IungJuTUsW', // Ensure no extra spaces
      amount: 50000, // Amount in paise (50000 = ₹500)
      currency: 'INR',
      name: 'Artix',
      description: 'Test Transaction',
      image: 'https://your-logo-url.com', // Replace with your logo URL
      handler: function (response) {
        alert(`Payment ID: ${response.razorpay_payment_id}`);
        alert(`Order ID: ${response.razorpay_order_id}`);
        alert(`Signature: ${response.razorpay_signature}`);
      },
      prefill: {
        name: 'Customer Name',
        email: 'customer@example.com',
        contact: '9999999999',
      },
      notes: {
        address: 'Corporate Office',
      },
      theme: {
        color: '#3399cc',
      },
    };

    const rzp = new window.Razorpay(options);
    rzp.open();
  } catch (error) {
    console.error('Error during payment:', error);
  }
};

export default handlePayment;
