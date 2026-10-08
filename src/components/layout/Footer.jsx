import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { ROUTES } from '../../constants';

const Footer = ({ className = '' }) => {
  const footerLinks = [
    {
      path: ROUTES.HOME,
      label: 'Home',
    },
    {
      path: ROUTES.POSTS,
      label: 'Posts',
    },
    {
      path: ROUTES.SETTINGS,
      label: 'Settings',
    },
  ];

  return (
    <footer className={clsx('bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-700', className)}>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col md:flex-row items-center justify-between">
          <div className="flex items-center mb-4 md:mb-0">
            <span className="text-xl font-bold text-primary">writespace</span>
          </div>

          <div className="flex flex-wrap items-center justify-center md:justify-end space-x-6">
            {footerLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className="text-gray-600 dark:text-gray-400 hover:text-primary dark:hover:text-primary transition-colors text-sm"
              >
                {link.label}
              </Link>
            ))}
          </div>
        </div>

        <div className="mt-8 pt-8 border-t border-gray-200 dark:border-gray-700 text-center">
          <p className="text-sm text-gray-500 dark:text-gray-400">
            © {new Date().getFullYear()} writespace. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

Footer.propTypes = {
  className: PropTypes.string,
};

export default Footer;