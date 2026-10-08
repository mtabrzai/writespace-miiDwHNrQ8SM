import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { usePostStore } from '../stores/postStore';
import { useAuthStore } from '../stores/authStore';
import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';
import Button from '../components/ui/Button';
import Avatar from '../components/ui/Avatar';
import { ROUTES } from '../constants';
import { FiEdit, FiTrash2, FiEye, FiMessageCircle, FiHeart } from 'react-icons/fi';

const BlogViewPage = ({ className = '' }) => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { isAuthenticated, user } = useAuthStore();
  const {
    currentPost,
    isLoading,
    error,
    fetchPostById,
    deletePost,
    clearCurrentPost,
    clearError
  } = usePostStore();

  useEffect(() => {
    if (id) {
      fetchPostById(id);
    }
    return () => {
      clearCurrentPost();
      clearError();
    };
  }, [id, fetchPostById, clearCurrentPost, clearError]);

  const handleDelete = async () => {
    if (!currentPost) return;
    try {
      const response = await deletePost(currentPost.id);
      if (response.error) {
        throw new Error(response.error);
      }
      navigate(ROUTES.POSTS);
    } catch (err) {
      console.error('Failed to delete post:', err);
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  const isAuthor = isAuthenticated && currentPost && user?.id === currentPost.authorId;

  return (
    <div className={clsx('flex flex-col min-h-screen', className)}>
      <Navbar />
      <main className="flex-grow container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {error && (
          <div className="mb-8 p-4 bg-red-50 dark:bg-red-900/50 text-red-600 dark:text-red-200 rounded-md">
            {error}
          </div>
        )}

        {isLoading ? (
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-8 animate-pulse">
            <div className="h-8 bg-gray-200 dark:bg-gray-700 rounded w-3/4 mb-6"></div>
            <div className="flex items-center mb-4">
              <div className="h-10 w-10 bg-gray-200 dark:bg-gray-700 rounded-full mr-3"></div>
              <div>
                <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-24 mb-1"></div>
                <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded w-32"></div>
              </div>
            </div>
            <div className="space-y-4">
              <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded"></div>
              <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-5/6"></div>
              <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-4/6"></div>
              <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-3/4"></div>
            </div>
          </div>
        ) : currentPost ? (
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden">
            <div className="p-6 sm:p-8">
              <div className="flex items-center justify-between mb-4">
                <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white">
                  {currentPost.title}
                </h1>
                {currentPost.published ? (
                  <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200">
                    Published
                  </span>
                ) : (
                  <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200">
                    Draft
                  </span>
                )}
              </div>

              <div className="flex items-center mb-6">
                <Avatar
                  src={currentPost.author?.avatar}
                  alt={currentPost.author?.username || 'Author'}
                  size="medium"
                  className="mr-3"
                />
                <div>
                  <p className="text-sm font-medium text-gray-900 dark:text-white">
                    {currentPost.author?.username}
                  </p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">
                    {formatDate(currentPost.createdAt)}
                    {currentPost.updatedAt !== currentPost.createdAt && (
                      <span className="ml-1">(Edited)</span>
                    )}
                  </p>
                </div>
              </div>

              <div className="flex items-center space-x-4 text-sm text-gray-500 dark:text-gray-400 mb-8">
                <div className="flex items-center">
                  <FiEye className="mr-1 h-4 w-4" />
                  <span>125</span>
                </div>
                <div className="flex items-center">
                  <FiMessageCircle className="mr-1 h-4 w-4" />
                  <span>8</span>
                </div>
                <div className="flex items-center">
                  <FiHeart className="mr-1 h-4 w-4" />
                  <span>24</span>
                </div>
              </div>

              <div className="prose dark:prose-invert max-w-none mb-8">
                <p className="whitespace-pre-line text-gray-700 dark:text-gray-300">
                  {currentPost.content}
                </p>
              </div>

              {isAuthor && (
                <div className="flex items-center space-x-4 pt-6 border-t border-gray-200 dark:border-gray-700">
                  <Link to={ROUTES.EDIT_POST.replace(':id', currentPost.id)}>
                    <Button variant="outline" size="medium">
                      <FiEdit className="mr-2 h-4 w-4" />
                      Edit
                    </Button>
                  </Link>
                  <Button
                    variant="danger"
                    size="medium"
                    onClick={handleDelete}
                  >
                    <FiTrash2 className="mr-2 h-4 w-4" />
                    Delete
                  </Button>
                </div>
              )}
            </div>
          </div>
        ) : (
          <div className="text-center py-12">
            <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
              Post not found
            </h2>
            <p className="text-gray-500 dark:text-gray-400 mb-6">
              The post you're looking for doesn't exist or has been deleted.
            </p>
            <Link to={ROUTES.POSTS}>
              <Button variant="primary" size="medium">
                Back to Posts
              </Button>
            </Link>
          </div>
        )}
      </main>
      <Footer />
    </div>
  );
};

BlogViewPage.propTypes = {
  className: PropTypes.string,
};

export default BlogViewPage;