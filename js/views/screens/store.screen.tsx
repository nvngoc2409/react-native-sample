import React from 'react';
import { FlatList, View } from 'react-native';
import { Text } from '@ant-design/react-native';
import { Screen } from '../common';
import { AppHeader } from '../common/components/app-header.component';
import { comics } from '../../../assets/json/comics.json'
import { brands } from '../../../assets/json/brands.json';
import { ComicItem, ComicItemData } from '../common/components/comic-item.component';
import { BrandItem, BrandItemData } from '../common/components/brand-item.component';
import { ApplicationNavigationProp } from '../../definitions';
import { useNavigation } from '@react-navigation/native';

export const StoreScreen = () => {
  const navigation = useNavigation<ApplicationNavigationProp>();

  const renderComicItem = ({ item }: { item: ComicItemData }) => {
    return (
      <ComicItem
        item={item}
        onPress={() => { navigation.navigate('comic', {id: item.id}) }}
      />
    );
  };

  const renderBrandItem = ({ item }: { item: BrandItemData }) => {
    return (
      <BrandItem
        item={item}
        onPress={() => { }}
      />
    );
  };

  return (
    <Screen
      preset="auto"
      safeAreaEdges={['bottom']}
      backgroundColor='#4F4F4F'>
      <AppHeader />
      <View style={{ paddingLeft: 16 }}>
        <View style={{ flexDirection: 'row', marginVertical: 16 }}>
          <Text style={{ color: 'white' }}>Comics</Text>
          <View style={{ borderBottomColor: 'white', borderBottomWidth: 1, width: '100%' }}></View>
        </View>
        <FlatList horizontal={true} data={comics}
          renderItem={renderComicItem}></FlatList>
        <View style={{ flexDirection: 'row', marginVertical: 16 }}>
          <Text style={{ color: 'white' }}>Brands</Text>
          <View style={{ borderBottomColor: 'white', borderBottomWidth: 1, width: '100%' }}></View>
        </View>
        <FlatList horizontal={true} data={brands}
          renderItem={renderBrandItem}></FlatList>
      </View>

    </Screen>
  );
};
