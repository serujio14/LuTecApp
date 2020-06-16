import React, { Component } from "react";
import {StyleSheet, View, Text, Image, TouchableOpacity, TextInput, ActivityIndicator, Alert, ScrollView, Dimensions, SafeAreaView, StatusBar} from "react-native";
import Dialog from "react-native-dialog";

const { height } = Dimensions.get('window');

export default class CreateAccount extends Component {

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
            if (this.state.Name !== '' && this.state.TecID !== '' && this.state.Email !== '' &&
                this.state.Password !== '' && this.state.PasswordConfirm !== '') {
                return true;
            } else {
                return false
            }
        }else{
            Alert.alert("Check password", "Password and password confirmation must match");
            return false;
        }
    };

    createAccount(state) {

        if (this.CheckTextInput()) {

            //console.log('adding')

            this.setState({isLoading: true});

            fetch("http://192.168.0.4/lutecapp.com/service.php?who=create_user&api_key=5183723902398237640&Name="
                +state.Name + "&TecID=" + state.TecID + "&Email=" + state.Email + "&Password=" + state.Password, {
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json',
                    },
                }
            )
                .then(response => response.json())
                .then((responseJson) => {

                    //console.log('worked')
                    //console.log(responseJson)

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
            Alert.alert("Error", "Please Fill All Spaces");
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

        const scrollEnabled = this.state.screenHeight > height;

        if (this.state.isLoading) {
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
                    <Text style={styles.title}>Create account</Text>
                    <StatusBar barStyle="light-content" backgroundColor="#468189" />

                    <ScrollView
                        style={{ flex: 1 }}
                        contentContainerStyle={styles.scrollview}
                        scrollEnabled={scrollEnabled}
                        onContentSizeChange={this.onContentSizeChange}
                    >

                        <View style={styles.container}>
                            <Dialog.Container visible={this.state.dialogVisible}>
                                <Dialog.Title>Account Created</Dialog.Title>
                                <Dialog.Description>
                                    The new account has been created
                                </Dialog.Description>
                                <Dialog.Button label="Continue" onPress={this.handleCancel} />
                            </Dialog.Container>

                            <Dialog.Container visible={this.state.dialogFailVisible}>
                                <Dialog.Title>Account Not Created</Dialog.Title>
                                <Dialog.Description>
                                    There has been an error creating the account. Please try again
                                </Dialog.Description>
                                <Dialog.Button label="Continue" onPress={this.handleCancel} />
                            </Dialog.Container>


                            <Text style={styles.label}>Name</Text>
                            <TextInput
                                value={this.state.Name}
                                onChangeText={this.handleChangeTextName}
                                style={styles.textbox}
                            ></TextInput>

                            <Text style={styles.label}>TEC ID</Text>
                            <TextInput
                                value={this.state.TecID}
                                keyboardType = 'numeric'
                                maxLength={9}
                                secureTextEntry={false}
                                onChangeText={this.handleChangeTextTecID}
                                style={styles.textbox}
                            ></TextInput>

                            <Text style={styles.label}>Email</Text>
                            <TextInput
                                value={this.state.Email}
                                onChangeText={this.handleChangeTextEmail}
                                style={styles.textbox}
                            ></TextInput>

                            <Text style={styles.label}>Password</Text>
                            <TextInput
                                value={this.state.Password}
                                onChangeText={this.handleChangeTextPassword}
                                style={styles.textbox}
                            ></TextInput>

                            <Text style={styles.label}>Confirm password</Text>
                            <TextInput
                                value={this.state.PasswordConfirm}
                                onChangeText={this.handleChangeTextPasswordConfirm}
                                style={styles.textbox}
                            ></TextInput>
                        </View>

                        <TouchableOpacity
                            onPress={() => this.createAccount(this.state)}
                            style={styles.btnWide}
                        >
                            <Text style={styles.btnLabel}>CREATE ACCOUNT</Text>
                        </TouchableOpacity>
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
    scrollview: {
        flexGrow: 1,
    },
    content: {
        flexGrow: 1,
        justifyContent: "space-between",
        padding: 10,
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
        height: 150,
        backgroundColor: "rgba(3,85,73,1)"
    },
    image: {
        width: 329,
        height: 84,
        marginTop: 30,
        alignSelf: 'center'
    },
    title: {
        height: 48,
        backgroundColor: "rgba(45,45,45,1)",
        fontFamily: "roboto-regular",
        color: "rgba(251,251,251,1)",
        fontSize: 24,
        textAlign: "center",
        marginBottom: 20,
        lineHeight: 56
    },
    label: {
        fontFamily: "roboto-regular",
        color: "#595A5C",
        flexDirection: "row",
        marginTop: 15,
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
    btnWide: {
        width: '100%',
        height: 54,
        marginTop: 15,
        backgroundColor: "rgba(0,150,136,1)",
        alignSelf: 'stretch',
        textAlign: 'center'
    },
    btnLabel: {
        fontFamily: "roboto-regular",
        color: "rgba(255,255,255,1)",
        textAlign: "center",
        marginTop: 19
    },
});