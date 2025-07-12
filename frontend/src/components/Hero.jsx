import React from 'react';
import { Link } from 'react-router-dom';
import { TypeAnimation } from 'react-type-animation';

const Hero = () => {
  return (
    <section className="relative bg-[#F9F3EF] text-[#1B3C53] overflow-hidden">
      {/* Custom CSS injected directly in the component */}
      <style>
        {`
          @keyframes fadeIn {
            from { opacity: 0; transform: translateY(20px); }
            to { opacity: 1; transform: translateY(0); }
          }

          @keyframes fadeInDown {
            from { opacity: 0; transform: translateY(-20px); }
            to { opacity: 1; transform: translateY(0); }
          }

          @keyframes waveMove {
            0% { transform: translateX(0); }
            100% { transform: translateX(-50%); }
          }

          .animate-fade-in { animation: fadeIn 1s ease-out forwards; }
          .animate-fade-in-down { animation: fadeInDown 1s ease-out forwards; }
          .animate-fade-in-up { animation: fadeIn 1.2s ease-out forwards; }
          .animate-wave { animation: waveMove 20s linear infinite; }
        `}
      </style>

      {/* Smooth Animated Wave Background */}
      <div className="absolute inset-0 -z-10">
        <div className="w-full h-full overflow-hidden">
          <svg
            className="w-full h-full animate-wave"
            viewBox="0 0 1440 320"
            preserveAspectRatio="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <defs>
              <linearGradient id="waveGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#D2C1B6" />
                <stop offset="100%" stopColor="#F9F3EF" />
              </linearGradient>
            </defs>
            <path
              fill="url(#waveGradient)"
              d="M0,160 C360,240 1080,80 1440,160 L1440,320 L0,320 Z"
              opacity="0.7"
            />
          </svg>
        </div>
      </div>

      {/* Hero Content */}
      <div className="relative z-10 max-w-5xl mx-auto flex flex-col items-center text-center px-6 py-24 sm:py-32">
        <h1 className="text-4xl md:text-5xl font-extrabold mb-6 leading-tight animate-fade-in-down">
          Discover, Share & Swap Skills
        </h1>

        <TypeAnimation
          sequence={[
            'Excel 📊',
            2000,
            'Guitar 🎸',
            2000,
            'Photoshop 🎨',
            2000,
            'Yoga 🧘‍♂️',
            2000,
            'Web Design 💻',
            2000,
          ]}
          wrapper="span"
          speed={40}
          repeat={Infinity}
          className="text-[#456882] text-xl md:text-2xl font-medium mb-8 animate-fade-in"
        />

        <p className="text-[#1B3C53] text-lg md:text-xl mb-10 max-w-xl animate-fade-in-up">
          Join a community of learners and experts. Exchange your skills for the ones you want — 1:1 and for free.
        </p>

        <Link to="/signup">
          <button className="bg-[#456882] hover:bg-[#1B3C53] text-[#F9F3EF] px-8 py-3 rounded-lg shadow-lg transition-all duration-300 transform hover:scale-105 animate-fade-in-up">
            Start Swapping
          </button>
        </Link>
      </div>
    </section>
  );
};

export default Hero;
