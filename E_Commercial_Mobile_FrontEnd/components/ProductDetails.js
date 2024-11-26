import React, { useEffect, useState } from 'react';
import {
  Text,
  View,
  Image,
  TouchableOpacity,
  Alert,
  FlatList,
  Dimensions,
  StyleSheet,
  ActivityIndicator,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import Icon from 'react-native-vector-icons/Feather';
import { useDispatch } from 'react-redux';
import { addToCart } from '../reduxToolkit/slices/cartSlice';
import config from '../config/config';

const formatCurrencyVND = (amount) => {
  return new Intl.NumberFormat('vi-VN', {
    style: 'currency',
    currency: 'VND',
  }).format(amount);
};

const { width, height } = Dimensions.get('window');

const ProductDetails = ({ route, navigation }) => {
  const dispatch = useDispatch();
  const itemDetail = {
    ...route.params.item,
    comments: route.params.item.reviews || [],
  };

  const productImages =
    itemDetail.images?.map((img) => img.imageUri) || [
      'https://ampet.vn/wp-content/uploads/2022/12/Hat-cho-cho-lon-6.jpg',
    ];

  const [isCommentVisible, setCommentVisible] = useState(false);
  const [relatedProducts, setRelatedProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(config.host + config.endpoints.recommendations + itemDetail.id)
      .then((response) => response.json())
      .then((data) => {
        setRelatedProducts(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error('Error fetching related products:', error);
        setLoading(false);
      });
  }, []);

  const toggleCommentVisibility = () => setCommentVisible(!isCommentVisible);

  const handleAddToCart = (item) => {
    dispatch(addToCart({ product: item, quantity: 1, price: item.price }));
    Alert.alert('Thành công', 'Sản phẩm đã được thêm vào giỏ hàng');
  };

  const renderImageItem = ({ item }) => (
    <Image source={{ uri: item }} style={styles.image} />
  );

  const renderCommentItem = ({ item }) => {
    const userName = item.user?.fullName || 'Người dùng ẩn danh';
    const commentText = item.comment || 'Không có nội dung';

    return (
      <View style={styles.commentContainer}>
        <View style={styles.commentHeader}>
          <View style={styles.userAvatar}>
            <Text style={styles.avatarText}>
              {typeof userName === 'string' ? userName.charAt(0).toUpperCase() : '?'}
            </Text>
          </View>
          <Text style={styles.commentUser}>{userName}</Text>
        </View>
        <Text style={styles.commentText}>{commentText}</Text>
      </View>
    );
  };

  const renderRelatedProductItem = ({ item }) => (
    <View style={styles.relatedProductContainer}>
      <Image source={{ uri: item.images[0]?.imageUri }} style={styles.relatedProductImage} />
      <Text style={styles.relatedProductName} numberOfLines={2}>
        {item.name}
      </Text>
      <Text style={styles.relatedProductPrice}>
        {formatCurrencyVND(item.price)}
      </Text>
      <TouchableOpacity
        style={styles.relatedProductButton}
        onPress={() => handleAddToCart(item)} // Sử dụng logic thêm vào giỏ hàng
      >
        <Ionicons name="cart-outline" size={24} color="#FFF" />
      </TouchableOpacity>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
        <Icon name="arrow-left" size={26} color="#000" />
      </TouchableOpacity>

      <FlatList
        data={[]}
        keyExtractor={() => ''}
        nestedScrollEnabled
        contentContainerStyle={{ paddingBottom: 80 }}
        ListHeaderComponent={
          <>
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

              <View>
                <View style={styles.reviewHeader}>
                  <Text style={styles.descriptionTitle}>Đánh giá</Text>
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
                {isCommentVisible && itemDetail.comments.length > 0 && (
                  <FlatList
                    data={itemDetail.comments}
                    renderItem={renderCommentItem}
                    keyExtractor={(item, index) => `comment-${index}`}
                    nestedScrollEnabled
                  />
                )}
              </View>

              <View style={{ marginTop: 20 }}>
                <Text style={styles.descriptionTitle}>Sản phẩm tương tự</Text>
                {loading ? (
                  <ActivityIndicator size="large" color="#53B175" />
                ) : (
                  <FlatList
                    data={relatedProducts}
                    renderItem={renderRelatedProductItem}
                    keyExtractor={(item) => item.id.toString()}
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    contentContainerStyle={{ paddingHorizontal: 10 }}
                  />
                )}
              </View>
            </View>
          </>
        }
      />

      <View style={styles.footer}>
        <TouchableOpacity style={styles.addToCartButton} onPress={() => handleAddToCart(itemDetail)}>
          <Text style={styles.addToCartText}>Thêm vào giỏ hàng</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  backButton: {
    left: 20,
    zIndex: 1,
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
    backgroundColor: '#fff',
    paddingVertical: 10,
    alignItems: 'center',
    borderTopWidth: 1,
    borderTopColor: '#E0E0E0',
  },
  addToCartButton: {
    width: '90%',
    height: 50,
    backgroundColor: '#53b175',
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  addToCartText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
  },
  relatedProductContainer: {
    width: 150,
    marginRight: 12,
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 10,
    borderWidth: 1,
    borderColor: '#E0E0E0',
    alignItems: 'center',
  },
  relatedProductImage: {
    width: 120,
    height: 100,
    resizeMode: 'contain',
    marginBottom: 8,
  },
  relatedProductName: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#333',
    textAlign: 'center',
    marginBottom: 5,
  },
  relatedProductPrice: {
    fontSize: 14,
    color: '#53b175',
    fontWeight: 'bold',
    marginBottom: 10,
  },
  relatedProductButton: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: '#53b175',
    justifyContent: 'center',
    alignItems: 'center',
  },
  commentContainer: {
    marginVertical: 10,
    padding: 15,
    backgroundColor: '#fff',
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
    color: '#fff',
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
