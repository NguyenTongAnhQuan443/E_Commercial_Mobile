import * as Network from 'expo-network';

function convertToCurrency(value: number): string {
  return value.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' });
}

function getFullAddress(city: string, street: string, state: string, zipCode: string): string {
  return `${street}, ${state}, ${city}, ${zipCode}`;
}

const getIpAddress = async () => {
  try {
    const ipAddress = await Network.getIpAddressAsync(); 
    return ipAddress; 
  } catch (error) {
    console.error("Error fetching IP address: ", error);
    return null; 
  }
}

export { convertToCurrency, getFullAddress, getIpAddress };