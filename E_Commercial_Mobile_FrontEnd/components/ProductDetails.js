import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  TextInput,
  TouchableOpacity,
  Alert,
  FlatList,
  Dimensions,
  ScrollView,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import Icon from 'react-native-vector-icons/Feather';
import { useDispatch } from 'react-redux';
import { addToCart } from '../reduxToolkit/slices/cartSlice';

const formatCurrencyVND = (amount) => {
  return new Intl.NumberFormat('vi-VN', {
    style: 'currency',
    currency: 'VND',
  }).format(amount);
};

const { width, height } = Dimensions.get('window');

const ProductDetails = ({ route, navigation }) => {
  const productImages = [
    'https://i.ibb.co/7KBzgyJ/Vector.png',
    'https://hoaquafuji.com/storage/app/media/anh-sua/cropped-images/tao-do-2-6-16-794-709-1623469683.jpg',
    'https://hoaquafuji.com/storage/app/media/anh-sua/cropped-images/tao-do-2-6-16-794-709-1623469683.jpg',
  ];

  const itemDetail = {
    ...route.params.item,
    comments: [
      { user: 'Alice', comment: 'This is an amazing product!' },
      { user: 'Bob', comment: 'Really liked the quality.' },
    ],
    avgRating: 4.5, // Thêm thuộc tính đánh giá trung bình
  };

  const [quantity, setQuantity] = useState(1);
  const [isCommentVisible, setCommentVisible] = useState(false);

  const handleIncreaseQuantity = () => setQuantity(quantity + 1);

  const handleDecreaseQuantity = () => {
    if (quantity > 1) setQuantity(quantity - 1);
  };

  const toggleCommentVisibility = () => setCommentVisible(!isCommentVisible);

  const dispatch = useDispatch();

  const handleAddToCart = () => {
    dispatch(addToCart({ ...itemDetail, quantity }));
    Alert.alert(
      'Success',
      'Product added to cart',
      [
        { text: 'Go to Cart', onPress: () => navigation.navigate('Cart') },
        { text: 'OK', onPress: () => console.log('OK Pressed') },
      ]
    );
  };

  const renderItem = ({ item }) => (
    <Image
      source={{ uri: item }}
      style={{
        width: width,
        height: height * 0.4,
        borderBottomRightRadius: 30,
        borderBottomLeftRadius: 30,
        resizeMode: 'contain',
      }}
    />
  );

  return (
    <SafeAreaView style={{ flex: 1 }}>
      {/* Back Button */}
      <TouchableOpacity style={{ left: 20, zIndex: 1 }} onPress={() => navigation.goBack()}>
        <Icon name="arrow-left" size={26} color="#000" />
      </TouchableOpacity>

      {/* Scrollable Content */}
      <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
        {/* Product Images */}
        <View style={{ flex: 5, backgroundColor: '#F2F3F2' }}>
          <FlatList
            data={productImages}
            renderItem={renderItem}
            keyExtractor={(item, index) => index.toString()}
            horizontal
            pagingEnabled
            showsHorizontalScrollIndicator={false}
            snapToInterval={width}
            decelerationRate="fast"
            nestedScrollEnabled // Thêm nestedScrollEnabled
            style={{ flex: 1 }}
          />
        </View>

        {/* Product Details */}
        <View style={{ flex: 7, paddingLeft: 10, paddingRight: 10 }}>
          <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginVertical: 10 }}>
            <Text
              style={{ fontSize: 24, fontWeight: 'bold', flexWrap: 'wrap', textAlign: 'left' }}
              numberOfLines={2}
              ellipsizeMode="tail"
            >
              {itemDetail.name}
            </Text>
            <Ionicons name="heart-outline" size={24} />
          </View>

          {/* Quantity and Price */}
          <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginVertical: 10 }}>
            <View style={{ flexDirection: 'row' }}>
              <TouchableOpacity onPress={handleDecreaseQuantity}>
                <Ionicons name="remove-outline" size={24} />
              </TouchableOpacity>
              <TextInput
                style={{
                  borderWidth: 1,
                  width: 50,
                  height: 25,
                  marginHorizontal: 10,
                  borderRadius: 8,
                  textAlign: 'center',
                }}
                value={quantity.toString()}
                editable={false}
              />
              <TouchableOpacity onPress={handleIncreaseQuantity}>
                <Ionicons name="add-outline" size={24} color="#58B379" />
              </TouchableOpacity>
            </View>
            <Text style={{ fontSize: 24, fontWeight: 'bold', color: '#53b175' }}>
              {formatCurrencyVND(itemDetail.price)}
            </Text>
          </View>

          {/* Product Description */}
          <Text style={{ fontSize: 18, fontWeight: 'bold', marginTop: 10 }}>Chi tiết sản phẩm</Text>
          <Text style={{ fontSize: 16, color: '#7C7C7C', marginTop: 10 }}>{itemDetail.description}</Text>

          {/* Weight */}
          <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginVertical: 10 }}>
            <Text style={{ fontSize: 18, fontWeight: 'bold' }}>Khối lượng</Text>
            <View
              style={{
                width: 60,
                height: 25,
                backgroundColor: '#EBEBEB',
                borderRadius: 40,
                justifyContent: 'center',
                alignItems: 'center',
              }}
            >
              <Text style={{ color: 'grey' }}>{itemDetail.weight}</Text>
            </View>
          </View>

          {/* Reviews */}
          <View>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
              <Text style={{ fontSize: 18, fontWeight: 'bold' }}>Review</Text>
              <TouchableOpacity
                style={{ flexDirection: 'row', alignItems: 'center' }}
                onPress={toggleCommentVisibility}
              >
                {Array.from({ length: 5 }, (_, index) => (
                  <Ionicons
                    key={index}
                    name={index < Math.round(itemDetail.avgRating) ? 'star' : 'star-outline'}
                    color={'#F3603F'}
                    size={18}
                    style={{ marginLeft: 2 }}
                  />
                ))}
                <Ionicons
                  name={isCommentVisible ? 'chevron-up' : 'chevron-down'}
                  size={24}
                  style={{ paddingLeft: 20 }}
                />
              </TouchableOpacity>
            </View>
            {isCommentVisible && (
              <View style={{ marginTop: 10, padding: 10, backgroundColor: '#F8F8F8', borderRadius: 10 }}>
                <Text style={{ fontSize: 16, fontWeight: 'bold', marginBottom: 5 }}>Comments</Text>
                <FlatList
                  data={itemDetail.comments}
                  keyExtractor={(item, index) => index.toString()}
                  renderItem={({ item }) => (
                    <View style={{ marginBottom: 10 }}>
                      <Text style={{ fontWeight: 'bold' }}>{item.user}</Text>
                      <Text>{item.comment}</Text>
                    </View>
                  )}
                  ListEmptyComponent={<Text>No comments yet</Text>}
                  nestedScrollEnabled // Thêm thuộc tính này
                />
              </View>
            )}
          </View>
        </View>

        {/* Add to Basket Button */}
        <View style={{ justifyContent: 'center', alignItems: 'center', marginVertical: 20 }}>
          <TouchableOpacity
            style={{
              width: '90%',
              height: 50,
              backgroundColor: '#53B175',
              borderRadius: 20,
              justifyContent: 'center',
              alignItems: 'center',
            }}
            onPress={handleAddToCart}
          >
            <Text style={{ fontSize: 18, fontWeight: 'bold', color: 'white' }}>Add To Basket</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default ProductDetails;
