import React from 'react';
import { Button, StyleSheet, Text, TextInput } from 'react-native';
import { SafeAreaView } from 'react-navigation';

export default class HomeScreen extends React.Component {
  constructor(props) {
    super(props);

    this.state = { limit: '20' };
  }

  render() {
    return (
      <SafeAreaView style={styles.container}>
        <Text>Get first:</Text>
        <TextInput
          style={{width: 200, height: 40, borderColor: 'gray', borderWidth: 1}}
          onChangeText={(limit) => this.setState({limit})}
          value={this.state.limit}
        />
        <Button
          onPress={() => this.props.navigation.navigate('Transactions', { limit: this.state.limit })}
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
    alignItems: 'center'
  }
});
