//@flow

import React, { Component } from 'react'
import {
  Platform,
  StyleSheet,
  Text,
  View
} from 'react-native'
import ListScreen from './js/screens/ListScreen'
import createStore from './js/common/createStore'
import { Provider } from 'react-redux'

type Props = {}
type State = {
  store: any
}

export default class App extends Component<Props, State> {

  state = { store: {} }

  componentWillMount() {
    this.setState({
      store: createStore()
    })
  }

  render() {
    return (
      <Provider store={this.state.store}>
        <ListScreen />
      </Provider>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
})
