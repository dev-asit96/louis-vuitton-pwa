const Storage = (cartItems) => {
  localStorage.setItem(
    "cart",
    JSON.stringify(cartItems.length > 0 ? cartItems : [])
  );
};

//Total items is in cart
export const sumItems = (cartItems) => {
  Storage(cartItems);
  let itemCount = cartItems.reduce(
    (total, product) => total + product.quantity,
    0
  );
  let total = cartItems
    .reduce((total, product) => total + product.prd_Rate * product.quantity, 0)
    .toFixed(2);
  return { itemCount, total };
};

export const CartReducer = (state, action) => {
  switch (action.type) {
    
    case "ADD_ITEM":
      if (
        !state.cartItems.find((item) => item.sl_no === action.payload.sl_no)
      ) {
        state.cartItems.push({
          ...action.payload,
          quantity: 1,
        });
      }

      return {
        ...state,
        ...sumItems(state.cartItems),
        cartItems: [...state.cartItems],
      };
    
    case "REMOVE_ITEM":
      return {
        ...state,
        ...sumItems(
          state.cartItems.filter((item) => item.sl_no !== action.payload.sl_no)
        ),
        cartItems: [
          ...state.cartItems.filter(
            (item) => item.sl_no !== action.payload.sl_no
          ),
        ],
      };

    case "INCREASE":
      state.cartItems[
        state.cartItems.findIndex((item) => item.sl_no === action.payload.sl_no)
      ].quantity++;
      return {
        ...state,
        ...sumItems(state.cartItems),
        cartItems: [...state.cartItems],
      };
 
    case "DECREASE":
      state.cartItems[
        state.cartItems.findIndex((item) => item.sl_no === action.payload.sl_no)
      ].quantity--;
      return {
        ...state,
        ...sumItems(state.cartItems),
        cartItems: [...state.cartItems],
      };
 
    case "CHECKOUT":
      return {
        cartItems: [],
        checkout: true,
        ...sumItems([]),
      };

    case "TOTAL_ITEM_PRICE": {
      let cartItems = JSON.parse(localStorage.getItem("cart"));
      let totalItemPrice = cartItems.map((item) => {
        let total = 0;
        return (total = item.prd_Rate + total);
      });
      return totalItemPrice;
    }
    case "CLEAR":
      return {
        cartItems: [],
        ...sumItems([]),
      };
    default:
      return state;
  }
};
