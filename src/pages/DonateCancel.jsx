import React from "react";
import { useNavigate } from "react-router-dom";

const DonateCancel = () => {
  const navigate = useNavigate();
  return (
    <>
      <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
        <h1 className="text-4xl font-bold text-red-500">Order Cancelled</h1>
        <p className="mt-4 text-xl text-gray-600">
          Your order has been cancelled.
        </p>
        <button
          onClick={() => navigate("/")}
          className="px-4 py-2 mt-8 font-medium text-white bg-blue-500 rounded hover:bg-blue-600"
        >
          Back to home
        </button>
      </div>
    </>
  );
};

export default DonateCancel;
