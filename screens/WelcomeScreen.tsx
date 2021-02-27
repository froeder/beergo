import React from "react";
import { View, StyleSheet, Text, Image, Button } from "react-native";

import AppButton from "../components/AppButton";
import Colors from "../utils/colors";
import { NavigationProp } from "@react-navigation/native";
import { loginWithEmail, registerWithEmail, saveLogin, saveRegister, saveUser } from "../components/Firebase/firebase";
import { ActivityIndicator } from "react-native-paper";
import Constants from "expo-constants";
import * as GoogleSignIn from 'expo-google-sign-in';
import colors from "../utils/colors";
export default class WelcomeScreen extends React.PureComponent<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { loading: false, error: "" }
  }

  handleOnSignUp = async (email) => {
    try {
      await saveUser({ email: email, nome: '' });
      await registerWithEmail(email, 'FroedeR201192');
      await saveRegister(email);
    } catch (error) {
      console.log("erro")
      console.log(error)
    }
  }

  _syncUserWithStateAsync = async () => {
    const user = await GoogleSignIn.signInSilentlyAsync();
    this.handleOnSignUp(user.email)
  };

  signInAsync = async () => {

    this.setState({ loading: true })
    this.handleOnSignUp("froeder3@gmail.com"); return
    try {
      await GoogleSignIn.askForPlayServicesAsync();
      const { type, user } = await GoogleSignIn.signInAsync();
      if (type === 'success') {
        this._syncUserWithStateAsync();
      }
    } catch ({ message }) {
      alert('login: Error:' + message);
      this.setState({ loading: false })
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
          <Text style={{ fontSize: 45, fontWeight: "bold", color: "white" }}>CerveJá</Text>
        </View>
        <View style={styles.buttonContainer}>
          {!this.state.loading ? (
            <Button
              title="Login com Google"
              color={colors.secondary}
              onPress={() => this.signInAsync()}
            />
          ) : (
              <ActivityIndicator color={colors.secondary} size={42} />
            )}

        </View>
        <View style={styles.logosContainer}>
          <Text style={{ color: "white", fontSize: 16, marginBottom: 5, textAlign: "center" }}>
            Realização:
          </Text>
          <Image
            source={require("../assets/belo.png")}
            style={styles.logo}
            resizeMode="contain"
          />
          <Text style={{ color: "white", fontSize: 12, marginTop: 5, textAlign: "center" }}>
            v1.0.0
        </Text>
        </View>

      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: Colors.primary,
  },
  logoContainer: {
    alignItems: "center",
  },
  logosContainer: {
    flexDirection: "column",
    bottom: 10,
    position: "absolute",
    justifyContent: "center"
  },
  logo: {
    width: 80,
    height: 80,
    alignSelf: "center"
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
