/* eslint-disable no-undef */
import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react-native';
import { SignUpContainer } from '../components/SignUp';

describe('SignUpContainer', () => {
  it('calls onSubmit with correct values', async () => {
    const onSubmit = jest.fn();

    const { getByTestId } = render(<SignUpContainer onSubmit={onSubmit} />);

    fireEvent.changeText(getByTestId('username'), 'newuser');
    fireEvent.changeText(getByTestId('password'), 'supersecret');
    fireEvent.changeText(getByTestId('passwordConfirmation'), 'supersecret');

    fireEvent.press(getByTestId('submitButton'));

    await waitFor(() => {
      expect(onSubmit).toHaveBeenCalledWith(
        {
          username: 'newuser',
          password: 'supersecret',
          passwordConfirmation: 'supersecret',
        },
        expect.anything() // Formik bag
      );
    });
  });
});
