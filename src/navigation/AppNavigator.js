import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import SplashScreen from '../screens/SplashScreen';
import FirstTimeScreen from '../screens/FirstTimeScreen';
import TutorialScreen from '../screens/TutorialScreen';
import HomeScreen from '../screens/HomeScreen';
import ModeSelectScreen from '../screens/ModeSelectScreen';
import MisterioConfirmScreen from '../screens/MisterioConfirmScreen';
import GrupoRolScreen from '../screens/GrupoRolScreen';
import GrupoSetupScreen from '../screens/GrupoSetupScreen';
import RezoScreen from '../screens/RezoScreen';
import RezoGrupoScreen from '../screens/RezoGrupoScreen';
import FinScreen from '../screens/FinScreen';
import AprenderScreen from '../screens/AprenderScreen';
import { MISTERIOS } from '../data/rosario';

const Stack = createStackNavigator();

// Wrapper para precargar RezoGrupo con parámetros de prueba
function RezoGrupoLiderPreview({ navigation }) {
  return (
    <RezoGrupoScreen
      navigation={navigation}
      route={{ params: { misterio: MISTERIOS.dolorosos, rol: 'lider' } }}
    />
  );
}
function RezoGrupoParticipantePreview({ navigation }) {
  // _initialStep: posición de la 5ta Avemaría de la primera década
  return (
    <RezoGrupoScreen
      navigation={navigation}
      route={{ params: { misterio: MISTERIOS.dolorosos, rol: 'grupo', _initialStep: 14 } }}
    />
  );
}

export default function AppNavigator() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Splash"
        screenOptions={{
          headerShown: false,
          cardStyle: { backgroundColor: '#1A1A2E' },
          animationEnabled: true,
          cardStyleInterpolator: ({ current }) => ({
            cardStyle: { opacity: current.progress },
          }),
          transitionSpec: {
            open: { animation: 'timing', config: { duration: 350 } },
            close: { animation: 'timing', config: { duration: 280 } },
          },
        }}
      >
        <Stack.Screen name="Splash" component={SplashScreen} />
        <Stack.Screen name="FirstTime" component={FirstTimeScreen} />
        <Stack.Screen name="Tutorial" component={TutorialScreen} />
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="ModeSelect" component={ModeSelectScreen} />
        <Stack.Screen name="MisterioConfirm" component={MisterioConfirmScreen} />
        <Stack.Screen name="GrupoRol" component={GrupoRolScreen} />
        <Stack.Screen name="GrupoSetup" component={GrupoSetupScreen} />
        <Stack.Screen name="Rezo" component={RezoScreen} />
        <Stack.Screen name="RezoGrupo" component={RezoGrupoScreen} />
        <Stack.Screen name="RezoGrupoLider" component={RezoGrupoLiderPreview} />
        <Stack.Screen name="RezoGrupoParticipante" component={RezoGrupoParticipantePreview} />
        <Stack.Screen name="Fin" component={FinScreen} />
        <Stack.Screen name="Aprender" component={AprenderScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
