import { useMutation } from "@apollo/client";
import { DELETE_REVIEW } from "../graphql/mutations";
const useDeleteReview = () => {
    const [mutate, result] = useMutation(DELETE_REVIEW);
    const deleteReview = async ({ id }) => {
        try {
            const response = await mutate({
                variables: {
                    id: id,
                },
            });
            return response;
        } catch (e) {
            console.log("error", e);
        }
    };
    return [deleteReview, result];
};
export default useDeleteReview;