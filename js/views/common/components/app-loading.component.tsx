import React, {Component} from 'react';
import {ActivityIndicator, StyleSheet, View} from 'react-native';
import {EVENT, eventEmitter, Z_INDEX} from '../../../contexts';

export class AppLoadingComponent extends Component<any, {loading: boolean}> {
  private offLoadingListener!: () => void;

  constructor(props: any) {
    super(props);
    this.listenLoading = this.listenLoading.bind(this);

    this.state = {
      loading: false,
    };
  }

  componentDidMount(): void {
    this.offLoadingListener = eventEmitter.on(
      EVENT.application.loading,
      this.listenLoading,
    );
  }

  componentWillUnmount(): void {
    this.offLoadingListener && this.offLoadingListener();
  }

  render() {
    return (
      <View
        style={[styles.loading, this.state.loading ? {height: '100%'} : {}]}>
        {this.state.loading && <ActivityIndicator size={'large'} />}
      </View>
    );
  }

  private listenLoading({loading}: {loading: boolean}) {
    this.setState({loading});
  }
}

const styles = StyleSheet.create({
  loading: {
    backgroundColor: 'rgba(0,0,0,0.2)',
    position: 'absolute',
    width: '100%',
    height: 0,
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: Z_INDEX.appLoading,
  },
});
