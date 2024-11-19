import React, { useState } from 'react';
import { View, Text, TouchableOpacity, TextInput, ScrollView, StyleSheet, Alert, Modal } from 'react-native';
import { X, ChevronRight, CreditCard, Truck, Wallet } from 'lucide-react-native';

// Mock data for delivery and payment methods
const deliveryMethods = [
  { id: 'standard', name: 'Standard Delivery', price: 5 },
  { id: 'express', name: 'Express Delivery', price: 10 },
];

const paymentMethods = [
  { id: 'credit_card', name: 'Credit Card', icon: CreditCard },
  { id: 'cash', name: 'Cash on Delivery', icon: Wallet },
];

// Mock function to validate promo code
const validatePromoCode = (code) => {
  const validCodes = {
    'SUMMER10': 10,
    'WELCOME20': 20,
  };
  return validCodes[code] || 0;
};

// Step components
const DeliveryStep = ({ onSave, selectedMethod }) => {
  const [address, setAddress] = useState({
    street: '',
    city: '',
    state: '',
    zipCode: '',
  });
  const [method, setMethod] = useState(selectedMethod || deliveryMethods[0].id);

  return (
    <View style={styles.stepContainer}>
      <Text style={styles.stepTitle}>Delivery Details</Text>
      <Text style={styles.sectionTitle}>Delivery Method</Text>
      {deliveryMethods.map((deliveryMethod) => (
        <TouchableOpacity
          key={deliveryMethod.id}
          style={[
            styles.methodOption,
            method === deliveryMethod.id && styles.selectedMethod,
          ]}
          onPress={() => setMethod(deliveryMethod.id)}
        >
          <Truck size={20} color={method === deliveryMethod.id ? '#4CAF50' : '#666'} />
          <Text style={styles.methodName}>{deliveryMethod.name}</Text>
          <Text style={styles.methodPrice}>${deliveryMethod.price}</Text>
        </TouchableOpacity>
      ))}
      <Text style={styles.sectionTitle}>Address</Text>
      <TextInput
        style={styles.input}
        placeholder="Street Address"
        value={address.street}
        onChangeText={(text) => setAddress({ ...address, street: text })}
      />
      <TextInput
        style={styles.input}
        placeholder="City"
        value={address.city}
        onChangeText={(text) => setAddress({ ...address, city: text })}
      />
      <View style={styles.rowContainer}>
        <TextInput
          style={[styles.input, { flex: 1, marginRight: 10 }]}
          placeholder="State"
          value={address.state}
          onChangeText={(text) => setAddress({ ...address, state: text })}
        />
        <TextInput
          style={[styles.input, { flex: 1 }]}
          placeholder="ZIP Code"
          value={address.zipCode}
          onChangeText={(text) => setAddress({ ...address, zipCode: text })}
        />
      </View>
      <TouchableOpacity
        style={styles.button}
        onPress={() => onSave({ address, method })}
      >
        <Text style={styles.buttonText}>Save Delivery Details</Text>
      </TouchableOpacity>
    </View>
  );
};

const PaymentStep = ({ onSave, selectedMethod }) => {
  const [method, setMethod] = useState(selectedMethod || paymentMethods[0].id);
  const [cardDetails, setCardDetails] = useState({
    number: '',
    expiry: '',
    cvv: '',
  });

  return (
    <View style={styles.stepContainer}>
      <Text style={styles.stepTitle}>Payment Method</Text>
      {paymentMethods.map((paymentMethod) => (
        <TouchableOpacity
          key={paymentMethod.id}
          style={[
            styles.methodOption,
            method === paymentMethod.id && styles.selectedMethod,
          ]}
          onPress={() => setMethod(paymentMethod.id)}
        >
          <paymentMethod.icon size={20} color={method === paymentMethod.id ? '#4CAF50' : '#666'} />
          <Text style={styles.methodName}>{paymentMethod.name}</Text>
        </TouchableOpacity>
      ))}
      {method === 'credit_card' && (
        <>
          <TextInput
            style={styles.input}
            placeholder="Card Number"
            value={cardDetails.number}
            onChangeText={(text) => setCardDetails({ ...cardDetails, number: text })}
            keyboardType="numeric"
          />
          <View style={styles.rowContainer}>
            <TextInput
              style={[styles.input, { flex: 1, marginRight: 10 }]}
              placeholder="MM/YY"
              value={cardDetails.expiry}
              onChangeText={(text) => setCardDetails({ ...cardDetails, expiry: text })}
            />
            <TextInput
              style={[styles.input, { flex: 1 }]}
              placeholder="CVV"
              value={cardDetails.cvv}
              onChangeText={(text) => setCardDetails({ ...cardDetails, cvv: text })}
              keyboardType="numeric"
              secureTextEntry
            />
          </View>
        </>
      )}
      <TouchableOpacity
        style={styles.button}
        onPress={() => onSave({ method, cardDetails })}
      >
        <Text style={styles.buttonText}>Save Payment Method</Text>
      </TouchableOpacity>
    </View>
  );
};

const PromoCodeStep = ({ onSave, currentPromo }) => {
  const [promoCode, setPromoCode] = useState(currentPromo || '');
  const [discount, setDiscount] = useState(0);

  const applyPromoCode = () => {
    const discountPercentage = validatePromoCode(promoCode);
    if (discountPercentage > 0) {
      setDiscount(discountPercentage);
      Alert.alert('Success', `Promo code applied! ${discountPercentage}% discount`);
      onSave({ promoCode, discount: discountPercentage });
    } else {
      Alert.alert('Invalid Code', 'The entered promo code is invalid.');
    }
  };

  return (
    <View style={styles.stepContainer}>
      <Text style={styles.stepTitle}>Promo Code</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter Promo Code"
        value={promoCode}
        onChangeText={setPromoCode}
      />
      <TouchableOpacity style={styles.button} onPress={applyPromoCode}>
        <Text style={styles.buttonText}>Apply Code</Text>
      </TouchableOpacity>
      {discount > 0 && (
        <Text style={styles.discountText}>{discount}% discount applied</Text>
      )}
    </View>
  );
};

export const CheckoutModal = ({ isVisible, onClose, initialTotalCost }) => {
  const [currentStep, setCurrentStep] = useState(null);
  const [checkoutData, setCheckoutData] = useState({
    delivery: null,
    payment: null,
    promoCode: null,
  });
  const [totalCost, setTotalCost] = useState(initialTotalCost);

  const updateTotalCost = () => {
    let newTotal = initialTotalCost;
    if (checkoutData.delivery) {
      const deliveryMethod = deliveryMethods.find(m => m.id === checkoutData.delivery.method);
      newTotal += deliveryMethod ? deliveryMethod.price : 0;
    }
    if (checkoutData.promoCode && checkoutData.promoCode.discount) {
      newTotal *= (1 - checkoutData.promoCode.discount / 100);
    }
    setTotalCost(newTotal.toFixed(2));
  };

  React.useEffect(() => {
    updateTotalCost();
  }, [checkoutData]);

  const renderStep = () => {
    switch (currentStep) {
      case 'delivery':
        return (
          <DeliveryStep
            onSave={(data) => {
              setCheckoutData({ ...checkoutData, delivery: data });
              setCurrentStep(null);
            }}
            selectedMethod={checkoutData.delivery?.method}
          />
        );
      case 'payment':
        return (
          <PaymentStep
            onSave={(data) => {
              setCheckoutData({ ...checkoutData, payment: data });
              setCurrentStep(null);
            }}
            selectedMethod={checkoutData.payment?.method}
          />
        );
      case 'promo':
        return (
          <PromoCodeStep
            onSave={(data) => {
              setCheckoutData({ ...checkoutData, promoCode: data });
              setCurrentStep(null);
            }}
            currentPromo={checkoutData.promoCode?.promoCode}
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
              <Text style={styles.totalAmount}>${totalCost}</Text>
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
                console.log('Order placed:', checkoutData);
                Alert.alert('Order Placed', 'Your order has been successfully placed!');
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
    height: '80%',
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
    gap: 10,
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
});