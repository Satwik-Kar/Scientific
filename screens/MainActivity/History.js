import {FlatList, Text, View} from 'react-native';
import {Card} from 'react-native-paper';
import CardContent from 'react-native-paper/src/components/Card/CardContent';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useEffect, useState} from 'react';

const History = ({navigation, route}) => {
  let [Histories, setHistories] = useState([]);
  useEffect(() => {
    AsyncStorage.getItem('histories')
      .then(objectString => {
        setHistories(JSON.parse(objectString));
      })
      .catch(error => console.log('Error retrieving object: ', error));
  });

  return (
    <View style={{padding: 12}}>
      <Card>
        <CardContent>
          <FlatList
            data={Histories}
            renderItem={({item}) => (
              <View style={{elevation: 1, marginBottom: 12}}>
                <Text style={{color: 'red'}}>{item.date}</Text>

                <Text style={{color: 'red'}}>{item.mainText}</Text>
                <Text style={{color: 'red', alignSelf: 'flex-end'}}>
                  ANS: {item.answer}
                </Text>
              </View>
            )}
          />
        </CardContent>
      </Card>
    </View>
  );
};

export default History;
