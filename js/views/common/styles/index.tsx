import {StyleSheet} from 'react-native';

export const commonStyles = StyleSheet.create({
  fit: {
    backgroundColor: 'rgba(0,0,0,0)',
    width: '100%',
    height: '100%',
  },
  flexFitCenter: {
    width: '100%',
    height: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  flexCenter: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  flexRow: {
    display: 'flex',
    flexDirection: 'row',
  },
  flexRowAlignCenter: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
  },
  flexRowCenter: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  flexColumn: {
    display: 'flex',
    flexDirection: 'column',
  },
  f1: {
    flex: 1,
  },
  f2: {
    flex: 2,
  },
  f3: {
    flex: 3,
  },
  f4: {
    flex: 4,
  },
  f5: {
    flex: 5,
  },
  f6: {
    flex: 6,
  },
  f7: {
    flex: 7,
  },
});
