import React from "react";
import { TextInput, Pressable, View, StyleSheet } from "react-native";
import Text from "./Text";
import { Formik, useField } from "formik";
import * as yup from "yup";
import useSignUp from "../hooks/useSignup";
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
  Username: "",
  Password: "",
  ConfirmPassword: "",
};
const validationSchema = yup.object().shape({
  Username: yup.string().required(),
  Password: yup.string().required(),
  ConfirmPassword: yup
    .string()
    .required()
    .oneOf([yup.ref("Password"), null], "Passwords must match"),
});
const FormikTextInput = ({ name, ...props }) => {
  const [field, meta, helpers] = useField(name);
  const showError = meta.touched && meta.error;
  return (
    <>
      <TextInput
        onChangeText={(value) => helpers.setValue(value)}
        onBlur={() => helpers.setTouched(true)}
        value={field.value}
        style={styles.input}
        {...props}
      />
      {showError && <Text style={styles.required}>{meta.error}</Text>}
    </>
  );
};
const SignUpForm = ({ onSubmit }) => {
  const [username, usernameMeta, setUsername] = useField("Username");
  const [password, passwordMeta, setPassword] = useField("Password");
  const [confirmPassword, confirmPasswordMeta, setConfirmPassword] =
    useField("ConfirmPassword");
  return (
    <View style={styles.container}>
      <FormikTextInput
        style={styles.input}
        placeholder="Username"
        value={username.value}
        onChangeText={(text) => setUsername.setValue(text)}
        name="Username"
        testID="username"
      />
      <FormikTextInput
        style={styles.input}
        secureTextEntry={true}
        placeholder="Password"
        value={password.value}
        onChangeText={(text) => setPassword.setValue(text)}
        name="Password"
        testID="password"
      />
      <FormikTextInput
        style={styles.input}
        secureTextEntry={true}
        placeholder="Confirm Password"
        value={confirmPassword.value}
        onChangeText={(text) => setConfirmPassword.setValue(text)}
        name="ConfirmPassword"
        testID="confirmPassword"
      />
      <Pressable onPress={onSubmit} style={styles.button} testID="submitButton">
        <Text style={styles.buttonText}>Sign Up</Text> 
      </Pressable>
    </View>
  );
};
export const SignUpContainer = ({ onSubmit }) => {
  return (
    <Formik
      initialValues={initialValues}
      onSubmit={onSubmit}
      validationSchema={validationSchema}
    >
      {({ handleSubmit }) => <SignUpForm onSubmit={handleSubmit} />}
    </Formik>
  );
};
const SignUp = () => {
  const [signUp] = useSignUp();
  const history = useHistory();
  const onSubmit = async (values) => {
    try {
      const { Username, Password } = values;
      await signUp({ username: Username, password: Password });
      history.push("/");
    } catch (error) {
      console.log(error);
    }
  };
  return <SignUpContainer onSubmit={onSubmit} />;
};
export default SignUp;
