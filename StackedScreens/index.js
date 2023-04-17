import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import WelcomeScreen from '../screens/WelcomeScreen/WelcomeScreen.js';
import MainActivity from '../screens/MainActivity/MainActivity.js';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Stack = createNativeStackNavigator();
let x = false;

const StackedScreens = () => {
  AsyncStorage.getItem('isWelcomed').then(asyncStorageRes => {
    if (asyncStorageRes == 'true') {
      x == true;
    } else {
      x == false;
    }
  });
  return (
    <NavigationContainer initialRouteName="Welcome">
      <Stack.Navigator>
        {x && (
          <Stack.Screen
            name="Welcome"
            component={WelcomeScreen}
            options={{
              headerShown: false,
            }}
          />
        )}

        <Stack.Screen
          name="Main"
          component={MainActivity}
          options={{
            headerShown: false,
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default StackedScreens;
