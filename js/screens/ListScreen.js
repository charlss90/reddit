// @flow
import React, { Component } from 'react'
import { View, Text, StyleSheet, Platform, FlatList, ActivityIndicator } from 'react-native'
import { connect } from 'react-redux'
import { listPics } from '../actions/news'
import { NewsShortDetail } from '../types/Reddit'
import { translate } from '../common/localeService'
import { Item, WebViewModal } from '../components'

type Props = {
  fetching: boolean,
  listing: Array<NewsShortDetail>,
  listPics: () => Promise
}

type State = {
  url: string,
  showWebView: boolean
}

type DataItem = { item: NewsShortDetail, index: number }


class ListScreen extends Component<Props, State> {

  state = {
    url: '',
    showWebView: false
  }

  componentWillMount() {
    this.loadMore()
  }

  openWebView = (url: string) => {
    console.log(`OPEN WEBVIEW`)
    this.setState({
      url,
      showWebView: true
    })
  }

  closeWebView = () => {
    this.setState({
      url: '',
      showWebView: false,
    })
  }

  renderEmptyView = () => {

    return !this.props.fetching && (
      <View style={styles.emptyContainer}>
        <Text style={styles.emptyMessage}>{translate('empty_list_message')}</Text>
      </View>
    )
  }

  renderItem = ({ item }: DataItem) => {
    return (<Item item={item} onPress={(this.openWebView.bind(this, item.url))} />)
  }

  renderSeparator = () => {
    return (
      <View style={styles.separatorStyle} />
    )
  }

  renderFooter = () => {
    return this.props.fetching && (
      <View style={{ alignSelf: 'stretch', height: 50, alignItems: 'center', justifyContent: 'center' }}>
        <ActivityIndicator size="small" />
      </View>
    )
  }

  loadMore = () => {
    try {
      this.props.listPics()
    } catch (ex) {
      console.log(ex)
    }
  }

  render() {
    let { fetching, listing } = this.props

    return (
      <View style={styles.container}>
        <FlatList
          refreshing={fetching}
          data={listing}
          keyExtractor={x => x.id}
          ItemSeparatorComponent={this.renderSeparator}
          ListFooterComponent={this.renderFooter}
          onEndReached={this.loadMore}
          onEndReachedThreshold={0}
          ListEmptyComponent={this.renderEmptyView}
          renderItem={this.renderItem} />
        <WebViewModal
          onRequestClose={this.closeWebView}
          url={this.state.url}
          visible={this.state.showWebView} />
      </View>
    )
  }
}

const mapStateToProps = (state) => ({
  fetching: (state.news || {}).fetching || false,
  listing: (state.news || {}).listing || []
})

const mapDispatchToProps = (dispatch) => ({
  listPics: () => dispatch(listPics())
})

const styles = StyleSheet.create({
  container: {
    paddingTop: Platform.select({
      ios: 20,
      android: 0
    })
  },
  list: {
    flex: 1
  },
  separatorStyle: {
    height: 1,
    backgroundColor: '#757575',
    marginRight: 5,
    marginLeft: 5
  },
  emptyContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
  emptyMessage: {
    fontSize: 20,
    textAlign: 'center'
  }
})

export default connect(mapStateToProps, mapDispatchToProps)(ListScreen)
