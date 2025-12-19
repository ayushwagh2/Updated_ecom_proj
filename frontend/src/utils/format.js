export const formatCurrency = (value) => {
  const number = Number(value) || 0;
  return number.toLocaleString("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 2,
    minimumFractionDigits: 2,
  });
};

