
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
    const windowHeight = Dimensions.get('window').height;
    const windowWidth = Dimensions.get('window').width;

    return (
      <>
        <AppHeader title="Home" navigation={this.props.navigation} />
        <ScrollView>
          <>
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