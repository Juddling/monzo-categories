import React from 'react';
import { StyleSheet, TextInput } from 'react-native';
import { Button, CheckBox } from 'react-native-elements';
import { SafeAreaView } from 'react-navigation';

export default class HomeScreen extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      limit: true,
      limitValue: '20'
    };
  }

  render() {
    return (
      <SafeAreaView style={styles.container}>
        <CheckBox
          title='Limit number of transactions'
          checked={this.state.limit}
          onPress={() => this.setState({ limit: !this.state.limit })}
        />
        <TextInput
          style={styles.input}
          onChangeText={(limitValue) => this.setState({limitValue})}
          value={this.state.limitValue}
        />
        <Button
          style={styles.btn}
          backgroundColor='#2196F3'
          onPress={() => this.props.navigation.navigate('Transactions', { limit: this.state.limit, limitValue: this.state.limitValue })}
          title="GET TRANSACTIONS"
        />
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'stretch'
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    margin: 10
  },
  btn: {
    marginTop: 20
  }
});
