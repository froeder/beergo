import React from 'react';
import { StyleSheet } from 'react-native';
import colors from '../../../utils/colors';

const styles = StyleSheet.create({
    container: {
        padding: 20,
        paddingTop: 20
    },
    texto: {
        fontSize: 20,
        paddingBottom: 10,
        color: colors.mediumGrey,
        lineHeight: 27
    },
    titulo: {
        fontSize: 28,
        paddingTop: 20,
        paddingBottom: 20,
        textAlign: 'center',
        fontWeight: 'bold',
        color: colors.primary
    },
    posts: {
        flex: 1,
        marginTop: 10,
        marginBottom: 10,
        padding: 20,
        backgroundColor: colors.white,
        borderRadius: 5,
        elevation: 5
    },
    comments: {
        flex: 1,
        marginTop: 10,
        marginBottom: 10,
        padding: 20,
        backgroundColor: colors.white,
        borderRadius: 5,
        elevation: 5
    },
    header: {
        backgroundColor: colors.primary,
        padding: 10,
        flex: 1
    },
    updatePerfil: {
        textAlign: "center",
        color: colors.white,
        fontSize: 25
    },
    nome: {
        color: colors.white,
        fontSize: 25
    },
    centered: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center"
    },
    postar: {
        margin: 10,
        borderRadius: 5,
        elevation: 10,
    },
    buttonPost: {
        textAlign: "center",
        color: colors.white,
        fontSize: 18,
    },
    user: {
        fontWeight: "bold",
        fontSize: 16,

    },
    post: {
        fontSize: 18,
        marginBottom: 30
    },
    comment: {
        fontSize: 18,
    },
    data: {
        marginBottom: 20
    },
    dataComment: {
        marginBottom: 5
    },
    commentsContainer: {
        flexDirection: "row",
        alignSelf: "center",
        justifyContent: "space-around",
        flex: 1,
        width: "100%",
        marginBottom: 10
    },
    action: {
        fontWeight: "bold"
    },
    addPost: {
        padding: 20,
        flex: 1
    },
    publicarButton: {
        position: "absolute",
        bottom: 20,
        width: "110%",
        height: 55,
        flex: 1,
        justifyContent: 'center'
    },
    separator: {
        borderWidth: 0.7,
        borderColor: colors.mediumGrey,
        width: "90%",
        alignSelf: "center",
        marginBottom: 10
    },
    iconContainer: {
        flexDirection: "row",
        justifyContent: "space-between",
        width: "27%"
    },
    iconContainerComment: {
        flexDirection: "row",
        marginLeft: -10
    },
    comentar: {
        flexDirection: "column",
        width: "100%",

    }
});

export default styles 