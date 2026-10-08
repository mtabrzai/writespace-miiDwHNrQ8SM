import React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import HeroSection from '../components/landing/HeroSection';
import FeaturesSection from '../components/landing/FeaturesSection';
import Footer from '../components/layout/Footer';

const LandingPage = ({ className = '' }) => {
  return (
    <div className={clsx('flex flex-col min-h-screen', className)}>
      <main className="flex-grow">
        <HeroSection />
        <FeaturesSection className="py-16" />
      </main>
      <Footer />
    </div>
  );
};

LandingPage.propTypes = {
  className: PropTypes.string,
};

export default LandingPage;