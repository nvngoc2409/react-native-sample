import { faBell, faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { Component } from "react";
import { View, Image } from "react-native";

export class AppHeader extends Component<any> {

    render() {
        return <View style={{ backgroundColor: '#2D2D2D', height: 50, paddingHorizontal: 16, justifyContent: 'space-between', flexDirection: 'row', alignItems: 'center' }
        }>
            <Image style={{ width: 90, resizeMode: 'contain' }} source={require('../../../../assets/images/veve-logo.png')} />
            <View style={{ flexDirection: 'row' }}>
                <FontAwesomeIcon color='#AFAFAF' style={{ marginRight: 16 }} icon={faBell} />
                <FontAwesomeIcon color='#AFAFAF' icon={faMagnifyingGlass} />
            </View>
        </View >
    }
}