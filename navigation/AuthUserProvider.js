import React, { useState, createContext } from 'react';
import { View,ImageBackground, Dimensions, ScrollView, Button,ActivityIndicator,  Text, SafeAreaView } from 'react-native';

import { logout } from '../components/Firebase/firebase';
import  AppHeader  from "../screens/pages/AppHeader";
import colors from '../utils/colors';

export const AuthUserContext = createContext({});

export function AuthUserProvider({ children}) {

  const [user, setUser] = useState(null);
  // const navigation = useNavigation();

  return (
    <AuthUserContext.Provider value={{ user, setUser }}>
      {children}
    </AuthUserContext.Provider>
  );
};