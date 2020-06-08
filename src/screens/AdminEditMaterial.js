import React, {Component} from "react";
import {StyleSheet, View, TouchableOpacity, Text, Image} from "react-native";
import EditMaterialTextboxName from "../components/EditMaterialTextboxName";
import EditMaterialTextboxCutPower from "../components/EditMaterialTextboxCutPower";
import EditMaterialTextboxCutSpeed from "../components/EditMaterialTextboxCutSpeed";
import EditMaterialTextboxTracePower from "../components/EditMaterialTextboxTracePower";
import EditMaterialTextboxTraceSpeed from "../components/EditMaterialTextboxTraceSpeed";

function AdminEditMaterial(props) {
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
            <Text style={styles.title}>EDIT MATERIAL</Text>

            {/* - - - - - - BTN - - - - - - -*/}
            <TouchableOpacity
                onPress={() => props.navigation.navigate("EpilogModuleAdmin")}
                style={styles.btnSelectMaterial}
            >
                <Text style={styles.btnLabel}>SELECT MATERIAL TO EDIT</Text>
            </TouchableOpacity>

            <Text style={styles.label}>MATERIAL NAME</Text>
            {/* - - - - - - TEXTBOX - - - - - - -*/}
            <EditMaterialTextboxName
                style={styles.textbox}
            ></EditMaterialTextboxName>

            {/* - - - - - - TITLE2 - - - - - - -*/}
            <Text style={styles.title2}>CUTTING PARAMETERS</Text>
            <View style={styles.itemContainer}>
                <View style={styles.item}>
                    {/* - - - - - - TEXTBOX - - - - - - -*/}
                    <EditMaterialTextboxCutPower
                        style={styles.textbox2}
                    ></EditMaterialTextboxCutPower>
                    <Text style={styles.label2}>POWER</Text>
                </View>
                <View style={styles.item}>
                    {/* - - - - - - TEXTBOX - - - - - - -*/}
                    <EditMaterialTextboxCutSpeed
                        style={styles.textbox2}
                    ></EditMaterialTextboxCutSpeed>
                    <Text style={styles.label2}>SPEED</Text>
                </View>
            </View>
            {/* - - - - - - TITLE2 - - - - - - -*/}
            <Text style={styles.title2}>TRACING PARAMETERS</Text>
            <View style={styles.itemContainer}>
                <View style={styles.item}>
                    {/* - - - - - - TEXTBOX - - - - - - -*/}
                    <EditMaterialTextboxTracePower
                        style={styles.textbox2}
                    ></EditMaterialTextboxTracePower>
                    <Text style={styles.label2}>POWER</Text>
                </View>
                <View style={styles.item}>
                    {/* - - - - - - TEXTBOX - - - - - - -*/}
                    <EditMaterialTextboxTraceSpeed
                        style={styles.textbox2}
                    ></EditMaterialTextboxTraceSpeed>
                    <Text style={styles.label2}>SPEED</Text>
                </View>
            </View>

            {/* - - - - - - BTN - - - - - - -*/}
            <TouchableOpacity
                onPress={() => props.navigation.navigate("LuTecApp")}
                style={styles.btnWide}
            >
                <Text style={styles.btnLabel}>EDIT MATERIAL</Text>
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
    itemContainer: {
        flex: 1,
        flexDirection: 'row',
        flexWrap: 'wrap'
    },
    item :{
        flex: 0.5,
        height: 120,
        padding: 10
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
    title2: {
        height: 37,
        backgroundColor: "rgba(76,76,77,1)",
        fontFamily: "roboto-regular",
        color: "rgba(251,251,251,1)",
        fontSize: 19,
        textAlign: "center",
        lineHeight: 42
    },
    label: {
        fontFamily: "roboto-regular",
        color: "#121212",
        height: 16,
        flexDirection: "row",
        marginTop: 22,
        marginLeft: 28,
        marginRight: 306
    },
    label2: {
        top: 10,
        textAlign: "center",
        fontFamily: "roboto-regular",
        color: "#121212",
    },
    textbox: {
        marginLeft: 28,
        marginBottom: 30,
        marginRight: 28
    },
    textbox2: {
        marginLeft: 28,
        marginRight: 28
    },
    btnWide: {
        width: '100%',
        height: 54,
        backgroundColor: "rgba(0,150,136,1)",
        position: 'absolute',
        bottom: 0,
        alignSelf: 'stretch',
        textAlign: 'center'
    },
    btnLabel: {
        fontFamily: "roboto-regular",
        color: "rgba(255,255,255,1)",
        textAlign: "center",
        marginTop: 19
    },
    btnSelectMaterial: {
        height: 54,
        backgroundColor: "rgba(0,150,136,1)",
    },
});

export default AdminEditMaterial;
