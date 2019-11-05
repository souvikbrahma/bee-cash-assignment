import React, {Component} from 'react';
//import rect in our project
import {View, FlatList, Button, TouchableHighlight} from 'react-native';
import {EventArray} from '../EventList';
import ListEventCard from '../cards/ListEventCard';
import GestureRecognizer, {swipeDirections} from 'react-native-swipe-gestures';

//import all the components we will need

export default class App extends Component {
  static navigationOptions = ({navigation}) => {
    const {params = {}} = navigation.state;
    return {
      headerTitle: 'Events',

      headerRight: (
        <View style={{flex: 1, paddingRight: 10}}>
          <Button
            title="Toggle View"
            color="#0099cc"
            onPress={() => {
              params.handleThis();
            }}
          />
        </View>
      ),
    };
  };
  constructor(props) {
    super(props);
    this.state = {
      dataSource: {},
      itemsPerRow: 1,
    };
  }

  toggleView() {
    if (this.state.itemsPerRow == 1) {
      this.setState({itemsPerRow: 2});
    } else this.setState({itemsPerRow: 1});
  }

  onSwipeLeft() {
    this.props.navigation.navigate('EventTracking');
  }

  componentDidMount() {
    try {
      this.props.navigation.setParams({
        handleThis: this.toggleView.bind(this),
      });

      this.setState({
        dataSource: EventArray,
      });
    } catch (cause) {
      console.log(cause);
    }
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
          numColumns={this.state.itemsPerRow}
          key={this.state.itemsPerRow}
          keyExtractor={(item, index) => index.toString()}
        />
      </GestureRecognizer>
    );
  }
}
