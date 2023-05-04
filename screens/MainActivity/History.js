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
        if (objectString === null) {
          setHistories([{date: 'No Histories Found'}]);
        } else {
          setHistories(JSON.parse(objectString));
        }
      })
      .catch(error => console.log('Error retrieving object: ', error));
  });

  return (
    <View
      style={{
        padding: 12,
        height: '100%',
        width: '100%',
        backgroundColor: '#DFAFFE',
      }}>
      <Card>
        <CardContent>
          <FlatList
            data={Histories}
            ItemSeparatorComponent={() => (
              <View
                style={{
                  backgroundColor: 'grey',
                  width: '100%',
                  height: 1,
                }}></View>
            )}
            renderItem={({item}) => (
              <View style={{elevation: 4, marginBottom: 12}}>
                <View
                  style={{
                    flex: 1,
                    flexDirection: 'row',
                  }}>
                  <Text
                    style={{
                      flex: 2.5,
                      fontSize: 24,
                      color: 'grey',
                      fontWeight: '500',
                    }}>
                    {item.date}
                  </Text>
                  <Text
                    style={{
                      fontSize: 24,
                      flex: 1,
                      color: 'grey',
                      fontWeight: '500',
                      alignSelf: 'flex-end',
                    }}>
                    {item.time}
                  </Text>
                </View>
                <Text
                  style={{
                    alignSelf: 'flex-end',
                    fontSize: 28,
                    color: 'black',
                    fontWeight: '500',
                  }}>
                  {item.mainText}
                </Text>
                <Text
                  style={{
                    fontSize: 28,
                    color: 'grey',
                    alignSelf: 'flex-end',
                    fontWeight: '500',
                  }}>
                  {item.answer}
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
