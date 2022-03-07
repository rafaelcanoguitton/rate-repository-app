import { useQuery } from "@apollo/client";
import { GET_REPOSITORIES } from "../graphql/queries";
const useRepositories = (orderBy, direction, searchKeyword,first) => {
  const { loading, data, fetchMore, ...result } = useQuery(GET_REPOSITORIES, {
    variables: {
      orderBy: orderBy,
      orderDirection: direction,
      searchKeyword: searchKeyword,
      first: first,
    },
    fetchPolicy: "cache-and-network",
  });
  const handleFetchMore = () => {
    const canFetchMore = !loading && data?.repositories.pageInfo.hasNextPage;
    if (!canFetchMore) return;
    fetchMore({
      variables: {
        after: data.repositories.pageInfo.endCursor,
        orderBy: orderBy,
        orderDirection: direction,
        searchKeyword: searchKeyword,
        first: first,
      },
    });
  };
  return { repositories: data?.repositories, fetchMore: handleFetchMore, loading, ...result };
};

export default useRepositories;
