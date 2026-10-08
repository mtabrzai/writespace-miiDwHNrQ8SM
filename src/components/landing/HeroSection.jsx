import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import Button from '../ui/Button';
import { ROUTES } from '../../constants';

const HeroSection = ({ className = '' }) => {
  return (
    <section className={clsx('relative bg-gradient-to-r from-blue-500 to-indigo-600 dark:from-blue-800 dark:to-indigo-900 overflow-hidden', className)}>
      <div className="absolute inset-0">
        <div className="container mx-auto h-full w-full flex items-center justify-center">
          <div className="absolute top-0 left-0 w-64 h-64 bg-white opacity-10 rounded-full -translate-x-1/2 -translate-y-1/2"></div>
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-white opacity-10 rounded-full translate-x-1/2 translate-y-1/2"></div>
        </div>
      </div>
      <div className="relative container mx-auto px-4 sm:px-6 lg:px-8 py-24 sm:py-32 lg:py-48">
        <div className="text-center">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white tracking-tight">
            Write Your Story in <span className="text-yellow-300">Writespace</span>
          </h1>
          <p className="mt-6 max-w-3xl mx-auto text-xl sm:text-2xl text-blue-100 dark:text-blue-200">
            A modern platform for writers to create, share, and collaborate on their work.
          </p>
          <div className="mt-10 max-w-sm mx-auto sm:max-w-none sm:flex sm:justify-center">
            <div className="space-y-4 sm:space-y-0 sm:mx-auto sm:inline-grid sm:grid-cols-2 sm:gap-5">
              <Link to={ROUTES.REGISTER}>
                <Button
                  variant="light"
                  size="large"
                  className="w-full sm:w-auto"
                >
                  Get Started
                </Button>
              </Link>
              <Link to={ROUTES.POSTS}>
                <Button
                  variant="outline"
                  size="large"
                  className="w-full sm:w-auto text-white border-white hover:bg-white hover:text-blue-600 dark:hover:text-blue-800"
                >
                  Explore Posts
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

HeroSection.propTypes = {
  className: PropTypes.string,
};

export default HeroSection;