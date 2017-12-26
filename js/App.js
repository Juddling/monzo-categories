import React from 'react';
import { StackNavigator } from 'react-navigation';
import HomeScreen from './HomeScreen';
import TransactionsScreen from './TransactionsScreen';

const MyHomeScreen = ({ navigation }) => (
  <HomeScreen navigation={navigation}/>
);
MyHomeScreen.navigationOptions = {
  title: 'Welcome',
};

const MyTransactionsScreen = ({ navigation }) => (
  <TransactionsScreen navigation={navigation}/>
);
MyTransactionsScreen.navigationOptions = {
  title: 'Transactions',
};

const App = StackNavigator({
  Home: {
    screen: MyHomeScreen,
  },
  Transactions: {
    path: 'transactions',
    screen: MyTransactionsScreen,
  },
});

export default App;
