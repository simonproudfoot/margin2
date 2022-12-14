export const strict = false
export const state = () => ({
    mainNav: [],
    footerNav: []
})
export const mutations = {
  SET_NAV: (state, nav) => {
    state.mainNav = nav;
  },
};

export const actions = {
  async getNav({ state, commit }) {
    // if events is already set, stop

    if (state.mainNav.length) return;
    try {
      let nav = await this.$axios.$get('menus/v1/menus/main-menu');
      
     
      // filter out unnecessary data
      // events = nav.map(({ items }) => ({
      //   items,
      // }));
      commit('SET_NAV', nav.items);
    } catch (err) {
      console.error('getNav', err);
    }
  },
};
