import {FlatList, View, Text} from 'react-native';
import {Card} from 'react-native-paper';
import CardContent from 'react-native-paper/src/components/Card/CardContent';

const History = ({navigation, route}) => {
  let Histories = [
    {id: 'Satwik', mainText: 'Kar', date: '02/02/23', time: '08:09pm'},
  ];
  return (
    <View>
      <Card>
        <CardContent>
          <FlatList
            data={Histories}
            renderItem={({item}) => (
              <View>
                <Text style={{color: 'red'}}>{item.id}</Text>
                <Text style={{color: 'red'}}>{item.mainText}</Text>
                <Text style={{color: 'red'}}>{item.date}</Text>
                <Text style={{color: 'red'}}>{item.time}</Text>
              </View>
            )}
          />
        </CardContent>
      </Card>
    </View>
  );
};

export default History;
