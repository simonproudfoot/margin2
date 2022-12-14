export const strict = false

export const state = () => ({
    pageData: [],
})

export const getters ={
  featuredImage(state) {
    if (state.pageData && state.pageData[0]?.featured_media) {
      return state.pageData[0]['_embedded']['wp:featuredmedia'][0].media_details.sizes.full.source_url;
    } else {
      return false
    }
  },
}

export const mutations = {
  SET_PAGE: (state, nav) => {
    state.mainNav = nav;
  },
};

export const actions = {
  async getPage({ state, commit, rootState }, { $route }) {
    // if events is already set, stop
   //console.log($route)
    //console.log(rootState.params)

  //   if (state.pageData.length) return;

  //   try {
  //       const pageSlug = rootState
  //       console.log('slug',pageSlug)
  //     let page = await this.$axios.$get(`wp/v2/pages?slug=${pageSlug}&_embed`);
      
  //     console.log(page)
  //     // filter out unnecessary data
  //     // events = nav.map(({ items }) => ({
  //     //   items,
  //     // }));
  //     commit('SET_PAGE', page);
  //   } catch (err) {
  //     console.error('pageData', err);
  //   }
  // },
  }
};
