import {
  createStackNavigator,
} from 'react-navigation';
import HomeScreen from './HomeScreen';
import EventScreen from './event/EventScreen';
import NotificationScreen from './notification/NotificationScreen';
import LoginScreen from './login/LoginScreen';
import EventDetails from './event/EventDetails';
import NotificationDetails from './notification/NotificationDetails';

export default createStackNavigator({
  Login:{
      screen: LoginScreen,
  },
  Home: {
    screen: HomeScreen,
  },
  Events: {
    screen: EventScreen
  },
  Notifications: {
    screen: NotificationScreen
  },
  EvDetails: {
    screen: EventDetails
  },
  NfDetails: {
    screen: NotificationDetails
  }
}, {
  initialRouteName: 'Login',
  navigationOptions: {
    headerStyle: {
      backgroundColor: 'red',
    },
    headerTintColor: 'white',
    headerTitleStyle: {
      fontWeight: 'bold',
    },
  },
});
