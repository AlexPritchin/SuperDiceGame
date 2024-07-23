import { StyleSheet, Text, View } from 'react-native';
import { MainColors } from '../data/colors';
import { Leagues } from '../data/leagues';

const LeaguesView = () => {
  const leaguesToDisplay = Leagues.slice(0, 5);
  leaguesToDisplay.reverse();

  return (
    <View style={styles.mainContainer}>
      {leaguesToDisplay.map((league, index) => (
        <View key={index} style={styles.leagueContainer}>
          <Text style={[styles.text, league.nameStyle]}>{league.name}</Text>
          <Text style={[styles.text, league.scoreStyle]}>{league.score}</Text>
        </View>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    height: 300,
    width: 340,
    borderWidth: 1,
    borderColor: MainColors.primary,
    borderRadius: 16,
    justifyContent: 'space-between',
    paddingHorizontal: 10,
    paddingTop: 10,
    paddingBottom: 13,
  },
  leagueContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  text: {
    fontSize: 28,
    fontWeight: 'bold',
  },
});

export default LeaguesView;
