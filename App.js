import * as React from 'react';
import {NavigationContainer} from '@react-navigation/native';

import {navigationRef} from './app/components/navigation/root-navigation';
import AuthContextProvider from './app/components/context/auth-context-provider';

function App() {
  return (
    <NavigationContainer ref={navigationRef}>
      <AuthContextProvider />
    </NavigationContainer>
  );
}

export default App;
