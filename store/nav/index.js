export const strict = false
export const state = () => ({
    mainNav: [],
    footerNav: [],
    darkNav: false
})
export const mutations = {
  SET_DARK: (state, val) => {
    state.darkNav = val;
  },
  SET_NAV: (state, nav) => {
    state.mainNav = nav;
  },
};

export const actions = {
  async getNav({ state, commit }) {
    if (state.mainNav.length) return;
    try {
      let nav = await this.$axios.$get('menus/v1/menus/main-menu');
      commit('SET_NAV', nav.items);
    } catch (err) {
      console.error('getNav', err);
    }
  },
};
