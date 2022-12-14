export const strict = false
export const state = () => ({
    mainNav: [],
    footerNav: [],
    menuOpen: false
})

export const getters = {
    mainNav: state => state.mainNav,
    footerNav: state => state.footerNav,
}

export const mutations = {
    SET_NAV(state, data) {
        state.mainNav = data
    },
    SET_FOOTER(state, data) {
        state.footerNav = data
    }
}

export const actions = {
    // async loadNav({ state }) {
    //     const data = await this.$axios.$get(`wp/v2/pages/1407`)
    //     state.test = data
    // }

}
