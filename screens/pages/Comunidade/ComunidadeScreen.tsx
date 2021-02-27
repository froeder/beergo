import React from "react";
import { NavigationProp } from "@react-navigation/native";
import { Button } from "react-native-paper";
import { StatusBar } from "expo-status-bar";
import { View, FlatList, Text, RefreshControl } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import styles from "./styles";
import {
    getUser,
    auth,
    getPosts,
    saveLike,
    removePost,
    saveCutida,
    logout,
} from "../../../components/Firebase/firebase";
import colors from "../../../utils/colors";
import moment from "moment/min/moment-with-locales";
import Ionicons from "react-native-vector-icons/Ionicons";
import * as track from "../../../services/amplitude";
moment.locale("pt-br");

export default class ComunidadeScreen extends React.PureComponent<
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
            posts: [],
            modal: true,
            liked: false,
        };
    }

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

    getPost = async () => {
        this.setState({ loading: true });
        await getPosts().then((response) => {
            this.setState({ posts: response });
        });
        this.setState({ loading: false });
    };

    getPostWithoutLoading = async () => {
        await getPosts().then((response) => {
            this.setState({ posts: response });
        });
    };

    onpressComentar = async (post) => {
        this.props.navigation.navigate("Comentários", {
            post: post,
            user: {
                user: this.state.user,
                nome: this.state.nome,
                email: this.state.email,
            },
        });
    };

    onpressCurtir = async (post) => {
        if (!this.state.liked) {
            saveLike(post, this.state.user.email).then(async () => {
                //await this.getPostWithoutLoading();
                post.likes = post.likes + 1;
            });

            await saveCutida(this.state.email, this.state.nome, post.identificador);
            this.setState({ liked: true });
        }
    };

    async componentDidMount() {
        this.getPost();
        await this.retrieve(auth.currentUser.email);

        track.logEvent("Publicacoes");
    }

    remove = async (item) => {
        await removePost(item);
        await this.getPost();
    };

    renderItem = ({ item }) => {
        return (
            <View style={styles.posts}>
                <View
                    style={{
                        flexDirection: "row",
                        flex: 1,
                        justifyContent: "space-between",
                    }}
                >
                    <Text style={styles.user}>{item.user}</Text>
                    {item.email == auth.currentUser.email && (
                        <TouchableOpacity
                            onPress={async () => {
                                await this.remove(item);
                            }}
                        >
                            <Ionicons name="ios-trash" size={30} color={colors.red} />
                        </TouchableOpacity>
                    )}
                </View>

                <Text style={styles.data}>{moment(item.created_at).fromNow()}</Text>
                <Text style={styles.post}>{item.post}</Text>
                <View style={styles.commentsContainer}>
                    <View style={styles.iconContainer}>
                        <Ionicons name="ios-heart" size={20} />
                        <Text>{item.likes} curtidas</Text>
                    </View>
                    <TouchableOpacity
                        style={styles.iconContainerComment}
                        style={styles.iconContainerComment}
                        onPress={() => {
                            this.onpressComentar(item);
                        }}
                    >
                        <Ionicons name="ios-chatboxes" size={20} />
                        <Text style={{ marginLeft: 10 }}>{item.comments} comentários</Text>
                    </TouchableOpacity>
                </View>
                <View style={styles.separator} />
                <View style={styles.commentsContainer}>
                    <TouchableOpacity
                        onPress={() => {
                            this.onpressCurtir(item);
                            track.logEvent("Curtir", { user: auth.currentUser.email });
                        }}
                    >
                        <Text style={styles.action}>Curtir</Text>
                    </TouchableOpacity>
                    {this.state.email !== "semlogin@gmail.com" && (
                        <TouchableOpacity
                            onPress={() => {
                                this.onpressComentar(item);
                            }}
                        >
                            <Text style={styles.action}>Comentar</Text>
                        </TouchableOpacity>
                    )}
                </View>
            </View>
        );
    };

    renderCrieConta = (): React.ReactNode => {
        return (
            <TouchableOpacity
                onPress={async () => {
                    await logout();
                }}
                style={styles.header}
            >
                <Text style={styles.updatePerfil}>Crie sua conta</Text>
            </TouchableOpacity>
        );
    };

    renderHeader = () => {
        return (
            <>
                {this.state.email === "semlogin@gmail.com" ? (
                    <>{this.renderCrieConta()}</>
                ) : (
                        <TouchableOpacity
                            onPress={() => this.props.navigation.navigate("Perfil")}
                            style={styles.header}
                        >
                            <>
                                {this.state.nome != "" ? (
                                    <>
                                        <Text style={{ color: colors.white }}>Usuário</Text>
                                        <Text style={styles.nome}>{this.state.nome}</Text>
                                    </>
                                ) : (
                                        <Text style={styles.updatePerfil}>Atualize seu perfil</Text>
                                    )}
                            </>
                        </TouchableOpacity>
                    )}

                {this.state.nome != "" && this.state.email !== "semlogin@gmail.com" && (
                    <Button
                        onPress={() =>
                            this.props.navigation.navigate("Postar", {
                                user: {
                                    user: this.state.user,
                                    nome: this.state.nome,
                                    email: this.state.email,
                                },
                            })
                        }
                        style={styles.postar}
                        color={colors.secondary}
                        mode="contained"
                    >
                        <Text style={styles.buttonPost}>Postar</Text>
                    </Button>
                )}
            </>
        );
    };

    renderEmpty = () => {
        return (
            <View style={styles.centered}>
                <Text style={{ fontSize: 20 }}>Ainda não há publicações</Text>
            </View>
        );
    };

    render() {
        return (
            <>
                <StatusBar />
                {/* <View style={{ justifyContent: "center", flex: 1, alignItems: "center" }}>
                    <Text>Em manutenção</Text>
                </View> */}
                <FlatList
                    refreshControl={
                        <RefreshControl
                            refreshing={this.state.loading}
                            onRefresh={() => this.getPost()}
                        />
                    }
                    style={{ backgroundColor: colors.postGrey }}
                    data={this.state.posts}
                    renderItem={this.renderItem}
                    ListHeaderComponent={this.renderHeader}
                    ListEmptyComponent={this.renderEmpty}
                    keyExtractor={(item) => item.created_at}
                />
            </>
        );
    }
}

type State = {
    user: any;
    email: string;
    nome: string;
    loading: boolean;
    posts: Array<any>;
    modal: boolean;
    liked: boolean;
};

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
