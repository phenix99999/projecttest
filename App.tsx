import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import useCachedResources from './src/hooks/useCachedResources';
// import { AppLoading } from 'expo';

import useColorScheme from './src/hooks/useColorScheme';
import Navigation from './src/navigation';
import { getNavigationState } from './src/utils/PersistState'
import stores from './src/stores/index';
import SyncStorage from 'sync-storage';

import * as Sentry from 'sentry-expo';

Sentry.init({
  dsn: "https://8512204ef146468db4a9f0a88e454588@o1066116.ingest.sentry.io/6058632",
  // Set tracesSampleRate to 1.0 to capture 100% of transactions for performance monitoring.
  // We recommend adjusting this value in production.
  enableInExpoDevelopment: true,
  tracesSampleRate: 1.0,
});
export default function App() {
  const isLoadingComplete = useCachedResources();
  const colorScheme = useColorScheme();

  const [routeName, setRouteName] = React.useState<null | 'Login' | 'Logout'>(null);


  React.useEffect(() => {
    const getRouteName = async () => {
      const routeName = await getNavigationState();
      setRouteName(routeName)
    };

    const initSync = async () => {
      const data = await SyncStorage.init();
    };


    initSync();
    getRouteName();



  }, []);

  if (!isLoadingComplete || !routeName) {
    // return <AppLoading />;
    return null;
  }

  return (
    <SafeAreaProvider>
      <Navigation colorScheme={colorScheme} initialRouteName={routeName} />
      <StatusBar />
    </SafeAreaProvider>


  );
}
