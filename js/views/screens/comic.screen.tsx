import React, { useEffect, useState } from 'react';
import { Text } from '@ant-design/react-native';
import { Screen } from '../common';
import { comics } from '../../../assets/json/comics.json'
import { Dimensions, Image, TouchableHighlight, View } from 'react-native';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faBookmark, faComment, faHeart } from '@fortawesome/free-regular-svg-icons';
import { faArrowUpFromBracket, faCartShopping, faChevronLeft } from '@fortawesome/free-solid-svg-icons';
import { useNavigation } from '@react-navigation/native';
import { ApplicationNavigationProp } from '../../definitions';

export const ComicScreen = ({ route }) => {

    const navigation = useNavigation<ApplicationNavigationProp>();
    const id = route.params.id;
    const comic = comics.find(i => i.id === id);
    const [imgWidth, setImgWidth] = useState(0);
    const [imgHeight, setImgHeight] = useState(0);

    useEffect(() => {
        Image.getSize(comic?.img!, (width, height) => {
            // calculate image width and height 
            const screenWidth = Dimensions.get('window').width;
            const scaleFactor = width / screenWidth;
            const imageHeight = height / scaleFactor;
            setImgWidth(screenWidth);
            setImgHeight(imageHeight);
        })
    }, [])




    return (
        <Screen
            preset="auto"
            safeAreaEdges={['bottom']}
            backgroundColor='#4F4F4F'>
            <TouchableHighlight onPress={() => navigation.navigate('home')} style={{ position: 'absolute', left: 8, top: 8, zIndex: 1, backgroundColor: 'black', opacity: 0.8, borderRadius: 20, padding: 8 }}>
                <View >
                    <FontAwesomeIcon size={32} color='white' icon={faChevronLeft} />
                </View>
            </TouchableHighlight>
            <Image style={{ height: imgHeight, width: imgWidth }} source={{ uri: comic?.img }} />
            <View style={{ justifyContent: 'space-between', padding: 8, backgroundColor: 'white', flexDirection: 'row', alignItems: 'center' }}>
                <Text>{comic?.title}</Text>
                <Text style={{ backgroundColor: '#DDDDDD', padding: 8 }}>{comic?.age}</Text>
            </View>
            <View style={{ padding: 8, backgroundColor: '#CBCBCB', justifyContent: 'space-between', flexDirection: 'row' }}>
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <FontAwesomeIcon style={{ marginRight: 8 }} size={32} color='#707070' icon={faHeart} />
                    <Text style={{ color: '#707070', marginRight: 8 }}>254</Text>
                    <FontAwesomeIcon style={{ marginRight: 8 }} size={32} color='#707070' icon={faComment} />
                    <Text style={{ color: '#707070' }}>254</Text>
                </View>
                <View style={{ flexDirection: 'row' }}>
                    <FontAwesomeIcon style={{ marginRight: 8 }} size={32} color='#707070' icon={faArrowUpFromBracket} />
                    <FontAwesomeIcon size={32} color='#707070' icon={faBookmark} />
                </View>
            </View>
            <View style={{ padding: 8, backgroundColor: '#3B3B3B' }}>
                <Text style={{ color: '#A8A8A8' }}>It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English</Text>
                <View style={{ backgroundColor: '#2C2C2C', marginTop: 8, flexDirection: 'row', alignItems: 'center', borderRadius: 8 }}>
                    <View style={{ flexDirection: 'row', padding: 8 }}>
                        <Image style={{ marginRight: 8 }} source={require('../../../assets/images/diamon.png')} />
                        <Text style={{ color: 'white' }}>{comic?.price}</Text>
                    </View>
                    <View style={{ flexDirection: 'row', alignItems: 'center', marginLeft: 'auto', borderLeftColor: '#252122', borderLeftWidth: 1, padding: 8 }}>
                        <FontAwesomeIcon size={32} style={{ marginRight: 8 }} color='#00C8E3' icon={faCartShopping} />
                        <Text style={{ color: 'white' }}>BUY NOW</Text>
                    </View>
                </View>
            </View>
        </Screen>
    );
};
