export const strict = false

export const state = () => ({
  pageFeatures: ''
})

export const getters = {

}

export const mutations = {
  SET_FEATURED: (state, data) => {
    state.pageFeatures = data;
  },

};

export const actions = {

};
