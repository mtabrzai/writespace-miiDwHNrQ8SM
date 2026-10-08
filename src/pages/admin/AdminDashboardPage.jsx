import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { Link } from 'react-router-dom';
import { FiUsers, FiFileText, FiBarChart2, FiSettings, FiChevronRight } from 'react-icons/fi';
import Navbar from '../../components/layout/Navbar';
import Footer from '../../components/layout/Footer';
import AdminRoute from '../../components/route-guards/AdminRoute';
import { useAuthStore } from '../../stores/authStore';
import { ROUTES } from '../../constants';
import Button from '../../components/ui/Button';
import Avatar from '../../components/ui/Avatar';

const AdminDashboardPage = ({ className = '' }) => {
  const { user } = useAuthStore();
  const [stats, setStats] = useState({
    totalUsers: 0,
    totalPosts: 0,
    publishedPosts: 0,
    draftPosts: 0,
  });
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchStats = async () => {
      try {
        setIsLoading(true);
        setError('');
        const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/admin/stats`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('authToken')}`,
          },
        });

        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.error || 'Failed to fetch admin stats');
        }

        setStats({
          totalUsers: data.totalUsers,
          totalPosts: data.totalPosts,
          publishedPosts: data.publishedPosts,
          draftPosts: data.draftPosts,
        });
      } catch (err) {
        setError(err.message || 'Failed to fetch admin stats');
      } finally {
        setIsLoading(false);
      }
    };

    fetchStats();
  }, []);

  const adminNavItems = [
    {
      icon: <FiUsers className="h-5 w-5" />,
      title: 'User Management',
      description: 'View and manage all users',
      path: ROUTES.ADMIN_USERS,
    },
    {
      icon: <FiFileText className="h-5 w-5" />,
      title: 'Post Management',
      description: 'View and manage all posts',
      path: ROUTES.ADMIN_POSTS,
    },
    {
      icon: <FiBarChart2 className="h-5 w-5" />,
      title: 'Analytics',
      description: 'View platform analytics',
      path: ROUTES.ADMIN_ANALYTICS,
    },
    {
      icon: <FiSettings className="h-5 w-5" />,
      title: 'System Settings',
      description: 'Configure platform settings',
      path: ROUTES.ADMIN_SETTINGS,
    },
  ];

  return (
    <AdminRoute>
      <div className={clsx('flex flex-col min-h-screen', className)}>
        <Navbar />
        <main className="flex-grow container mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Admin Dashboard</h1>
            <p className="mt-2 text-gray-500 dark:text-gray-400">
              Overview and management tools for the platform
            </p>
          </div>

          {error && (
            <div className="mb-8 p-4 bg-red-50 dark:bg-red-900/50 text-red-600 dark:text-red-200 rounded-md">
              {error}
            </div>
          )}

          <div className="mb-8 flex items-center">
            <Avatar
              src={user?.avatar}
              alt={user?.username || 'Admin'}
              size="medium"
              className="mr-3"
            />
            <div>
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
                Welcome, {user?.username}
              </h2>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                {user?.email}
              </p>
            </div>
          </div>

          {isLoading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
              {[...Array(4)].map((_, index) => (
                <div key={index} className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6 animate-pulse">
                  <div className="h-8 bg-gray-200 dark:bg-gray-700 rounded w-3/4 mb-4"></div>
                  <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded w-1/2"></div>
                </div>
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
              <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">Total Users</h3>
                  <FiUsers className="h-5 w-5 text-gray-400 dark:text-gray-500" />
                </div>
                <p className="text-3xl font-bold text-gray-900 dark:text-white">
                  {stats.totalUsers}
                </p>
              </div>

              <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">Total Posts</h3>
                  <FiFileText className="h-5 w-5 text-gray-400 dark:text-gray-500" />
                </div>
                <p className="text-3xl font-bold text-gray-900 dark:text-white">
                  {stats.totalPosts}
                </p>
              </div>

              <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">Published Posts</h3>
                  <FiBarChart2 className="h-5 w-5 text-gray-400 dark:text-gray-500" />
                </div>
                <p className="text-3xl font-bold text-gray-900 dark:text-white">
                  {stats.publishedPosts}
                </p>
              </div>

              <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">Draft Posts</h3>
                  <FiFileText className="h-5 w-5 text-gray-400 dark:text-gray-500" />
                </div>
                <p className="text-3xl font-bold text-gray-900 dark:text-white">
                  {stats.draftPosts}
                </p>
              </div>
            </div>
          )}

          <div className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Quick Actions</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {adminNavItems.map((item, index) => (
                <Link
                  key={index}
                  to={item.path}
                  className="bg-white dark:bg-gray-800 rounded-lg shadow-sm hover:shadow-md transition-shadow p-6 group"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <div className="p-3 rounded-lg bg-primary/10 dark:bg-primary/20 text-primary mr-4">
                        {item.icon}
                      </div>
                      <div>
                        <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                          {item.title}
                        </h3>
                        <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                          {item.description}
                        </p>
                      </div>
                    </div>
                    <FiChevronRight className="h-5 w-5 text-gray-400 dark:text-gray-500 group-hover:text-primary transition-colors" />
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </main>
        <Footer />
      </div>
    </AdminRoute>
  );
};

AdminDashboardPage.propTypes = {
  className: PropTypes.string,
};

export default AdminDashboardPage;