// Utility function to parse price from string
export const parsePrice = (priceString: string): number => {
  // Remove all non-digit and non-decimal characters
  const cleanPrice = priceString.replace(/[^\d.]/g, '');
  const parsed = parseFloat(cleanPrice);
  
  // Debug logging
  console.log(`Original: "${priceString}" -> Cleaned: "${cleanPrice}" -> Parsed: ${parsed}`);
  
  return isNaN(parsed) ? 0 : parsed;
};

// Test the function
const testPrices = ['₹9.99', '₹12.50', '₹5.00'];
testPrices.forEach(price => {
  console.log(`Testing: ${price} = ${parsePrice(price)}`);
});
