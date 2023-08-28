import { Component, ReactNode } from "react";
import { TouchableOpacity, View, Image, Text } from "react-native";

export type ComicItemData = {
    id: number;
    img: string;
    title: string;
    year: string
    price: number;
    soldOut: boolean;
    age: string;
};

type ItemProps = {
    item: ComicItemData;
    onPress: () => void;
};

export class ComicItem extends Component<ItemProps> {
    
    render() {
        return <TouchableOpacity onPress={this.props.onPress} style={{ marginRight: 8 }}>
            <View style={{ width: 190 }}>
                <Image style={{ resizeMode: 'stretch', height: 270, width: 'auto', borderTopLeftRadius: 8, borderTopRightRadius: 8 }} source={{uri: this.props.item.img}} />
                <View style={{ padding: 8, backgroundColor: 'white' }}>
                    <Text>{this.props.item.title}</Text>
                </View>
                <View style={{ backgroundColor: '#E4E4E4', padding: 8, flexDirection: 'row', justifyContent: 'space-between', borderBottomLeftRadius: 8, borderBottomRightRadius: 8 }}>
                    <Text>{this.props.item.year}</Text>
                    <View style={{ flexDirection: 'row' }}>
                        {!this.props.item.soldOut && <Image style={{ marginRight: 4 }} source={require('../../../../assets/images/diamon.png')} />}
                        <Text>{this.props.item.soldOut ? 'Sold Out' : this.props.item.price}</Text>
                    </View>
                </View>
            </View>
        </TouchableOpacity>
    }
}