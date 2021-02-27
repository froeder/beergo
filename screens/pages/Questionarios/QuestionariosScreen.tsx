import React, { useState } from "react";
import {
    View,
    ScrollView,
    Image,
    ActivityIndicator,
    Text,
    SafeAreaView,
    Dimensions,
} from "react-native";
import AppHeader from "./../AppHeader";
import styles from "./styles";
import * as track from "../../../services/amplitude";

import { getData } from "../../../components/Firebase/firebase";
import { Button } from "react-native-paper";

export default class QuestionarioScreen extends React.Component<Props, State> {
    constructor(props: Props) {
        super(props);
        this.state = {
            faixas: [
                { id: 1, faixa: "Não possuo graduação" },
                { id: 2, faixa: "Branca" },
                { id: 3, faixa: "Bordo" },
                { id: 4, faixa: "Cinza" },
                { id: 5, faixa: "Azul" },
                { id: 6, faixa: "Amarela" },
                { id: 7, faixa: "Laranja" },
                { id: 8, faixa: "Verde" },
                { id: 9, faixa: "Roxa" },
                { id: 10, faixa: "Marrom" },
                { id: 11, faixa: "Preta" },
            ]
        }
    }
    async componentDidMount() { }

    async andleSelect(item, i) {

    }

    render() {
        return (
            <>
                <AppHeader navigation={this.props.navigation} title="Questionário" />
                <ScrollView contentContainerStyle={styles.container}>
                    <Text style={styles.texto}>Qual sua graduação no Judô e/ou Karatê?</Text>
                    {this.state.faixas.forEach((item, i) => (
                        <View key={i} style={{ margin: 10 }}>
                            <Button mode="outlined" onPress={() => handleSelect(item, i)}>
                                {item}
                            </Button>
                        </View>
                    ))}
                </ScrollView>
            </>
        );
    }
}

type Props = {}

export type Faixa = {
    id: number;
    faixa: string
}

type State = {
    faixas: Array<Faixa>
}
