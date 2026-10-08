import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import Button from '../ui/Button';
import { usePostStore } from '../../stores/postStore';
import { useNavigate } from 'react-router-dom';
import { ROUTES, LIMITS } from '../../constants';

const PostForm = ({ post = null, className = '' }) => {
  const [title, setTitle] = useState(post?.title || '');
  const [content, setContent] = useState(post?.content || '');
  const [published, setPublished] = useState(post?.published || false);
  const [error, setError] = useState('');
  const { createPost, updatePost, isLoading, error: postError } = usePostStore();
  const navigate = useNavigate();

  useEffect(() => {
    if (post) {
      setTitle(post.title);
      setContent(post.content);
      setPublished(post.published);
    }
  }, [post]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (!title.trim()) {
      setError('Title is required');
      return;
    }

    if (title.length > LIMITS.MAX_TITLE_LENGTH) {
      setError(`Title must be ${LIMITS.MAX_TITLE_LENGTH} characters or less`);
      return;
    }

    if (content.length > LIMITS.MAX_CONTENT_LENGTH) {
      setError(`Content must be ${LIMITS.MAX_CONTENT_LENGTH} characters or less`);
      return;
    }

    try {
      let response;
      if (post) {
        response = await updatePost(post.id, { title, content, published });
      } else {
        response = await createPost({ title, content, published });
      }

      if (response.error) {
        throw new Error(response.error);
      }

      navigate(ROUTES.POSTS);
    } catch (err) {
      setError(err.message || (post ? 'Failed to update post' : 'Failed to create post'));
    }
  };

  return (
    <div className={clsx('max-w-4xl w-full mx-auto', className)}>
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-8">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-8">
          {post ? 'Edit Post' : 'Create New Post'}
        </h2>

        {(error || postError) && (
          <div className="mb-4 p-4 bg-red-50 dark:bg-red-900/50 text-red-600 dark:text-red-200 rounded-md">
            {error || postError}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="title" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Title
            </label>
            <input
              id="title"
              name="title"
              type="text"
              required
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary dark:bg-gray-700 dark:text-white"
              maxLength={LIMITS.MAX_TITLE_LENGTH}
            />
            <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
              {title.length}/{LIMITS.MAX_TITLE_LENGTH} characters
            </p>
          </div>

          <div>
            <label htmlFor="content" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Content
            </label>
            <textarea
              id="content"
              name="content"
              rows={12}
              value={content}
              onChange={(e) => setContent(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary dark:bg-gray-700 dark:text-white"
              maxLength={LIMITS.MAX_CONTENT_LENGTH}
            />
            <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
              {content.length}/{LIMITS.MAX_CONTENT_LENGTH} characters
            </p>
          </div>

          <div className="flex items-center">
            <input
              id="published"
              name="published"
              type="checkbox"
              checked={published}
              onChange={(e) => setPublished(e.target.checked)}
              className="h-4 w-4 text-primary focus:ring-primary border-gray-300 dark:border-gray-700 rounded"
            />
            <label htmlFor="published" className="ml-2 block text-sm text-gray-700 dark:text-gray-300">
              Publish post
            </label>
          </div>

          <div className="flex flex-col sm:flex-row gap-4">
            <Button
              type="button"
              variant="outline"
              size="large"
              fullWidth
              onClick={() => navigate(ROUTES.POSTS)}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              variant="primary"
              size="large"
              fullWidth
              disabled={isLoading}
            >
              {isLoading ? (post ? 'Updating...' : 'Creating...') : (post ? 'Update Post' : 'Create Post')}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

PostForm.propTypes = {
  post: PropTypes.shape({
    id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    content: PropTypes.string.isRequired,
    published: PropTypes.bool.isRequired,
  }),
  className: PropTypes.string,
};

export default PostForm;