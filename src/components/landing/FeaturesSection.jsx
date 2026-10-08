import React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { FiEdit3, FiUsers, FiShare2 } from 'react-icons/fi';

const FeaturesSection = ({ className = '' }) => {
  const features = [
    {
      icon: <FiEdit3 className="h-10 w-10" />,
      title: 'Easy Writing',
      description: 'A distraction-free editor with markdown support to help you focus on your writing.',
    },
    {
      icon: <FiUsers className="h-10 w-10" />,
      title: 'Collaborate',
      description: 'Invite others to review, edit, and contribute to your work in real-time.',
    },
    {
      icon: <FiShare2 className="h-10 w-10" />,
      title: 'Publish & Share',
      description: 'Publish your work with one click and share it with the world or keep it private.',
    },
  ];

  return (
    <section className={clsx('py-20 bg-white dark:bg-gray-800', className)}>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-900 dark:text-white tracking-tight">
            Designed for Writers
          </h2>
          <p className="mt-4 max-w-2xl mx-auto text-xl text-gray-500 dark:text-gray-400">
            Everything you need to create, collaborate, and publish your work.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className="bg-gray-50 dark:bg-gray-700 rounded-lg p-8 text-center shadow-sm hover:shadow-md transition-shadow"
            >
              <div className="mx-auto h-16 w-16 flex items-center justify-center rounded-full bg-primary text-white mb-6">
                {feature.icon}
              </div>
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                {feature.title}
              </h3>
              <p className="text-gray-500 dark:text-gray-400">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

FeaturesSection.propTypes = {
  className: PropTypes.string,
};

export default FeaturesSection;