import React, {Component} from 'react';
import {TouchableHighlight, ScrollView, FlatList, View} from 'react-native';

import ListEventCard from '../cards/ListEventCard';
import AsyncStorage from '@react-native-community/async-storage';
import GestureRecognizer, {swipeDirections} from 'react-native-swipe-gestures';

export default class EventTrackingScreen extends Component {
  static navigationOptions = {
    title: 'Track your Events here',
  };
  constructor(props) {
    super(props);
    this.state = {
      dataSource: {},
    };
  }

  async componentDidMount() {
    try {
      let EventArray = await AsyncStorage.getItem('CurrentEvents');
      EventArray = JSON.parse(EventArray);
      if (EventArray == null) {
        EventArray = [];
      }
      this.setState({dataSource: EventArray});
    } catch (cause) {
      console.log(cause);
    }
  }

  onSwipeRight() {
    this.props.navigation.goBack(null);
  }

  render() {
    const config = {
      velocityThreshold: 0.3,
      directionalOffsetThreshold: 80,
    };

    return (
      <GestureRecognizer
        onSwipeRight={() => {
          this.onSwipeRight();
        }}
        config={config}
        style={{
          flex: 1,
        }}>
        <FlatList
          data={this.state.dataSource}
          renderItem={({item}) => (
            <View style={{flex: 1, flexDirection: 'column', margin: 1}}>
              <TouchableHighlight
                key={item}
                onPress={() => {
                  this.props.navigation.navigate('EventDetail', {
                    EventName: item.EventName,
                    EventThumbnail: item.EventThumbnail,
                    Location: item.Location,
                    EntryFee: item.EntryFee,
                  });
                }}>
                <ListEventCard
                  EventName={item.EventName}
                  EventThumbnail={item.EventThumbnail}
                  Location={item.Location}
                  EntryFee={item.EntryFee}></ListEventCard>
              </TouchableHighlight>
            </View>
          )}
          numColumns={1}
          key={1}
          keyExtractor={(item, index) => index.toString()}
        />
      </GestureRecognizer>
    );
  }
}
