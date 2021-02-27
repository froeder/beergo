import React, { useState } from "react";
import {
  StyleSheet,
  TouchableOpacity,
  Text,
  View,
  ActivityIndicator,
} from "react-native";
import * as Yup from "yup";

import Colors from "../utils/colors";
import SafeView from "../components/SafeView";
import Form from "../components/Forms/Form";
import FormField from "../components/Forms/FormField";
import FormButton from "../components/Forms/FormButton";
import IconButton from "../components/IconButton";
import { loginWithEmail, saveLogin } from "../components/Firebase/firebase";
import FormErrorMessage from "../components/Forms/FormErrorMessage";
import useStatusBar from "../hooks/useStatusBar";
import { NavigationProp } from "@react-navigation/native";

const validationSchema = Yup.object().shape({
  email: Yup.string()
    .required("Digite o e-mail cadastrado")
    .email()
    .label("E-mail"),
  password: Yup.string()
    .required()
    .min(6, "A senha deve ter 6 caracteres ou mais")
    .label("Senha"),
});

export default function LoginScreen({ navigation }) {
  useStatusBar("light-content");

  const [passwordVisibility, setPasswordVisibility] = useState(true);
  const [rightIcon, setRightIcon] = useState("eye");
  const [loginError, setLoginError] = useState("");
  const [loading, setLoading] = useState(false);

  function handlePasswordVisibility() {
    if (rightIcon === "eye") {
      setRightIcon("eye-off");
      setPasswordVisibility(!passwordVisibility);
    } else if (rightIcon === "eye-off") {
      setRightIcon("eye");
      setPasswordVisibility(!passwordVisibility);
    }
  }

  async function handleOnLogin(values) {
    const { email, password } = values;
    setLoading(true);
    try {
      await loginWithEmail(email, password);
      await saveLogin(email);
      setLoading(false);
    } catch (error) {
      setLoginError(error.message);
      setLoading(false);
    }
  }

  return (
    <SafeView style={styles.container}>
      <Form
        initialValues={{ email: "", password: "" }}
        validationSchema={validationSchema}
        onSubmit={(values) => handleOnLogin(values)}
      >
        <FormField
          name="email"
          leftIcon="email"
          placeholder="Digite o email"
          autoCapitalize="none"
          keyboardType="email-address"
          textContentType="emailAddress"
          autoFocus={true}
        />
        <FormField
          name="password"
          leftIcon="lock"
          placeholder="Digite a senha"
          autoCapitalize="none"
          autoCorrect={false}
          secureTextEntry={passwordVisibility}
          textContentType="password"
          rightIcon={rightIcon}
          handlePasswordVisibility={handlePasswordVisibility}
        />
        {loading ? (
          <ActivityIndicator size={42} />
        ) : (
            <FormButton title={"Login"} />
          )}

        {<FormErrorMessage error={loginError} visible={true} />}
      </Form>
      <View style={styles.footerButtonContainer}>
        <TouchableOpacity onPress={() => navigation.navigate("ForgotPassword")}>
          <Text style={styles.forgotPasswordButtonText}>Esqueceu a senha?</Text>
        </TouchableOpacity>
      </View>
      <IconButton
        style={styles.backButton}
        iconName="keyboard-backspace"
        color="#fff"
        size={30}
        onPress={() => navigation.goBack()}
      />
    </SafeView>
  );
}

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    padding: 15,
    backgroundColor: Colors.mediumGrey,
  },
  footerButtonContainer: {
    marginVertical: 15,
    justifyContent: "center",
    alignItems: "center",
  },
  forgotPasswordButtonText: {
    color: Colors.white,
    fontSize: 18,
    fontWeight: "600",
  },
  backButton: {
    justifyContent: "center",
    alignItems: "center",
  },
});

type rotas = {
  Comunidade: "Comunidade";
  Postar: "Postar";
  Perfil: "Perfil";
  Pontos: "Pontos";
  Comentarios: "Comentários";
};

type Props = {
  navigation: NavigationProp<rotas>;
  user: any;
};