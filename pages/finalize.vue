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
          <h3>Finalize</h3>
          <hr />
          <form class="w-full max-w-lg">
            <p class="pt-8 pb-4">
              I hereby consent to the processing of my personal data for the
              selected purposes, and agree that {Me.tadata} may collect, store,
              process and use said data provided.
            </p>
            <label class="text-sm text-gray-700 pb-4"> I accept </label>
            <input id="checkbox" v-model="accept" type="checkbox" />
            <small class="text-red-700">{{ error }}</small>
          </form>
          <div class="float-right">
            <button
              class="bg-blue-600 hover:bg-blue-300 text-white font-bold py-2 px-8 rounded inline-flex items-center"
              @click="checkAccept()"
            >
              <span>Finalize</span>
            </button>
          </div>
          <div class="float-left">
            <nuxt-link to="/health">
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
    <modal :showing="showSuccessModal" @close="showSuccessModal = false">
      <h3>User added successfully</h3>
      <hr />
      <p class="py-8">New user has been successfully added to the database</p>
      <nuxt-link to="/">
        <button
          class="bg-blue-600 hover:bg-blue-300 text-white font-bold py-2 px-8 rounded inline-flex items-center"
          @click="showSuccessModal = false"
        >
          Add another user
        </button>
      </nuxt-link>
    </modal>
  </div>
</template>
<script>
import Modal from '~/components/Modal.vue'
export default {
  components: {
    Modal,
  },
  asyncData({ store }) {
    return {
      userInformation: store.state.userInformation,
    }
  },
  data() {
    return {
      accept: false,
      userInformation: '',
      error: '',
      showSuccessModal: false,
    }
  },
  methods: {
    checkAccept() {
      if (!this.accept) {
        this.error = 'Please agree to the above condition.'
      } else {
        this.submitUserInformation()
      }
    },
    submitUserInformation() {
      this.$axios
        .$post('/api/user', this.userInformation)
        .then((response) => {
          this.$store.dispatch('clearBasicInformation')
          this.showSuccessModal = true
        })
        .catch((error) => {
          alert(error)
        })
    },
  },
}
</script>
