/* eslint-disable no-undef */
import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react-native';
import { ReviewFormContainer } from '../components/ReviewForm';

describe('ReviewFormContainer', () => {
  it('calls onSubmit with correct values', async () => {
    const onSubmit = jest.fn();

    const { getByTestId } = render(<ReviewFormContainer onSubmit={onSubmit} />);

    fireEvent.changeText(getByTestId('ownerName'), 'jaredpalmer');
    fireEvent.changeText(getByTestId('repositoryName'), 'formik');
    fireEvent.changeText(getByTestId('rating'), '88');
    fireEvent.changeText(getByTestId('text'), 'great lib');

    fireEvent.press(getByTestId('submitButton'));

    await waitFor(() => {
      expect(onSubmit).toHaveBeenCalledWith(
        {
          ownerName: 'jaredpalmer',
          repositoryName: 'formik',
          rating: '88',
          text: 'great lib',
        },
        expect.anything() // formik bag
      );
    });
  });
});
