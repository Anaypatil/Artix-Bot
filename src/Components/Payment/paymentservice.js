// src/Components/Payment/paymentService.js
export const processPayment = async (amount) => {
    try {
        // Simulate API call to payment gateway
        const response = await new Promise((resolve) => {
            setTimeout(() => {
                const success = Math.random() > 0.5; // 50% chance of success
                resolve({ success });
            }, 2000);
        });

        return response;
    } catch (error) {
        console.error('Payment Error:', error);
        throw error;
    }
};
