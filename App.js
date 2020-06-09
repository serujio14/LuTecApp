import React, { useState } from "react";
import { createAppContainer } from "react-navigation";
import { createStackNavigator } from "react-navigation-stack";
import { createDrawerNavigator } from "react-navigation-drawer";
import { AppLoading } from "expo";
import * as Font from "expo-font";
import AdminAddMaterial from "./src/screens/AdminAddMaterial";
import CreateAccount from "./src/screens/CreateAccount";
import EpilogModule from "./src/screens/EpilogModule";
import EpilogModuleAdmin from "./src/screens/EpilogModuleAdmin";
import LuTecApp from "./src/screens/LuTecApp";
import Main from "./src/screens/Main";
import ProjectCreate from "./src/screens/ProjectCreate";
import ProjectDetail from "./src/screens/ProjectDetail";
import ProjectsModule from "./src/screens/ProjectsModule";
import Login from "./src/screens/Login";
import ForgotPassword from "./src/screens/ForgotPassword";
import AdminEditMaterial from "./src/screens/AdminEditMaterial";

const DrawerNavigation = createDrawerNavigator({
    ProjectCreate: ProjectCreate,
    Login: Login,
    EpilogModule: EpilogModule,
    CreateAccount: CreateAccount,
    AdminAddMaterial: AdminAddMaterial,
    LuTecApp: LuTecApp,
    Main: Main,
    EpilogModuleAdmin: EpilogModuleAdmin,
    AdminEditMaterial: AdminEditMaterial,
    ProjectDetail: ProjectDetail,
    ProjectsModule: ProjectsModule,
    ForgotPassword: ForgotPassword
});

const StackNavigation = createStackNavigator(
    {
        DrawerNavigation: {
            screen: DrawerNavigation
        },

        ProjectCreate: ProjectCreate,
        Login: Login,
        EpilogModule: EpilogModule,
        CreateAccount: CreateAccount,
        AdminAddMaterial: AdminAddMaterial,
        LuTecApp: LuTecApp,
        Main: Main,
        EpilogModuleAdmin: EpilogModuleAdmin,
        AdminEditMaterial: AdminEditMaterial,
        ProjectDetail: ProjectDetail,
        ProjectsModule: ProjectsModule,
        ForgotPassword: ForgotPassword
    },
    {
        headerMode: "none"
    }
);

const AppContainer = createAppContainer(StackNavigation);

function App() {
    const [isLoadingComplete, setLoadingComplete] = useState(false);
    if (!isLoadingComplete) {
        return (
            <AppLoading
                startAsync={loadResourcesAsync}
                onError={handleLoadingError}
                onFinish={() => handleFinishLoading(setLoadingComplete)}
            />
        );
    } else {
        return isLoadingComplete ? <AppContainer /> : <AppLoading />;
    }
}
async function loadResourcesAsync() {
    await Promise.all([
        Font.loadAsync({
            "roboto-regular": require("./src/assets/fonts/roboto-regular.ttf")
        })
    ]);
}
function handleLoadingError(error) {
    console.warn(error);
}

function handleFinishLoading(setLoadingComplete) {
    setLoadingComplete(true);
}



export default App;
