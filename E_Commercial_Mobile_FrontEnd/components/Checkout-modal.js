import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, TextInput, ScrollView, StyleSheet, Alert, Modal } from 'react-native';
import { X, ChevronRight, CreditCard, Truck, Wallet, ArrowLeft } from 'lucide-react-native';
import { convertToCurrency, getFullAddress } from '../models/util';
import { useSelector, useDispatch } from 'react-redux';
import { fetchPromotions } from '../reduxToolkit/slices/promotionSlice';
import { fetchDeliveryMethods } from '../reduxToolkit/slices/deliverySlice';
import { fetchPaymentMethods } from '../reduxToolkit/slices/paymentSlice';
import OrderDetailModel from '../models/OrderDetailModel';
import OrderModel from '../models/OrderModel';
import { createOrder } from '../reduxToolkit/slices/orderSlice';
import CreditCardModel from '../models/CreditCardModel';
import { clearCart } from '../reduxToolkit/slices/cartSlice';
import UserModel from '../models/UserModel';

// Step components
const DeliveryStep = ({ onSave, onCancel, initialData }) => { 
  const [address, setAddress] = useState(initialData?.address || {
    street: '',
    city: '',
    state: '',
    zipCode: '',
  });

  const deliveryMethods = useSelector(state => state.delivery.deliveryMethods);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchDeliveryMethods());
  }, []);

  const [method, setMethod] = useState(initialData?.method || deliveryMethods[0].id);
  const [errors, setErrors] = useState({});


  const validateAddress = () => {
    const newErrors = {};
    if (!address.street.trim()) {
      newErrors.street = 'Street Address is required';
    }
    if (!address.city.trim()) {
        newErrors.city = 'City is required';
    }
    if (!address.state.trim()) {
        newErrors.state = 'State is required';
    }
    if (!address.zipCode.trim()) {
        newErrors.zipCode = 'ZIP Code is required';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSave = () => {
    if (validateAddress()) {
      onSave({ address, method });
    }
  };

  return (
    <View style={styles.stepContainer}>
      <View style={styles.stepHeader}>
        <TouchableOpacity onPress={onCancel} style={styles.backButton}>
          <ArrowLeft size={24} color="#000" />
        </TouchableOpacity>
        <Text style={styles.stepTitle}>Delivery Details</Text>
      </View>
      <Text style={styles.sectionTitle}>Delivery Method</Text>
      {deliveryMethods.map((deliveryMethod) => (
        <TouchableOpacity
          key={deliveryMethod.id}
          style={[
            styles.methodOption,
            method === deliveryMethod.id && styles.selectedMethod,
            !deliveryMethod.active && styles.disabledButton,
          ]}
          onPress={() => deliveryMethod.active && setMethod(deliveryMethod.id)}
        >
          <Truck size={20} color={method === deliveryMethod.id ? '#4CAF50' : '#666'} />
          <Text style={styles.methodName}>{deliveryMethod.name}</Text>
          <Text style={styles.methodPrice}>{convertToCurrency(deliveryMethod.fee)}</Text>
        </TouchableOpacity>
      ))}
      <Text style={styles.sectionTitle}>Address</Text>
      <TextInput
        style={[styles.input, errors.street && styles.inputError]}
        placeholder="Street Address"
        value={address.street}
        onChangeText={(text) => setAddress({ ...address, street: text })}
      />
      {errors.street && <Text style={styles.errorText}>{errors.street}</Text>}
      <TextInput
        style={[styles.input, errors.city && styles.inputError]}
        placeholder="City"
        value={address.city}
        onChangeText={(text) => setAddress({ ...address, city: text })}
      />
      {errors.city && <Text style={styles.errorText}>{errors.city}</Text>}
      <View style={styles.rowContainer}>
        <View style={{ flex: 1, marginRight: 10 }}>
          <TextInput
            style={[styles.input, errors.state && styles.inputError]}
            placeholder="State"
            value={address.state}
            onChangeText={(text) => setAddress({ ...address, state: text })}
          />
          {errors.state && <Text style={styles.errorText}>{errors.state}</Text>}
        </View>
        <View style={{ flex: 1 }}>
          <TextInput
            style={[styles.input, errors.zipCode && styles.inputError]}
            placeholder="ZIP Code"
            value={address.zipCode}
            onChangeText={(text) => setAddress({ ...address, zipCode: text })}
          />
          {errors.zipCode && <Text style={styles.errorText}>{errors.zipCode}</Text>}
        </View>
      </View>
      <TouchableOpacity style={styles.button} onPress={handleSave}>
        <Text style={styles.buttonText}>Save Delivery Details</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.cancelButton} onPress={onCancel}>
        <Text style={styles.cancelButtonText}>Cancel</Text>
      </TouchableOpacity>
    </View>
  );
};

const PaymentStep = ({ onSave, onCancel, initialData }) => {

  const dispatch = useDispatch();
  const paymentMethods = useSelector(state => state.payment.paymentMethods);

  console.log("Payment Methods: ", paymentMethods);

  useEffect(() => {
    dispatch(fetchPaymentMethods());
  }, []);

  console.log("Initial Data: ", paymentMethods);

  const [method, setMethod] = useState(initialData?.method || paymentMethods[0].name);
  const [cardDetails, setCardDetails] = useState(initialData?.cardDetails || {
    number: '',
    expiry: '',
    cvv: '',
  }); 
  const [errors, setErrors] = useState({});
  
  const paymentMethodsWithIcons = paymentMethods.map((method) => ({
    ...method,
    icon: method.name === 'Credit Card' ? CreditCard : Wallet,  
  }));

  const validatePayment = () => {
    const newErrors = {};
    if (method === 'Credit Card') {
      if (!cardDetails.number.trim()) newErrors.number = 'Card number is required';
      if (!cardDetails.expiry.trim()) newErrors.expiry = 'Expiry date is required';
      if (!cardDetails.cvv.trim()) newErrors.cvv = 'CVV is required';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSave = () => {
    if (validatePayment()) {
      onSave({ method, cardDetails });
    }
  };

  return (
    <View style={styles.stepContainer}>
      <View style={styles.stepHeader}>
        <TouchableOpacity onPress={onCancel} style={styles.backButton}>
          <ArrowLeft size={24} color="#000" />
        </TouchableOpacity>
        <Text style={styles.stepTitle}>Payment Method</Text>
      </View>
      {paymentMethodsWithIcons.map((paymentMethod) => (
        <TouchableOpacity
          key={paymentMethod.id}
          style={[
            styles.methodOption,
            method === paymentMethod.name && styles.selectedMethod,
          ]}
          onPress={() => setMethod(paymentMethod.name)}
        >
          <paymentMethod.icon size={20} color={method === paymentMethod.name ? '#4CAF50' : '#666'} />
          <Text style={styles.methodName}>{paymentMethod.name}</Text>
        </TouchableOpacity>
      ))}
      {method === 'Credit Card' && (
        <>
          <TextInput
            style={[styles.input, errors.number && styles.inputError]}
            placeholder="Card Number"
            value={cardDetails.number}
            onChangeText={(text) => setCardDetails({ ...cardDetails, number: text })}
            keyboardType="numeric"
          />
          {errors.number && <Text style={styles.errorText}>{errors.number}</Text>}
          <View style={styles.rowContainer}>
            <View style={{ flex: 1, marginRight: 10 }}>
              <TextInput
                style={[styles.input, errors.expiry && styles.inputError]}
                placeholder="MM/YY"
                value={cardDetails.expiry}
                onChangeText={(text) => setCardDetails({ ...cardDetails, expiry: text })}
              />
              {errors.expiry && <Text style={styles.errorText}>{errors.expiry}</Text>}
            </View>
            <View style={{ flex: 1 }}>
              <TextInput
                style={[styles.input, errors.cvv && styles.inputError]}
                placeholder="CVV"
                value={cardDetails.cvv}
                onChangeText={(text) => setCardDetails({ ...cardDetails, cvv: text })}
                keyboardType="numeric"
                secureTextEntry
              />
              {errors.cvv && <Text style={styles.errorText}>{errors.cvv}</Text>}
            </View>
          </View>
        </>
      )}
      <TouchableOpacity style={styles.button} onPress={handleSave}>
        <Text style={styles.buttonText}>Save Payment Method</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.cancelButton} onPress={onCancel}>
        <Text style={styles.cancelButtonText}>Cancel</Text>
      </TouchableOpacity>
    </View>
  );
};

const PromoCodeStep = ({ onSave, onCancel, initialData }) => {
  
  const promoCodes = useSelector(state => state.promotion.promotions);
  
  const [promoCode, setPromoCode] = useState(initialData?.promoCode || '');
  const [discount, setDiscount] = useState(initialData?.discount || 0);
  const [error, setError] = useState('');

  useEffect(() => {
    dispatch(fetchPromotions());
  }, []);

  const dispatch = useDispatch();

    const validatePromoCode = (code) => {
      console.log("Promo Codes: ", promoCodes);
      const discount = promoCodes.find(promo => promo.code === code &&
        new Date(promo.startDate) <= new Date() &&
        new Date(promo.endDate) >= new Date() &&
        promo.active === true
      );

      return discount ? discount.discount : 0;
    };

  const applyPromoCode = () => {
    const discountPercentage = validatePromoCode(promoCode);
    if (discountPercentage > 0) {
      setDiscount(discountPercentage);
      setError('');
      Alert.alert('Success', `Promo code applied! ${discountPercentage}% discount`);
      onSave({ promoCode, discount: discountPercentage });
    } else {
      setError('Invalid promo code. Please try again.');
    }
  };

  return (
    <View style={styles.stepContainer}>
        <View style={styles.stepHeader}>
            <TouchableOpacity onPress={onCancel} style={styles.backButton}>
                <ArrowLeft size={24} color="#000" />
            </TouchableOpacity>
            <Text style={styles.stepTitle}>Promo Code</Text>
        </View>
      <TextInput
        style={styles.input}
        placeholder="Enter Promo Code"
        value={promoCode}
        onChangeText={(text) => {
          setPromoCode(text);
          setError('');
        }}
      />
      {error ? <Text style={styles.errorText}>{error}</Text> : null}
      <TouchableOpacity style={styles.button} onPress={applyPromoCode}>
        <Text style={styles.buttonText}>Apply Code</Text>
      </TouchableOpacity>
      {discount > 0 && (
        <Text style={styles.discountText}>{discount}% discount applied</Text>
      )}
      <TouchableOpacity style={styles.cancelButton} onPress={onCancel}>
        <Text style={styles.cancelButtonText}>Cancel</Text>
      </TouchableOpacity>
    </View>
  );
};

export const CheckoutModal = ({ isVisible, onClose, initialTotalCost, items }) => {
  const [currentStep, setCurrentStep] = useState(null);
  const [checkoutData, setCheckoutData] = useState({
    delivery: null,
    payment: null,
    promoCode: null,
  });
  const [totalCost, setTotalCost] = useState(initialTotalCost);
  const deliveryMethods = useSelector(state => state.delivery.deliveryMethods);
  const paymentMethods = useSelector(state => state.payment.paymentMethods);
  const promotions = useSelector(state => state.promotion.promotions);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchDeliveryMethods());
    dispatch(fetchPaymentMethods());
    dispatch(fetchPromotions());
  }, []);

  const updateTotalCost = () => {
    let newTotal = initialTotalCost;
    if (checkoutData.delivery) {
      newTotal += getDeliveryFee(checkoutData.delivery.method);
    }
    if (checkoutData.promoCode && checkoutData.promoCode.discount) {
      newTotal *= (1 - checkoutData.promoCode.discount / 100);
    }
    setTotalCost(newTotal);
  };

  useEffect(() => {
    updateTotalCost();
  }, [checkoutData, initialTotalCost]);

  // Calculate delivery date
  const calculateDeliveryDate = (method) => {
    const deliveryMethod = deliveryMethods.find(m => m.id === method);
    
    if (deliveryMethod.name === 'Standard Delivery') {
      return new Date(new Date().getTime() + 3 * 24 * 60 * 60 * 1000);
    } else if (deliveryMethod.name === 'Express Delivery') {
      return new Date(new Date().getTime() + 1 * 24 * 60 * 60 * 1000);
    }
  };

  // Get delivery fee
  const getDeliveryFee = (method) => {
    const deliveryMethod = deliveryMethods.find(m => m.id === method);
    return deliveryMethod? deliveryMethod.fee : 0;
  };

  const getDelivery = (method) => {
    const deliveryMethod = deliveryMethods.find(m => m.id === method);
    return deliveryMethod;
  };

  // Get payment method
  const getPaymentMethod = (method) => {
    const paymentMethod = paymentMethods.find(m => m.name === method);
    return paymentMethod;
  };

  // Get promotion
  const getPromotion = (promoCode) => {
    const promotion = promotions.find(p => p.code === promoCode);
    return promotion;
  };

  const handleStepSave = (step, data) => {
    setCheckoutData( prevDate => ({
      ...prevDate,
      [step]: data,
    }));
    setCurrentStep(null);
  }

  const renderStep = () => {
    switch (currentStep) {
      case 'delivery':
        return (
          <DeliveryStep
            onSave={(data) => { handleStepSave('delivery', data) }}
            onCancel={() => setCurrentStep(null)}
            initialData={checkoutData.delivery}
          />
        );
      case 'payment':
        return (
          <PaymentStep
            onSave={(data) => { handleStepSave('payment', data) }}
            onCancel={() => setCurrentStep(null)}
            initialData={checkoutData.payment}
          />
        );
      case 'promo':
        return (
          <PromoCodeStep
            onSave={(data) => { handleStepSave('promoCode', data) }}
            onCancel={() => setCurrentStep(null)}
            initialData={checkoutData.promoCode}
          />
        );
      default:
        return (
          <View style={styles.mainCheckout}>
            <TouchableOpacity
              style={styles.checkoutItem}
              onPress={() => setCurrentStep('delivery')}
            >
              <Text style={styles.itemLabel}>Delivery</Text>
              <View style={styles.itemRight}>
                <Text style={styles.itemValue}>
                  {checkoutData.delivery ? 'Address Added' : 'Select Method'}
                </Text>
                <ChevronRight size={20} color="#666" />
              </View>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.checkoutItem}
              onPress={() => setCurrentStep('payment')}
            >
              <Text style={styles.itemLabel}>Payment</Text>
              <View style={styles.itemRight}>
                <Text style={styles.itemValue}>
                  {checkoutData.payment ? checkoutData.payment.method : 'Select Method'}
                </Text>
                <ChevronRight size={20} color="#666" />
              </View>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.checkoutItem}
              onPress={() => setCurrentStep('promo')}
            >
              <Text style={styles.itemLabel}>Promo Code</Text>
              <View style={styles.itemRight}>
                <Text style={styles.itemValue}>
                  {checkoutData.promoCode ? `${checkoutData.promoCode.discount}% Off` : 'Add Code'}
                </Text>
                <ChevronRight size={20} color="#666" />
              </View>
            </TouchableOpacity>

            <View style={styles.totalContainer}>
              <Text style={styles.totalLabel}>Total Cost</Text>
              <Text style={styles.totalAmount}>{convertToCurrency(totalCost)}</Text>
            </View>

            <Text style={styles.terms}>
              By placing an order you agree to our Terms And Conditions
            </Text>

            <TouchableOpacity
              style={[
                styles.placeOrderButton,
                (!checkoutData.delivery || !checkoutData.payment) && styles.disabledButton,
              ]}
              disabled={!checkoutData.delivery || !checkoutData.payment}
              onPress={() => {
                // Handle order placement
                console.log('Order placed:', checkoutData.promoCode);
                
                const orderDetails = items.map(item => new OrderDetailModel(null, item.product.id, item.quantity, item.price));

                const creditCard = new CreditCardModel(null, checkoutData.payment.cardDetails .number, checkoutData.payment.cardDetails.expiry, checkoutData.payment.cardDetails.cvv);
                
                // Mock user id
                const user = new UserModel(5, 'Nguyễn Thanh Nhứt', 'thanhnhutcu@gmail.com');

                const order = new OrderModel(
                  new Date(),
                  getFullAddress(checkoutData.delivery.address.city, checkoutData.delivery.address.street, checkoutData.delivery.address.state, checkoutData.delivery.address.zipCode),
                  calculateDeliveryDate(checkoutData.delivery.method),
                  getDeliveryFee(checkoutData.delivery.method),
                  "Pending",
                  orderDetails,
                  getPaymentMethod(checkoutData.payment.method),
                  creditCard,
                  getDelivery(checkoutData.delivery.method),
                  getPromotion(checkoutData.promoCode?.promoCode),
                  user
                );

                dispatch(createOrder(order));
                console.log('Order:', order);

                Alert.alert('Order Placed', 'Your order has been successfully placed!');
                dispatch(clearCart());
                onClose();
              }}
            >
              <Text style={styles.placeOrderText}>Place Order</Text>
            </TouchableOpacity>
          </View>
        );
    }
  };

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={isVisible}
      onRequestClose={onClose}
    >
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
          <View style={styles.header}>
            <Text style={styles.headerTitle}>Checkout</Text>
            <TouchableOpacity onPress={onClose}>
              <X size={24} color="#000" />
            </TouchableOpacity>
          </View>
          <ScrollView style={styles.content}>{renderStep()}</ScrollView>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: 'flex-end',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: 'white',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    height: '50%',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '600',
  },
  content: {
    flex: 1,
  },
  mainCheckout: {
    padding: 20,
  },
  checkoutItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  itemLabel: {
    fontSize: 16,
    color: '#333',
  },
  itemRight: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  itemValue: {
    color: '#666',
  },
  totalContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 20,
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  totalLabel: {
    fontSize: 16,
    fontWeight: '500',
  },
  totalAmount: {
    fontSize: 16,
    fontWeight: '600',
  },
  terms: {
    fontSize: 12,
    color: '#666',
    textAlign: 'center',
    marginTop: 20,
  },
  placeOrderButton: {
    backgroundColor: '#4CAF50',
    padding: 15,
    borderRadius: 8,
    marginTop: 20,
  },
  placeOrderText: {
    color: 'white',
    textAlign: 'center',
    fontSize: 16,
    fontWeight: '600',
  },
  disabledButton: {
    opacity: 0.5,
    backgroundColor: '#f5f5f5',
    borderColor: '#ccc',
  },
  stepContainer: {
    padding: 20,
  },
  stepTitle: {
    fontSize: 20,
    fontWeight: '600',
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginTop: 15,
    marginBottom: 10,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    padding: 12,
    marginBottom: 15,
    fontSize: 16,
  },
  rowContainer: {
    flexDirection: 'row',
    gap: 5,
    width: '100%',
  },
  button: {
    backgroundColor: '#4CAF50',
    padding: 15,
    borderRadius: 8,
    marginTop: 10,
  },
  buttonText: {
    color: 'white',
    textAlign: 'center',
    fontSize: 16,
    fontWeight: '600',
  },
  methodOption: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 15,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    marginBottom: 10,
  },
  selectedMethod: {
    borderColor: '#4CAF50',
    backgroundColor: '#E8F5E9',
  },
  disabledButton: {
    opacity: 0.5,
  },
  methodName: {
    marginLeft: 10,
    fontSize: 16,
    flex: 1,
  },
  methodPrice: {
    fontSize: 16,
    fontWeight: '600',
  },
  discountText: {
    marginTop: 10,
    fontSize: 16,
    color: '#4CAF50',
    fontWeight: '600',
},
  errorText: {
    color: 'red',
    marginBottom: 10,
  },
  cancelButton: {
    marginTop: 10,
    padding: 10,
  },
  cancelButtonText: {
    color: '#666',
    textAlign: 'center',
  },
  inputError: {
    borderColor: 'red',
  },
  backButton: {
    marginRight: 10,
  },
  stepHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
});