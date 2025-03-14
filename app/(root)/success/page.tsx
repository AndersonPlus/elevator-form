'use client';
import React from 'react';
import { useRouter } from 'next/navigation';

const SuccessPage: React.FC = () => {
    const router = useRouter();

    const handleGoBack = () => {
        router.push('/');
    };

    return (
        <div style={{ textAlign: 'center', marginTop: '50px' }}>
            <h1>Form Submitted Successfully!</h1>
            <p>Thank you for your submission. We will process your request shortly.</p>
            <button onClick={handleGoBack} style={{ padding: '10px 20px', marginTop: '20px' }}>
                Go Back to Home
            </button>
        </div>
    );
};

export default SuccessPage;