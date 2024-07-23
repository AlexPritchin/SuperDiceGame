import MainScreen from './src/screens/MainScreen';
import { GameContextProvider } from './src/store/context';

export default function App() {
  return (
    <GameContextProvider>
      <MainScreen />
    </GameContextProvider>
  );
}
