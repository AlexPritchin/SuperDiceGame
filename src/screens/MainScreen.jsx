import { StyleSheet, Text, View } from 'react-native';
import Button from '../components/Button';
import { Colors } from '../data/colors';

const MainScreen = () => {
  return (
    <View style={styles.mainContainer}>
      <Text style={styles.header}>Super Dice Game</Text>
      <View style={styles.imageContainer}></View>
      <Button title='Roll' isPrimary />
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
  },
});

export default MainScreen;
