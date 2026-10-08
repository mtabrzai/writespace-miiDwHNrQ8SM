import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { usePostStore } from '../stores/postStore';
import { useAuthStore } from '../stores/authStore';
import PostCard from '../components/blog/PostCard';
import Button from '../components/ui/Button';
import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';
import { Link } from 'react-router-dom';
import { ROUTES } from '../constants';
import { FiPlus } from 'react-icons/fi';

const BlogListPage = ({ className = '' }) => {
  const { posts, isLoading, error, currentPage, totalPages, fetchPosts } = usePostStore();
  const { isAuthenticated, user } = useAuthStore();

  useEffect(() => {
    fetchPosts();
  }, [fetchPosts]);

  return (
    <div className={clsx('flex flex-col min-h-screen', className)}>
      <Navbar />
      <main className="flex-grow container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Blog Posts</h1>
          {isAuthenticated && (
            <Link to={ROUTES.CREATE_POST}>
              <Button variant="primary" size="medium">
                <FiPlus className="mr-2 h-4 w-4" />
                New Post
              </Button>
            </Link>
          )}
        </div>

        {error && (
          <div className="mb-8 p-4 bg-red-50 dark:bg-red-900/50 text-red-600 dark:text-red-200 rounded-md">
            {error}
          </div>
        )}

        {isLoading ? (
          <div className="space-y-6">
            {[...Array(3)].map((_, index) => (
              <div key={index} className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6 animate-pulse">
                <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded w-3/4 mb-4"></div>
                <div className="space-y-2">
                  <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded"></div>
                  <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-5/6"></div>
                  <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-4/6"></div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="space-y-6">
            {posts.length > 0 ? (
              posts.map((post) => (
                <PostCard
                  key={post.id}
                  post={post}
                  showAuthor={true}
                  showStats={true}
                />
              ))
            ) : (
              <div className="text-center py-12">
                <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">No posts found</h2>
                <p className="text-gray-500 dark:text-gray-400">
                  {isAuthenticated
                    ? "Create your first post to get started."
                    : "Sign in to create and view posts."}
                </p>
                {isAuthenticated && (
                  <Link to={ROUTES.CREATE_POST} className="mt-6 inline-block">
                    <Button variant="primary" size="medium">
                      Create Post
                    </Button>
                  </Link>
                )}
              </div>
            )}
          </div>
        )}

        {totalPages > 1 && (
          <div className="mt-12 flex items-center justify-center space-x-2">
            <Button
              variant="outline"
              size="small"
              disabled={currentPage === 1}
              onClick={() => fetchPosts(currentPage - 1)}
            >
              Previous
            </Button>
            <span className="text-sm text-gray-700 dark:text-gray-300">
              Page {currentPage} of {totalPages}
            </span>
            <Button
              variant="outline"
              size="small"
              disabled={currentPage === totalPages}
              onClick={() => fetchPosts(currentPage + 1)}
            >
              Next
            </Button>
          </div>
        )}
      </main>
      <Footer />
    </div>
  );
};

BlogListPage.propTypes = {
  className: PropTypes.string,
};

export default BlogListPage;