/**
 * @format
 */
import React from 'react';
import { TextStyle } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import {
  createNativeStackNavigator,
  NativeStackNavigationOptions,
} from '@react-navigation/native-stack';
import { navigationRef } from './navigationRef';
import { RootStackParamList } from 'interface';
import Home from 'screens/Home';
import LogIn from 'screens/LogIn';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { STORAGE_KEY } from 'globals';

const Stack = createNativeStackNavigator<RootStackParamList>();

function NavContainer() {

  const [loading, setLoading] = React.useState(true);
  const [route, setRoute] = React.useState<
    keyof RootStackParamList | undefined
  >(undefined);

  const screenOptions: NativeStackNavigationOptions = React.useMemo(() => {
    const headerTitleStyle: Pick<
      TextStyle,
      'fontFamily' | 'fontSize' | 'fontWeight' | 'letterSpacing'
    > & {
      color?: string;
    } = {
      fontSize: 18,
      letterSpacing: 0.3,
      fontWeight: '500',
    };

    return {
      headerStyle: {
        backgroundColor: 'white',
        borderBottomColor: 'transparent',
        shadowColor: 'transparent',
        borderBottomWidth: 0,
        elevation: 0,
        shadowOpacity: 0,
      },
      headerTitleStyle,
      headerShadowVisible: false,
    };
  }, []);

  React.useEffect(() => {
    const checkUserIsLoggedIn = async () => {
      const isLoggedIn = Boolean(await AsyncStorage.getItem(STORAGE_KEY));

      if (isLoggedIn) {
        setRoute('Home');
      } else {
        setRoute('LogIn');
      }
      setLoading(false);
    }

    checkUserIsLoggedIn();
  }, []);

  return loading ? null : (
    <NavigationContainer ref={navigationRef}>
      <Stack.Navigator
        initialRouteName={route}
        screenOptions={screenOptions}>
        <Stack.Screen component={Home} name="Home" />
        <Stack.Screen
          component={LogIn}
          name="LogIn"
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default NavContainer;
