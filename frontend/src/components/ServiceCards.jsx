import React from 'react';
import {
  Palette,
  Code,
  Dumbbell,
  Languages,
  Mic,
  BookOpen,
} from 'lucide-react';

const services = [
  {
    title: 'Graphic Design',
    icon: <Palette size={36} className="text-[#456882]" />,
    description: 'Learn or teach Photoshop, Illustrator, Canva and more.',
  },
  {
    title: 'Web Development',
    icon: <Code size={36} className="text-[#456882]" />,
    description: 'HTML, CSS, React, MERN stack? Find coding partners here.',
  },
  {
    title: 'Fitness & Yoga',
    icon: <Dumbbell size={36} className="text-[#456882]" />,
    description: 'Exchange workout plans, yoga flows or guided sessions.',
  },
  {
    title: 'Languages',
    icon: <Languages size={36} className="text-[#456882]" />,
    description: 'Practice spoken or written languages 1-on-1 with others.',
  },
  {
    title: 'Music & Vocal',
    icon: <Mic size={36} className="text-[#456882]" />,
    description: 'Teach or learn guitar, vocals, instruments & mixing.',
  },
  {
    title: 'Academics',
    icon: <BookOpen size={36} className="text-[#456882]" />,
    description: 'Help others with math, science, economics or writing.',
  },
];

const ServiceCards = () => {
  return (
    <section className="bg-white py-20 px-6 sm:px-10">
      <style>
        {`
          @keyframes fadeInUp {
            0% { opacity: 0; transform: translateY(30px); }
            100% { opacity: 1; transform: translateY(0); }
          }
          .animate-card {
            animation: fadeInUp 1s ease-out forwards;
          }
        `}
      </style>

      <div className="max-w-6xl mx-auto text-center">
        <h2 className="text-3xl md:text-4xl font-bold text-[#1B3C53] mb-12">
          Explore Skill Categories
        </h2>

        <div className="grid gap-8 sm:grid-cols-2 md:grid-cols-3">
          {services.map((service, index) => (
            <div
              key={index}
              className="bg-[#F9F3EF] rounded-2xl shadow-lg p-6 text-left transition-transform duration-300 hover:scale-105 animate-card"
              style={{ animationDelay: `${index * 0.1}s`, animationFillMode: 'both' }}
            >
              <div className="mb-4">{service.icon}</div>
              <h3 className="text-xl font-semibold text-[#1B3C53] mb-2">
                {service.title}
              </h3>
              <p className="text-[#456882] text-sm">{service.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServiceCards;
