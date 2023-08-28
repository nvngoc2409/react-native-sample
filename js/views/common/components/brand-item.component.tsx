import { Component, ReactNode } from "react";
import { TouchableOpacity, View, Image, Text } from "react-native";

export type BrandItemData = {
    img: string;
};

type ItemProps = {
    item: BrandItemData;
    onPress: () => void;
};

export class BrandItem extends Component<ItemProps> {

    render() {
        return <TouchableOpacity onPress={this.props.onPress} style={{ marginRight: 8 }}>
            <Image style={{ resizeMode: 'stretch', height: 190, width: 190, borderRadius: 8 }} source={{ uri: this.props.item.img }} />
        </TouchableOpacity>
    }
}