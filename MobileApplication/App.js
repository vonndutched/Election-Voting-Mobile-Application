import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import LoginScreen from './screens/LoginScreen';
import Dashboard from './screens/Dashboard';
import VotingScreen from './screens/VotingScreen'

const navigator = createStackNavigator(
  {
    Login: LoginScreen,
    MemberDashboard: Dashboard,
    Vote: VotingScreen
  }, 
  {
  initialRouteName: 'Login',
  defaultNavigationOptions:{
    title:'Election Application',
    header: null,
    headerLeft: null
  }
});

export default createAppContainer(navigator);
