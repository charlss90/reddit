//@flow
import React from 'react'
import { Modal, WebView, View, Text, StyleSheet, Platform, TouchableWithoutFeedback } from 'react-native'
import { translate } from '../common/localeService'
import PropTypes from 'prop-types'

type Props = {
  url: string,
  visible: boolean,
  onRequestClose: () => void
}

export class WebViewModal extends React.Component<Props> {
  static propsTypes = {
    url: PropTypes.string,
    visible: PropTypes.bool,
    onRequestClose: PropTypes.func
  }

  render() {
    return (
      <Modal animationType={'slide'} visible={this.props.visible}>
        <View style={styles.header}>
          <TouchableWithoutFeedback onPress={this.props.onRequestClose}>
            <View style={styles.closeContainer}>
              <Text style={styles.close}>{translate('close')}</Text>
            </View>
          </TouchableWithoutFeedback>
        </View>
        <WebView source={{ uri: this.props.url }} style={styles.webview} />
      </Modal>
    )
  }
}

const styles = StyleSheet.create({
  header: {
    height: Platform.select({
      ios: 60,
      android: 45
    }),
    paddingTop: Platform.select({
      ios: 15,
      andorid: 0
    }),
    alignItems: 'flex-end',
    justifyContent: 'center'
  },
  closeContainer: {
    width: 150,
    height: 45,
    alignItems: 'flex-end',
    justifyContent: 'center'
  },
  close: {
    fontSize: 20,
    paddingRight: 15
  },
  webview: {
    flex: 1
  }
})
