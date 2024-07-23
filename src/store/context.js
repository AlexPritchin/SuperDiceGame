import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useReducer,
} from 'react';
import { Leagues, Player } from '../data/leagues';
import AsyncStorage from '@react-native-async-storage/async-storage';

const GameContext = createContext(undefined);

const initialPlayerScore = 0;

const scoresForDiceNumbers = [-20, -10, -5, 10, 30, 50];

const saveState = async playerScore => {
  try {
    await AsyncStorage.setItem('player-score', playerScore.toString());
  } catch (error) {
    console.log(error);
  }
};

const playerScoreReducer = (playerScore, action) => {
  switch (action.type) {
    case 'setPlayerScore': {
      return action.newPlayerScore;
    }
    case 'changePlayerScore': {
      const bonusModifier =
        action.currentDiceNumber > 3 &&
        action.currentDiceNumber === action.previousDiceNumber
          ? 2
          : 1;
      let newPlayerScore =
        playerScore +
        scoresForDiceNumbers[action.currentDiceNumber - 1] * bonusModifier;
      if (newPlayerScore < 0) {
        newPlayerScore = 0;
      }
      saveState(newPlayerScore);
      return newPlayerScore;
    }
    case 'resetPlayerScore': {
      saveState(0);
      return 0;
    }
    default:
      throw Error('Unknown action: ' + action.type);
  }
};

export const GameContextProvider = ({ children }) => {
  const [playerScore, dispatch] = useReducer(
    playerScoreReducer,
    initialPlayerScore
  );

  useEffect(() => {
    const getState = async () => {
      try {
        const savedPlayerScore = await AsyncStorage.getItem('player-score');
        if (savedPlayerScore !== null) {
          dispatch({
            type: 'setPlayerScore',
            newPlayerScore: Number(savedPlayerScore),
          });
        }
      } catch (error) {
        console.log(error);
      }
    };

    getState();
  }, []);

  const leaguesSliceToDisplay = useMemo(() => {
    const newLeagues = [
      {
        ...Player,
        score: playerScore,
      },
      ...Leagues,
    ];
    newLeagues.sort((itemA, itemB) => {
      if (itemA.score === itemB.score) {
        return 0;
      }
      return itemA.score > itemB.score ? -1 : 1;
    });
    const playerIndex = newLeagues.findIndex(item => item.name === 'You');
    let leaguesSlice = [];
    if (playerIndex < 3) {
      leaguesSlice = newLeagues.slice(0, 5);
    } else if (playerIndex > 7) {
      leaguesSlice = newLeagues.slice(6);
    } else {
      leaguesSlice = newLeagues.slice(playerIndex - 2, playerIndex + 3);
    }
    return leaguesSlice;
  }, [playerScore]);

  return (
    <GameContext.Provider
      value={{
        playerScore: playerScore,
        leaguesToDisplay: leaguesSliceToDisplay,
        dispatch: dispatch,
      }}
    >
      {children}
    </GameContext.Provider>
  );
};

export const useGameContext = () => useContext(GameContext);
