import * as moment from "moment";

export const formatTime = (time) => moment(time).format("DD/MM/YYYY HH:mm");

export const formatMoney = (input = 0) =>
  input
    ?.toLocaleString("it-IT", {
      style: "currency",
      currency: "VND",
    })
    .replace("VND", "₫");

const handleActiveRate = (rate, count) => {
  const rating = (rate || 0) / Math.round(count || 1);
  if (Math.round(rate) === 0) {
    return [1, 2, 3, 4, 5];
  } else {
    let arr = [];
    for (let i = 0; i < Math.round(rating); i++) {
      arr.push(i);
    }
    return arr;
  }
};

const handleUnRate = (rate, count) => {
  const arr = [];
  for (let i = 0; i < 5 - handleActiveRate(rate, count).length; i++) {
    arr.push(i);
  }
  return arr;
};

export const handleRate = (rate, count) => {
  return [handleActiveRate(rate, count), handleUnRate(rate, count)];
};
