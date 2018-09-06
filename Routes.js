import React from 'react';
import { createStackNavigator } from 'react-navigation';
import HomeScreen from './src/HomeScreen';
import DetailsScreen from './src/DetailsScreen';
import dashboard from './src/dashboard';
import AppPage from './src/AppPage';
import AppPage2 from './src/AppPage2';

const AppNavigator = createStackNavigator(
  {
    Home: HomeScreen,
    Details: DetailsScreen,
    Dashboard: dashboard,
    AppPage: AppPage,
    AppPage2: AppPage2,
    
  },
  {
  headerMode: 'screen',
  initialRouteName: 'Home',
  }
);

export default class App extends React.Component {
  render() {
    return <AppNavigator />
  }
}
