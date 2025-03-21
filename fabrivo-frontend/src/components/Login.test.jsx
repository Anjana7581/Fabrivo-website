import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import Login from './Login';
import axiosInstance from '../axiosInstance';
import { MemoryRouter } from 'react-router-dom';

vi.mock('../axiosInstance'); // Mock axiosInstance for Vitest

describe('Login Component', () => {
  beforeEach(() => {
    // Mock the axiosInstance POST request to simulate a successful login response
    axiosInstance.post.mockResolvedValue({
      data: { token: 'dummyToken' },
    });

    // Mock window.alert
    global.alert = vi.fn();

    // Clear localStorage before each test
    localStorage.clear();
  });

  test('renders login form with email, password inputs, and login button', () => {
    render(
      <MemoryRouter>
        <Login />
      </MemoryRouter>
    );

    // Check if email and password fields are present
    expect(screen.getByTestId('email-input')).toBeInTheDocument();
    expect(screen.getByTestId('password-input')).toBeInTheDocument();
    // Check if the login button is present
    expect(screen.getByTestId('login-button')).toBeInTheDocument();
  });

  test('allows user to fill in login form and submit', async () => {
    render(
      <MemoryRouter>
        <Login />
      </MemoryRouter>
    );

    // Fill in the email and password fields
    fireEvent.change(screen.getByTestId('email-input'), {
      target: { value: 'test@example.com' },
    });
    fireEvent.change(screen.getByTestId('password-input'), {
      target: { value: 'password123' },
    });

    // Simulate the form submission
    fireEvent.click(screen.getByTestId('login-button'));

    // Wait for the redirect (assuming the token is set in localStorage)
    await waitFor(() => {
      expect(localStorage.getItem('token')).toBe('dummyToken');
    });
  });

  test('shows alert on login success', async () => {
    render(
      <MemoryRouter>
        <Login />
      </MemoryRouter>
    );

    // Fill in the form and submit
    fireEvent.change(screen.getByTestId('email-input'), {
      target: { value: 'test@example.com' },
    });
    fireEvent.change(screen.getByTestId('password-input'), {
      target: { value: 'password123' },
    });
    fireEvent.click(screen.getByTestId('login-button'));

    // Wait for alert to be called
    await waitFor(() => {
      expect(global.alert).toHaveBeenCalledWith('Login successful!');
    });
  });

  test('handles login failure correctly', async () => {
    // Simulate a failed login response with a proper error object
    axiosInstance.post.mockRejectedValueOnce({
      response: {
        data: { message: 'Login failed!' },
      },
    });

    render(
      <MemoryRouter>
        <Login />
      </MemoryRouter>
    );

    // Fill in the form with incorrect credentials
    fireEvent.change(screen.getByTestId('email-input'), {
      target: { value: 'wrong@example.com' },
    });
    fireEvent.change(screen.getByTestId('password-input'), {
      target: { value: 'wrongpassword' },
    });
    fireEvent.click(screen.getByTestId('login-button'));

    // Wait for the failure alert to be called
    await waitFor(() => {
      expect(global.alert).toHaveBeenCalledWith('Login failed!');
    });
  });
});