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
          <h3>Health details</h3>
          <hr />
          <form class="w-full max-w-lg">
            <div class="flex flex-wrap -mx-3 mb-6 mt-8">
              <div class="w-full md:w-1/2 px-3 mb-6 md:mb1">
                <label
                  class="block tracking-wide text-gray-700 text-xs font-bold mb-2"
                >
                  Weight(kilograms)
                </label>
                <input
                  v-model="weight"
                  class="appearance-none text-sm block w-full text-blue-700 border border-blue-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                  type="number"
                  min="1"
                  step="1"
                />
              </div>
              <div class="w-full md:w-1/2 px-3">
                <label
                  class="block tracking-wide text-gray-700 text-xs font-bold mb-2"
                >
                  Height(meters) *
                </label>
                <input
                  v-model="height"
                  class="appearance-none text-sm block w-full text-blue-700 border border-blue-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                  type="number"
                  min="0"
                  step="1"
                />
                <small class="text-red-700">{{ error }}</small>
              </div>
              <div class="w-full px-3 mb-6 md:mb-0">
                <div class="relative">
                  <label class="text-sm text-gray-700">
                    Have you been feeling sick recently?
                  </label>
                  <input id="checkbox" v-model="recentlySick" type="checkbox" />
                </div>
              </div>
            </div>
          </form>
          <div class="float-right">
            <button
              class="bg-blue-600 hover:bg-blue-300 text-white font-bold py-2 px-8 rounded inline-flex items-center"
              @click="goToFinalize()"
            >
              <span>Next</span>
            </button>
          </div>
          <div class="float-left">
            <nuxt-link to="/contact">
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
      weight: store.state.userInformation.weight,
      height: store.state.userInformation.height,
      recentlySick: store.state.userInformation.recentlySick,
    }
  },
  data() {
    return {
      weight: null,
      height: null,
      recentlySick: false,
      error: '',
    }
  },
  methods: {
    goToFinalize() {
      this.validate()
      if (this.validate()) {
        this.$store.dispatch('addHealthInformation', {
          weight: this.weight,
          height: this.height,
          recentlySick: this.recentlySick,
        })
        this.$router.push('/finalize')
      }
    },
    validate() {
      let valid = true
      if (
        this.height === '' ||
        this.height === null ||
        this.height === undefined
      ) {
        this.error = 'Please insert your height in meters'
        valid = false
      }
      return valid
    },
  },
}
</script>
