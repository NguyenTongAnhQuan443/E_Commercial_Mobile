function convertToCurrency(value: number): string {
  return value.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' });
}

function getFullAddress(city: string, street: string, state: string, zipCode: string): string {
  return `${street}, ${state}, ${city}, ${zipCode}`;
}

export { convertToCurrency, getFullAddress };