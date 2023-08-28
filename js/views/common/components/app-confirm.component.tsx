import {Component} from 'react';
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import {Button} from '@ant-design/react-native';
import {EVENT, eventEmitter, Z_INDEX} from '../../../contexts';
import {commonStyles} from '../styles';

export interface IAppConfirmData {
  title?: React.ReactNode;
  message?: React.ReactNode;

  onOK?: () => void | Promise<void>;
  okText?: string;
  onCancel?: () => void | Promise<void>;
  cancelText?: string;

  buttonWrapper?: (onComplete?: () => void) => React.ReactNode;
}

export class AppConfirmComponent extends Component<
  any,
  IAppConfirmData & {status: boolean}
> {
  offListener: (() => void) | undefined;

  constructor(props: any) {
    super(props);
    this.state = {
      title: 'Do your confirm?',
      status: false,
    };
  }

  componentDidMount() {
    this.offListener = eventEmitter.on(
      EVENT.application.confirm,
      (data: IAppConfirmData) =>
        data.title && this.setState({...data, status: true}),
    );
  }

  componentWillUnmount() {
    this.offListener && this.offListener();
  }

  reset() {
    this.setState({
      status: false,
      title: '',
      message: '',

      onOK: undefined,
      okText: '',
      onCancel: undefined,
      cancelText: '',

      buttonWrapper: undefined,
    });
  }

  async onOK() {
    this.state.onOK && (await this.state.onOK());
    this.reset();
  }

  async onCancel() {
    this.state.onCancel && (await this.state.onCancel());
    this.reset();
  }

  render() {
    return (
      <TouchableWithoutFeedback onPress={this.onCancel.bind(this)}>
        <View
          style={{
            ...styles.full,
            display: this.state.status ? 'flex' : 'none',
          }}>
          <TouchableOpacity
            onPress={e => e.preventDefault()}
            activeOpacity={1}
            style={styles.content}>
            <>
              <Text style={styles.title}>{this.state.title}</Text>
              {this.state.message && (
                <Text style={styles.message}>{this.state.message}</Text>
              )}
              {this.state.buttonWrapper ? (
                this.state.buttonWrapper(this.reset.bind(this))
              ) : (
                <View style={styles.buttonArea}>
                  <Button
                    style={styles.buttonYes}
                    // titleStyle={styles.buttonYesTitle}
                    onPress={this.onOK.bind(this)}>
                    {this.state.okText || 'Yes'}
                  </Button>
                  <Button
                    style={styles.buttonNo}
                    // titleStyle={styles.buttonNoTitle}
                    onPress={this.onCancel.bind(this)}>
                    {this.state.cancelText || 'No'}
                  </Button>
                </View>
              )}
            </>
          </TouchableOpacity>
        </View>
      </TouchableWithoutFeedback>
    );
  }
}

const styles = StyleSheet.create({
  full: {
    backgroundColor: 'rgba(52, 52, 52, 0.8)',
    position: 'absolute',
    top: 0,
    width: '100%',
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: Z_INDEX.appConfirm,
    paddingLeft: 16,
    paddingRight: 16,
  },
  content: {
    backgroundColor: 'white',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    maxHeight: 300,
    borderRadius: 10,
    paddingTop: 60,
    paddingBottom: 60,
    paddingLeft: 10,
    paddingRight: 10,
  },
  title: {
    fontSize: 20,
    fontWeight: '600',
    textAlign: 'center',
  },

  message: {
    fontSize: 15,
    fontWeight: '400',
    textAlign: 'center',
    color: '#4F4F4F',
    marginTop: 25,
  },

  buttonArea: {
    ...commonStyles.flexRowAlignCenter,
    marginTop: 30,
  },
  buttonYes: {
    ...commonStyles.flexCenter,
    minWidth: 150,
    height: 50,
    borderRadius: 10,
    backgroundColor: '#36B282',
  },
  buttonYesTitle: {
    fontSize: 15,
    fontWeight: '400',
    color: 'white',
  },
  buttonNo: {
    ...commonStyles.flexCenter,
    minWidth: 150,
    height: 50,
    marginLeft: 10,
    borderRadius: 10,
    backgroundColor: 'white',
    borderStyle: 'solid',
    borderColor: '#4F4F4F',
    borderWidth: 1,
  },
  buttonNoTitle: {
    fontSize: 15,
    fontWeight: '400',
    color: '#4F4F4F',
  },
});
