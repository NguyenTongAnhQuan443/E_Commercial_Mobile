import { StyleSheet, Text, View, Image, Dimensions, FlatList, TextInput, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import React, { useState } from 'react';
import { Ionicons } from '@expo/vector-icons';
import Icon from 'react-native-vector-icons/Feather';
import { useDispatch } from 'react-redux';
import { addToCart } from '../reduxToolkit/cartSlice';
import { Alert } from 'react-native';


const { width, height } = Dimensions.get('window')

const ProductDetails = ({route, navigation}) => {
  const productImages = [
    'https://i.ibb.co/7KBzgyJ/Vector.png',
    'https://hoaquafuji.com/storage/app/media/anh-sua/cropped-images/tao-do-2-6-16-794-709-1623469683.jpg',
    'https://hoaquafuji.com/storage/app/media/anh-sua/cropped-images/tao-do-2-6-16-794-709-1623469683.jpg',
  ];

  const itemDetail = route.params.item;
  console.log("🚀 ~ ProductDetails ~ itemDetail", itemDetail)

  const [quantity, setQuantity] = useState(1);

  const handleIncreaseQuantity = () => {
    setQuantity(quantity + 1);
  };

  const handleDecreaseQuantity = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  const dispatch = useDispatch();
  
  const handleAddToCart = () => {
    dispatch(addToCart({ ...itemDetail, quantity }));
    Alert.alert(
      'Success', 
      'Product added to cart', 
      [
        {
          text: 'Go to Cart', 
          onPress: () => navigation.navigate('Cart'), 
        },
        {
          text: 'OK', 
          onPress: () => console.log('OK Pressed'), 
        },
      ]
    );
  };

  const renderItem = ({ item }) => (
    <Image source={{ uri: item }} style={{ width: width, height: height * 0.4, borderBottomRightRadius: 30, borderBottomLeftRadius: 30, resizeMode: 'contain' }} />
  );

  return (
    <SafeAreaView style={{ flex: 1 }}>
      
      {/* Back Button */}
      <TouchableOpacity style={{position: 'absolute', top: 10, left: 10, padding: 10, zIndex: 1}} onPress={() => navigation.goBack()}>
        <Icon name="chevron-left" size={24} color="#000" />
      </TouchableOpacity>

      {/* View - Image product */}
      <View style={{ flex: 5, backgroundColor: '#F2F3F2' }}>
        <FlatList
          data={productImages}
          renderItem={renderItem}
          keyExtractor={(item, index) => index.toString()}
          horizontal
          pagingEnabled
          showsHorizontalScrollIndicator={false}
          snapToInterval={width} // điều chỉnh để mỗi lần cuộn dừng lại ở ảnh tiếp theo
          decelerationRate="fast" // tăng tốc độ dừng lại khi cuộn
          style={{ flex: 1 }}
        />
      </View>

      {/* View - 2 */}
      <View style={{ flex: 7, paddingLeft: 20, paddingRight: 20 }}>
        <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>

          {/* Name product */}
          <View>
            <Text style={{ fontSize: 24, fontWeight: 'bold' }}>{itemDetail.title}</Text>
            <Text style={{ fontSize: 16, color: 'grey' }}>{itemDetail.weight}</Text>
          </View>

          {/* Icon Heart */}
          <View>
            <Ionicons name='heart-outline' size={24} />
          </View>
        </View>

        {/* Quantity_Price Product */}
        <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>

          {/* Quantity */}
          <View style={{ flexDirection: 'row' }}>
            <TouchableOpacity onPress={() => handleDecreaseQuantity()}>
              <Ionicons name='remove-outline' size={24} />
            </TouchableOpacity>
            <TextInput style={{ borderWidth: 1, width: 35, height: 25, marginLeft: 10, marginRight: 10, borderRadius: 8, paddingLeft: 10 }} placeholder='1' 
              value={quantity.toString()}
            />
            <TouchableOpacity onPress={() => handleIncreaseQuantity()}>
              <Ionicons name='add-outline' size={24} color={'#58B379'} />
            </TouchableOpacity>
          </View>

          {/* Price product */}
          <View>
            <Text style={{ fontSize: 24, fontWeight: 'bold' }}>${itemDetail.price}</Text>
          </View>
        </View>

        {/* View Product Details */}
        <View style={{ flex: 2, justifyContent: 'flex-start' }}>
          <View>
            <Text style={{ fontSize: 18, fontWeight: 'bold' }}>Product Detail</Text>
          </View>

          <View style={{ marginTop: 10 }}>
            <Text style={{ fontSize: 16, color: '#7C7C7C' }}>{itemDetail.description}</Text>
          </View>
        </View>

        {/* Nutritions */}
        <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>

          <View>
            <Text style={{ fontSize: 18, fontWeight: 'bold' }}>Nutritions</Text>
          </View>

          <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
            <View style={{ width: 60, height: 25, backgroundColor: '#EBEBEB', borderRadius: 40, justifyContent: 'center', alignItems: 'center', }}>
              <Text style={{ color: 'grey' }}>100gr</Text>
            </View>
            <Ionicons name='chevron-forward-sharp' size={24} style={{ paddingLeft: 20 }} />
          </View>
        </View>

        {/* Review */}
        <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>

          <View>
            <Text style={{ fontSize: 18, fontWeight: 'bold' }}>Review</Text>
          </View>

          <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
            <Ionicons name='star-sharp' color={'#F3603F'} size={18} />
            <Ionicons name='star-sharp' color={'#F3603F'} size={18} />
            <Ionicons name='star-sharp' color={'#F3603F'} size={18} />
            <Ionicons name='star-sharp' color={'#F3603F'} size={18} />
            <Ionicons name='star-sharp' color={'#F3603F'} size={18} />
            <Ionicons name='chevron-forward-sharp' size={24} style={{ paddingLeft: 20 }} />
          </View>
        </View>

        {/* Button Add */}
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          <TouchableOpacity style={{ width: '100%', height: '80%', backgroundColor: '#53B175', borderRadius: 20, justifyContent: 'center', alignItems: 'center' }} onPress={() => handleAddToCart()}>
            <Text style={{ fontSize: 18, fontWeight: 'bold', color: 'white' }}>Add To Basket</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
  console.log("🚀 ~ ProductDetails ~ Details:", Details)
};

const styles = StyleSheet.create({
  carouselImage: {
    width: '100%',
    height: '100%',
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
  },
});

export default ProductDetails;
