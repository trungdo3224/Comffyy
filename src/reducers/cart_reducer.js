import {
  ADD_TO_CART,
  CLEAR_CART,
  COUNT_CART_TOTALS,
  REMOVE_CART_ITEM,
  TOGGLE_CART_ITEM_AMOUNT,
} from "../actions";

const cart_reducer = (state, action) => {
  const { type, payload } = action;
  if (type === ADD_TO_CART) {
    const { id, color, amount, product } = payload;
    const tempItem = state.cart.find((item) => item.id === id + color);
    if (tempItem) {
      const tempCart = state.cart.map((cartItem) => {
        if (cartItem.id === id + color) {
          let newAmount = cartItem.amount + amount;
          if (newAmount > cartItem.max) {
            newAmount = cartItem.max;
          }
          return { ...cartItem, amount: newAmount };
        } else {
          return cartItem;
        }
      });
      return { ...state, cart: tempCart };
    } else {
      const newItem = {
        id: id + color,
        name: product.name,
        color,
        amount,
        image: product.images[0].url,
        price: product.price,
        max: product.stock,
      };
      return { ...state, cart: [...state.cart, newItem] };
    }
  }
  if (type === REMOVE_CART_ITEM) {
    const tempCart = state.cart.filter((item) => item.id !== payload);
    return { ...state, cart: tempCart };
  }
  if (type === CLEAR_CART) {
    return { ...state, cart: [] };
  }
  if (type === TOGGLE_CART_ITEM_AMOUNT) {
    const { id, value } = payload;
    const tempCart = state.cart.map((item) => {
      if (item.id === id) {
        if (value === "inc") {
          let newAmount = item.amount + 1;
          if (newAmount > item.max) {
            newAmount = item.max;
          }
          return { ...item, amount: newAmount };
        }
        if (value === "dec") {
          let newAmount = item.amount - 1;
          if (newAmount < 1) {
            newAmount = 1;
          }

          return { ...item, amount: newAmount };
        }
      } else {
        return item;
      }
    });
    return { ...state, cart: tempCart };
  }
  if (type === COUNT_CART_TOTALS) {
    const { totalItems, totalAmount } = state.cart.reduce(
      (total, cartItem) => {
        const { amount, price } = cartItem;
        total.totalItems += amount;
        total.totalAmount += price * amount;
        return total;
      },
      { totalItems: 0, totalAmount: 0 }
    );
    return { ...state, totalAmount, totalItems };
  }
  throw new Error(`No Matching "${action.type}" - action type`);
};

export default cart_reducer;
