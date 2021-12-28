import { useMutation } from "@apollo/client";
import AUTHORIZE from "../graphql/mutations";
const useSignIn = () => {
  const [mutate, result] = useMutation(AUTHORIZE);
  const signIn = async ({ username, password }) => {
    try {
      const response = await mutate({
        variables: {
          username,
          password,
        },
      });
      return response;
    } catch (e) {
      console.log("error", e);
    }
  };
  return [signIn, result];
};

export default useSignIn;
