import {StyleSheet, View} from 'react-native';
import {Button} from 'react-native-paper';

const ButtonCalc = ({lblStyle ,title, mode, radius,textColor, style, btnColor, onPress}) => {
  return (
    <View>
      <Button  textColor={textColor} 
        labelStyle={lblStyle}
        compact
        buttonColor={btnColor}
        contentStyle={style}
        style = {{margin:1}}
        mode={mode}   
        onPress={onPress}>
        {title}
      </Button>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
  },
});

export default ButtonCalc;
