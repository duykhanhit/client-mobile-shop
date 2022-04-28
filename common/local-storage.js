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
