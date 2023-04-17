import {StyleSheet} from 'react-native';

const WelcomeScreenStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'red',
  },
  viewAppIcon: {flex: 1, alignItems: 'center', justifyContent: 'center'},
  welcomeText: {
    textAlign: 'center',
    fontSize: 24,
  },
  btnNTxt: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
  },
});
export default WelcomeScreenStyles;
