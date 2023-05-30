import React from "react";

const LoadingScreen = () => {
  return (
    <div className="fixed top-0 left-0 w-screen h-screen z-[99] flex items-center justify-center bg-slate-800 opacity-80">
      <div
        className="inline-block h-16 w-16 animate-spin rounded-full border-8 border-white border-solid border-current border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]"
        role="status"
      >
        <span className="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]">
          Loading...
        </span>
      </div>
    </div>
  );
};

export default LoadingScreen;
