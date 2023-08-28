import {getStateFromPath, NavigationContainer} from '@react-navigation/native';
import {isEmpty, isObject} from 'lodash';
import {Component, Suspense} from 'react';
import {Dimensions, Linking, ScrollView, StatusBar} from 'react-native';
import {
  EdgeInsets,
  SafeAreaInsetsContext,
  SafeAreaProvider,
} from 'react-native-safe-area-context';
import {ApplicationStackRouter} from './app-navigation';

import {APP_KEYS, EVENT, eventEmitter} from './contexts';
import {ApplicationNavigationName} from './definitions';
import {asyncPromiseDismissError, processLoading} from './utils';
import {
  AppConfirmComponent,
  AppErrorComponent,
  AppLoadingComponent,
  AppUpdatingComponent,
} from './views/common';

interface AppState {
  updating: boolean;
  isAuth: boolean;
  isFirstChecking: boolean;
}

export default class App extends Component<any, AppState> {
  private onUpdatingListener!: () => void;

  constructor(props: any) {
    super(props);
    this.listenUpdating = this.listenUpdating.bind(this);
    this.state = {
      updating: false,
      isAuth: false,
      isFirstChecking: true,
    };
  }

  async componentDidMount() {
    processLoading(this.initApplication());
  }

  componentWillUnmount(): void {
    this.onUpdatingListener && this.onUpdatingListener();
  }

  render() {
    const linking = {
      // TODO newproject
      prefixes: ['newproject://'],
      config: {
        screens: ApplicationNavigationName,
      },
      getStateFromPath(path: string, config: any) {
        const defaultState = getStateFromPath(path, config);
        // add first page to routes, then you will have a back btn
        const {routes} = defaultState || {};
        const firstRouteName = ApplicationNavigationName.login;

        if (
          !isEmpty(routes) &&
          isObject(routes) &&
          routes?.length === 1 &&
          routes[0].name !== firstRouteName
        ) {
          routes.unshift({name: firstRouteName});
        }
        return defaultState;
      },
    };

    return (
      <SafeAreaProvider>
        <SafeAreaInsetsContext.Consumer>
          {insets => (
            <ScrollView
              contentInsetAdjustmentBehavior="automatic"
              contentContainerStyle={{
                position: 'relative',
                height:
                  Dimensions.get('window').height -
                  (insets as EdgeInsets).top -
                  (insets as EdgeInsets).bottom -
                  (StatusBar.currentHeight || 0),
              }}>
              <NavigationContainer linking={linking}>
                <Suspense fallback={<AppLoadingComponent />}>
                  {/* TODO isAuthenticated */}
                  {!this.state.isFirstChecking && (
                    <ApplicationStackRouter
                      isAuthenticated={this.state.isAuth}
                    />
                  )}
                </Suspense>
                <AppConfirmComponent />
                <AppErrorComponent />
                {this.renderLoading()}
                {this.renderUpdating()}
              </NavigationContainer>
            </ScrollView>
          )}
        </SafeAreaInsetsContext.Consumer>
      </SafeAreaProvider>
    );
  }

  private async initApplication() {
    this.onUpdatingListener = eventEmitter.on(
      EVENT.application.updating,
      this.listenUpdating,
    );

    Linking.getInitialURL();
    
    this.setState({isAuth: true, isFirstChecking: false});
  }

  private async initDeepLik() {
    Linking.addEventListener('url', this.handleDeepLink.bind(this));
    try {
      const url = (await Linking.getInitialURL()) || '';
      this.handleDeepLink({url});
    } catch (error) {}
  }

  private async handleDeepLink(data?: {url?: string}) {
    try {
      const url = data?.url;
      if (!url) {
        return;
      }
      const urlData = new URL(url);
      switch (urlData.pathname) {
        // TODO
        default: {
        }
      }
    } catch (error) {
      // TODO
    }
  }

  private renderLoading() {
    return <AppLoadingComponent />;
  }

  private listenUpdating({updating}: {updating?: boolean}) {
    if (updating !== undefined) {
      this.setState({updating});
    }
  }

  private renderUpdating() {
    return this.state.updating && <AppUpdatingComponent />;
  }

}
