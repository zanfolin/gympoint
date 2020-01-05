import { createAppContainer, createSwitchNavigator } from 'react-navigation';
import { createBottomTabNavigator } from 'react-navigation-tabs';

import SignIn from '~/Signin';
import Dashboard from '~/Dashboard';
import HelpOrders from '~/HelpOrders';
import Header from '~/components/Header';
import Answer from '~/Answer';
import Question from '~/Question';
import Signout from '~/Signout';

export default (signedIn = false) =>
  createAppContainer(
    createSwitchNavigator(
      {
        Sign: SignIn,

        App: createBottomTabNavigator(
          {
            Dashboard,
            HelpOrders,
            Signout,
          },
          {
            resetOnBlur: true,
            tabBarOptions: {
              keyboardHidesTabBar: true,
              activeTintColor: '#ee4d62',
              inactiveTintColor: '#999',
              style: {
                backgroundColor: '#fff',
              },
            },
          }
        ),
        Questions: createBottomTabNavigator(
          {
            Answer,
            Question,
          },
          {
            defaultNavigationOptions: {
              headerTitle: () => <Header />,
              headerTitleContainerStyle: {
                left: 0,
              },
              headerLeftContainerStyle: {
                marginLeft: 20,
              },
            },
          }
        ),
      },
      {
        initialRouteName: signedIn ? 'App' : 'Sign',
      }
    )
  );
