import React from 'react';
import { ActivityIndicator, StyleSheet, Text, View, FlatList } from 'react-native';
import { MONZO_ACCESS_TOKEN, MONZO_ACCOUNT_ID } from 'react-native-dotenv';
import { List, ListItem } from "react-native-elements";

export default class App extends React.Component {
  constructor(props) {
      super(props)

      this.state = {
        isLoading: true,
        transactions: []
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
        if (responseJson.error) {
          console.error(responseJson.message)
          return;
        }

        this.setState({
          isLoading: false,
          transactions: responseJson.transactions
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
      <List>
        <FlatList
          data={this.state.transactions}
          keyExtractor={item => item.id}
          renderItem={({ item }) => (
            <ListItem
              title={`${item.description}`}
              subtitle={item.metadata ? item.metadata.notes : ''}
            />
          )}
        />
      </List>
    );
  }
}
