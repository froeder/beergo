
import React, { useState, useCallback, useEffect } from "react";
import { View, FlatList, Share, ActivityIndicator, Dimensions, Text, Image, AsyncStorage, Alert, ScrollView } from 'react-native';
import AppHeader from './AppHeader';
import styles from './styles';
import * as track from "../../services/amplitude";
import { Updates } from "expo";
import { NavigationProp } from '@react-navigation/native';
import YoutubePlayer from "react-native-youtube-iframe";
import { Button } from "react-native-paper"
import { TouchableOpacity } from "react-native-gesture-handler";
import colors from "../../utils/colors";

export default class HomeScreen extends React.Component<Props, State>{
  constructor(props: Props) {
    super(props)
    this.state = {
      home: { texto: '' },
      isReady: false,
      buttonVisible: false,
      playing: false,
      playingWelcome: false,
      isReadyWelcome: false
    }
  }

  onStateChange = (state) => {
    if (state === "ended") {
      this.setState({ playing: false })
    }
  };

  onStateChangeWelcome = (state) => {
    if (state === "ended") {
      this.setState({ playingWelcome: false })
    }
  };

  _fetchUpdate = async () => {
    let _IsFirstLoad = true;

    if (__DEV__) return;

    const result = await AsyncStorage.getItem("firstLoad");

    if (result) {
      _IsFirstLoad = false;
    }

    await AsyncStorage.setItem("firstLoad", "loaded");

    var update = await Updates.checkForUpdateAsync();

    if (!update.isAvailable) return;

    var downloadUpdate = await Updates.fetchUpdateAsync();

    if (downloadUpdate.isNew && _IsFirstLoad) {
      return Updates.reloadAsync();
    }

    if (downloadUpdate.isNew) {
      this.setState({ buttonVisible: true });
    }

  };

  handleShare = async () => {
    try {
      const result = await Share.share({
        message: "Olha só esse aplicativo que legal, nele você terá aulas de judô e karatê de graça!!! https://play.google.com/store/apps/details?id=com.froeder.judon",
      });
    } catch (error) {
      alert("Oops, houve um erro, tente novamente em instantes");
    }
  };

  _unsubscribe = (): void => { };

  componentWillUnmount() {
    this._unsubscribe();
  }

  async componentDidMount() {
    this._fetchUpdate()
    track.logEvent('Home');
    this._unsubscribe = this.props.navigation.addListener("focus", () => {
      this._fetchUpdate()
    });
  }

  render() {
    const image = require("../../assets/background.jpeg");
    const windowHeight = Dimensions.get('window').height;
    const windowWidth = Dimensions.get('window').width;

    return (
      <>
        <AppHeader title="Home" navigation={this.props.navigation} />
        <ScrollView>
          <>
            <View style={styles.container}>
              <Text style={styles.texto}>
                Queremos te conhecer, resposda esse questionário, não leva mais do que 30 segundos.
              </Text>
              <Button
                style={styles.buttonQuestao}
                color={colors.success}
                onPress={() => this.props.navigation.navigate("Questionário")}
              >
                <Text style={{ ...styles.texto, color: 'white' }}>Responder</Text>
              </Button>
            </View>
            <View style={styles.container}>
              <Text style={styles.texto}>
                É novo por aqui? Se não for também não tem problemas, o Sensei tem um recadinho para todos vocês. Obrigado por estarem aqui!
              </Text>
            </View>
            <YoutubePlayer
              height={225}
              play={this.state.playingWelcome}
              videoId={"TfjnFvULMlE"}
              onChangeState={(state) => this.onStateChangeWelcome(state)}
            />
            <View style={styles.container}>
              <Text style={styles.titulo}>
                Está gostando do aplicativo? Que tal compartilhar com seus amigos?
              </Text>
              <Button
                color={colors.white}
                contentStyle={styles.buttonShare}
                onPress={() => this.handleShare()}
              >
                <Text>Compartilhe</Text>
              </Button>
            </View>
            <View style={styles.container}>
              <Text
                style={styles.texto}>
                Confira nossa entrevista para o SBT interior que foi exibida no dia 01/01/2021
              </Text>
            </View>

            <YoutubePlayer
              height={225}
              play={this.state.playing}
              videoId={"0kQfSF_Rhqs"}
              onChangeState={(state) => this.onStateChange(state)}
            />


            <View style={{ ...styles.container, marginTop: 10 }}>
              <Image source={image} resizeMode="contain" style={{ width: windowWidth, height: 200 }} />
            </View>
            <View style={styles.container}>
              <Text
                style={styles.texto}
              >
                Versão 1.0.24
            </Text>
            </View>

          </>

        </ScrollView>
      </>
    );
  }
}

type rotas = {
  Golpes: 'Golpes',
  Aulas: 'Aulas',
  Pontos: 'Pontos'
  QuestionarioScreen: 'QuestionarioScreen'
}

type Props = {
  navigation: NavigationProp<rotas>
}

type State = {
  playing?: boolean;
  isReady?: boolean;
  playingWelcome?: boolean;
  isReadyWelcome?: boolean;
  home: { texto: string };
  buttonVisible: boolean;
}