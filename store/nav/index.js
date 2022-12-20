export const strict = false
export const state = () => ({
  mainNav: [],
  footerNav: [],
  darkNav: false,
  menuOpen: false
})
export const mutations = {
  CLOSE_MENU: (state) => {
    state.menuOpen = false
  },
  SET_MENU: (state) => {
    state.menuOpen = !state.menuOpen
  },
  SET_DARK: (state, val) => {
    state.darkNav = val;
  },
  SET_NAV: (state, nav) => {
    state.mainNav = nav;
  },
  SET_FOOT: (state, nav) => {
    state.footerNav = nav;
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
  async getFooter({ state, commit }) {
    if (state.footerNav.length) return;
    try {
      let nav = await this.$axios.$get('menus/v1/menus/footer-menu');
      commit('SET_FOOT', nav.items);
    } catch (err) {
      console.error('getFoot', err);
    }
  },
};
