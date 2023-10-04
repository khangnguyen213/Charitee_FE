import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Global from '../global';
import LoadingScreen from '../components/Global/LoadingScreen';
import { useNavigate } from 'react-router-dom';

const DonateSuccess = () => {
  const [isLoading, setIsLoading] = useState(false);
  const searchParams = new URLSearchParams(window.location.search);
  const paymentId = searchParams.get('paymentId');
  const payerId = searchParams.get('PayerID');
  const navigate = useNavigate();

  useEffect(() => {
    const executePayment = () => {
      setIsLoading(true);
      axios
        .post(
          `${Global.BASE_BACKEND_API}/payment/execute-payment`,
          {
            paymentId,
            payerId,
          },
          { withCredentials: true }
        )
        .then(() => {
          setIsLoading(false);
        })
        // Payment was successful!
        .catch((error) => {
          console.error(error);
        });
    };
    if (payerId && paymentId) {
      executePayment();
    }
  }, []);

  return (
    <>
      {isLoading && <LoadingScreen />}
      <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
        <h1 className="text-4xl font-bold text-green-500">Congratulations!</h1>
        <p className="mt-4 text-xl text-gray-600">
          Your payment has been completed successfully.
        </p>
        <button
          onClick={() => navigate('/history')}
          className="px-4 py-2 mt-8 font-medium text-white bg-blue-500 rounded hover:bg-blue-600"
        >
          Donation History
        </button>
      </div>
    </>
  );
};

export default DonateSuccess;
