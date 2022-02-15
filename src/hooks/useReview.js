import { useMutation } from "@apollo/client";
import { REVIEW } from "../graphql/mutations";
import { useApolloClient } from "@apollo/client";
const useReview = () => {
  const [mutate, result] = useMutation(REVIEW);
  const review = async ({ repositoryName, ownerName, rating, text }) => {
    try {
        console.log(repositoryName, ownerName, rating, text);
      const response = await mutate({
        variables: {
          repositoryName,
          ownerName,
          rating,
          text,
        },
      });
      return response;
    } catch (e) {
      console.log("error", e);
      console.log(result.error);

    }
  };
  return [review, result];
};

export default useReview;