import React from "react";
import { NavigationProp, RouteProp } from "@react-navigation/native";
import { StatusBar } from "expo-status-bar";
import { View, FlatList, Text, RefreshControl } from "react-native";
import styles from "./styles";
import {
    getUser,
    auth,
    getComments,
    saveLike,
    saveComment,
    removeComment,
} from "../../../components/Firebase/firebase";
import colors from "../../../utils/colors";
import moment from "moment/min/moment-with-locales";
import { Button, TextInput } from "react-native-paper";
import { TouchableOpacity } from "react-native-gesture-handler";
import Ionicons from "react-native-vector-icons/Ionicons";

moment.locale("pt-br");

export default class ComentariosScreen extends React.PureComponent<
    Props,
    State
    > {
    constructor(props: Props) {
        super(props);
        this.state = {
            user: {},
            email: undefined,
            nome: "",
            loading: false,
            comentarios: [],
            modal: true,
            comentario: "",
        };
    }

    // _unsubscribe = (): void => { };

    // componentWillUnmount() {
    //     this._unsubscribe();
    // }

    retrieve = async (email) => {
        let dados = await getUser(email);
        if (dados) {
            this.setState({
                user: dados,
                email: dados.email,
                nome: dados.nome,
            });
        } else {
            return;
        }
    };

    getComment = async (identificador) => {
        this.setState({ loading: true });
        await getComments(identificador).then((response) => {
            this.setState({ comentarios: response });
        });
        this.setState({ loading: false });
    };

    async componentDidMount() {
        const post = this.props.route.params.post;
        const user = this.props.route.params.user
        this.getComment(post.identificador);
        this.setState({
            user: user.user,
            email: user.email,
            nome: user.nome,
        });
    }

    remove = async (item) => {
        await removeComment(item);
        await this.getComment(item.post_id);
    };

    renderItem = ({ item }) => {
        console.log(item);
        return (
            <View style={styles.comments}>
                <View
                    style={{
                        flexDirection: "row",
                        flex: 1,
                        justifyContent: "space-between",
                    }}
                >
                    <Text style={styles.user}>{item.nome}</Text>
                    {item.user == auth.currentUser.email && (
                        <TouchableOpacity
                            onPress={async () => {
                                await this.remove(item);
                            }}
                        >
                            <Ionicons name="ios-trash" size={30} color={colors.red} />
                        </TouchableOpacity>
                    )}
                </View>
                <Text style={styles.dataComment}>
                    {moment(item.created_at).fromNow()}
                </Text>
                <Text style={styles.comment}>{item.comentario}</Text>
            </View>
        );
    };

    renderEmpty = () => {
        return (
            <View style={styles.centered}>
                <Text
                    style={{
                        alignSelf: "center",
                        fontSize: 22,
                        padding: 10,
                        textAlign: "center",
                    }}
                >
                    Não há comentários nessa publicação, que tal fazer um?
                 </Text>
            </View>
        );
    };

    comentar = async (dados) => {
        let comentario = {
            post_id: this.props.route.params.post.identificador,
            created_at: moment().format(),
            user: dados.user.email,
            nome: dados.user.nome,
            comentario: dados.comentario,
            deleted_at: "null",
            identificador: dados.user.email + moment().format(),
        };
        await saveComment(comentario).then(() => {
            this.setState({ comentario: "" });
            this.getComment(comentario.post_id);
        });
    };

    render() {
        return (
            <>
                <StatusBar />
                <FlatList
                    refreshControl={
                        <RefreshControl
                            refreshing={this.state.loading}
                            onRefresh={() =>
                                this.getComment(this.props.route.params.post.identificador)
                            }
                        />
                    }
                    style={{ backgroundColor: colors.postGrey }}
                    data={this.state.comentarios}
                    renderItem={this.renderItem}
                    ListEmptyComponent={this.renderEmpty}
                    keyExtractor={(item) => item.created_at}
                />
                <View style={styles.comentar}>
                    <TextInput
                        label="Comentário"
                        multiline
                        mode="outlined"
                        value={this.state.comentario}
                        onChangeText={(text) => {
                            this.setState({ comentario: text });
                        }}
                        style={{ width: "100%" }}
                    />
                    <Button
                        mode="contained"
                        color={colors.secondary}
                        onPress={() => this.comentar(this.state)}
                    >
                        Comentar
          </Button>
                </View>
            </>
        );
    }
}

type State = {
    user: any;
    email: string;
    nome: string;
    loading: boolean;
    comentarios: Array<any>;
    modal: boolean;
    comentario: string;
};

type rotas = {
    Comunidade: "Comunidade";
    Postar: "Postar";
    Perfil: "Perfil";
    Pontos: "Pontos";
    Comentarios: "Comentarios";
};

type Props = {
    navigation: NavigationProp<rotas>;
    route: RouteProp<any, "ComentariosScreen">;
    user: any;
};
