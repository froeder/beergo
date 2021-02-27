import React from "react";
import { NavigationProp } from "@react-navigation/native";
import { Button, TextInput } from "react-native-paper";
import { StatusBar } from "expo-status-bar";
import {
    View,
    Text
} from "react-native";
import styles from "./styles";
import {
    getUser,
    auth,
    savePost
} from "../../../components/Firebase/firebase";
import colors from "../../../utils/colors";
import moment from "moment";

export default class PostarScreen extends React.PureComponent<Props, State> {
    constructor(props: Props) {
        super(props);
        this.state = {
            user: {},
            email: auth.currentUser.email,
            post: "",
            created_at: moment().format(),
            loading: false,
            likes: 0,
            comments: 0,
            deleted_at: "null"
        };
    }


    post = async () => {
        this.setState({ loading: true })
        let save = await savePost(this.state);
        if (save) {
            this.props.navigation.navigate("Comunidade");
        } else {
            alert("Erro tente novamente mais tarde")
        }
    }

    async componentDidMount() {
        // await this.retrieve(auth.currentUser.email);
        const user = this.props.route.params.user
        this.setState({
            user: user.nome,
            email: user.email,
        });
    }

    render() {
        return (
            <>
                <StatusBar />

                <View style={styles.addPost}>
                    <TextInput
                        label="Publicação"
                        multiline
                        numberOfLines={4}
                        mode="outlined"
                        value={this.state.post}
                        onChangeText={(text) => {
                            this.setState({ post: text })
                        }}
                    />
                    <Button
                        color={colors.secondary}
                        mode="contained"
                        style={styles.publicarButton}
                        onPress={() => this.post()}
                        loading={this.state.loading}
                        disabled={this.state.loading}
                    >
                        <Text>Publicar</Text>
                    </Button>
                </View>

            </>
        );
    }
}

type State = {
    user: any;
    email: string;
    post: string,
    created_at: Date;
    deleted?: string;
    loading: boolean;
    likes: number;
    comments: number;
    deleted_at: string
};

type rotas = {
    Comunidade: 'Comunidade',
    Perfil: 'Perfil',
    Pontos: 'Pontos'
}

type Props = {
    navigation: NavigationProp<rotas>;
    user: any;
};
