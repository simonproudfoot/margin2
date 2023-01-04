export const state = () => ({
  cart: [],
  sessionData: {},
});
export const mutations = {
  SET_STRIPE_SESSION_DATA: (state, payload) => (state.sessionData = payload),
  CLEAR_CART: (state) => {
    state.cart = [];
  },
  ADD_TO_CART: (state, payload) => {
    state.cart.push(payload);
  },
  RESET_STRIPE_SESSION: (state) => {
    state.sessionData = {};
  },
};

export const actions = {
  async createStripeSession({ commit }, data) {
    const { session } = await this.$axios.$post(
      `${process.env.netlifyFunctionsUrl}/create-checkout-session`,
      data,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    if (session.id) {
      commit("SET_STRIPE_SESSION_DATA", session);
    }
    return session;
  },
  async retriveStripeSession({ state, commit }) {
    const { session } = await this.$axios.$post(
      `${process.env.netlifyFunctionsUrl}/retrive-checkout-session`,
      {
        sessionId: state.sessionData.id,
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    if (session.id) {
      commit("SET_STRIPE_SESSION_DATA", session);
    }
    return session;
  },
};