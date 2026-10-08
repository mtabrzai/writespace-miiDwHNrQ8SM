import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import Button from '../ui/Button';
import { useAuthStore } from '../../stores/authStore';
import { ROUTES, LIMITS } from '../../constants';

const RegisterForm = ({ className = '' }) => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { register, isLoading, error: authError } = useAuthStore();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (!username || !email || !password) {
      setError('Username, email, and password are required');
      return;
    }

    if (username.length > LIMITS.MAX_USERNAME_LENGTH) {
      setError(`Username must be ${LIMITS.MAX_USERNAME_LENGTH} characters or less`);
      return;
    }

    if (email.length > LIMITS.MAX_EMAIL_LENGTH) {
      setError(`Email must be ${LIMITS.MAX_EMAIL_LENGTH} characters or less`);
      return;
    }

    if (password.length < LIMITS.MIN_PASSWORD_LENGTH) {
      setError(`Password must be at least ${LIMITS.MIN_PASSWORD_LENGTH} characters`);
      return;
    }

    try {
      await register({ username, email, password });
      navigate(ROUTES.DASHBOARD);
    } catch (err) {
      setError(err.message || 'Registration failed');
    }
  };

  return (
    <div className={clsx('max-w-md w-full mx-auto', className)}>
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-8">
        <h2 className="text-2xl font-bold text-center text-gray-900 dark:text-white mb-8">
          Create your account
        </h2>

        {error || authError ? (
          <div className="mb-4 p-4 bg-red-50 dark:bg-red-900/50 text-red-600 dark:text-red-200 rounded-md">
            {error || authError}
          </div>
        ) : null}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="username" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Username
            </label>
            <input
              id="username"
              name="username"
              type="text"
              autoComplete="username"
              required
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary dark:bg-gray-700 dark:text-white"
            />
          </div>

          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Email address
            </label>
            <input
              id="email"
              name="email"
              type="email"
              autoComplete="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary dark:bg-gray-700 dark:text-white"
            />
          </div>

          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Password
            </label>
            <input
              id="password"
              name="password"
              type="password"
              autoComplete="new-password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary dark:bg-gray-700 dark:text-white"
            />
            <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
              Must be at least {LIMITS.MIN_PASSWORD_LENGTH} characters
            </p>
          </div>

          <div className="text-sm">
            <Link to={ROUTES.LOGIN} className="font-medium text-primary hover:text-blue-500">
              Already have an account? Sign in
            </Link>
          </div>

          <div>
            <Button
              type="submit"
              variant="primary"
              size="large"
              fullWidth
              disabled={isLoading}
            >
              {isLoading ? 'Creating account...' : 'Create account'}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

RegisterForm.propTypes = {
  className: PropTypes.string,
};

export default RegisterForm;