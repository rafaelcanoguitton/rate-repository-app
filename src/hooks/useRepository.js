import { useQuery } from "@apollo/client";
import { GET_REPO } from "../graphql/queries";
const useRepository = ({ id, first }) => {
  const { loading, data, fetchMore, ...result } = useQuery(GET_REPO, {
    variables: { id: id, first: first },
    fetchPolicy: "cache-and-network",
  });
  const handleFetchMore = () => {
    const canFetchMore = !loading && data?.repository.reviews.pageInfo.hasNextPage;
    if (!canFetchMore) return;
    fetchMore({
      variables: {
        after: data.repository.reviews.pageInfo.endCursor,
        first: first,
        id: id,
      },
    });
  };
  return {
    repository: data?.repository,
    fetchMore: handleFetchMore,
    loading,
    ...result,
  };
};

export default useRepository;
