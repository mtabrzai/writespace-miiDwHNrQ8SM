import React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { Link } from 'react-router-dom';
import Avatar from '../ui/Avatar';
import { ROUTES } from '../../constants';
import { FiEye, FiMessageCircle, FiHeart } from 'react-icons/fi';

const PostCard = ({
  post,
  className = '',
  showAuthor = true,
  showStats = true,
  ...props
}) => {
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  return (
    <div
      className={clsx('bg-white dark:bg-gray-800 rounded-lg shadow-sm hover:shadow-md transition-shadow overflow-hidden', className)}
      {...props}
    >
      <Link to={ROUTES.POST.replace(':id', post.id)} className="block">
        <div className="p-6">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-xl font-bold text-gray-900 dark:text-white truncate">
              {post.title}
            </h3>
            {post.published ? (
              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200">
                Published
              </span>
            ) : (
              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200">
                Draft
              </span>
            )}
          </div>

          <p className="text-gray-500 dark:text-gray-400 mb-4 line-clamp-3">
            {post.content}
          </p>

          {showStats && (
            <div className="flex items-center space-x-4 text-sm text-gray-500 dark:text-gray-400 mb-4">
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
          )}

          <div className="flex items-center justify-between pt-4 border-t border-gray-200 dark:border-gray-700">
            {showAuthor && (
              <div className="flex items-center">
                <Avatar
                  src={post.author?.avatar}
                  alt={post.author?.username || 'Author'}
                  size="small"
                  className="mr-2"
                />
                <div>
                  <p className="text-sm font-medium text-gray-900 dark:text-white">
                    {post.author?.username}
                  </p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">
                    {formatDate(post.createdAt)}
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
      </Link>
    </div>
  );
};

PostCard.propTypes = {
  post: PropTypes.shape({
    id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    content: PropTypes.string.isRequired,
    author: PropTypes.shape({
      username: PropTypes.string,
      avatar: PropTypes.string,
    }),
    createdAt: PropTypes.string.isRequired,
    published: PropTypes.bool.isRequired,
  }).isRequired,
  className: PropTypes.string,
  showAuthor: PropTypes.bool,
  showStats: PropTypes.bool,
};

export default PostCard;