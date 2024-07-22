import { StyleSheet, Text, TouchableOpacity } from 'react-native';

const Button = ({ onPressHandler, title }) => {
  return (
    <TouchableOpacity style={styles.mainContainer} onPress={onPressHandler}>
      <Text>{title}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    height: 40,
    width: 160,
    borderRadius: 8,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
  },
});

export default Button;
