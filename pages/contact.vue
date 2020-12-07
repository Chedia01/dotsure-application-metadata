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
          <h3>Contact details</h3>
          <hr />
          <form class="w-full max-w-lg">
            <div class="flex flex-wrap -mx-3 mb-6 mt-8">
              <div class="w-full md:w-1/2 px-3 mb-6 md:mb1">
                <label
                  class="block tracking-wide text-gray-700 text-xs font-bold mb-2"
                >
                  Cellphone number
                </label>
                <input
                  v-model="cellphone"
                  class="appearance-none text-sm block w-full text-gray-700 border border-blue-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                />
                <small class="text-red-700">{{ cellphoneError }}</small>
              </div>
              <div class="w-full md:w-1/2 px-3">
                <label
                  class="block tracking-wide text-gray-700 text-xs font-bold mb-2"
                  for="grid-email"
                >
                  Email address *
                </label>
                <input
                  v-model="email"
                  class="appearance-none text-sm block w-full text-gray-700 border border-blue-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                />
                <small class="text-red-700">{{ emailError }}</small>
              </div>
            </div>
          </form>
          <div class="float-right">
            <button
              class="bg-blue-600 hover:bg-blue-300 text-white font-bold py-2 px-8 rounded inline-flex items-center"
              @click="goToHealth()"
            >
              <span>Next</span>
            </button>
          </div>
          <div class="float-left">
            <nuxt-link to="/">
              <button
                class="bg-blue-600 hover:bg-blue-300 text-white font-bold py-2 px-8 rounded inline-flex items-center"
              >
                Back
              </button>
            </nuxt-link>
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
      cellphone: store.state.userInformation.cellphone,
      email: store.state.userInformation.email,
    }
  },
  data() {
    return {
      cellphone: null,
      email: null,
      emailError: '',
      cellphoneError: '',
    }
  },
  methods: {
    goToHealth() {
      this.validate()
      if (this.validate()) {
        this.$store.dispatch('addContactInformation', {
          cellphone: this.cellphone,
          email: this.email,
        })
        this.$router.push('/health')
      }
    },

    validate() {
      const regEmail = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,24}))$/
      const regCellphone = /^((?:\+27|27)|0)(\d{2})-?(\d{3})-?(\d{4})$/
      let valid = true

      if (
        this.email === '' ||
        this.email === null ||
        this.email === undefined
      ) {
        this.emailError = 'Email address is required'
        valid = false
      }
      if (!regEmail.test(this.email)) {
        this.emailError = 'Please enter a valid email e.g. someone@gmail.com'
        valid = false
      }
      if (this.cellphone !== null && this.cellphone !== '') {
        if (!regCellphone.test(this.cellphone)) {
          this.cellphoneError =
            'Please enter a valid cellphone number e.g. 0123456789 or +27123456789'
          valid = false
        }
      }
      return valid
    },
  },
}
</script>
