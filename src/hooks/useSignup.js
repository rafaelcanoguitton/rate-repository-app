import { useMutation } from "@apollo/client";
import { CREATE_USER } from "../graphql/mutations";
import useSignIn from "./useSignIn";
const useSignUp = () => {
  const [mutate, result] = useMutation(CREATE_USER);
  const [signIn] = useSignIn();
  const signUp = async ({ username, password }) => {
    try {
      const response = await mutate({
        variables: {
          username,
          password,
        },
      });
      await signIn({ username: username, password: password });
      return response;
    } catch (e) {
      console.log("error", e);
    }
  };
  return [signUp, result];
};

export default useSignUp;
