import React from 'react';
import { ActivityIndicator, Text, View, FlatList, Modal, Button } from 'react-native';
import { MONZO_ACCESS_TOKEN, MONZO_ACCOUNT_ID } from 'react-native-dotenv';
import { List, ListItem } from 'react-native-elements';

export default class TransactionsScreen extends React.Component {
  constructor(props) {
      super(props)

      this.state = {
        isLoading: true,
        transactions: [],
        visibleTransaction: null
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

        responseJson.transactions.reverse();

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

  transactionPressed = (item) => {
    this.setState({ visibleTransaction: item })
  }

  render() {
    if (this.state.isLoading) {
      return (
        <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
          <ActivityIndicator />
        </View>
      );
    }

    return (
      <View style={{ flex: 1, flexDirection: 'column' }}>
        <Modal
          visible={ this.state.visibleTransaction !== null }
          onRequestClose={() => { console.log("Modal has been closed") }}
          animationType='slide'>
          <View style={{ flex: 1}}>
            <Text style={{ fontSize:20 }}>
              <Text>{ this.state.visibleTransaction ? this.state.visibleTransaction.description : '' }</Text>
              <Text>{ this.state.visibleTransaction ? this.state.visibleTransaction.local_amount : '' }</Text>
              <Text>{ this.state.visibleTransaction ? this.state.visibleTransaction.local_currency : '' }</Text>
            </Text>
            <Button
              onPress={() => this.setState({ visibleTransaction: null })}
              title="Close Modal"
            />
          </View>
        </Modal>

        <List>
          <FlatList
            data={this.state.transactions}
            keyExtractor={item => item.id}
            renderItem={({ item }) => (
              <ListItem
                title={`${item.description}`}
                subtitle={item.metadata ? item.metadata.notes : ''}
                  onPress={() => this.transactionPressed(item)}
              />
            )}
          />
        </List>
      </View>
    );
  }
}
