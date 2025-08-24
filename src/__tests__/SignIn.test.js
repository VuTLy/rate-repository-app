/* eslint-disable no-undef */
import React from 'react';
import { render, fireEvent, waitFor, screen } from '@testing-library/react-native';
import { SignInContainer } from '../components/SignInContainer';

describe('SignIn', () => {
  describe('SignInContainer', () => {
    it('calls onSubmit with correct values when form is submitted', async () => {
      const onSubmitMock = jest.fn();

      render(<SignInContainer onSubmit={onSubmitMock} />);

      const usernameInput = screen.getByPlaceholderText('Username');
      const passwordInput = screen.getByPlaceholderText('Password');
      const submitButton = screen.getByText('Sign In');

      fireEvent.changeText(usernameInput, 'myuser');
      fireEvent.changeText(passwordInput, 'mypassword');
      fireEvent.press(submitButton);

      // Wait for Formik async submission
      await waitFor(() => {
        expect(onSubmitMock).toHaveBeenCalledTimes(1);

        // Only check first argument (form values)
        expect(onSubmitMock.mock.calls[0][0]).toEqual({
          username: 'myuser',
          password: 'mypassword',
        });
      });
    });
  });
});
