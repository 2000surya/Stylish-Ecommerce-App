export const discountPrice = (originalPrice, discountPercent) => {
  if (!originalPrice) return 0;

  const price = originalPrice - (originalPrice * discountPercent) / 100;

  return price.toFixed(2);
};
