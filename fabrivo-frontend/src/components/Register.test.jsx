import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import Register from './Register';
import axiosInstance from '../axiosInstance';
import { MemoryRouter } from 'react-router-dom';

vi.mock('../axiosInstance'); // Mock axiosInstance for Vitest

describe('Register Component', () => {
  beforeEach(() => {
    // Mock the axiosInstance POST request to simulate a successful registration response
    axiosInstance.post.mockResolvedValue({
      data: { token: 'dummyToken' },
    });

    // Mock window.alert
    global.alert = vi.fn();

    // Clear localStorage before each test
    localStorage.clear();
  });

  test('renders registration form with all fields and a register button', () => {
    render(
      <MemoryRouter>
        <Register />
      </MemoryRouter>
    );

    // Check if all input fields are present
    expect(screen.getByPlaceholderText('Name')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Email')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Password')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Confirm Password')).toBeInTheDocument();
    expect(screen.getByRole('combobox')).toBeInTheDocument(); // Role select dropdown
    // Check if the register button is present
    expect(screen.getByRole('button', { name: /register/i })).toBeInTheDocument();
  });

  test('allows user to fill in the registration form and submit', async () => {
    render(
      <MemoryRouter>
        <Register />
      </MemoryRouter>
    );

    // Fill in the form fields
    fireEvent.change(screen.getByPlaceholderText('Name'), {
      target: { value: 'John Doe' },
    });
    fireEvent.change(screen.getByPlaceholderText('Email'), {
      target: { value: 'john@example.com' },
    });
    fireEvent.change(screen.getByPlaceholderText('Password'), {
      target: { value: 'password123' },
    });
    fireEvent.change(screen.getByPlaceholderText('Confirm Password'), {
      target: { value: 'password123' },
    });
    fireEvent.change(screen.getByRole('combobox'), {
      target: { value: 'user' },
    });

    // Simulate the form submission
    fireEvent.click(screen.getByRole('button', { name: /register/i }));

    // Wait for the registration to complete
    await waitFor(() => {
      expect(axiosInstance.post).toHaveBeenCalledWith('/register', {
        name: 'John Doe',
        email: 'john@example.com',
        password: 'password123',
        password_confirmation: 'password123',
        role: 'user',
      });
    });
  });

  test('handles successful registration', async () => {
    render(
      <MemoryRouter>
        <Register />
      </MemoryRouter>
    );

    // Fill in the form fields
    fireEvent.change(screen.getByPlaceholderText('Name'), {
      target: { value: 'John Doe' },
    });
    fireEvent.change(screen.getByPlaceholderText('Email'), {
      target: { value: 'john@example.com' },
    });
    fireEvent.change(screen.getByPlaceholderText('Password'), {
      target: { value: 'password123' },
    });
    fireEvent.change(screen.getByPlaceholderText('Confirm Password'), {
      target: { value: 'password123' },
    });
    fireEvent.change(screen.getByRole('combobox'), {
      target: { value: 'user' },
    });

    // Simulate the form submission
    fireEvent.click(screen.getByRole('button', { name: /register/i }));

    // Wait for the token to be saved in localStorage
    await waitFor(() => {
      expect(localStorage.getItem('token')).toBe('dummyToken');
    });

    // Verify that the success alert is shown
    expect(global.alert).toHaveBeenCalledWith('Registration successful!');
  });

  test('handles registration failure', async () => {
    // Simulate a failed registration response
    axiosInstance.post.mockRejectedValueOnce({
      response: {
        data: { message: 'Registration failed!' },
      },
    });

    render(
      <MemoryRouter>
        <Register />
      </MemoryRouter>
    );

    // Fill in the form fields
    fireEvent.change(screen.getByPlaceholderText('Name'), {
      target: { value: 'John Doe' },
    });
    fireEvent.change(screen.getByPlaceholderText('Email'), {
      target: { value: 'john@example.com' },
    });
    fireEvent.change(screen.getByPlaceholderText('Password'), {
      target: { value: 'password123' },
    });
    fireEvent.change(screen.getByPlaceholderText('Confirm Password'), {
      target: { value: 'password123' },
    });
    fireEvent.change(screen.getByRole('combobox'), {
      target: { value: 'user' },
    });

    // Simulate the form submission
    fireEvent.click(screen.getByRole('button', { name: /register/i }));

    // Wait for the failure alert to be called
    await waitFor(() => {
      expect(global.alert).toHaveBeenCalledWith('Registration failed!');
    });
  });
});