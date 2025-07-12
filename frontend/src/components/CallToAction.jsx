import React from 'react';
import { Link } from 'react-router-dom';

const CallToAction = () => {
  return (
    <section className="bg-[#1B3C53] text-[#F9F3EF] py-24 px-6 sm:px-10 text-center relative overflow-hidden">
      <style>
        {`
          @keyframes fadeZoom {
            0% { opacity: 0; transform: scale(0.95); }
            100% { opacity: 1; transform: scale(1); }
          }
          .animate-fadeZoom {
            animation: fadeZoom 1.2s ease-out forwards;
          }

          @keyframes float {
            0% { transform: translateY(0); }
            50% { transform: translateY(-10px); }
            100% { transform: translateY(0); }
          }
          .animate-float {
            animation: float 6s ease-in-out infinite;
          }
        `}
      </style>

      {/* Blobs / Shapes */}
      <div className="absolute top-0 -left-20 w-72 h-72 bg-[#D2C1B6] opacity-10 blur-3xl rounded-full animate-float"></div>
      <div className="absolute -bottom-10 -right-16 w-60 h-60 bg-[#456882] opacity-10 blur-2xl rounded-full animate-float"></div>

      <div className="relative z-10 max-w-3xl mx-auto animate-fadeZoom">
        <h2 className="text-3xl md:text-4xl font-bold mb-6 leading-snug italic text-[#F9F3EF]">
          “The beautiful thing about <span className="text-[#D2C1B6]">learning</span> is that nobody can take it away from you.”
        </h2>

        <p className="text-[#D2C1B6] text-lg mb-10 font-medium">— B.B. King</p>

        <Link to="/signup">
          <button className="bg-[#456882] hover:bg-[#F9F3EF] hover:text-[#1B3C53] text-[#F9F3EF] font-semibold px-8 py-3 rounded-lg shadow-lg transition duration-300 transform hover:scale-105">
            Start Swapping
          </button>
        </Link>
      </div>
    </section>
  );
};

export default CallToAction;
