import React from 'react';
import { Lightbulb, Search, Repeat } from 'lucide-react';

const steps = [
  {
    title: 'Create Your Skill Profile',
    description:
      'List your skills, availability, and what you’re looking to learn. Make your profile public or private.',
    icon: <Lightbulb size={40} className="text-[#456882]" />,
  },
  {
    title: 'Browse & Connect',
    description:
      'Search for others with skills you want. Filter by category, location, or availability.',
    icon: <Search size={40} className="text-[#456882]" />,
  },
  {
    title: 'Swap & Learn',
    description:
      'Send swap requests and start exchanging! Leave feedback and grow your skills together.',
    icon: <Repeat size={40} className="text-[#456882]" />,
  },
];

const HowItWorks = () => {
  return (
    <section className="w-full bg-[#F9F3EF] py-20 px-6 sm:px-10 overflow-hidden relative">
      {/* Animation Styles */}
      <style>
        {`
          @keyframes fadeUp {
            0% {
              opacity: 0;
              transform: translateY(50px) scale(0.95);
            }
            100% {
              opacity: 1;
              transform: translateY(0) scale(1);
            }
          }
          .animate-step {
            animation: fadeUp 0.9s ease-out both;
          }
        `}
      </style>

      <div className="max-w-7xl mx-auto text-center">
        <h2 className="text-3xl md:text-4xl font-bold text-[#1B3C53] mb-16 animate-step">
          How It Works
        </h2>

        <div className="grid gap-10 sm:grid-cols-2 md:grid-cols-3 px-2 sm:px-0">
          {steps.map((step, index) => (
            <div
              key={index}
              className="bg-white rounded-2xl shadow-xl p-8 flex flex-col items-center text-center transition-transform duration-300 hover:scale-105 animate-step"
              style={{ animationDelay: `${index * 0.2}s` }}
            >
              <div className="mb-4">{step.icon}</div>
              <h3 className="text-xl font-semibold text-[#1B3C53] mb-2">
                {step.title}
              </h3>
              <p className="text-[#456882] text-sm">{step.description}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Floating Shapes (Optional) */}
      <div className="absolute top-0 -left-16 w-60 h-60 bg-[#D2C1B6] opacity-10 rounded-full blur-3xl animate-pulse"></div>
      <div className="absolute bottom-10 right-0 w-40 h-40 bg-[#456882] opacity-10 rounded-full blur-2xl animate-ping"></div>
    </section>
  );
};

export default HowItWorks;
