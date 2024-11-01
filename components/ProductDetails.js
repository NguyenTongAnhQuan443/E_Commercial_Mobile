import { StyleSheet, Text, View, SafeAreaView, Image, Dimensions, FlatList, TextInput, TouchableOpacity } from 'react-native';
import React from 'react';
import { Ionicons } from '@expo/vector-icons';

const { width, height } = Dimensions.get('window')

const ProductDetails = () => {
  const productImages = [
    'https://hoaquafuji.com/storage/app/media/anh-sua/cropped-images/tao-do-2-6-16-794-709-1623469683.jpg',
    'https://hoaquafuji.com/storage/app/media/anh-sua/cropped-images/tao-do-2-6-16-794-709-1623469683.jpg',
    'https://hoaquafuji.com/storage/app/media/anh-sua/cropped-images/tao-do-2-6-16-794-709-1623469683.jpg',
  ];

  const renderItem = ({ item }) => (
    <Image source={{ uri: item }} style={{ width: width, height: height * 0.4, borderBottomRightRadius: 30, borderBottomLeftRadius: 30 }} />
  );

  return (
    <SafeAreaView style={{ flex: 1 }}>

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
            <Text style={{ fontSize: 24, fontWeight: 'bold' }}>Naturel Red Apple</Text>
            <Text style={{ fontSize: 16, color: 'grey' }}>1kg / Price</Text>
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
            <Ionicons name='remove-outline' size={24} />
            <TextInput style={{ borderWidth: 1, width: 35, height: 25, marginLeft: 10, marginRight: 10, borderRadius: 8, paddingLeft: 10 }} placeholder='1' />
            <Ionicons name='add-outline' size={24} color={'#58B379'} />
          </View>

          {/* Price product */}
          <View>
            <Text style={{ fontSize: 24, fontWeight: 'bold' }}>$4.99</Text>
          </View>
        </View>

        {/* View Product Details */}
        <View style={{ flex: 2, justifyContent: 'flex-start' }}>
          <View>
            <Text style={{ fontSize: 18, fontWeight: 'bold' }}>Product Detail</Text>
          </View>

          <View style={{ marginTop: 10 }}>
            <Text style={{ fontSize: 16, color: '#7C7C7C' }}>Apples are nutritious. Apples may be good for weight loss. apples may be good for your heart. As part of a healtful and varied diet.</Text>
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
          <TouchableOpacity style={{ width: '100%', height: '80%', backgroundColor: '#53B175', borderRadius: 20, justifyContent: 'center', alignItems: 'center' }}>
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
