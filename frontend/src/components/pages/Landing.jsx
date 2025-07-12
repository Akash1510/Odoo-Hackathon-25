import React from 'react';
import Hero from '../Hero';
import HowItWorks from '../HowItWorks';
import ServiceCards from '../ServiceCards';
import CallToAction from '../CallToAction';
import Footer from '../Footer';

const Landing = () => {
  return (
    <div className="flex flex-col gap-0">
      <Hero />
      <HowItWorks />
      <ServiceCards />
      <CallToAction />
      <Footer />
    </div>
  );
};

export default Landing;
