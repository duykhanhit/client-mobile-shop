export const formatMoney = (input = 0) =>
  input
    .toLocaleString("it-IT", {
      style: "currency",
      currency: "VND",
    })
    .replace("VND", "₫");
