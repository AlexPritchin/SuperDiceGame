import { useCallback, useEffect, useState } from 'react';
import { Alert, StyleSheet, Text, View } from 'react-native';
import Button from '../components/Button';
import { MainColors } from '../data/colors';
import DiceImage from '../components/DiceImage';
import LeaguesView from '../components/LeaguesView';
import { useGameContext } from '../store/context';
import * as ScreenOrientation from 'expo-screen-orientation';

const MainScreen = () => {
  const [isPortraitMode, setIsPortraitMode] = useState(true);
  const [diceNumber, setDiceNumber] = useState(0);
  const { dispatch } = useGameContext();

  useEffect(() => {
    const subscription =
      ScreenOrientation.addOrientationChangeListener(onOrientationChange);

    return () => {
      ScreenOrientation.removeOrientationChangeListener(subscription);
    };
  }, []);

  const onOrientationChange = event => {
    setIsPortraitMode(event.orientationInfo.orientation === 1);
  };

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
    <View style={[styles.mainContainer, !isPortraitMode && { gap: 20 }]}>
      <Text style={[styles.header, !isPortraitMode && { marginTop: 10 }]}>
        Super Dice Game
      </Text>
      <View
        style={[
          {
            flexDirection: isPortraitMode ? 'column' : 'row',
            gap: isPortraitMode ? 40 : 0,
          },
          !isPortraitMode && {
            width: '100%',
            justifyContent: 'space-evenly',
          },
        ]}
      >
        <View
          style={[
            {
              alignItems: isPortraitMode ? 'center' : 'flex-end',
            },
            !isPortraitMode && {
              flex: 1,
            },
          ]}
        >
          <View style={{ alignItems: 'center', gap: isPortraitMode ? 40 : 20 }}>
            <LeaguesView isPortraitOrientation={isPortraitMode} />
            <Button
              title='Reset'
              isWarning
              onPressHandler={() => {
                pressResetButton();
              }}
            />
          </View>
        </View>
        <View
          style={[
            { alignItems: 'center', gap: isPortraitMode ? 40 : 60 },
            !isPortraitMode && { flex: 1 },
          ]}
        >
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
        </View>
      </View>
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
    marginTop: 55,
    marginBottom: -5,
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
