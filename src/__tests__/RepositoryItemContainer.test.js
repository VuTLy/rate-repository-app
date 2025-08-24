/* eslint-disable no-undef */
import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react-native';
import { RepositoryItemContainer } from '../components/RepositoryItem';

const sampleItem = {
  id: '1',
  fullName: 'jaredpalmer/formik',
  description: 'Build forms in React, without tears',
  language: 'TypeScript',
  forksCount: 1234,
  stargazersCount: 5678,
  ratingAverage: 88,
  reviewCount: 42,
  ownerAvatarUrl: 'https://avatars.githubusercontent.com/u/4060187?v=4',
  url: 'https://github.com/jaredpalmer/formik',
};

describe('RepositoryItemContainer', () => {
  it('renders repository information correctly', () => {
    render(<RepositoryItemContainer item={sampleItem} />);

    expect(screen.getByText(sampleItem.fullName)).toBeTruthy();
    expect(screen.getByText(sampleItem.description)).toBeTruthy();
    expect(screen.getByText(sampleItem.language)).toBeTruthy();
    expect(screen.getByText('5.7k')).toBeTruthy(); // stargazersCount formatted
    expect(screen.getByText('1.2k')).toBeTruthy(); // forksCount formatted
    expect(screen.getByText(String(sampleItem.ratingAverage))).toBeTruthy();
    expect(screen.getByText(String(sampleItem.reviewCount))).toBeTruthy();
  });

  it('renders GitHub button when showGitHubButton is true', () => {
    const onPressMock = jest.fn();
    render(
      <RepositoryItemContainer
        item={sampleItem}
        showGitHubButton={true}
        onPressGitHub={onPressMock}
      />
    );

    const button = screen.getByText('Open in GitHub');
    expect(button).toBeTruthy();

    fireEvent.press(button);
    expect(onPressMock).toHaveBeenCalledTimes(1);
  });

  it('does not render GitHub button when showGitHubButton is false', () => {
    render(<RepositoryItemContainer item={sampleItem} />);

    const button = screen.queryByText('Open in GitHub');
    expect(button).toBeNull();
  });
});
