import {
  LOAD_PRODUCTS,
  SET_LISTVIEW,
  SET_GRIDVIEW,
  UPDATE_SORT,
  SORT_PRODUCTS,
  UPDATE_FILTERS,
  FILTER_PRODUCTS,
  CLEAR_FILTERS,
} from "../actions";

const filter_reducer = (state, action) => {
  const { type, payload } = action;
  if (type === LOAD_PRODUCTS) {
    let prices = payload.map((product) => product.price);
    let maxPrice = Math.max(...prices);
    return {
      ...state,
      allProducts: [...payload],
      filteredProducts: [...payload],
      filters: {
        ...state.filters,
        maxPrice: maxPrice,
        price: maxPrice,
      },
    };
  }
  if (type === SET_GRIDVIEW) {
    return { ...state, gridView: true };
  }
  if (type === SET_LISTVIEW) {
    return { ...state, gridView: false };
  }
  if (type === UPDATE_SORT) {
    return { ...state, sort: payload };
  }
  if (type === SORT_PRODUCTS) {
    const { sort, filteredProducts } = state;
    const tempProducts = [...filteredProducts];
    if (sort === "price-lowest") {
      tempProducts.sort((a, b) => a.price - b.price);
    }
    if (sort === "price-highest") {
      tempProducts.sort((a, b) => b.price - a.price);
    }
    if (sort === "a-z") {
      tempProducts.sort((a, b) => {
        return a.name.localeCompare(b.name);
      });
    }
    if (sort === "z-a") {
      tempProducts.sort((a, b) => {
        return b.name.localeCompare(a.name);
      });
    }
    return { ...state, filteredProducts: tempProducts };
  }
  if (type === UPDATE_FILTERS) {
    const { name, value } = payload;
    return { ...state, filters: { ...state.filters, [name]: value } };
  }
  if (type === FILTER_PRODUCTS) {
    const { allProducts } = state;
    const { text, company, category, color, price, shipping } = state.filters;
    let tempProducts = [...allProducts];
    if (text) {
      tempProducts = tempProducts.filter((product) => {
        return product.name.toLowerCase().startsWith(text);
      });
    }
    if (category !== "all") {
      tempProducts = tempProducts.filter(
        (product) => product.category === category
      );
    }
    if (company !== "all") {
      tempProducts = tempProducts.filter(
        (product) => product.company === company
      );
    }
    if (color !== "all") {
      tempProducts = tempProducts.filter((product) =>
        product.colors.find((c) => c === color)
      );
    }
    if (price) {
      tempProducts = tempProducts.filter((product) =>
        product.price <= price
      );
    }
    if (shipping) {
      tempProducts = tempProducts.filter((product) =>
        product.shipping === true
      );
    }
    return { ...state, filteredProducts: tempProducts };
  }
  if (type === CLEAR_FILTERS) {
    return {
      ...state,
      filters: {
        ...state.filters,
        text: "",
        company: "all",
        category: "all",
        color: "all",
        price: state.filters.maxPrice,
        shipping: false,
      },
    };
  }
  return state;
  throw new Error(`No Matching "${action.type}" - action type`);
};

export default filter_reducer;
