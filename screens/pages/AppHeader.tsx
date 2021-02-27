import React, { Component } from 'react';
import { View, Text, StyleSheet, SafeAreaView } from "react-native";
import colors from '../../utils/colors';
import { IconButton } from "react-native-paper";

export default class AppHeader extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (
            <View style={styles.container}>
                <IconButton
                    icon="menu"
                    color={colors.white}
                    size={35}
                    onPress={() => {
                        this.props.navigation.toggleDrawer()
                    }}
                    style={{ marginTop: -6 }}
                />
                <Text style={styles.title}>{this.props.title}</Text>
            </View>
        );
    }

}

const styles = StyleSheet.create({
    container: {
        backgroundColor: colors.primary,
        padding: 10,
        height: 80,
        flexDirection: 'row',
        paddingTop: 30
    },
    title: {
        fontSize: 22,
        color: colors.white,
        flex: 1,
        textAlign: 'center',
        marginLeft: -60,
    }
});