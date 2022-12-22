export const strict = false
export const state = () => ({
  pageFeatures: {
    title: '',
    featuredImage: {
      src: '',
      sizes: [],
      alt: ''
    },
    darkMode: false,
    hasContactForm: false,
    featured_video: '',
    yoast_head_json: []
  },
})
export const mutations = {
  FORCE_LIGHT: (state) => {
    state.pageFeatures.darkMode = false
  },
  FORCE_DARK: (state) => {
    state.pageFeatures.darkMode = true
  },
  SET_FEATURED: (state, data) => {
    state.pageFeatures = data;
  },
};
