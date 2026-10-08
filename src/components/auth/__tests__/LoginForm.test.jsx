import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import LoginForm from '../LoginForm';
import { useAuthStore } from '../../../stores/authStore';
import { ROUTES } from '../../../constants';

jest.mock('../../../stores/authStore');
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => jest.fn(),
}));

describe('LoginForm Component', () => {
  const mockLogin = jest.fn();
  const mockNavigate = jest.fn();

  beforeEach(() => {
    useAuthStore.mockReturnValue({
      login: mockLogin,
      isLoading: false,
      error: null,
    });
    jest.spyOn(require('react-router-dom'), 'useNavigate').mockReturnValue(mockNavigate);
    mockLogin.mockClear();
    mockNavigate.mockClear();
  });

  it('renders the login form with email and password fields', () => {
    render(
      <MemoryRouter>
        <LoginForm />
      </MemoryRouter>
    );

    expect(screen.getByText('Sign in to your account')).toBeInTheDocument();
    expect(screen.getByLabelText('Email address')).toBeInTheDocument();
    expect(screen.getByLabelText('Password')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Sign in' })).toBeInTheDocument();
    expect(screen.getByText("Don't have an account? Sign up")).toBeInTheDocument();
  });

  it('shows error message when email or password is empty', async () => {
    render(
      <MemoryRouter>
        <LoginForm />
      </MemoryRouter>
    );

    fireEvent.click(screen.getByRole('button', { name: 'Sign in' }));

    expect(await screen.findByText('Email and password are required')).toBeInTheDocument();
    expect(mockLogin).not.toHaveBeenCalled();
  });

  it('calls login function with email and password when form is submitted', async () => {
    render(
      <MemoryRouter>
        <LoginForm />
      </MemoryRouter>
    );

    fireEvent.change(screen.getByLabelText('Email address'), { target: { value: 'test@example.com' } });
    fireEvent.change(screen.getByLabelText('Password'), { target: { value: 'password123' } });
    fireEvent.click(screen.getByRole('button', { name: 'Sign in' }));

    expect(mockLogin).toHaveBeenCalledWith({
      email: 'test@example.com',
      password: 'password123',
    });
  });

  it('shows loading state when login is in progress', () => {
    useAuthStore.mockReturnValue({
      login: mockLogin,
      isLoading: true,
      error: null,
    });

    render(
      <MemoryRouter>
        <LoginForm />
      </MemoryRouter>
    );

    expect(screen.getByRole('button', { name: 'Signing in...' })).toBeDisabled();
  });

  it('shows error message from auth store', () => {
    useAuthStore.mockReturnValue({
      login: mockLogin,
      isLoading: false,
      error: 'Invalid credentials',
    });

    render(
      <MemoryRouter>
        <LoginForm />
      </MemoryRouter>
    );

    expect(screen.getByText('Invalid credentials')).toBeInTheDocument();
  });

  it('shows error message when login fails', async () => {
    mockLogin.mockRejectedValue(new Error('Login failed'));

    render(
      <MemoryRouter>
        <LoginForm />
      </MemoryRouter>
    );

    fireEvent.change(screen.getByLabelText('Email address'), { target: { value: 'test@example.com' } });
    fireEvent.change(screen.getByLabelText('Password'), { target: { value: 'password123' } });
    fireEvent.click(screen.getByRole('button', { name: 'Sign in' }));

    expect(await screen.findByText('Login failed')).toBeInTheDocument();
  });

  it('navigates to dashboard on successful login', async () => {
    mockLogin.mockResolvedValue({});

    render(
      <MemoryRouter>
        <LoginForm />
      </MemoryRouter>
    );

    fireEvent.change(screen.getByLabelText('Email address'), { target: { value: 'test@example.com' } });
    fireEvent.change(screen.getByLabelText('Password'), { target: { value: 'password123' } });
    fireEvent.click(screen.getByRole('button', { name: 'Sign in' }));

    await new Promise(resolve => setTimeout(resolve, 0));
    expect(mockNavigate).toHaveBeenCalledWith(ROUTES.DASHBOARD);
  });

  it('applies custom className prop', () => {
    render(
      <MemoryRouter>
        <LoginForm className="custom-class" />
      </MemoryRouter>
    );

    expect(screen.getByTestId('login-form-container')).toHaveClass('custom-class');
  });
});