import React, { Component } from "react";
import { StyleSheet, View, Image, Text, TouchableOpacity } from "react-native";
import CreateAccountTextboxName from "../components/CreateAccountTextboxName";
import CreateAccountTextboxTecID from "../components/CreateAccountTextboxTecID";
import CreateAccountTextboxEmail from "../components/CreateAccountTextboxEmail";
import CreateAccountTextboxPassword from "../components/CreateAccountTextboxPassword";
import CreateAccountTextboxConfirmPassword from "../components/CreateAccountTextboxConfirmPassword";

function CreateAccount(props) {
    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Image
                    source={require("../assets/images/logosLuTecAppIcon.png")}
                    resizeMode="contain"
                    style={styles.image}
                ></Image>
            </View>

            {/* - - - - - - TITLE - - - - - - -*/}
            <Text style={styles.title}>CREATE ACCOUNT</Text>

            <Text style={styles.label}>NAME</Text>
            {/* - - - - - - TEXTBOX - - - - - - -*/}
            <CreateAccountTextboxName
                style={styles.textbox}
            ></CreateAccountTextboxName>

            <Text style={styles.label}>TEC ID</Text>
            {/* - - - - - - TEXTBOX - - - - - - -*/}
            <CreateAccountTextboxTecID
                style={styles.textbox}
            ></CreateAccountTextboxTecID>

            <Text style={styles.label}>EMAIL</Text>
            {/* - - - - - - TEXTBOX - - - - - - -*/}
            <CreateAccountTextboxEmail
                style={styles.textbox}
            ></CreateAccountTextboxEmail>

            <Text style={styles.label}>PASSWORD</Text>
            {/* - - - - - - TEXTBOX - - - - - - -*/}
            <CreateAccountTextboxPassword
                style={styles.textbox}
            ></CreateAccountTextboxPassword>

            <Text style={styles.label}>CONFIRM PASSWORD</Text>
            {/* - - - - - - TEXTBOX - - - - - - -*/}
            <CreateAccountTextboxConfirmPassword
                style={styles.textbox}
            ></CreateAccountTextboxConfirmPassword>

            {/* - - - - - - BTN - - - - - - -*/}
            <TouchableOpacity
                onPress={() => props.navigation.navigate("LuTecApp")}
                style={styles.btnWide}
            >
                <Text style={styles.btnLabel}>CREATE ACCOUNT</Text>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignSelf: 'stretch',
        textAlign: 'center'
    },
    header: {
        height: 141,
        backgroundColor: "rgba(3,85,73,1)"
    },
    image: {
        width: 329,
        height: 65,
        marginTop: 53,
        marginLeft: 23
    },
    title: {
        height: 48,
        backgroundColor: "rgba(76,76,77,1)",
        fontFamily: "roboto-regular",
        fontWeight: 'bold',
        color: "rgba(251,251,251,1)",
        fontSize: 24,
        textAlign: "center",
        lineHeight: 56
    },
    label: {
        fontFamily: "roboto-regular",
        color: "#121212",
        height: 16,
        flexDirection: "row",
        marginTop: 22,
        marginLeft: 28
    },
    textbox: {
        marginLeft: 28,
        marginRight: 28
    },
    btnWide: {
        width: '100%',
        height: 54,
        backgroundColor: "rgba(0,150,136,1)",
        position: 'absolute',
        bottom:0,
        alignSelf: 'stretch',
        textAlign: 'center'
    },
    btnLabel: {
        fontFamily: "roboto-regular",
        color: "rgba(255,255,255,1)",
        textAlign: "center",
        marginTop: 19
    }
});

export default CreateAccount;
