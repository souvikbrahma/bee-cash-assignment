import {createStackNavigator} from 'react-navigation-stack';
import {createAppContainer} from 'react-navigation';
import LoginScreen from '../screens/LoginScreen';
import AllEventsScreen from '../screens/AllEventsScreen';
import EventDetailScreen from '../screens/EventDetailScreen';
import EventTrackingScreen from '../screens/EventTrackingScreen';

const MainStack = createStackNavigator(
  {
    Login: {
      screen: LoginScreen,
      title: 'Login',
      navigationOptions: {
        header: null,
      },
    },
    AllEvents: {
      screen: AllEventsScreen,
      title: 'AllEvents',
    },
    EventDetail: {
      screen: EventDetailScreen,
      title: 'EventDetail',
    },
    EventTracking: {
      screen: EventTrackingScreen,
      title: 'EventTracking',
    },
  },
  {
    initialRouteName: 'Login',
  },
);

export default createAppContainer(MainStack);
