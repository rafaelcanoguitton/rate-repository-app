import { useQuery } from "@apollo/client";
import { GET_CURRENT_USER } from "../graphql/queries";
const useMe = () => {
    const { loading, data, error,refetch } = useQuery(GET_CURRENT_USER,{
        fetchPolicy: "cache-and-network"
    });
    return { loading, data, error,refetch };
};
export default useMe;