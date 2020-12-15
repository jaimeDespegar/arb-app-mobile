import * as React from 'react';
import { AsyncStorage, I18nManager, Platform, YellowBox } from 'react-native';
import { Updates } from 'expo';
import { useKeepAwake } from 'expo-keep-awake';
import { InitialState, NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import {
  Provider as PaperProvider,
  DarkTheme,
  DefaultTheme,
  Theme,
} from 'react-native-paper';

import App from './RootNavigator';
import MenuItems from './MenuItems';
import EntranceParkingComponent from './components/EntranceParkingComponent';
import EditRegisterComponent from './components/EditRegisterComponent';
import RegisterComponent from './components/RegisterComponent';

import { SafeAreaProvider } from 'react-native-safe-area-context';
import AvailabilityParkingComponent from './components/AvailabilityParkingComponent';
import LoginComponent from './components/LoginComponent';
import HistoryComponent from './components/HistoryComponent';
import StateBikeComponent from './components/StateBikeComponent';
import RecoveryAccountComponent from './components/RecoveryAccountComponent';
import StayBikeNavigation from './components/StayBikeNavigation';



//YellowBox.ignoreWarnings(['Require cycle:']);

const PERSISTENCE_KEY = 'NAVIGATION_STATE';
const PREFERENCES_KEY = 'APP_PREFERENCES';

const PreferencesContext = React.createContext<any>(null);

const DrawerContent = () => {
  return (
    <PreferencesContext.Consumer>
      {preferences => (
        <MenuItems
          toggleTheme={preferences.toggleTheme}
          toggleRTL={preferences.toggleRtl}
          isRTL={preferences.rtl}
          isDarkTheme={preferences.theme === DarkTheme}
        />
      )}
    </PreferencesContext.Consumer>
  );
};

//const Drawer = createDrawerNavigator<{ Home: undefined }>();
const Drawer = createDrawerNavigator();

export default function PaperExample() {
  useKeepAwake();

  const [isReady, setIsReady] = React.useState(false);
  const [initialState, setInitialState] = React.useState<
    InitialState | undefined
  >();

  const [theme, setTheme] = React.useState<Theme>(DefaultTheme);
  const [rtl, setRtl] = React.useState<boolean>(I18nManager.isRTL);

  React.useEffect(() => {
    const restoreState = async () => {
      try {
        const savedStateString = await AsyncStorage.getItem(PERSISTENCE_KEY);
        const state = JSON.parse(savedStateString || '');

        setInitialState(state);
      } catch (e) {
        // ignore error
      } finally {
        setIsReady(true);
      }
    };

    if (!isReady) {
      restoreState();
    }
  }, [isReady]);

  React.useEffect(() => {
    const restorePrefs = async () => {
      try {
        const prefString = await AsyncStorage.getItem(PREFERENCES_KEY);
        const preferences = JSON.parse(prefString || '');

        if (preferences) {
          // eslint-disable-next-line react/no-did-mount-set-state
          setTheme(preferences.theme === 'dark' ? DarkTheme : DefaultTheme);

          if (typeof preferences.rtl === 'boolean') {
            setRtl(preferences.rtl);
          }
        }
      } catch (e) {
        // ignore error
      }
    };

    restorePrefs();
  }, []);

  React.useEffect(() => {
    const savePrefs = async () => {
      try {
        await AsyncStorage.setItem(
          PREFERENCES_KEY,
          JSON.stringify({
            theme: theme === DarkTheme ? 'dark' : 'light',
            rtl,
          })
        );
      } catch (e) {
        // ignore error
      }

      if (I18nManager.isRTL !== rtl) {
        I18nManager.forceRTL(rtl);
        Updates.reloadFromCache();
      }
    };

    savePrefs();
  }, [rtl, theme]);

  const preferences = React.useMemo(
    () => ({
      toggleTheme: () =>
        setTheme(theme => (theme === DefaultTheme ? DarkTheme : DefaultTheme)),
      toggleRtl: () => setRtl(rtl => !rtl),
      rtl,
      theme,
    }),
    [rtl, theme]
  );

  if (!isReady) {
    return null;
  }

  return (
    <PaperProvider theme={theme}>
      <SafeAreaProvider>
        <PreferencesContext.Provider value={preferences}>
          <React.Fragment>
            <NavigationContainer
              initialState={initialState}
              onStateChange={state =>
                AsyncStorage.setItem(PERSISTENCE_KEY, JSON.stringify(state))
              }
            >
              {Platform.OS === 'web' ? (
                <App />
              ) : (
                // <Drawer.Navigator drawerContent={() => <DrawerContent />}>
                //   <Drawer.Screen name="Home" component={App} />
                //   <Drawer.Screen name="Estadia" component={EntranceParkingComponent} />
                // </Drawer.Navigator>
                <Drawer.Navigator initialRouteName="Home">
                  {/* <Drawer.Screen name="Home" component={App} /> */}
                  <Drawer.Screen name="Home" component={LoginComponent} />
                  {/* <Drawer.Screen name="Estadia" component={EntranceParkingComponent} /> */}
                  <Drawer.Screen name="Estadia" component={StayBikeNavigation} />
                  <Drawer.Screen name="Disponibilidad" component={AvailabilityParkingComponent} />
                  <Drawer.Screen name="Historial" component={HistoryComponent} />
                  <Drawer.Screen name="Mi bicicleta" component={StateBikeComponent} />
                  <Drawer.Screen name="Mi perfil" component={RegisterComponent} />
                  <Drawer.Screen name="Editar perfil" component={EditRegisterComponent} />
                  <Drawer.Screen name="Recuperar contraseña" component={RecoveryAccountComponent} />
                  <Drawer.Screen name="App" component={App} />
                  <Drawer.Screen name="Cerrar sesión" component={MenuItems} />
                </Drawer.Navigator>
              )}
            </NavigationContainer>
          </React.Fragment>
        </PreferencesContext.Provider>
      </SafeAreaProvider>
    </PaperProvider>
  );
}