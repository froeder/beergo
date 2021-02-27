import React from "react";
import { StyleSheet } from "react-native";
import colors from "../../utils/colors";

const styles = StyleSheet.create({
  container: {
    padding: 20,
    paddingTop: 20,
  },
  texto: {
    fontSize: 20,
    paddingBottom: 10,
    color: colors.mediumGrey,
    lineHeight: 27,
    textAlign: "center",
  },
  buttonShare: {
    backgroundColor: colors.mediumGrey,
    borderRadius: 20,
    width: "90%",
    alignSelf: "center",
  },
  buttonQuestao: {
    backgroundColor: colors.success,
    borderRadius: 20,
    width: "90%",
    alignSelf: "center",
  },
  titulo: {
    fontSize: 28,
    paddingTop: 20,
    paddingBottom: 20,
    textAlign: "center",
    fontWeight: "bold",
    color: colors.primary,
  },
  question: {
    fontSize: 24,
    marginTop: -40,
    paddingBottom: 20,
    textAlign: "center",
    fontWeight: "bold",
    color: colors.primary,
  },
  questionTexto: {
    fontSize: 20,
    paddingBottom: 10,
    color: colors.mediumGrey,
    lineHeight: 27,
    textAlign: "center",
  },
  cardTitle: {
    fontSize: 18,
    textAlign: "center",
    fontWeight: "bold",
    color: colors.white,
    paddingTop: 10,
    paddingBottom: 10,
  },
  cardSubtitle: {
    fontSize: 15,
    textAlign: "center",
    fontWeight: "normal",
    color: colors.black,
    paddingTop: 10,
    paddingBottom: 10,
  },
  loadingContainer: {
    justifyContent: "center",
    alignItems: "center",
  },
  cardItem: {
    marginLeft: 20,
    marginRight: 20,
    marginTop: 10,
    backgroundColor: colors.mediumGrey,
    borderRadius: 10,
    elevation: 5,
  },
  gridCardItem: {
    marginTop: 20,
    marginRight: 10,
    marginLeft: 10,
    backgroundColor: colors.mediumGrey,
    borderRadius: 10,
    elevation: 5,
    width: "28%",
    height: 80,
    justifyContent: "center",
  },
  golpeGridCardItem: {
    marginTop: 20,
    marginRight: 10,
    marginLeft: 10,
    backgroundColor: colors.mediumGrey,
    borderRadius: 10,
    elevation: 5,
    width: "45%",
    height: 90,
    justifyContent: "center",
  },
  header: {
    backgroundColor: colors.primary,
    padding: 10,

    width: "90%",
    alignSelf: "center",
    marginBottom: 20,
  },
  updatePerfil: {
    textAlign: "center",
    color: colors.white,
    fontSize: 25,
  },
});

export default styles;
