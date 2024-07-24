import MainScreen from './src/screens/MainScreen';
import { GameContextProvider } from './src/store/context';
import * as SplashScreen from 'expo-splash-screen';
import { useCallback, useEffect, useState } from 'react';

SplashScreen.preventAutoHideAsync();

export default function App() {
  const [needToHideSplash, setNeedToHideSplash] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      setNeedToHideSplash(true);
    }, 500);
  }, []);

  const onLayoutRootView = useCallback(async () => {
    if (needToHideSplash) {
      await SplashScreen.hideAsync();
    }
  }, [needToHideSplash]);

  if (!needToHideSplash) {
    return null;
  }

  return (
    <GameContextProvider>
      <MainScreen onLayoutHandler={onLayoutRootView} />
    </GameContextProvider>
  );
}
