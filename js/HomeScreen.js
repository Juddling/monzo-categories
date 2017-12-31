import React from 'react';
import { StyleSheet, Text, TextInput, View } from 'react-native';
import { Button, CheckBox } from 'react-native-elements';
import DatePicker from 'react-native-datepicker'

export default class HomeScreen extends React.Component {
  constructor(props) {
    super(props);

    var date = new Date();
    const toDate =  date.getFullYear() + '-' +
                    ("0" + (date.getMonth() + 1)).slice(-2) + '-' +
                    ("0" + date.getDate()).slice(-2);
    date.setMonth(date.getMonth() - 1);
    const fromDate =  date.getFullYear() + '-' +
                      ("0" + (date.getMonth() + 1)).slice(-2) + '-' +
                      ("0" + date.getDate()).slice(-2);

    this.state = {
      betweenDates: true,
      fromDate: fromDate,
      toDate: toDate,
      limit: true,
      limitValue: '20'
    };
  }

  render() {
    return (
      <View style={styles.container}>
        <CheckBox
          title='Get transactions between dates'
          checked={this.state.betweenDates}
          onPress={() => this.setState({ betweenDates: !this.state.betweenDates })}
        />


        <View style={styles.subcontainer}>
          <Text style={styles.header}>From:</Text>
          <DatePicker
            date={this.state.fromDate}
            mode="date"
            format="YYYY-MM-DD"
            maxDate={this.state.toDate}
            confirmBtnText="Confirm"
            cancelBtnText="Cancel"
            onDateChange={(date) => {this.setState({fromDate: date});}}
          />
        </View>

        <View style={styles.subcontainer}>
          <Text style={styles.header}>To:</Text>
          <DatePicker
            date={this.state.toDate}
            mode="date"
            format="YYYY-MM-DD"
            maxDate={this.state.toDate}
            confirmBtnText="Confirm"
            cancelBtnText="Cancel"
            onDateChange={(date) => {this.setState({toDate: toDate});}}
          />
        </View>

        <CheckBox
          title='Limit number of transactions'
          checked={this.state.limit}
          onPress={() => this.setState({ limit: !this.state.limit })}
        />
        <TextInput
          style={styles.input}
          keyboardType='numeric'
          onChangeText={(limitValue) => this.setState({limitValue})}
          value={this.state.limitValue}
        />

        <Button
          style={styles.btn}
          backgroundColor='#2196F3'
          onPress={() => this.props.navigation.navigate('Transactions',
            {
              betweenDates: this.state.betweenDates,
              fromDate: this.state.fromDate,
              toDate: this.state.toDate,
              limit: this.state.limit,
              limitValue: this.state.limitValue
            })}
          title="GET TRANSACTIONS"
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'stretch'
  },
  subcontainer: {
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 20
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
