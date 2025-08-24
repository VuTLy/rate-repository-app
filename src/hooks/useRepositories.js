import { useQuery } from '@apollo/client';
import { GET_REPOSITORIES } from '../graphql/queries';

const useRepositories = ({ orderBy, orderDirection, searchKeyword }) => {
  const { data, loading, refetch } = useQuery(GET_REPOSITORIES, {
    variables: { orderBy, orderDirection, searchKeyword },
    fetchPolicy: 'cache-and-network',
  });

  return {
    repositories: data
      ? data.repositories.edges.map(edge => edge.node)
      : [],
    loading,
    refetch,
  };
};

export default useRepositories;
