import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import { Image } from 'react-native';

import FeatherIcon from 'react-native-vector-icons/Feather';

import Dashboard from '../pages/Dashboard';
import Cart from '../pages/Cart';

import Logo from '../assets/logo.png';

const App = createStackNavigator();

const AppRoutes: React.FC = () => (
  <App.Navigator
    screenOptions={{
      headerShown: true,
      cardStyle: { backgroundColor: '#EBEEF8' },
    }}
    initialRouteName="Dashboard"
  >
    <App.Screen
      options={{
        headerShown: true,
        // headerTransparent: true,
        headerStatusBarHeight: 35,
        headerStyle: {
          backgroundColor: '#EBEEF8',
          shadowOpacity: 0,
          elevation: 0,
        },
        headerTitleAlign: 'center',
        headerTitle: () => <Image source={Logo} />,
      }}
      name="Dashboard"
      component={Dashboard}
    />
    <App.Screen
      options={{
        // headerTransparent: true,
        headerStatusBarHeight: 35,
        headerStyle: {
          backgroundColor: '#EBEEF8',
          shadowOpacity: 0,
          elevation: 0,
        },
        headerTitleAlign: 'center',
        headerTitle: () => <Image source={Logo} />,
        headerBackTitleVisible: false,
        headerLeftContainerStyle: {
          marginLeft: 10,
        },

        headerBackImage: () => (
          <FeatherIcon name="chevron-left" size={24} color="#E83F5B" />
        ),
      }}
      name="Cart"
      component={Cart}
    />
  </App.Navigator>
);

export default AppRoutes;
