import 'react-native-gesture-handler';
import React from 'react';
import { View, StatusBar } from 'react-native';

import Routes from './routes';
import AppContainer from './hooks';

const App: React.FC = () => (
  <View style={{ backgroundColor: '#EBEEF8', flex: 1 }}>
    <AppContainer>
      <StatusBar
        barStyle="dark-content"
        translucent
        backgroundColor="#EBEEF8"
      />
      <Routes />
    </AppContainer>
  </View>
);

export default App;
