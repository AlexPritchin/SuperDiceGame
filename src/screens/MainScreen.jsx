import { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Button from '../components/Button';
import { Colors } from '../data/colors';
import DiceImage from '../components/DiceImage';

const MainScreen = () => {
  const [diceNumber, setDiceNumber] = useState(0);

  const rollTheDice = () => {
    return Math.floor(Math.random() * 6) + 1;
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
          setDiceNumber(rollTheDice());
        }}
      />
      <View
        style={{
          height: 300,
          width: 340,
          borderWidth: 1,
          borderColor: '#98D4BB',
          borderRadius: 16,
        }}
      ></View>
      <Button title='Reset' isWarning />
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
    backgroundColor: Colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default MainScreen;
