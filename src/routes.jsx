import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { ROUTES } from './constants';
import LandingPage from './pages/LandingPage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import BlogListPage from './pages/BlogListPage';
import BlogViewPage from './pages/BlogViewPage';
import BlogCreatePage from './pages/BlogCreatePage';
import BlogEditPage from './pages/BlogEditPage';
import AdminDashboardPage from './pages/admin/AdminDashboardPage';
import AdminUsersPage from './pages/admin/AdminUsersPage';
import AdminPostsPage from './pages/admin/AdminPostsPage';
import AuthRoute from './components/route-guards/AuthRoute';
import AdminRoute from './components/route-guards/AdminRoute';

const router = createBrowserRouter([
  {
    path: ROUTES.HOME,
    element: <LandingPage />,
  },
  {
    path: ROUTES.LOGIN,
    element: <LoginPage />,
  },
  {
    path: ROUTES.REGISTER,
    element: <RegisterPage />,
  },
  {
    path: ROUTES.POSTS,
    element: <BlogListPage />,
  },
  {
    path: ROUTES.POST,
    element: <BlogViewPage />,
  },
  {
    element: <AuthRoute />,
    children: [
      {
        path: ROUTES.CREATE_POST,
        element: <BlogCreatePage />,
      },
      {
        path: ROUTES.EDIT_POST,
        element: <BlogEditPage />,
      },
      {
        path: ROUTES.DASHBOARD,
        element: <BlogListPage />,
      },
    ],
  },
  {
    element: <AdminRoute />,
    children: [
      {
        path: ROUTES.ADMIN_DASHBOARD,
        element: <AdminDashboardPage />,
      },
      {
        path: ROUTES.ADMIN_USERS,
        element: <AdminUsersPage />,
      },
      {
        path: ROUTES.ADMIN_POSTS,
        element: <AdminPostsPage />,
      },
    ],
  },
]);

const Routes = () => {
  return <RouterProvider router={router} />;
};

export default Routes;