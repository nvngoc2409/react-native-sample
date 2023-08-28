import React, {Component} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {Progress} from '@ant-design/react-native';
import {EVENT, eventEmitter, Z_INDEX} from '../../../contexts';

export class AppUpdatingComponent extends Component<any> {
  state = {
    percent: 0,
  };
  componentDidMount() {
    eventEmitter.on(
      EVENT.application.updating_progress,
      ({percent}: {percent: number}) => {
        this.setState({percent});
      },
    );
  }

  render() {
    return (
      <View style={[styles.updating]}>
        <Text style={styles.title}>
          There are new packages! The app is updating...
        </Text>
        <Progress percent={this.state.percent / 100} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  updating: {
    position: 'absolute',
    backgroundColor: 'white',
    width: '100%',
    height: '100%',
    overflow: 'hidden',
    alignItems: 'center',
    justifyContent: 'center',
    display: 'flex',
    flexDirection: 'column',
    zIndex: Z_INDEX.appUpdating,
    padding: 20,
  },
  title: {
    marginBottom: 40,
    fontSize: 16,
    fontWeight: '600',
    textAlign: 'center',
  },
});
