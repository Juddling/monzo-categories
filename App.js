import React from 'react';
import { ActivityIndicator, ListView, StyleSheet, Text, View } from 'react-native';
import { MONZO_ACCOUNT_ID, MONZO_ACCESS_TOKEN } from 'react-native-dotenv';

export default class App extends React.Component {
  constructor(props) {
      super(props)

      this.state = {
        isLoading: true,
      }
  }

  componentDidMount() {
    let baseUrl = 'https://api.monzo.com'
    let transactions = `${baseUrl}/transactions?expand[]=merchant&account_id=${MONZO_ACCOUNT_ID}&limit=20`
    let whoami = `${baseUrl}/ping/whoami`

    return fetch(transactions, {
      headers: {
        'Authorization': `Bearer ${MONZO_ACCESS_TOKEN}`
      }
    })
      .then((response) => response.json())
      .then((responseJson) => {
        let ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
        this.setState({
          isLoading: false,
          dataSource: ds.cloneWithRows(responseJson.transactions),
        }, function() {
          // do something with new state
        });
      })
      .catch((error) => {
        console.error(error);
      });
  }

  render() {
    if (this.state.isLoading) {
      return (
        <View style={{flex: 1, paddingTop: 20}}>
          <ActivityIndicator />
        </View>
      );
    }

    return (
      <View style={{flex: 1, paddingTop: 20}}>
        <ListView
          dataSource={this.state.dataSource}
          renderRow={(rowData) => <Text>{rowData.merchant ? rowData.merchant.emoji : ''}, {rowData.description}, {rowData.amount}</Text>}
        />
      </View>
    );
  }
}
