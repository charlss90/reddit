//@flow
import React from 'react'
import PropTypes from 'prop-types'
import { View, Text, StyleSheet, Image, TouchableWithoutFeedback } from 'react-native'
import { dateFromNow } from '../common/dateService'
import { NewsShortDetail } from '../types/Reddit'

type Props = {
  item: NewsShortDetail,
  onPress: () => void
}

export class Item extends React.PureComponent<Props> {

  static propTypes = {
    item: PropTypes.object,
    onPress: PropTypes.func
  }

  render() {
    let { item } = this.props
    return (
      <TouchableWithoutFeedback onPress={this.props.onPress}>
        <View style={styles.container}>
          <View style={styles.thumbnailContainer}>
            <Image style={styles.thumbnail} source={{ uri: item.thumbnail }} />
          </View>
          <View style={styles.content}>
            <View style={styles.contentHeader}>
              <Text style={styles.date}>{dateFromNow(item.created_utc)}</Text>
            </View>
            <View style={styles.titleContainer}>
              <Text numberOfLines={2} ellipsizeMode={'head'} style={styles.title}>
                {item.title}
              </Text>
            </View>
            <View style={styles.contentFooter}>
              <View style={styles.authorContainer}>
                <Text numberOfLines={1} ellipsizeMode={'clip'} style={styles.author}>{item.author}</Text>
              </View>
              <View style={styles.scoreAndComments}>
                <Text style={styles.score}>{item.score} {'(score)'}</Text>
                <Text style={styles.comments}>{item.num_comments} {'(cmnt)'}</Text>
              </View>
            </View>
          </View>
        </View>
      </TouchableWithoutFeedback>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    alignSelf: 'stretch',
    flexDirection: 'row',
    height: 80
  },
  thumbnailContainer: {
    width: 80,
    alignItems: 'center',
    justifyContent: 'center',
  },
  thumbnail: {
    width: 70,
    height: 70
  },
  content: {
    flex: 1,
  },
  titleContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    height: 40,
  },
  title: {
    alignSelf: 'stretch',
    fontSize: 13,
    paddingRight: 5,
  },
  contentHeader: {
    alignItems: 'flex-end',
    justifyContent: 'center',
    height: 20
  },
  date: {
    paddingRight: 5,
    fontSize: 12
  },
  contentFooter: {
    height: 20,
    flexDirection: 'row',
  },
  authorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'flex-start'
  },
  author: {
    justifyContent: 'center',
    fontSize: 12,
  },
  scoreAndComments: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row'
  },
  score: {
    flex: 1,
    textAlign: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: 12,
  },
  comments: {
    flex: 1,
    textAlign: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: 12,
  }
})
