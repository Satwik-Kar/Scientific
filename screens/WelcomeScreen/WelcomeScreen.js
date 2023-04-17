import AsyncStorage from '@react-native-async-storage/async-storage';
import React from 'react';
import {View, Text, Image} from 'react-native';
import {Button} from 'react-native-paper';

import globalStyles from '../../components/globalStyles';
import WelcomeScreenStyles from './WelcomeScreenStyles';
let x = false;
const WelcomeScreen = ({navigation}) => {
  AsyncStorage.getItem('isWelcomed').then(asyncStorageRes => {
    if (asyncStorageRes == 'true') {
      x == true;
    } else {
      x == false;
    }
  });

  return (
    <View style={globalStyles.mainContainer}>
      <View style={WelcomeScreenStyles.viewAppIcon}>
        <Image
          style={WelcomeScreenStyles.appIcon}
          source={require('../../android/app/src/main/res/mipmap-xxxhdpi/ic_launcher_round.png')}></Image>
      </View>
      <View style={WelcomeScreenStyles.btnNTxt}>
        <Text style={WelcomeScreenStyles.welcomeText}>
          Welcome to Scientific Calculator
        </Text>

        <Button
          style={{margin: 54}}
          uppercase
          mode="contained"
          onPress={() => {
            navigation.navigate('Main');
            AsyncStorage.setItem('isWelcomed', 'true');
          }}>
          Start Calculating
        </Button>
      </View>
    </View>
  );
};
export default WelcomeScreen;
