import { toast } from "react-toastify";

export const addToLocal = (key, value) => {
  const items =
    typeof window !== "undefined"
      ? localStorage.getItem(key)
        ? localStorage.getItem(key)
        : { carts: [] }
      : {
          carts: [],
        };

  if (typeof items !== "string") {
    value.version.currentQuantity = 1;
    items.carts.push(value);
    typeof window !== "undefined" &&
      localStorage.setItem(key, JSON.stringify(items));
  } else {
    const newItems = { ...JSON.parse(items) };
    let check = false;
    newItems.carts.forEach((e) => {
      if (e.version.id === value.version.id) {
        check = true;
        e.version.currentQuantity = e.version.currentQuantity + 1;
      }
    });
    if (!check) {
      value.version.currentQuantity = 1;
      newItems.carts.push(value);
    }
    typeof window !== "undefined" &&
      localStorage.setItem(key, JSON.stringify(newItems));
  }
};

export const getFromLocal = (key) => {
  const items =
    typeof window !== "undefined"
      ? localStorage.getItem(key)
        ? localStorage.getItem(key)
        : { carts: [] }
      : {
          carts: [],
        };

  if (typeof items !== "string") {
    return items.carts;
  } else {
    const newItems = { ...JSON.parse(items) };
    return newItems.carts;
  }
};

export const deleteItemInLocal = (id) => {
  const items = getFromLocal("cart");
  const newItems = items.filter((e) => e.version.id !== id);
  typeof window !== "undefined" &&
    localStorage.setItem(
      "cart",
      JSON.stringify({
        carts: newItems,
      })
    );
};

export const resetItemInLocal = () => {
  typeof window !== "undefined" &&
    localStorage.setItem(
      "cart",
      JSON.stringify({
        carts: [],
      })
    );
};

export const changeQuantityItemInLocal = (id, mode) => {
  const items = getFromLocal("cart");

  for (let i = 0; i < items.length; i++) {
    const item = items[i];
    if (item.version.id === id) {
      if (mode === "minus") {
        item.version.currentQuantity--;
        if (item.version.currentQuantity === 0) {
          toast.error("S??? l?????ng s???n ph???m ???? ?????t t???i thi???u");
          return;
        }
      } else {
        item.version.currentQuantity++;
        if (item.version.currentQuantity > item.version.quantity) {
          toast.error("S??? l?????ng s???n ph???m ???? ?????t t???i ??a");
          return;
        }
      }
    }
  }

  typeof window !== "undefined" &&
    localStorage.setItem(
      "cart",
      JSON.stringify({
        carts: items,
      })
    );
};

export const onChangeQuantityItemInLocal = (id, quantity) => {
  const items = getFromLocal("cart");

  for (let i = 0; i < items.length; i++) {
    const item = items[i];
    if (item.version.id === id) {
      if (quantity > item.version.quantity) {
        toast.error(
          `S??? l?????ng s???n ph???m kh??ng h???p l???, ch??? c??n ${item.version.quantity} s???n ph???m`
        );
        return [false, 1];
      } else if (!quantity || +quantity <= 0) {
        toast.error(`S??? l?????ng s???n ph???m ???? ?????t t???i thi???u`);
        return [false, 0];
      } else {
        item.version.currentQuantity = quantity;
      }
    }
  }

  typeof window !== "undefined" &&
    localStorage.setItem(
      "cart",
      JSON.stringify({
        carts: items,
      })
    );

  return [true, true];
};
