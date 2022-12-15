export const strict = false

export const state = () => ({
  pageFeatures: {  
    title: '',
    featuredImage: '',
    darkMode: false,
    hasContactForm: false,
  },
})

export const getters = {

}

export const mutations = {
  FORCE_DARK: (state) => {
    state.pageFeatures.darkMode = true
  },
  SET_FEATURED: (state, data) => {
    state.pageFeatures = data;
  },

};

export const actions = {

};
