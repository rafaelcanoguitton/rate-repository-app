import React from "react";
import { TextInput, Pressable, View, StyleSheet } from "react-native";
import Text from "./Text";
import { Formik, useField } from "formik";
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
  buttonText:{
    color: "white",
    fontSize: 20,
    fontWeight: "bold",    
  }
});
const initialValues = {
  username: "",
  password: "",
};
const SignInForm = ({ onSubmit }) => {
  const [username, usernameMeta, setUsername] = useField("username");
  const [password, passwordMeta, setPassword] = useField("password");
  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Username"
        value={username.value}
        onChangeText={(text) => setUsername.setValue(text)}
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        value={password.value}
        onChangeText={(text) => setPassword.setValue(text)}
      />
      <Pressable onPress={onSubmit} style={styles.button}>
        <Text style={styles.buttonText}>Sign In</Text>
      </Pressable>
    </View>
  );
};
const SignIn = () => {
  const onSubmit = (values) => {
    console.log(values);
  };
  return (
    <Formik initialValues={initialValues} onSubmit={onSubmit}>
      {({ handleSubmit }) => <SignInForm onSubmit={handleSubmit} />}
    </Formik>
  );
};

export default SignIn;
