<template>
  <div class="h-screen pt-20">
    <div class="max-w-sm w-full lg:max-w-full lg:flex justify-center">
      <div
        class="h-48 lg:h-auto flex-none bg-cover rounded-t lg:rounded-t-none lg:rounded-l text-center overflow-hidden"
      ></div>
      <div
        class="border-r border-b border-l border-gray-400 lg:border-l-0 lg:border-t lg:border-gray-400 bg-white rounded-b lg:rounded-b-none lg:rounded-r p-8 flex flex-col justify-between leading-normal w-5/12"
      >
        <div class="mb-8">
          <h3>Basic details</h3>
          <hr />
          <form class="w-full max-w-lg">
            <div class="flex flex-wrap -mx-3 mb-6 mt-8">
              <div class="w-full md:w-1/2 px-3 mb-6 md:mb1">
                <label
                  class="block tracking-wide text-gray-700 text-xs font-bold mb-2"
                >
                  First Name *
                </label>
                <input
                  v-model="firstName"
                  class="appearance-none text-sm block w-full text-gray-700 border border-blue-400 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                />
                <small class="text-red-700">{{ firstNameError }}</small>
              </div>
              <div class="w-full md:w-1/2 px-3">
                <label
                  class="block tracking-wide text-gray-700 text-xs font-bold mb-2"
                >
                  Last Name *
                </label>
                <input
                  v-model="lastName"
                  class="appearance-none text-sm block w-full text-gray-700 border border-blue-400 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                />
                <small class="text-red-700">{{ lastNameError }}</small>
              </div>
              <div class="w-full md:w-1/3 px-3 mb-6 md:mb-0">
                <label
                  class="block tracking-wide text-gray-700 text-xs font-bold mb-2"
                >
                  Gender
                </label>
                <div class="relative">
                  <select
                    v-model="gender"
                    class="block appearance-none w-full text-sm border border-blue-400 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                  >
                    <option></option>
                    <option>Female</option>
                    <option>Male</option>
                    <option>NA</option>
                  </select>
                  <small class="text-red-700">{{ genderError }}</small>
                  <div
                    class="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700"
                  ></div>
                </div>
              </div>
            </div>
          </form>
          <div class="float-right">
            <button
              class="bg-blue-600 hover:bg-blue-300 text-white font-bold py-2 px-8 rounded inline-flex items-center"
              @click="goToContact()"
            >
              <span>Next</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  asyncData({ store }) {
    return {
      firstName: store.state.userInformation.firstName,
      lastName: store.state.userInformation.lastName,
      gender: store.state.userInformation.gender,
    }
  },
  data() {
    return {
      firstName: null,
      lastName: null,
      gender: null,
      firstNameError: '',
      lastNameError: '',
      genderError: '',
    }
  },
  computed: {},
  methods: {
    goToContact() {
      if (this.validate()) {
        this.$store.dispatch('addBasicInformation', {
          firstName: this.firstName,
          lastName: this.lastName,
          gender: this.gender,
        })
        this.$router.push('/contact')
      }
    },
    validate() {
      let valid = true
      if (
        this.firstName === '' ||
        this.firstName === null ||
        this.firstName === undefined
      ) {
        this.firstNameError = 'First name is required'
        valid = false
      }
      if (
        this.lastName === '' ||
        this.lastName === null ||
        this.lastName === undefined
      ) {
        this.lastNameError = 'Last name is required'
        valid = false
      }
      if (
        this.gender === '' ||
        this.gender === null ||
        this.gender === undefined
      ) {
        this.genderError = 'Gender is required'
        valid = false
      }
      return valid
    },
  },
}
</script>
