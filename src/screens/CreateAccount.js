import React, { Component } from "react";
import {StyleSheet, View, Text, Image, TouchableOpacity, TextInput, ActivityIndicator, ScrollView, Dimensions, SafeAreaView} from "react-native";
import Dialog from "react-native-dialog";
export default class CreateAccount extends Component {

    state = {
        screenHeight: height,
    };

    onContentSizeChange = (contentWidth, contentHeight) => {
        this.setState({ screenHeight: contentHeight });
    };

    constructor(props) {
        super(props);
        this.state = {
            isLoading: false,
            dataSource: null,
            Name : "",
            TecID : "",
            Email: "",
            Password : "",
            PasswordConfirm: "",
            visible : false,
            dialogVisible: false,
            dialogFailVisible: false
        }

        this.handleChangeTextName = this.handleChangeTextName.bind(this)
        this.handleChangeTextTecID = this.handleChangeTextTecID.bind(this)
        this.handleChangeTextEmail = this.handleChangeTextEmail.bind(this)
        this.handleChangeTextPassword = this.handleChangeTextPassword.bind(this)
        this.handleChangeTextPasswordConfirm = this.handleChangeTextPasswordConfirm.bind(this)
        this.handleCancel = this.handleCancel.bind(this)
        this.createAccount = this.createAccount.bind(this)
        this.CheckTextInput = this.CheckTextInput.bind(this)
        this.handleCancel = this.handleCancel.bind(this)
    }

    CheckTextInput = () => {

        if(this.state.Password === this.state.PasswordConfirm){
            if (this.state.Name != '' && this.state.TecID != '' && this.state.Email != '' &&
                this.state.Password != '' && this.state.PasswordConfirm != '') {



                return true;

            } else {
                return false
            }
        }else{

            return true;

        }
    };

    createAccount(state) {

        if (this.CheckTextInput()) {

            console.log('adding')

            this.setState({isLoading: true});

            fetch("http://192.168.0.4/lutecapp.com/service.php?who=create_user&api_key=5183723902398237640&Name=" +
                +state.Name + "&TecID=" + state.TecID + "&Email=" + state.Email + "&Password=" + state.Password, {
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json',
                    },
                }
            )
                .then(response => response.json())
                .then((responseJson) => {

                    console.log('worked')
                    console.log(responseJson)

                    if (responseJson.Response == 1) {
                        this.setState({
                            isLoading: false,
                            dialogVisible: true,
                            Name: "",
                            TecID: "",
                            Email: "",
                            Password: "",
                            PasswordConfirm: "",
                        });
                    } else {
                        this.setState({
                            isLoading: false,
                            dialogFailVisible: true,
                        });
                    }

                })
                .catch((error) => {
                    console.log('error')
                    console.error(error)
                });
        } else {
            alert('Please Fill All Spaces and Passwords must match');
        }
    }

    handleCancel = () => {
        this.setState({ dialogVisible: false });
    };

    handleChangeTextName(text){
        this.setState({Name : text})
    }
    handleChangeTextTecID(text){
        this.setState({TecID : text})
    }

    handleChangeTextEmail(text){
        this.setState({Email : text})
    }

    handleChangeTextPassword(text){
        this.setState({Password : text})
    }
    handleChangeTextPasswordConfirm(text){
        this.setState({PasswordConfirm : text})
    }


    render() {

        if (this.state.isLoading) {

            return <View style={styles.containerLoader}>
                <View style={styles.horizontal}>
                    <ActivityIndicator size="large" color="#009688" />
                </View>
            </View>

        } else{

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

                    <Text style={styles.label}>Name</Text>
                    {/* - - - - - - TEXTBOX - - - - - - -*/}
                    <TextInput
                        value={this.state.Name}
                        onChangeText={this.handleChangeTextName}
                        style={styles.textbox}
                    ></TextInput>

                    <Text style={styles.label}>TEC ID</Text>
                    {/* - - - - - - TEXTBOX - - - - - - -*/}
                    <TextInput
                        value={this.state.TecID}
                        onChangeText={this.handleChangeTextTecID}
                        style={styles.textbox}
                    ></TextInput>

                    <Text style={styles.label}>Email</Text>
                    {/* - - - - - - TEXTBOX - - - - - - -*/}
                    <TextInput
                        value={this.state.Email}
                        onChangeText={this.handleChangeTextEmail}
                        style={styles.textbox}
                    ></TextInput>

                    <Text style={styles.label}>Password</Text>
                    {/* - - - - - - TEXTBOX - - - - - - -*/}
                    <TextInput
                        value={this.state.Password}
                        onChangeText={this.handleChangeTextPassword}
                        style={styles.textbox}
                    ></TextInput>

                    <Text style={styles.label}>Confirm password</Text>
                    {/* - - - - - - TEXTBOX - - - - - - -*/}
                    <TextInput
                        value={this.state.PasswordConfirm}
                        onChangeText={this.handleChangeTextPasswordConfirm}
                        style={styles.textbox}
                    ></TextInput>

                    {/* - - - - - - BTN - - - - - - -*/}
                    <TouchableOpacity
                        onPress={() => this.createAccount(this.state)}
                        style={styles.btnWide}
                    >
                        <Text style={styles.btnLabel}>CREATE ACCOUNT</Text>
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
        marginLeft: 30,
        marginRight: 30,
        marginBottom: 25,
        paddingBottom: 2,
        borderBottomWidth: 1,
        borderBottomColor: 'gray',
        textAlign: "center",
        color: 'gray'
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
    materialFixedLabelTextbox3Stack: {
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
    materialFixedLabelTextbox4Stack: {
        width: 151,
        height: 58,
        marginLeft: 28
    },
    materialFixedLabelTextbox3StackRow: {
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