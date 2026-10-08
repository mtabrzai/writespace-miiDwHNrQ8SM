import React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import PostForm from '../components/blog/PostForm';
import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';
import AuthRoute from '../components/route-guards/AuthRoute';

const BlogCreatePage = ({ className = '' }) => {
  return (
    <AuthRoute>
      <div className={clsx('flex flex-col min-h-screen', className)}>
        <Navbar />
        <main className="flex-grow container mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Create New Post</h1>
          </div>
          <PostForm />
        </main>
        <Footer />
      </div>
    </AuthRoute>
  );
};

BlogCreatePage.propTypes = {
  className: PropTypes.string,
};

export default BlogCreatePage;