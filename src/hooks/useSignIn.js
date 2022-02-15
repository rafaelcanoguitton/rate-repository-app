import { useMutation } from "@apollo/client";
import {AUTHORIZE} from "../graphql/mutations";
import useAuthStorage from "./useAuthStorage";
import { useApolloClient } from "@apollo/client";
const useSignIn = () => {
  const authStorage = useAuthStorage();
  const [mutate, result] = useMutation(AUTHORIZE);
  const apolloClient = useApolloClient();
  const signIn = async ({ username, password }) => {
    try {
      const response = await mutate({
        variables: {
          username,
          password,
        },
      });
      await authStorage.setAccessToken(response.data.authorize.accessToken);
      await apolloClient.resetStore();
      return response;
    } catch (e) {
      console.log("error", e);
    }
  };
  return [signIn, result];
};

export default useSignIn;
