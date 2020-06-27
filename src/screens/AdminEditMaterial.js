import React,  { Component } from "react";
import {StyleSheet, View, TouchableOpacity, Text, TextInput, Image, ActivityIndicator, ScrollView, Dimensions, SafeAreaView, StatusBar} from "react-native";
import Dialog from "react-native-dialog";
import { Dropdown } from 'react-native-material-dropdown';

const { height } = Dimensions.get('window');

export default class AdminEditMaterial extends Component {

    state = {
        screenHeight: height,
    };

    onContentSizeChange = (contentWidth, contentHeight) => {
        this.setState({ screenHeight: contentHeight + 300});
    };

    constructor(props) {
        super(props);
        this.state = {
            isLoading: true,
            dataSource: [],
            materialName : "",
            idMaterial : "",
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
        this.handleMaterialDropdown = this.handleMaterialDropdown.bind(this)

    }

    CheckTextInput = () => {

        if (this.state.Name != '' && this.state.CutPower != '' && this.state.CutSpeed != '' &&
            this.state.TracePower != '' && this.state.TraceSpeed != '') {

            return true;

        } else {
            return false
        }
    };

    handleMaterialDropdown(text){

        const array = Object.values( this.state.dataSource);

        let materials = array.map((val, key) => {

            if (val.Name === text){

                this.setState(
                    {
                        idMaterial : val.Id_material,
                        materialName : val.Name,
                        cutPower : val.CutPower,
                        cutSpeed: val.CutSpeed,
                        tracePower : val.TracePower,
                        traceSpeed: val.TraceSpeed,
                    })
            }

        });

    }

    editMaterial(state){

        if (this.CheckTextInput()){

            this.setState({ isLoading: true });

            fetch("http://simplesolutionscr.com/lutecapp/service.php?who=edit_material&api_key=5183723902398237640&Id_material="
                + state.idMaterial +"&cutPower=" + state.cutPower + "&cutSpeed=" +  state.cutSpeed + "&tracePower=" + state.tracePower
                + "&traceSpeed=" + state.traceSpeed , { headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                },}
            )
                .then(response => response.json())
                .then((responseJson) => {

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
                        alert('Error editing material');
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

        return fetch('http://simplesolutionscr.com/lutecapp/service.php?who=return_material_list&api_key=5183723902398237640')

            .then(response => response.json())
            .then((responseJson) => {

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

    componentDidUpdate() {

        return fetch('http://simplesolutionscr.com/lutecapp/service.php?who=return_material_list&api_key=5183723902398237640')

            .then(response => response.json())
            .then((responseJson) => {

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

        const scrollEnabled = this.state.screenHeight > height;

        if (this.state.isLoading) {

            return <View style={styles.containerLoader}>
                <View style={styles.horizontal}>
                    <ActivityIndicator size="large" color="#009688" />

                </View>
            </View>

        } else {

            let data = [];

            const array = Object.values(this.state.dataSource);

            let materials = array.map((val, key) => {

                const obj = {value:val.Name, data : val};
                data.push(obj)
            });

            return (
                <SafeAreaView style={styles.container}>

                    <View style={styles.header}>
                        <Image
                            source={require("../assets/images/logosLuTecApp.png")}
                            resizeMode="contain"
                            style={styles.image}
                        />
                    </View>
                    <Text style={styles.title}>Edit material</Text>

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
                                    The material has been edited
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

                            <View style={styles.materialNameContainer}>
                                <Dropdown
                                    style={styles.materialName}
                                    label='MATERIAL SELECTED'
                                    data={data}
                                    onChangeText={this.handleMaterialDropdown}
                                />
                            </View>

                            <Text style={styles.title2}>Cutting configuration</Text>
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

                            <Text style={styles.title2}>Tracing configuration</Text>
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

                            <TouchableOpacity
                                onPress={() => this.editMaterial(this.state)}
                                style={styles.btnWide}
                            >
                                <Text style={styles.btnLabel}>Edit selected material</Text>
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
    materialNameContainer: {
        lineHeight: 75,
        width: '90%',
        marginLeft: '5%',
        marginTop: 0,
        marginBottom: 10,
        borderColor: 'gray',
        fontFamily: "roboto-regular",
        color: "#121212"
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
    editMaterial: {
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
