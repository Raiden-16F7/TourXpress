import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from './screens/HomeScreen';
import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import { useEffect, useMemo } from 'react';
import { StatusBar } from 'expo-status-bar';
import DiscoverScreen from './screens/Discover';
import { useMaterial3Theme } from '@pchmn/expo-material3-theme';
import { useColorScheme } from 'react-native';
import {
  MD3DarkTheme,
  MD3LightTheme,
  Provider as PaperProvider,
} from 'react-native-paper';

SplashScreen.preventAutoHideAsync();

const Stack = createNativeStackNavigator();

export default function App() {
const colorScheme = useColorScheme();

const {theme} = useMaterial3Theme({sourceColor:'#00b294'})

  const paperTheme = useMemo(
    () =>
      colorScheme === 'dark' ? { ...MD3DarkTheme, colors: theme.dark } : { ...MD3LightTheme, colors: theme.light },
    [colorScheme, theme]
  );


  const [fontsLoaded] = useFonts({
    'Vercetti':require('./assets/fonts/Vercetti-Regular/Vercetti-Regular.ttf'),
    'Yatra': require('./assets/fonts/Yatra_One/YatraOne-Regular.ttf'),
    'BarberOutline':require("./assets/fonts/Barber-Outline.otf"),
    'BarberComplete':require("./assets/fonts/Barber-Complete.otf"),
    'BarberFill':require("./assets/fonts/Barber-Fill.otf"),
    'Barkhi':require('./assets/fonts/ciacode39_m.ttf'),
  });
  
  useEffect(()=>{
    async function hideSplashScreen() {
      await SplashScreen.hideAsync();
    }
    if (fontsLoaded) {
      hideSplashScreen();
    }
  },[fontsLoaded]);
 

  if(!fontsLoaded){
    return null;
  }
  return (

    <>
      <PaperProvider theme={paperTheme}>
      <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name='Discover' component={DiscoverScreen} />
      </Stack.Navigator>
        </NavigationContainer><StatusBar style="auto" animated />
      </PaperProvider>
      </>

  );
}

