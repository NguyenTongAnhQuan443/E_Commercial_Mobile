import React, { useState } from 'react';
import {
  Text,
  View,
  Image,
  TouchableOpacity,
  Alert,
  FlatList,
  Dimensions,
  StyleSheet,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import Icon from 'react-native-vector-icons/Feather';
import { useDispatch } from 'react-redux';
import { addToCart } from '../reduxToolkit/slices/cartSlice';

// Format tiền tệ
const formatCurrencyVND = (amount) => {
  return new Intl.NumberFormat('vi-VN', {
    style: 'currency',
    currency: 'VND',
  }).format(amount);
};

// Kích thước màn hình
const { width, height } = Dimensions.get('window');

const ProductDetails = ({ route, navigation }) => {
  const dispatch = useDispatch();

  const itemDetail = {
    ...route.params.item,
    comments: route.params.item.comments || [],
  };

  const productImages =
    itemDetail.images?.map((img) => img.imageUri) || [
      'https://ampet.vn/wp-content/uploads/2022/12/Hat-cho-cho-lon-6.jpg',
    ];

  const [isCommentVisible, setCommentVisible] = useState(false);

  // Thêm dữ liệu đánh giá nếu không có comment
  if (itemDetail.comments.length === 0 && itemDetail.reviews?.length > 0) {
    itemDetail.comments = itemDetail.reviews.map((review) => ({
      user: review.user?.fullName || 'Người dùng ẩn danh',
      comment: review.comment,
    }));
  }

  const toggleCommentVisibility = () => setCommentVisible(!isCommentVisible);

  const handleAddToCart = () => {
    dispatch(addToCart({ ...itemDetail, quantity: 1 }));
    Alert.alert(
      'Thành công',
      'Sản phẩm đã được thêm vào giỏ hàng',
      [
        { text: 'Đến Giỏ Hàng', onPress: () => navigation.navigate('Cart') },
        { text: 'OK', onPress: () => console.log('OK Pressed') },
      ]
    );
  };

  const renderImageItem = ({ item }) => (
    <Image source={{ uri: item }} style={styles.image} />
  );

  const renderCommentItem = ({ item }) => (
    <View style={styles.commentContainer}>
      <View style={styles.commentHeader}>
        <View style={styles.userAvatar}>
          <Text style={styles.avatarText}>
            {item.user.charAt(0).toUpperCase()}
          </Text>
        </View>
        <Text style={styles.commentUser}>{item.user}</Text>
      </View>
      <Text style={styles.commentText}>{item.comment}</Text>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      {/* Nút quay lại */}
      <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
        <Icon name="arrow-left" size={26} color="#000" />
      </TouchableOpacity>

      {/* Danh sách hình ảnh và bình luận */}
      <FlatList
        data={isCommentVisible ? itemDetail.comments : []}
        renderItem={renderCommentItem}
        keyExtractor={(item, index) => index.toString()}
        nestedScrollEnabled
        contentContainerStyle={{ paddingBottom: 80 }}
        ListHeaderComponent={
          <>
            {/* Hình ảnh sản phẩm */}
            <FlatList
              data={productImages}
              renderItem={renderImageItem}
              keyExtractor={(item, index) => index.toString()}
              horizontal
              pagingEnabled
              showsHorizontalScrollIndicator={false}
              nestedScrollEnabled
              style={styles.imageList}
            />

            {/* Chi tiết sản phẩm */}
            <View style={styles.detailsContainer}>
              <View style={styles.detailsHeader}>
                <Text style={styles.productName} numberOfLines={2} ellipsizeMode="tail">
                  {itemDetail.name}
                </Text>
                <Ionicons name="heart-outline" size={24} />
              </View>

              <View style={styles.weightContainer}>
                <Text style={styles.weightLabel}>Khối lượng:</Text>
                <Text style={styles.weightValue}>{itemDetail.weight}</Text>
              </View>

              <View style={styles.quantityPriceContainer}>
                <Text style={styles.descriptionTitle}>Giá bán:</Text>
                <Text style={styles.price}>
                  {formatCurrencyVND(itemDetail.price)}
                </Text>
              </View>

              <Text style={styles.descriptionTitle}>Chi tiết sản phẩm</Text>
              <Text style={styles.descriptionText}>{itemDetail.description}</Text>

              {/* Phần đánh giá */}
              <View>
                <View style={styles.reviewHeader}>
                  <Text style={styles.descriptionTitle}>Đánh giá</Text>
                  {/* Dãy ngôi sao nằm ngang */}
                  <View style={styles.starsContainer}>
                    {Array.from({ length: 5 }, (_, index) => (
                      <Ionicons
                        key={index}
                        name={
                          index < Math.floor(itemDetail.avgRating)
                            ? 'star'
                            : index < itemDetail.avgRating
                              ? 'star-half-outline'
                              : 'star-outline'
                        }
                        color={'#F3603F'}
                        size={18}
                        style={styles.star}
                      />
                    ))}

                    <TouchableOpacity onPress={toggleCommentVisibility}>
                      <Ionicons
                        name={isCommentVisible ? 'chevron-up' : 'chevron-down'}
                        size={24}
                        style={styles.chevron}
                      />
                    </TouchableOpacity>
                  </View>
                </View>
              </View>
            </View>
          </>
        }
      />

      {/* Nút thêm vào giỏ hàng */}
      <View style={styles.footer}>
        <TouchableOpacity style={styles.addToCartButton} onPress={handleAddToCart}>
          <Text style={styles.addToCartText}>Thêm vào giỏ hàng</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  backButton: {
    left: 20,
    zIndex: 1,
    position: 'absolute',
    top: 10,
  },
  image: {
    width: width,
    height: height * 0.4,
    resizeMode: 'contain',
  },
  imageList: {
    marginBottom: 20,
  },
  detailsContainer: {
    paddingHorizontal: 10,
  },
  detailsHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginVertical: 10,
  },
  productName: {
    fontSize: 24,
    fontWeight: 'bold',
    flexWrap: 'wrap',
    textAlign: 'left',
  },
  weightContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  weightLabel: {
    fontSize: 16,
    color: '#7C7C7C',
  },
  weightValue: {
    fontSize: 16,
    color: '#7C7C7C',
    marginLeft: 10,
  },
  quantityPriceContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginVertical: 10,
  },
  price: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#53b175',
  },
  descriptionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 10,
  },
  descriptionText: {
    fontSize: 16,
    color: '#7C7C7C',
    marginTop: 10,
    marginBottom: 15,
  },
  reviewHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginVertical: 10,
  },
  starsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: 10,
  },
  star: {
    marginHorizontal: 2,
  },
  chevron: {
    paddingLeft: 10,
  },
  footer: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
    backgroundColor: 'white',
    paddingVertical: 10,
    alignItems: 'center',
    borderTopWidth: 1,
    borderTopColor: '#E0E0E0',
  },
  addToCartButton: {
    width: '90%',
    height: 50,
    backgroundColor: '#53B175',
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  addToCartText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'white',
  },
  commentContainer: {
    marginVertical: 10,
    padding: 15,
    backgroundColor: '#FFFFFF',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#E0E0E0',
  },
  commentHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  userAvatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#2196F3',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 10,
  },
  avatarText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
  commentUser: {
    fontWeight: 'bold',
    fontSize: 16,
    color: '#333333',
  },
  commentText: {
    fontSize: 14,
    color: '#666666',
  },
});

export default ProductDetails;
