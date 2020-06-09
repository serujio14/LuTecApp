import React, { Component } from "react";
import {StyleSheet, View, Text, Image, TouchableOpacity, TextInput, ActivityIndicator, Alert} from "react-native";
import Dialog from "react-native-dialog";


export default class AdminAddMaterial extends Component {

    constructor(props) {
        super(props);
        this.state = {
            isLoading: false,
            dataSource: null,
            materialName : "",
            cutPower : "",
            cutSpeed: "",
            tracePower : "",
            traceSpeed: "",
            visible : false,
            dialogVisible: false,
            dialogFailVisible: false
        }

        this.handleChangeTextMaterialName = this.handleChangeTextMaterialName.bind(this)
        this.handleChangeTextCutPower = this.handleChangeTextCutPower.bind(this)
        this.handleChangeTextCutSpeed = this.handleChangeTextCutSpeed.bind(this)
        this.handleChangeTextTracePower = this.handleChangeTextTracePower.bind(this)
        this.handleChangeTextTraceSpeed = this.handleChangeTextTraceSpeed.bind(this)
        this.handleCancel = this.handleCancel.bind(this)
        this.addMaterial = this.addMaterial.bind(this)
        this.CheckTextInput = this.CheckTextInput.bind(this)
    }

    CheckTextInput = () => {

        if (this.state.materialName != '' && this.state.cutPower != '' && this.state.cutSpeed != '' &&
            this.state.tracePower != '' && this.state.traceSpeed != '') {

            return true;

        } else {
            return false
        }
    };

    addMaterial(state){

        if (this.CheckTextInput()){

            console.log('agregando')

            this.setState({ isLoading: true });

            fetch("http://192.168.0.4/lutecapp.com/service.php?who=add_material&api_key=5183723902398237640&materialName=" +
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
                            cutPower : "",
                            cutSpeed: "",
                            tracePower : "",
                            traceSpeed: "",
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


    }

    render() {

        if (this.state.isLoading) {

            console.log('CARGANDO--------------------------------------------------------------------')

            return <View style={styles.containerLoader}>
                <View style={styles.horizontal}>
                    <ActivityIndicator size="large" color="#009688" />

                </View>
            </View>

        } else{

            return (

                <View style={styles.container}>
                    <Dialog.Container visible={this.state.dialogVisible}>
                        <Dialog.Title>Material Added</Dialog.Title>
                        <Dialog.Description>
                            The new material has been added
                        </Dialog.Description>
                        <Dialog.Button label="Continue" onPress={this.handleCancel} />
                    </Dialog.Container>

                    <Dialog.Container visible={this.state.dialogFailVisible}>
                        <Dialog.Title>Material Not Added</Dialog.Title>
                        <Dialog.Description>
                            There has been an error adding the material. Please try again
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

                    <Text style={styles.title}>ADD MATERIAL</Text>

                    <Text style={styles.label}>MATERIAL NAME & THICKNESS</Text>
                    <TextInput
                        value={this.state.materialName}
                        onChangeText={this.handleChangeTextMaterialName}
                        style={styles.textbox}
                    />

                    <Text style={styles.title2}>CUTTING PARAMETERS</Text>
                    <View style={styles.itemContainer}>
                        <View style={styles.powerBox}>
                            <View style={styles.parameterContainer}>
                            <TextInput
                                value={this.state.tracePower}
                                onChangeText={this.handleChangeTextTracePower}
                                style={styles.labelParameterNumber}
                            />
                            <Text style={styles.labelParameter}>POWER</Text>
                        </View>
                        </View>
                        <View style={styles.speedBox}>
                            <View style={styles.parameterContainer}>
                            <TextInput
                                value={this.state.traceSpeed}
                                onChangeText={this.handleChangeTextTraceSpeed}
                                style={styles.labelParameterNumber}
                            />
                            <Text style={styles.labelParameter}>SPEED</Text>
                        </View>
                        </View>
                    </View>

                    <Text style={styles.title2}>TRACING PARAMETERS</Text>
                    <View style={styles.itemContainer}>
                        <View style={styles.powerBox}>
                            <View style={styles.parameterContainer}>
                                <TextInput
                                    value={this.state.cutPower}
                                    onChangeText={this.handleChangeTextCutPower}
                                    style={styles.labelParameterNumber}
                                />
                                <Text style={styles.labelParameter}>POWER</Text>
                            </View>
                        </View>
                        <View style={styles.speedBox}>
                            <View style={styles.parameterContainer}>
                                <TextInput
                                    value={this.state.cutSpeed}
                                    onChangeText={this.handleChangeTextCutSpeed}
                                    style={styles.labelParameterNumber}
                                />
                                <Text style={styles.labelParameter}>SPEED</Text>
                            </View>
                        </View>
                    </View>

                    <TouchableOpacity
                        onPress={() => this.addMaterial(this.state)}
                        style={styles.btnWide}
                    >
                        <Text style={styles.btnLabel}>ADD MATERIAL</Text>
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
        justifyContent: 'space-around'
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
    itemContainer: {
        height: 109,
        flexDirection: "row",
        marginRight: -3
    },
    item :{
        flex: 0.5,
        height: 120,
        padding: 10
    },
    parameterContainer: {
        height: 92,
        marginTop: 7,
        alignItems: 'center'
    },
    powerBox: {
        width: '50%',
        height: 109,
        backgroundColor: "#E6E6E6"
    },
    speedBox: {
        width: '50%',
        height: 109,
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
        backgroundColor: "rgba(76,76,77,1)",
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
        color: "#595A5C",
        flexDirection: "row",
        textAlign: 'center'
    },
    label2: {
        top: 10,
        textAlign: "center",
        fontFamily: "roboto-regular",
        color: "#121212",
    },
    textbox: {
        marginLeft: 30,
        marginRight: 30,
        marginBottom: 25,
        paddingBottom: 2,
        borderBottomWidth: 1,
        borderBottomColor: 'gray',
        textAlign: "center",
        color: 'gray'
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
    btnAddMaterial: {
        width: 376,
        height: 54,
        backgroundColor: "rgba(0,150,136,1)",
        marginTop: 692
    },
    addMaterial2: {
        fontFamily: "roboto-regular",
        color: "rgba(255,255,255,1)",
        marginTop: 19,
        marginLeft: 140
    },
    group3: {
        width: 376,
        height: 37,
        marginTop: -207
    },
    rect5: {
        width: 376,
        height: 37,
        backgroundColor: "rgba(76,76,77,1)"
    },
    tracingParameters: {
        fontFamily: "roboto-regular",
        color: "rgba(251,251,251,1)",
        fontSize: 19,
        textAlign: "center",
        marginTop: 7,
        marginLeft: 86
    },
    rect1: {
        width: 376,
        height: 141,
        backgroundColor: "rgba(3,85,73,1)",
        marginTop: -577
    },
    image: {
        width: 329,
        height: 65,
        marginTop: 53,
        marginLeft: 23
    },
    rect2: {
        width: 376,
        height: 48,
        backgroundColor: "rgba(76,76,77,1)"
    },
    addMaterial: {
        fontFamily: "roboto-regular",
        color: "rgba(251,251,251,1)",
        fontSize: 24,
        textAlign: "center",
        marginTop: 11,
        marginLeft: 106
    },
    loremIpsum: {
        fontFamily: "roboto-regular",
        color: "#121212",
        marginTop: 4
    },
    materialName: {
        fontFamily: "roboto-regular",
        color: "#121212",
        marginLeft: 2
    },
    loremIpsumRow: {
        height: 17,
        flexDirection: "row",
        marginTop: 27,
        marginLeft: 28
    },
    materialFixedLabelTextbox: {
        height: 43,
        width: 330,
        marginLeft: 21
    },
    thickness: {
        top: 0,
        left: 9,
        position: "absolute",
        fontFamily: "roboto-regular",
        color: "#121212"
    },
    materialFixedLabelTextbox1: {
        height: 43,
        width: 330,
        position: "absolute",
        left: 0,
        top: 16
    },
    thicknessStack: {
        width: 330,
        height: 59,
        marginTop: 31,
        marginLeft: 21
    },
    materialFixedLabelTextbox3: {
        height: 43,
        width: 143,
        position: "absolute",
        left: 0,
        top: 15
    },
    power1: {
        top: 0,
        left: 41,
        position: "absolute",
        fontFamily: "roboto-regular",
        color: "#121212"
    },
    powerContainer: {
        width: 143,
        height: 58
    },
    materialFixedLabelTextbox4: {
        height: 43,
        width: 151,
        position: "absolute",
        left: 0,
        top: 15
    },
    speed3: {
        top: 0,
        left: 49,
        position: "absolute",
        fontFamily: "roboto-regular",
        color: "#121212"
    },
    speedContainer: {
        width: 151,
        height: 58,
        marginLeft: 28
    },
    powerSpeedContainer: {
        height: 58,
        flexDirection: "row",
        marginTop: 235,
        marginLeft: 27,
        marginRight: 26
    },
    power2: {
        fontFamily: "roboto-regular",
        color: "#121212",
        marginLeft: 43
    },
    materialFixedLabelTextbox2: {
        height: 43,
        width: 150,
        marginTop: 1
    },
    power2Column: {
        width: 150
    },
    speed2: {
        top: 0,
        left: 49,
        position: "absolute",
        fontFamily: "roboto-regular",
        color: "#121212"
    },
    materialFixedLabelTextbox5: {
        height: 43,
        width: 150,
        position: "absolute",
        left: 0,
        top: 16
    },
    speed2Stack: {
        width: 150,
        height: 59,
        marginLeft: 28,
        marginTop: 2
    },
    power2ColumnRow: {
        height: 61,
        flexDirection: "row",
        marginTop: -209,
        marginLeft: 24,
        marginRight: 23
    },
    group4: {
        width: 376,
        height: 37,
        marginTop: -119
    },
    rect4: {
        width: 376,
        height: 37,
        backgroundColor: "rgba(76,76,77,1)"
    },
    cuttingParameters: {
        fontFamily: "roboto-regular",
        color: "rgba(251,251,251,1)",
        fontSize: 19,
        textAlign: "center",
        marginTop: 7,
        marginLeft: 86
    }
});