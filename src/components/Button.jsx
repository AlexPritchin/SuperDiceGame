import { StyleSheet, Text, TouchableOpacity } from 'react-native';
import { Colors } from '../data/colors';

const Button = ({ onPressHandler, title, isPrimary, isWarning }) => {
  return (
    <TouchableOpacity
      style={[
        styles.mainContainer,
        isPrimary && styles.primaryContainer,
        isWarning && styles.warningContainer,
      ]}
      onPress={onPressHandler}
    >
      <Text
        style={[
          isPrimary && styles.primaryText,
          isWarning && styles.warningText,
        ]}
      >
        {title}
      </Text>
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
  },
  primaryContainer: {
    backgroundColor: Colors.primary,
  },
  primaryText: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  warningContainer: {
    borderWidth: 1,
    borderColor: Colors.warningBorder,
  },
  warningText: {
    fontSize: 18,
    color: Colors.warningText,
  },
});

export default Button;
