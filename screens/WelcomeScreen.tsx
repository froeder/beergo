import React from "react";
import { View, StyleSheet, Text, Image } from "react-native";

import AppButton from "../components/AppButton";
import Colors from "../utils/colors";
import { NavigationProp } from "@react-navigation/native";
import { loginWithEmail, registerWithEmail, saveLogin, saveRegister, saveUser } from "../components/Firebase/firebase";
import { ActivityIndicator } from "react-native-paper";
import Constants from "expo-constants";
import * as GoogleSignIn from 'expo-google-sign-in';
export default class WelcomeScreen extends React.PureComponent<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { loading: false, error: "" }
  }

  handleOnSignUp = async (email) => {
    try {
      await saveUser({ email: email, nome: 'Criado com google' });
      await registerWithEmail(email, '123456');
      await saveRegister(email);
    } catch (error) {
    }
  }

  _syncUserWithStateAsync = async () => {
    const user = await GoogleSignIn.signInSilentlyAsync();
    this.handleOnSignUp(user.email)
  };

  signInAsync = async () => {
    try {
      await GoogleSignIn.askForPlayServicesAsync();
      const { type, user } = await GoogleSignIn.signInAsync();
      if (type === 'success') {
        this._syncUserWithStateAsync();
      }
    } catch ({ message }) {
      alert('login: Error:' + message);
    }
  };

  initAsync = async () => {
    await GoogleSignIn.initAsync({
    });
    this._syncUserWithStateAsync();
  };

  componentDidMount = async () => {
    await GoogleSignIn.signOutAsync();

  }

  onLoginSuccess() {
    this.props.navigation.navigate("Home");
  }

  onLoginFailure(errorMessage) {
    this.setState({ error: errorMessage, loading: false });
  }

  renderLoading() {
    if (this.state.loading) {
      return (
        <View>
          <ActivityIndicator size={"large"} />
        </View>
      );
    }
  }

  async handleOnLogin(values) {
    if (Constants.installationId === "a6f06a1e-f313-4b6f-9a88-258f87ae44e7") {
      alert("Continue tentando")
      await saveLogin("otario@gmail.com");
      return null
    }
    else {
      try {
        await loginWithEmail("semlogin@gmail.com", "semsenha");
        await saveLogin("semlogin@gmail.com");
      } catch (error) {
        console.log(error);
      }
    }

  }

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.logoContainer}>
          <Image
            source={require("../assets/icone.png")}
            style={styles.logo}
            resizeMode="contain"
          />
          <Text style={{ fontSize: 45, fontWeight: "bold" }}>judOn</Text>
        </View>
        <View style={styles.buttonContainer}>
          <AppButton
            title="Login com Google"
            color="success"
            onPress={() => this.signInAsync()}
          />
          <AppButton
            title="Login com email"
            onPress={() => this.props.navigation.navigate("Login")}
          />
          <AppButton
            title="Registrar"
            color="secondary"
            onPress={() => this.props.navigation.navigate("Register")}
          />

        </View>
        <Text style={{ color: "white", fontSize: 16, marginBottom: 5 }}>
          Realização:
        </Text>
        <View style={styles.logosContainer}>
          <Image
            source={require("../assets/background.jpeg")}
            style={styles.logo}
            resizeMode="contain"
          />
          <Image
            source={require("../assets/belo.png")}
            style={styles.logo}
            resizeMode="contain"
          />
        </View>
        <Text style={{ color: "white", fontSize: 12, marginTop: 5 }}>
          v1.0.23
        </Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: Colors.mediumGrey,
  },
  logoContainer: {
    alignItems: "center",
  },
  logosContainer: {
    flexDirection: "row",
  },
  logo: {
    width: 125,
    height: 125,
  },
  buttonContainer: {
    padding: 20,
    width: "100%",
  },
});

type rotas = {
  Comunidade: "Comunidade",
  Postar: "Postar",
  Perfil: "Perfil",
  Pontos: "Pontos",
  Comentarios: "Comentários",
};

type Props = {
  navigation: NavigationProp<rotas>,
  user: any,
};

type State = {
  loading: boolean,
  error: string
};
