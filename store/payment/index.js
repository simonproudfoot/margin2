export const state = () => ({
  cartUIStatus: "idle",
  cart: {},
  clientSecret: "",
  userDetails: {}
});
export const mutations = {
  UPDATE_CART_UI: (state, payload) => {
    state.cartUIStatus = payload;
  },
  CLEAR_CART: (state) => {
    state.cart = {};
    state.cartUIStatus = "idle";
    state.clientSecret = "";
  },
  ADD_TO_CART: (state, payload) => {
    state.cart = payload;
  },
  SET_CLIENT_SECRET: (state, payload) => {
    state.clientSecret = payload;
  },
};

export const actions = {
  async createPaymentIntent({ commit, state }, quantity) {
    try {
      const { name: itemName, price } = state.cart;
      const amount = Number(price) * 100 * quantity;
      const result = await this.$axios.$post(
        `${process.env.netlifyFunctionsUrl}/create-payment-intent`,
        {
          currency: "gbp",
          amount,
          itemName,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (result.clientSecret) {
        commit("SET_CLIENT_SECRET", result.clientSecret);
      }
    } catch (e) {
      console.log("error", e);
    }
  },
};
