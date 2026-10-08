import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { useParams, useNavigate } from 'react-router-dom';
import PostForm from '../components/blog/PostForm';
import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';
import AuthRoute from '../components/route-guards/AuthRoute';
import { usePostStore } from '../stores/postStore';
import { ROUTES } from '../constants';
import Button from '../components/ui/Button';

const BlogEditPage = ({ className = '' }) => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { currentPost, isLoading, error, fetchPostById, clearCurrentPost, clearError } = usePostStore();

  useEffect(() => {
    if (id) {
      fetchPostById(id);
    }
    return () => {
      clearCurrentPost();
      clearError();
    };
  }, [id, fetchPostById, clearCurrentPost, clearError]);

  return (
    <AuthRoute>
      <div className={clsx('flex flex-col min-h-screen', className)}>
        <Navbar />
        <main className="flex-grow container mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="flex items-center justify-between mb-8">
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Edit Post</h1>
            <Button
              variant="outline"
              size="medium"
              onClick={() => navigate(ROUTES.POSTS)}
            >
              Cancel
            </Button>
          </div>

          {error && (
            <div className="mb-8 p-4 bg-red-50 dark:bg-red-900/50 text-red-600 dark:text-red-200 rounded-md">
              {error}
            </div>
          )}

          {isLoading ? (
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-8 animate-pulse">
              <div className="h-8 bg-gray-200 dark:bg-gray-700 rounded w-1/2 mb-6"></div>
              <div className="space-y-4">
                <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded"></div>
                <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-5/6"></div>
                <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-4/6"></div>
                <div className="h-32 bg-gray-200 dark:bg-gray-700 rounded mt-4"></div>
              </div>
            </div>
          ) : (
            currentPost && <PostForm post={currentPost} />
          )}
        </main>
        <Footer />
      </div>
    </AuthRoute>
  );
};

BlogEditPage.propTypes = {
  className: PropTypes.string,
};

export default BlogEditPage;