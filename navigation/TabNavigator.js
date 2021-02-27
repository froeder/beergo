import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import { AppStack } from "./AppStack";

const Tab = createBottomTabNavigator();

const BottomTabNavigator = () => {
  return (
    <Tab.Navigator>
      <Tab.Screen name="Home" component={AppStack} />
    </Tab.Navigator>
  );
};

export default BottomTabNavigator;