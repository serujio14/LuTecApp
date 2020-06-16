import React, { Component } from "react";
import {StyleSheet, View, Text, Image, TouchableOpacity, TextInput, ActivityIndicator, Alert, ScrollView, SafeAreaView, StatusBar, Dimensions} from "react-native";
import Dialog from "react-native-dialog";

const { height } = Dimensions.get('window');

export default class AdminAddMaterial extends Component {

    state = {
        screenHeight: height,
    };

    onContentSizeChange = (contentWidth, contentHeight) => {
        this.setState({ screenHeight: contentHeight + 174});
    };

    constructor(props) {
        super(props);
        this.state = {
            isLoading: false,
            dataSource: null,
            materialName : "",
            materialThickness : "",
            materialProvider : "",
            cutPower : "",
            cutSpeed: "",
            tracePower : "",
            traceSpeed: "",
            visible : false,
            dialogVisible: false,
            dialogFailVisible: false
        }

        this.handleChangeTextMaterialName = this.handleChangeTextMaterialName.bind(this)
        this.handleChangeTextMaterialThickness = this.handleChangeTextMaterialThickness.bind(this)
        this.handleChangeTextMaterialProvider = this.handleChangeTextMaterialProvider.bind(this)
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

            fetch("http://192.168.0.4/lutecapp.com/service.php?who=add_material&api_key=5183723902398237640&materialName="
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
    handleChangeTextMaterialProvider(text){
        this.setState({materialProvider : text})
    }
    handleChangeTextMaterialThickness(text){
        this.setState({materialThickness : text})
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

        const scrollEnabled = this.state.screenHeight > height;

        if (this.state.isLoading) {

            //console.log('CARGANDO')

            return <View style={styles.containerLoader}>
                <View style={styles.horizontal}>
                    <ActivityIndicator size="large" color="#009688" />
                </View>
            </View>

        } else{

            return (

                <SafeAreaView style={styles.container}>

                    <View style={styles.header}>
                        <Image
                            source={require("../assets/images/logosLuTecApp.png")}
                            resizeMode="contain"
                            style={styles.image}
                        ></Image>
                    </View>

                    <Text style={styles.title}>Add material</Text>
                    <StatusBar barStyle="light-content" backgroundColor="#468189" />
                    <ScrollView
                        style={{ flex: 1 }}
                        contentContainerStyle={styles.scrollview}
                        scrollEnabled={scrollEnabled}
                        onContentSizeChange={this.onContentSizeChange}
                    >

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

                            <Text style={styles.label}>Material</Text>
                            <TextInput
                                value={this.state.materialName}
                                onChangeText={this.handleChangeTextMaterialName}
                                style={styles.textbox}
                            />
                            <Text style={styles.label}>Thickness</Text>
                            <TextInput
                                value={this.state.materialThickness}
                                onChangeText={this.handleChangeTextMaterialThickness}
                                style={styles.textbox}
                            />
                            <Text style={styles.label}>Provider</Text>
                            <TextInput
                                value={this.state.materialProvider}
                                onChangeText={this.handleChangeTextMaterialProvider}
                                style={styles.textbox}
                            />

                            <Text style={styles.title2}>Cutting configuration</Text>
                            <View style={styles.itemContainer}>
                                <View style={styles.powerBox}>
                                    <View style={styles.parameterContainer}>
                                        <TextInput
                                            value={this.state.tracePower}
                                            keyboardType = 'numeric'
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
                                            keyboardType = 'numeric'
                                            onChangeText={this.handleChangeTextTraceSpeed}
                                            style={styles.labelParameterNumber}
                                        />
                                        <Text style={styles.labelParameter}>SPEED</Text>
                                    </View>
                                </View>
                            </View>

                            <Text style={styles.title2}>Tracing configuration</Text>
                            <View style={styles.itemContainer}>
                                <View style={styles.powerBox}>
                                    <View style={styles.parameterContainer}>
                                        <TextInput
                                            value={this.state.cutPower}
                                            keyboardType = 'numeric'
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
                                            keyboardType = 'numeric'
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
                    </ScrollView>
                </SafeAreaView>
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
    btnLabel: {
        fontFamily: "roboto-regular",
        color: "rgba(255,255,255,1)",
        textAlign: "center",
        marginTop: 19
    },
    btnWide: {
        width: '100%',
        height: 54,
        marginTop: 15,
        backgroundColor: "rgba(0,150,136,1)",
        alignSelf: 'stretch',
        textAlign: 'center'
    },
    header: {
        height: 150,
        backgroundColor: "rgba(3,85,73,1)"
    },
    image: {
        width: 329,
        height: 84,
        marginTop: 30,
        alignSelf: 'center'
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
    textbox: {
        width: '80%',
        alignSelf:'center',
        marginBottom: 25,
        paddingBottom: 2,
        borderBottomWidth: 1,
        borderBottomColor: 'gray',
        textAlign: "center",
        color: 'gray'
    },
    addMaterial: {
        fontFamily: "roboto-regular",
        color: "rgba(251,251,251,1)",
        fontSize: 24,
        textAlign: "center",
        marginTop: 11,
        marginLeft: 106
    },
    materialName: {
        fontFamily: "roboto-regular",
        color: "#121212",
        marginLeft: 2
    },
});