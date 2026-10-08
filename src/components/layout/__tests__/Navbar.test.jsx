import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import Navbar from '../Navbar';
import { useAuthStore } from '../../../stores/authStore';
import { ROUTES } from '../../../constants';

jest.mock('../../../stores/authStore');
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useLocation: () => ({
    pathname: '/'
  })
}));

describe('Navbar Component', () => {
  const mockLogout = jest.fn();
  const mockCheckAuth = jest.fn();

  beforeEach(() => {
    useAuthStore.mockReturnValue({
      isAuthenticated: false,
      user: null,
      logout: mockLogout,
      checkAuth: mockCheckAuth
    });
    mockLogout.mockClear();
    mockCheckAuth.mockClear();
  });

  it('renders the logo linking to home', () => {
    render(
      <MemoryRouter>
        <Navbar />
      </MemoryRouter>
    );

    const logo = screen.getByText('writespace');
    expect(logo).toBeInTheDocument();
    expect(logo.closest('a')).toHaveAttribute('href', ROUTES.HOME);
  });

  it('shows public navigation links when not authenticated', () => {
    render(
      <MemoryRouter>
        <Navbar />
      </MemoryRouter>
    );

    expect(screen.getByText('Home')).toBeInTheDocument();
    expect(screen.getByText('Posts')).toBeInTheDocument();
    expect(screen.queryByText('Dashboard')).not.toBeInTheDocument();
  });

  it('shows authenticated navigation links when authenticated', () => {
    useAuthStore.mockReturnValue({
      isAuthenticated: true,
      user: { id: '1', username: 'testuser', email: 'test@example.com' },
      logout: mockLogout,
      checkAuth: mockCheckAuth
    });

    render(
      <MemoryRouter>
        <Navbar />
      </MemoryRouter>
    );

    expect(screen.getByText('Home')).toBeInTheDocument();
    expect(screen.getByText('Dashboard')).toBeInTheDocument();
    expect(screen.getByText('Posts')).toBeInTheDocument();
  });

  it('shows login and signup buttons when not authenticated', () => {
    render(
      <MemoryRouter>
        <Navbar />
      </MemoryRouter>
    );

    expect(screen.getByText('Login')).toBeInTheDocument();
    expect(screen.getByText('Sign Up')).toBeInTheDocument();
  });

  it('shows new post button, profile avatar, and logout button when authenticated', () => {
    useAuthStore.mockReturnValue({
      isAuthenticated: true,
      user: { id: '1', username: 'testuser', email: 'test@example.com', avatar: 'avatar.jpg' },
      logout: mockLogout,
      checkAuth: mockCheckAuth
    });

    render(
      <MemoryRouter>
        <Navbar />
      </MemoryRouter>
    );

    expect(screen.getByText('New Post')).toBeInTheDocument();
    expect(screen.getByAltText('testuser')).toBeInTheDocument();
    expect(screen.getByText('Logout')).toBeInTheDocument();
  });

  it('calls logout function when logout button is clicked', () => {
    useAuthStore.mockReturnValue({
      isAuthenticated: true,
      user: { id: '1', username: 'testuser', email: 'test@example.com' },
      logout: mockLogout,
      checkAuth: mockCheckAuth
    });

    render(
      <MemoryRouter>
        <Navbar />
      </MemoryRouter>
    );

    fireEvent.click(screen.getByText('Logout'));
    expect(mockLogout).toHaveBeenCalledTimes(1);
  });

  it('opens mobile menu when hamburger button is clicked', () => {
    render(
      <MemoryRouter>
        <Navbar />
      </MemoryRouter>
    );

    const hamburgerButton = screen.getByRole('button', { name: /open main menu/i });
    fireEvent.click(hamburgerButton);

    expect(screen.getByText('Home')).toBeVisible();
    expect(screen.getByText('Posts')).toBeVisible();
  });

  it('closes mobile menu when a link is clicked', () => {
    render(
      <MemoryRouter>
        <Navbar />
      </MemoryRouter>
    );

    const hamburgerButton = screen.getByRole('button', { name: /open main menu/i });
    fireEvent.click(hamburgerButton);

    const homeLink = screen.getByText('Home');
    fireEvent.click(homeLink);

    expect(hamburgerButton).toHaveAttribute('aria-expanded', 'false');
  });

  it('highlights the active navigation link', () => {
    jest.spyOn(require('react-router-dom'), 'useLocation').mockReturnValue({
      pathname: ROUTES.POSTS
    });

    render(
      <MemoryRouter>
        <Navbar />
      </MemoryRouter>
    );

    const postsLink = screen.getByText('Posts');
    expect(postsLink).toHaveClass('bg-primary text-white');
  });

  it('shows mobile menu with correct links when authenticated', () => {
    useAuthStore.mockReturnValue({
      isAuthenticated: true,
      user: { id: '1', username: 'testuser', email: 'test@example.com' },
      logout: mockLogout,
      checkAuth: mockCheckAuth
    });

    render(
      <MemoryRouter>
        <Navbar />
      </MemoryRouter>
    );

    const hamburgerButton = screen.getByRole('button', { name: /open main menu/i });
    fireEvent.click(hamburgerButton);

    expect(screen.getByText('Home')).toBeVisible();
    expect(screen.getByText('Dashboard')).toBeVisible();
    expect(screen.getByText('Posts')).toBeVisible();
    expect(screen.getByText('New Post')).toBeVisible();
    expect(screen.getByText('Profile')).toBeVisible();
    expect(screen.getByText('Logout')).toBeVisible();
  });
});