/* eslint-disable no-undef */
import React from 'react';
import { render, screen } from '@testing-library/react-native';
import { SingleRepositoryContainer } from '../components/SingleRepository';

const repository = {
  id: 'repo1',
  fullName: 'jaredpalmer.formik',
  description: 'Build forms in React, without tears',
  language: 'TypeScript',
  forksCount: 1200,
  stargazersCount: 5700,
  reviewCount: 10,
  ratingAverage: 88,
  ownerAvatarUrl: 'https://example.com/avatar.png',
  url: 'https://github.com/jaredpalmer/formik',
  reviews: {
    edges: [
      {
        node: {
          id: 'review1',
          text: 'Great library!',
          rating: 95,
          createdAt: '2022-01-15T12:00:00Z',
          user: { id: 'user1', username: 'user1' },
        },
      },
      {
        node: {
          id: 'review2',
          text: 'Very useful!',
          rating: 85,
          createdAt: '2022-02-10T12:00:00Z',
          user: { id: 'user2', username: 'user2' },
        },
      },
    ],
  },
};

describe('SingleRepositoryContainer', () => {
  it('renders reviews correctly', () => {
    render(<SingleRepositoryContainer repository={repository} />);
    
    // First review
    expect(screen.getByText('user1')).toBeTruthy();
    expect(screen.getByText('15.01.2022')).toBeTruthy();
    expect(screen.getByText('Great library!')).toBeTruthy();
    expect(screen.getByText('95')).toBeTruthy();

    // Second review
    expect(screen.getByText('user2')).toBeTruthy();
    expect(screen.getByText('10.02.2022')).toBeTruthy();
    expect(screen.getByText('Very useful!')).toBeTruthy();
    expect(screen.getByText('85')).toBeTruthy();
  });
});
