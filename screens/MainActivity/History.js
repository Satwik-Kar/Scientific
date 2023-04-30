import {FlatList, View} from 'react-native';
import {Card} from 'react-native-paper';
import CardContent from 'react-native-paper/src/components/Card/CardContent';

const History = ({navigation, route}) => {
  let Histories = [];
  return (
    <View>
      <Card>
        <CardContent>
          <FlatList data={Histories} />
        </CardContent>
      </Card>
    </View>
  );
};

export default History;
