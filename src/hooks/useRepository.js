import { useQuery } from "@apollo/client";
import { GET_REPO } from "../graphql/queries";
const useRepository = ({ id }) => {
  const { loading, error, data, refetch } = useQuery(GET_REPO, {
    fetchPolicy: "cache-and-network",
    variables: { id },
  });
  if (loading) return [];
  if (error) {
    return [];
  }
  return data;
};

export default useRepository;