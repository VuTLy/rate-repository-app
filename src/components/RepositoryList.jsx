import React, { useState } from 'react';
import { FlatList, View, StyleSheet, Pressable, Text, TextInput } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { useDebounce } from 'use-debounce';
import { useNavigate } from 'react-router-native';
import useRepositories from '../hooks/useRepositories';
import RepositoryItem from './RepositoryItem';

const styles = StyleSheet.create({
  separator: { height: 10 },
  headerContainer: { padding: 10, backgroundColor: 'white' },
  searchInput: { borderWidth: 1, borderColor: '#ccc', padding: 5, borderRadius: 5, marginTop: 10 },
});

// Sorting config
const sortingOptions = {
  latest: { orderBy: 'CREATED_AT', orderDirection: 'DESC' },
  highest: { orderBy: 'RATING_AVERAGE', orderDirection: 'DESC' },
  lowest: { orderBy: 'RATING_AVERAGE', orderDirection: 'ASC' },
};

// Pure header component
export const RepositoryListHeader = ({
  selectedSort,
  setSelectedSort,
  searchKeyword,
  setSearchKeyword,
}) => (
  <View style={styles.headerContainer}>
    <Picker
      testID="picker"
      selectedValue={selectedSort}
      onValueChange={(value) => setSelectedSort(value)}
    >
      <Picker.Item label="Latest repositories" value="latest" />
      <Picker.Item label="Highest rated repositories" value="highest" />
      <Picker.Item label="Lowest rated repositories" value="lowest" />
    </Picker>

    <TextInput
      testID="searchInput"
      style={styles.searchInput}
      placeholder="Search repositories"
      value={searchKeyword}
      onChangeText={setSearchKeyword}
    />
  </View>
);

// Class-based list container to keep header stable
export class RepositoryListContainer extends React.Component {
  renderHeader = () => {
    const { selectedSort, setSelectedSort, searchKeyword, setSearchKeyword } = this.props;
    return (
      <RepositoryListHeader
        selectedSort={selectedSort}
        setSelectedSort={setSelectedSort}
        searchKeyword={searchKeyword}
        setSearchKeyword={setSearchKeyword}
      />
    );
  };

  render() {
    const { repositories, onPressRepository } = this.props;

    return (
      <FlatList
        data={repositories}
        ItemSeparatorComponent={() => <View style={styles.separator} />}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) =>
          onPressRepository ? (
            <Pressable testID={`pressable-${item.id}`} onPress={() => onPressRepository(item.id)}>
              <RepositoryItem testID="repositoryItem" item={item} />
            </Pressable>
          ) : (
            <RepositoryItem testID="repositoryItem" item={item} />
          )
        }
        ListHeaderComponent={this.renderHeader}
      />
    );
  }
}

// Main component with data fetching, sorting, search, and navigation
const RepositoryList = () => {
  const [selectedSort, setSelectedSort] = useState('latest');
  const [searchKeyword, setSearchKeyword] = useState('');
  const [debouncedSearch] = useDebounce(searchKeyword, 500);
  const navigate = useNavigate();

  const { orderBy, orderDirection } = sortingOptions[selectedSort];

  const { repositories, loading } = useRepositories({
    orderBy,
    orderDirection,
    searchKeyword: debouncedSearch,
  });

  if (loading) return <Text style={{ padding: 10 }}>Loading repositories...</Text>;

  const handlePressRepository = (id) => {
    navigate(`/repository/${id}`);
  };

  return (
    <RepositoryListContainer
      repositories={repositories}
      onPressRepository={handlePressRepository}
      selectedSort={selectedSort}
      setSelectedSort={setSelectedSort}
      searchKeyword={searchKeyword}
      setSearchKeyword={setSearchKeyword}
    />
  );
};

export default RepositoryList;
