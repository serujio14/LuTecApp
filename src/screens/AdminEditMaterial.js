import React,  { Component } from "react";
import {StyleSheet, View, TouchableOpacity, Text, TextInput, Image, ActivityIndicator} from "react-native";
import Dialog from "react-native-dialog";
import { Dropdown } from 'react-native-material-dropdown';

export default class AdminEditMaterial extends Component {

    constructor(props) {
        super(props);
        this.state = {
            isLoading: false,
            dataSource: null,
            materialName : "",
            cutPower : "00",
            cutSpeed: "00",
            tracePower : "00",
            traceSpeed: "00",
            visible : false,
            dialogVisible: false,
            dialogFailVisible: false,
            selectedMaterial : []
        }

        this.handleChangeTextMaterialName = this.handleChangeTextMaterialName.bind(this)
        this.handleChangeTextCutPower = this.handleChangeTextCutPower.bind(this)
        this.handleChangeTextCutSpeed = this.handleChangeTextCutSpeed.bind(this)
        this.handleChangeTextTracePower = this.handleChangeTextTracePower.bind(this)
        this.handleChangeTextTraceSpeed = this.handleChangeTextTraceSpeed.bind(this)
        this.handleCancel = this.handleCancel.bind(this)
        this.editMaterial = this.editMaterial.bind(this)
        this.CheckTextInput = this.CheckTextInput.bind(this)
        // this.handleMaterialDropdown = this.handleMaterialDropdown.bind(this)

    }

    CheckTextInput = () => {

        if (this.state.materialName != '' && this.state.cutPower != '' && this.state.cutSpeed != '' &&
            this.state.tracePower != '' && this.state.traceSpeed != '') {

            return true;

        } else {
            return false
        }
    };

    editMaterial(state){

        if (this.CheckTextInput()){

            console.log('agregando')

            this.setState({ isLoading: true });

            fetch("http://192.168.0.4/lutecapp.com/service.php?who=edit_material&api_key=5183723902398237640&materialName="
                + state.materialName +"&cutPower=" + state.cutPower + "&cutSpeed=" +  state.cutSpeed + "&tracePower=" + state.tracePower
                + "&traceSpeed=" + state.traceSpeed , { headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                },}
            )
                .then(response => response.json())
                .then((responseJson) => {

                    console.log('funciono')
                    console.log(responseJson)

                    if (responseJson.Response == 1){
                        this.setState({
                            isLoading : false,
                            dialogVisible: true,
                            materialName : "",
                            cutPower : "00",
                            cutSpeed: "00",
                            tracePower : "00",
                            traceSpeed: "00",
                        });
                    }else{
                        this.setState({
                            isLoading : false,
                            dialogFailVisible: true,
                        });
                    }

                })
                .catch((error) => {
                    console.log('error')
                    console.error(error)
                });
        }else{
            alert('Please Fill All Spaces');
        }
    }
    handleCancel = () => {
        this.setState({ dialogVisible: false });
    };

    handleChangeTextMaterialName(text){
        this.setState({materialName : text})
    }
    handleChangeTextCutPower(text){
        this.setState({cutPower : text})
    }

    handleChangeTextCutSpeed(text){
        this.setState({cutSpeed : text})
    }

    handleChangeTextTracePower(text){
        this.setState({tracePower : text})
    }
    handleChangeTextTraceSpeed(text){
        this.setState({traceSpeed : text})
    }



    componentDidMount() {


        return fetch('http://192.168.0.4/lutecapp.com/service.php?who=return_material_list&api_key=5183723902398237640')

            .then(response => response.json())
            .then((responseJson) => {
                console.log('responseJson')
                console.log(responseJson)
                this.setState({
                    isLoading: false,
                    dataSource: responseJson.Data,
                })

            })

            .catch((error) => {
                console.log(error)
                console.log(error)
            });

    }

    render() {


        if (this.state.isLoading) {

            return <View style={styles.containerLoader}>
                <View style={styles.horizontal}>
                    <ActivityIndicator size="large" color="#009688" />

                </View>
            </View>

        } else {



            return (
                <View style={styles.container}>
                    <Dialog.Container visible={this.state.dialogVisible}>
                        <Dialog.Title>Material Added</Dialog.Title>
                        <Dialog.Description>
                            The new material has been edited
                        </Dialog.Description>
                        <Dialog.Button label="Continue" onPress={this.handleCancel} />
                    </Dialog.Container>

                    <Dialog.Container visible={this.state.dialogFailVisible}>
                        <Dialog.Title>Material Not Added</Dialog.Title>
                        <Dialog.Description>
                            There has been an error editing the material. Please try again
                        </Dialog.Description>
                        <Dialog.Button label="Continue" onPress={this.handleCancel} />
                    </Dialog.Container>
                    <View style={styles.header}>
                        <Image
                            source={require("../assets/images/logosLuTecAppIcon.png")}
                            resizeMode="contain"
                            style={styles.image}
                        />
                    </View>
                    {/* - - - - - - TITLE - - - - - - -*/}
                    <Text style={styles.title}>EDIT MATERIAL</Text>

                    {/* - - - - - - BTN - - - - - - -*/}
                    <TouchableOpacity

                        style={styles.btnSelectMaterial}
                    >
                        <Text style={styles.btnLabel}>SELECT MATERIAL TO EDIT</Text>
                    </TouchableOpacity>

                    <Text style={styles.label}>MATERIAL NAME</Text>
                    {/* - - - - - - TEXTBOX - - - - - - -*/}
                    <Dropdown
                        style={styles.materialName}
                        label='MATERIAL &amp; THICKNESS SELECTED'

                        //onChangeText={this.handleMaterialDropdown}
                    />

                    {/* - - - - - - TITLE2 - - - - - - -*/}
                    <Text style={styles.title2}>CUTTING PARAMETERS</Text>
                    <View style={styles.itemContainer}>
                        <View style={styles.item}>
                            <TextInput
                                value={this.state.tracePower}
                                keyboardType = 'numeric'
                                onChangeText={this.handleChangeTextTracePower}
                                style={styles.labelParameterNumber}
                            />

                            <TextInput
                                value = {this.state.cutPower}
                                onChangeText={this.handleChangeTextCutPower}
                                style={styles.textbox2}
                            />
                            <Text style={styles.label2}>POWER</Text>
                        </View>
                        <View style={styles.item}>
                            {/* - - - - - - TEXTBOX - - - - - - -*/}
                            <TextInput
                                value = {this.state.cutSpeed}
                                onChangeText={this.handleChangeTextCutSpeed}
                                style={styles.textbox2}
                            />
                            <Text style={styles.label2}>SPEED</Text>
                        </View>
                    </View>
                    {/* - - - - - - TITLE2 - - - - - - -*/}
                    <Text style={styles.title2}>TRACING PARAMETERS</Text>
                    <View style={styles.itemContainer}>
                        <View style={styles.item}>
                            {/* - - - - - - TEXTBOX - - - - - - -*/}
                            <TextInput
                                value = {this.state.tracePower}
                                onChangeText={this.handleChangeTextTracePower}
                                style={styles.textbox2}
                            />
                            <Text style={styles.label2}>POWER</Text>
                        </View>
                        <View style={styles.item}>
                            {/* - - - - - - TEXTBOX - - - - - - -*/}
                            <TextInput
                                value = {this.state.traceSpeed}
                                onChangeText={this.handleChangeTextTraceSpeed}
                                style={styles.textbox2}
                            />
                            <Text style={styles.label2}>SPEED</Text>
                        </View>
                    </View>

                    {/* - - - - - - BTN - - - - - - -*/}
                    <TouchableOpacity
                        onPress={() => this.editMaterial(this.state)}
                        style={styles.btnWide}
                    >
                        <Text style={styles.btnLabel}>EDIT MATERIAL</Text>
                    </TouchableOpacity>
                </View>
            );
        }
    }


}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignSelf: 'stretch',
        textAlign: 'center'
    },
    containerLoader: {
        flex: 1,
        alignItems: 'center',
        flexDirection: 'column',
        justifyContent: 'space-around',

    },
    horizontal: {
        backgroundColor: '#FFFFFF',
        height: 100,
        width: 100,
        borderRadius: 10,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-around'
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
        height: 120,
        flexDirection: "row",
        marginRight: -3
    },
    parameterContainer: {
        marginTop: 7,
        alignItems: 'center'
    },
    powerBox: {
        width: '50%',
        backgroundColor: "#E6E6E6"
    },
    speedBox: {
        width: '50%',
        backgroundColor: "#E6E6E6",
        marginLeft: 2
    },
    labelParameterNumber: {
        top: 10,
        position: "absolute",
        width: '60%',
        fontFamily: "roboto-regular",
        color: "#121212",
        paddingBottom: 2,
        borderBottomWidth: 1,
        borderBottomColor: 'gray',
        textAlign: "center",
        fontSize: 40
    },
    labelParameter: {
        top: 72,
        position: "absolute",
        fontFamily: "roboto-regular",
        color: "#121212",
        fontSize: 17
    },
    title: {
        height: 48,
        backgroundColor: "rgba(45,45,45,1)",
        fontFamily: "roboto-regular",
        fontWeight: 'bold',
        color: "rgba(251,251,251,1)",
        fontSize: 24,
        textAlign: "center",
        marginBottom: 15,
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
