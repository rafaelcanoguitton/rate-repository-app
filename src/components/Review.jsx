import React from "react";
import { TextInput, Pressable, View, StyleSheet } from "react-native";
import Text from "./Text";
import { Formik, useField } from "formik";
import * as yup from "yup";
import useReview from "../hooks/useReview";
import { useHistory } from "react-router-native";
const styles = StyleSheet.create({
  container: {
    padding: 20,
    flexDirection: "column",
    justifyContent: "center",
  },
  input: {
    borderWidth: 1,
    borderColor: "black",
    padding: 10,
    marginBottom: 10,
    borderRadius: 5,
  },
  button: {
    padding: 20,
    marginBottom: 10,
    alignItems: "center",
    backgroundColor: "#0366d6",
    borderRadius: 5,
  },
  buttonText: {
    color: "white",
    fontSize: 20,
    fontWeight: "bold",
  },
  required: {
    color: "red",
  },
});
const initialValues = {
  RepositoryOwner: "",
  RepositoryName: "",
  Rating: "",
  Review: "",
};
const validationSchema = yup.object().shape({
  RepositoryOwner: yup.string().required(),
  RepositoryName: yup.string().required(),
  Rating: yup.number().min(0).max(100).required(),
  Review: yup.string().required(),
});
const FormikTextInput = ({ name, ...props }) => {
  const [field, meta, helpers] = useField(name);
  const showError = meta.touched && meta.error;
  return (
    <>
      <TextInput
        onChange={(value) => helpers.setValue(value)}
        onBlur={() => helpers.setTouched(true)}
        value={field.value}
        style={styles.input}
        {...props}
      />
      {showError && <Text style={styles.required}>{meta.error}</Text>}
    </>
  );
};
const ReviewForm = ({ onSubmit }) => {
  const [repositoryOwner, repositoryOwnerMeta, setRepositoryOwner] =
    useField("RepositoryOwner");
  const [repositoryName, repositoryNameMeta, setRepositoryName] =
    useField("RepositoryName");
  const [rating, ratingMeta, setRating] = useField("Rating");
  const [review, reviewMeta, setReview] = useField("Review");
  return (
    <View style={styles.container}>
      <FormikTextInput
        style={styles.input}
        placeholder="Repository Owner"
        value={repositoryOwner.value}
        onChangeText={(text) => setRepositoryOwner.setValue(text)}
        name="RepositoryOwner"
        testID="repositoryOwner"
      />
      <FormikTextInput
        style={styles.input}
        placeholder="Repository Name"
        value={repositoryName.value}
        onChangeText={(text) => setRepositoryName.setValue(text)}
        name="RepositoryName"
        testID="repositoryName"
      />
      <FormikTextInput
        style={styles.input}
        placeholder="Rating"
        value={rating.value}
        onChangeText={(text) => setRating.setValue(text)}
        name="Rating"
        testID="rating"
      />
      <FormikTextInput
        style={styles.input}
        placeholder="Review"
        value={review.value}
        onChangeText={(text) => setReview.setValue(text)}
        name="Review"
        testID="review"
      />
      <Pressable
        onPress={onSubmit}
        style={styles.button}
        testID="submitButton"
      >
        <Text style={styles.buttonText}>Submit</Text>
      </Pressable>
    </View>
  );
};
const ReviewContainer = ({ onSubmit }) => {
  return (
    <Formik
      initialValues={initialValues}
      onSubmit={onSubmit}
      validationSchema={validationSchema}
    >
      {({ handleSubmit }) => <ReviewForm onSubmit={handleSubmit} />}
    </Formik>
  );
};
const Review = () => {
  const [addReview] = useReview();
  const history = useHistory();
  const onSubmit = async (values) => {
    console.log("Values: ", values);
    try {
      const { RepositoryOwner, RepositoryName, Rating, Review } = values;
      const { data } = await addReview({
        ownerName: RepositoryOwner,
        repositoryName: RepositoryName,
        rating: parseInt(Rating),
        text: Review,
      });
      console.log(data);
      history.push("/repository/" + data.createReview.repositoryId);
    } catch (error) {
      console.log("Error: ", error);
    }
  };
  return <ReviewContainer onSubmit={onSubmit} />;
};
export default Review;