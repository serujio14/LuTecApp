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
    Main: Main,
    ProjectsModule: ProjectsModule,
    CreateAccount: CreateAccount,
    ForgotPassword: ForgotPassword,
    Login: Login,
    LuTecApp: LuTecApp,
    ProjectDetail: ProjectDetail,
    ProjectCreate: ProjectCreate,
    EpilogModule: EpilogModule,
    EpilogModuleAdmin: EpilogModuleAdmin,
    AdminEditMaterial: AdminEditMaterial,
    AdminAddMaterial: AdminAddMaterial
});

const StackNavigation = createStackNavigator(
    {
        DrawerNavigation: {
            screen: DrawerNavigation
        },
        ProjectsModule: ProjectsModule,
        Main: Main,
        Login: Login,
        CreateAccount: CreateAccount,
        ForgotPassword: ForgotPassword,
        LuTecApp: LuTecApp,
        ProjectCreate: ProjectCreate,
        ProjectDetail: ProjectDetail,
        EpilogModule: EpilogModule,
        EpilogModuleAdmin: EpilogModuleAdmin,
        AdminAddMaterial: AdminAddMaterial,
        AdminEditMaterial: AdminEditMaterial
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
