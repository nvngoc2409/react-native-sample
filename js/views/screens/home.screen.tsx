import { Screen } from '../common';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import { StoreScreen } from './store.screen';
import { NavigationContainer } from '@react-navigation/native';
import { Text, View } from 'react-native';
import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faTags, faStore, faBoxArchive, faUser, faChartBar } from '@fortawesome/free-solid-svg-icons';
import { useTheme } from 'react-native-paper';

const Tab = createMaterialBottomTabNavigator();

export const HomeScreen = () => {
    const theme = useTheme();
    theme.colors.secondaryContainer = "transperent"

    return (
        <Tab.Navigator inactiveColor='#B8B8B8' activeColor='#00C8E3' barStyle={{backgroundColor: '#2D2D2D'}}>
            <Tab.Screen options={{tabBarIcon: ({color}) => <FontAwesomeIcon color={color} size={30} icon={faTags} />}} name="Store" component={StoreScreen} />
            <Tab.Screen options={{tabBarIcon: ({color}) => <FontAwesomeIcon color={color} size={30} icon={faBoxArchive} />}} name="Colection" component={StoreScreen} />
            <Tab.Screen options={{tabBarIcon: ({color}) => <FontAwesomeIcon color={color} size={30} icon={faChartBar} />}} name="Feed" component={StoreScreen} />
            <Tab.Screen options={{tabBarIcon: ({color}) => <FontAwesomeIcon color={color} size={30} icon={faStore} />}} name="Market" component={StoreScreen} />
            <Tab.Screen options={{tabBarIcon: ({color}) => <FontAwesomeIcon color={color} size={30} icon={faUser} />}} name="Profile" component={StoreScreen} />
        </Tab.Navigator>

    );
};
