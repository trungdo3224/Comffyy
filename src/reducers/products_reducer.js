import {
  SIDEBAR_OPEN,
  SIDEBAR_CLOSE,
  GET_PRODUCTS_BEGIN,
  GET_PRODUCTS_SUCCESS,
  GET_PRODUCTS_ERROR,
  GET_SINGLE_PRODUCT_BEGIN,
  GET_SINGLE_PRODUCT_SUCCESS,
  GET_SINGLE_PRODUCT_ERROR,
} from "../actions";

const productsReducer = (state, action) => {
  const { type, payload } = action;
  if (type === SIDEBAR_OPEN) return { ...state, isSidebarOpen: true };
  if (type === SIDEBAR_CLOSE) return { ...state, isSidebarOpen: false };
  if (type === GET_PRODUCTS_BEGIN) return { ...state, productsLoading: true };
  if (type === GET_PRODUCTS_SUCCESS) {
    const featuredProducts = payload.filter(
      (product) => product.featured === true
    );
    return {
      ...state,
      productsLoading: false,
      products: payload,
      featuredProducts,
    };
  }
  if (type === GET_PRODUCTS_ERROR) {
    return {
      ...state,
      productsLoading: false,
      productsError: payload,
      products: [],
      featuredProducts: [],
    };
  }
  if (type === GET_SINGLE_PRODUCT_BEGIN)
    return { ...state, singleProductLoading: true, singleProductError: false };
  if (type === GET_SINGLE_PRODUCT_SUCCESS) {
    return { ...state, singleProduct: payload, singleProductLoading: false };
  }
  if (type === GET_SINGLE_PRODUCT_ERROR) {
    return {
      ...state,
      singleProduct: {},
      singleProductLoading: false,
      singleProductError: true,
    };
  }

  throw new Error(`No Matching "${action.type}" - action type`);
};

export default productsReducer;
