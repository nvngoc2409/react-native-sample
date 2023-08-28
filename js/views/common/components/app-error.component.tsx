import React, {Component} from 'react';
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import {EVENT, eventEmitter, Z_INDEX} from '../../../contexts';

export class AppErrorComponent extends Component<any, {messages?: string[]}> {
  private onErrorListener!: () => void;
  componentDidMount(): void {
    this.onErrorListener = eventEmitter.on(
      EVENT.application.error,
      (messages: string[]) => {
        this.setState({messages});
      },
    );
  }

  componentWillUnmount(): void {
    this.onErrorListener && this.onErrorListener();
  }

  onClose() {
    this.setState({messages: []});
  }

  render() {
    const messages = this.state?.messages || [];
    return (
      <TouchableWithoutFeedback onPress={this.onClose.bind(this)}>
        <View
          style={{
            ...styles.full,
            display: messages.length > 0 ? 'flex' : 'none',
          }}>
          <TouchableOpacity
            onPress={e => e.preventDefault()}
            activeOpacity={1}
            style={[
              styles.content,
              messages.length > 0 ? {} : styles.contentEmpty,
            ]}>
            <View style={styles.header}>
              <Text style={styles.headerTitle}>Error</Text>
              <TouchableOpacity onPress={this.onClose.bind(this)}>
                {/* <Image
                  style={styles.headerIcon}
                  source={require('./../../assets/images/close-icon.png')}
                /> */}
              </TouchableOpacity>
            </View>
            <ScrollView
              horizontal={true}
              contentContainerStyle={styles.messageArea}>
              {messages.map((item, index) => (
                <Text style={styles.messageText} key={index}>
                  {item}
                </Text>
              ))}
            </ScrollView>
          </TouchableOpacity>
        </View>
      </TouchableWithoutFeedback>
    );
  }
}

const styles = StyleSheet.create({
  full: {
    backgroundColor: 'rgba(52, 52, 52, 0.1)',
    position: 'absolute',
    width: '100%',
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: Z_INDEX.appError,
  },
  content: {
    backgroundColor: 'white',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    maxWidth: '90%',
    maxHeight: 300,
    borderRadius: 10,
    paddingTop: 5,
    paddingLeft: 15,
    paddingRight: 15,
    paddingBottom: 30,
  },
  contentEmpty: {
    paddingTop: 0,
    paddingLeft: 0,
    paddingRight: 0,
    paddingBottom: 0,
  },
  header: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
    width: '100%',
  },
  headerTitle: {
    color: '#DC3D21',
    fontWeight: '700',
    flex: 1,
  },
  headerIcon: {
    width: 20,
    height: 20,
  },
  messageArea: {
    width: '100%',
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
  },
  messageText: {
    width: '100%',
    color: '#DE350C',
    fontSize: 12,
    marginTop: 5,
  },
});
