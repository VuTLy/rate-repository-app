/* eslint-disable no-undef */
import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import { RepositoryListContainer, RepositoryListHeader } from '../components/RepositoryList';

describe('RepositoryListHeader', () => {
  it('renders picker and search input, and calls handlers on change', () => {
    const setSelectedSort = jest.fn();
    const setSearchKeyword = jest.fn();

    const { getByTestId } = render(
      <RepositoryListHeader
        selectedSort="latest"
        setSelectedSort={setSelectedSort}
        searchKeyword=""
        setSearchKeyword={setSearchKeyword}
      />
    );

    // Picker exists and fires value change
    const picker = getByTestId('picker');
    expect(picker).toBeTruthy();
    fireEvent(picker, 'valueChange', 'highest');
    expect(setSelectedSort).toHaveBeenCalledWith('highest');
    fireEvent(picker, 'valueChange', 'lowest');
    expect(setSelectedSort).toHaveBeenCalledWith('lowest');

    // Search input exists and fires text change
    const searchInput = getByTestId('searchInput');
    expect(searchInput).toBeTruthy();
    fireEvent.changeText(searchInput, 'react');
    expect(setSearchKeyword).toHaveBeenCalledWith('react');
  });
});

describe('RepositoryListContainer', () => {
  const repositories = [
    { id: '1', fullName: 'repo/one' },
    { id: '2', fullName: 'repo/two' },
  ];

  it('renders the correct number of RepositoryItems', () => {
    const { getAllByTestId } = render(
      <RepositoryListContainer
        repositories={repositories}
        selectedSort="latest"
        setSelectedSort={() => {}}
        searchKeyword=""
        setSearchKeyword={() => {}}
      />
    );

    // Each RepositoryItem has testID="repositoryItem"
    const items = getAllByTestId('repositoryItem'); // just 'repositoryItem' instead of regex
    expect(items.length).toBe(repositories.length);
  });
});