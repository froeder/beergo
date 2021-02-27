import * as React from "react";
import { View } from "react-native";
import { createDrawerNavigator } from "@react-navigation/drawer";
import {
  createStackNavigator,
  HeaderBackButton,
} from "@react-navigation/stack";

import HomeScreen from "../screens/pages/HomeScreen";
import ComunidadeScreen from "../screens/pages/Comunidade/ComunidadeScreen";
import QuestionariosScreen from "../screens/pages/Questionarios/QuestionariosScreen";

import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Ionicons from "react-native-vector-icons/Ionicons";
import colors from "../utils/colors";

const Drawer = createDrawerNavigator();
const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

function Comunidade({ navigation, user }) {
  return (
    <Stack.Navigator initialRouteName="Comunidade">
      <Stack.Screen
        name="Comunidade"
        canGoBack
        options={{
          headerLeft: (props) => (
            <HeaderBackButton
              {...props}
              onPress={() => {
                navigation.goBack();
              }}
            />
          ),
          headerTintColor: colors.primary,
        }}
        component={ComunidadeScreen}
      />
      <Stack.Screen name="Postar" component={PostarScreen} />
      <Stack.Screen name="Comentar" component={ComunidadeScreen} />
      <Stack.Screen name="Comentários" component={ComentariosScreen} />
    </Stack.Navigator>
  );
}

function Home({ navigation, user }) {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          if (route.name === "Home") {
            iconName = "ios-home";
          } else if (route.name === "Aulas") {
            iconName = focused ? "ios-list-box" : "ios-list";
          } else if (route.name === "Golpes") {
            iconName = "ios-list-box";
          } else if (route.name === "Comunidade") {
            iconName = "ios-globe";
            size = 35;
          } else if (route.name === "Perfil") {
            iconName = "ios-person";
          }

          // You can return any component that you like here!
          return <Ionicons name={iconName} size={size} color={color} />;
        },
      })}
    >
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Comunidade" component={Comunidade} user={user} />
    </Tab.Navigator>
  );
}

export default function AppStack({ user }) {
  return (
    <Drawer.Navigator initialRouteName="Home">
      <Drawer.Screen name="Home" component={Home} />
      <Drawer.Screen name="Questionário" component={QuestionariosScreen} />
    </Drawer.Navigator>
  );
}
