import React, {Component} from 'react';
import {Text, View, Image, Button, ToastAndroid} from 'react-native';
import _ from 'lodash';
import AsyncStorage from '@react-native-community/async-storage';
import GestureRecognizer, {swipeDirections} from 'react-native-swipe-gestures';

export default class EventDetailScreen extends Component {
  static navigationOptions = {
    title: 'Event Details',
  };
  constructor(props) {
    super(props);
    this.state = {
      ButtonState: 'Track Event',
    };
  }

  async trackEvent(EventThumbnail, EventName, Location, EntryFee) {
    try {
      if (this.state.ButtonState != 'Track Event') {
        this.unTrackEvent(EventName);
        return;
      }
      let currentEvents = await AsyncStorage.getItem('CurrentEvents');
      if (currentEvents == null) {
        currentEvents = '[]';
      }
      currentEvents = JSON.parse(currentEvents);
      currentEvents.push({
        EventName,
        EventThumbnail,
        Location,
        EntryFee,
      });
      currentEvents = _.uniqBy(currentEvents, 'EventName');
      await AsyncStorage.setItem(
        'CurrentEvents',
        JSON.stringify(currentEvents),
      );
      ToastAndroid.show('Event Subscribed successfully!', ToastAndroid.SHORT);
      this.setState({ButtonState: 'Untrack Event'});
    } catch (cause) {
      console.log(cause);
    }
  }

  async unTrackEvent(EventName) {
    try {
      let currentEvents = await AsyncStorage.getItem('CurrentEvents');
      currentEvents = JSON.parse(currentEvents);
      currentEvents.splice(_.findIndex(currentEvents, {EventName}), 1);
      await AsyncStorage.setItem(
        'CurrentEvents',
        JSON.stringify(currentEvents),
      );
      ToastAndroid.show('Event Unsubscribed successfully!', ToastAndroid.SHORT);
      this.setState({ButtonState: 'Track Event'});
    } catch (cause) {
      console.log(cause);
    }
  }

  async componentDidMount() {
    try {
      let currentEvents = await AsyncStorage.getItem('CurrentEvents');
      let y = _.findIndex(JSON.parse(currentEvents), {
        EventName: this.props.navigation.getParam('EventName'),
      });
      if (y == -1) {
        this.setState({ButtonState: 'Track Event'});
      } else {
        this.setState({ButtonState: 'Untrack Event'});
      }
    } catch (cause) {
      console.log(cause);
    }
  }

  onSwipeLeft() {
    this.props.navigation.navigate('EventTracking');
  }

  render() {
    const config = {
      velocityThreshold: 0.3,
      directionalOffsetThreshold: 80,
    };
    return (
      <GestureRecognizer
        onSwipeLeft={() => {
          this.onSwipeLeft();
        }}
        config={config}
        style={{
          flex: 1,
        }}>
        <View style={{padding: 10, flex: 1}}>
          <Image
            source={this.props.navigation.getParam('EventThumbnail')}
            style={{
              width: '100%',
              height: 200,
            }}></Image>
          <View style={{flex: 1, flexDirection: 'column'}}>
            <Text style={{color: '#000000', fontSize: 20, padding: 20}}>
              {this.props.navigation.getParam('EventName')}
            </Text>
            <Text style={{color: '#000000', fontSize: 15, padding: 20}}>
              Location : {this.props.navigation.getParam('Location')}
            </Text>
            <Text style={{color: '#000000', fontSize: 15, padding: 20}}>
              Entry : {this.props.navigation.getParam('EntryFee')}
            </Text>
          </View>
          <Button
            onPress={() => {
              this.trackEvent(
                this.props.navigation.getParam('EventThumbnail'),
                this.props.navigation.getParam('EventName'),
                this.props.navigation.getParam('Location'),
                this.props.navigation.getParam('EntryFee'),
              );
            }}
            title={this.state.ButtonState}></Button>
        </View>
      </GestureRecognizer>
    );
  }
}
