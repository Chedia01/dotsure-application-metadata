export const state = () => ({
  userInformation: {
    firstName: null,
    lastName: null,
    gender: null,
    cellphone: null,
    email: null,
    weight: null,
    height: null,
    recentlySick: false,
  },
})

export const mutations = {
  ADD_BASIC_INFORMATION(state, userInformation) {
    state.userInformation.firstName = userInformation.firstName
    state.userInformation.lastName = userInformation.lastName
    state.userInformation.gender = userInformation.gender
  },
  ADD_CONTACT_INFORMATION(state, userInformation) {
    state.userInformation.cellphone = userInformation.cellphone
    state.userInformation.email = userInformation.email
  },
  ADD_HEALTH_INFORMATION(state, userInformation) {
    state.userInformation.weight = userInformation.weight
    state.userInformation.height = userInformation.height
    state.userInformation.recentlySick = userInformation.recentlySick
  },
  CLEAR_BASIC_INFORMATION(state) {
    state.userInformation.firstName = null
    state.userInformation.lastName = null
    state.userInformation.gender = null
    state.userInformation.cellphone = null
    state.userInformation.email = null
    state.userInformation.weight = null
    state.userInformation.height = null
    state.userInformation.recentlySick = false
  },
}

export const actions = {
  addBasicInformation({ commit }, userInformation) {
    commit('ADD_BASIC_INFORMATION', userInformation)
  },
  addContactInformation({ commit }, userInformation) {
    commit('ADD_CONTACT_INFORMATION', userInformation)
  },
  addHealthInformation({ commit }, userInformation) {
    commit('ADD_HEALTH_INFORMATION', userInformation)
  },
  clearBasicInformation({ commit }) {
    commit('CLEAR_BASIC_INFORMATION')
  },
}
