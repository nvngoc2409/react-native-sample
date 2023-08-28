import {EVENT, eventEmitter} from '../contexts';

export * from './enum-util';
export * from './promises-util';
export * from './useSafeAreaInsetsStyle';

export const processLoading = async <T = any,>(
  promise: Promise<T>,
): Promise<T> => {
  eventEmitter.emit(EVENT.application.loading, {loading: true});
  try {
    const result = await promise;
    eventEmitter.emit(EVENT.application.loading, {loading: false});
    return result;
  } catch (error) {
    eventEmitter.emit(EVENT.application.loading, {loading: false});
    throw error;
  }
};

export const getBoundComponentWithProps = <P extends any>(
  MyComponent: React.ComponentType<P>,
  props: P,
): React.ComponentType => {
  const BoundComponentWithProps = () => {
    return <MyComponent {...(props as any)} />;
  };
  return BoundComponentWithProps;
};
