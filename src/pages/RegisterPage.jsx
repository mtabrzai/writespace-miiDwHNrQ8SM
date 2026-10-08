import React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import RegisterForm from '../components/auth/RegisterForm';
import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';

const RegisterPage = ({ className = '' }) => {
  return (
    <div className={clsx('flex flex-col min-h-screen', className)}>
      <Navbar />
      <main className="flex-grow flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 bg-gray-50 dark:bg-gray-900">
        <RegisterForm />
      </main>
      <Footer />
    </div>
  );
};

RegisterPage.propTypes = {
  className: PropTypes.string,
};

export default RegisterPage;