import { useCallback, useState } from 'react';
import { Alert, StyleSheet, Text, View } from 'react-native';
import Button from '../components/Button';
import { MainColors } from '../data/colors';
import DiceImage from '../components/DiceImage';
import LeaguesView from '../components/LeaguesView';
import { useGameContext } from '../store/context';

const MainScreen = () => {
  const [diceNumber, setDiceNumber] = useState(0);
  const { dispatch } = useGameContext();

  const rollTheDice = useCallback(() => {
    return Math.floor(Math.random() * 6) + 1;
  }, []);

  const pressRollButton = () => {
    const newDiceNumber = rollTheDice();
    dispatch({
      type: 'changePlayerScore',
      previousDiceNumber: diceNumber,
      currentDiceNumber: newDiceNumber,
    });
    setDiceNumber(newDiceNumber);
  };

  const pressResetButton = () => {
    Alert.alert('Warning', 'Do you really want to reset your score?', [
      {
        text: 'No',
        style: 'cancel',
      },
      {
        text: 'Yes',
        onPress: () => {
          setDiceNumber(0);
          dispatch({
            type: 'resetPlayerScore',
          });
        },
      },
    ]);
  };

  return (
    <View style={styles.mainContainer}>
      <Text style={styles.header}>Super Dice Game</Text>
      <View style={styles.imageContainer}>
        <DiceImage imageNumber={diceNumber} />
      </View>
      <Button
        title='Roll'
        isPrimary
        onPressHandler={() => {
          pressRollButton();
        }}
      />
      <LeaguesView />
      <Button
        title='Reset'
        isWarning
        onPressHandler={() => {
          pressResetButton();
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    gap: 40,
    alignItems: 'center',
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginTop: 60,
  },
  imageContainer: {
    height: 200,
    width: 200,
    borderRadius: 16,
    backgroundColor: MainColors.primary,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default MainScreen;
