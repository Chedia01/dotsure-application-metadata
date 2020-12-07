<template>
  <div
    class="-my-2 py-2 overflow-x-auto sm:-mx-6 sm:px-6 lg:-mx-8 pr-10 lg:px-8"
  >
    <div
      class="align-middle inline-block min-w-full shadow overflow-hidden bg-white shadow-dashboard px-8 pt-3 rounded-bl-lg rounded-br-lg"
    >
      <table class="min-w-full">
        <thead>
          <tr>
            <th
              class="px-6 py-3 border-b-2 border-gray-300 text-left leading-4 text-blue-500 tracking-wider"
            >
              First Name
            </th>
            <th
              class="px-6 py-3 border-b-2 border-gray-300 text-left text-sm leading-4 text-blue-500 tracking-wider"
            >
              Last Name
            </th>
            <th
              class="px-6 py-3 border-b-2 border-gray-300 text-left text-sm leading-4 text-blue-500 tracking-wider"
            >
              Email
            </th>
            <th
              class="px-6 py-3 border-b-2 border-gray-300 text-left text-sm leading-4 text-blue-500 tracking-wider"
            >
              Cellphone
            </th>
            <th
              class="px-6 py-3 border-b-2 border-gray-300 text-left text-sm leading-4 text-blue-500 tracking-wider"
            >
              Height
            </th>
            <th
              class="px-6 py-3 border-b-2 border-gray-300 text-left text-sm leading-4 text-blue-500 tracking-wider"
            >
              Weight
            </th>
            <th
              class="px-6 py-3 border-b-2 border-gray-300 text-left text-sm leading-4 text-blue-500 tracking-wider"
            >
              Recently sick
            </th>
            <th
              class="px-6 py-3 border-b-2 border-gray-300 text-left text-sm leading-4 text-blue-500 tracking-wider"
            >
              id
            </th>
            <th class="px-6 py-3 border-b-2 border-gray-300"></th>
          </tr>
        </thead>
        <tbody class="bg-white">
          <tr v-for="(user, index) in users" :key="index">
            <td class="px-6 py-4 whitespace-no-wrap border-b border-gray-500">
              <div class="text-sm leading-5 text-blue-900">
                {{ user.firstName }}
              </div>
            </td>
            <td class="px-6 py-4 whitespace-no-wrap border-b border-gray-500">
              <div class="text-sm leading-5 text-blue-900">
                {{ user.lastName }}
              </div>
            </td>
            <td class="px-6 py-4 whitespace-no-wrap border-b border-gray-500">
              <div class="text-sm leading-5 text-blue-900">
                {{ user.email }}
              </div>
            </td>
            <td class="px-6 py-4 whitespace-no-wrap border-b border-gray-500">
              <div class="text-sm leading-5 text-blue-900">
                {{ user.cellphone }}
              </div>
            </td>
            <td class="px-6 py-4 whitespace-no-wrap border-b border-gray-500">
              <div class="text-sm leading-5 text-blue-900">
                {{ user.height }}
              </div>
            </td>
            <td class="px-6 py-4 whitespace-no-wrap border-b border-gray-500">
              <div class="text-sm leading-5 text-blue-900">
                {{ user.weight }}
              </div>
            </td>
            <td class="px-6 py-4 whitespace-no-wrap border-b border-gray-500">
              <div class="text-sm leading-5 text-blue-900">
                {{ user.recentlySick ? 'Yes' : 'No' }}
              </div>
            </td>
            <td class="px-6 py-4 whitespace-no-wrap border-b border-gray-500">
              <div class="text-sm leading-5 text-blue-900">
                {{ user.id }}
              </div>
            </td>
            <td
              class="px-6 py-4 whitespace-no-wrap text-right border-b border-gray-500 text-sm leading-5"
            >
              <button
                class="px-5 py-2 border-blue-500 border text-blue-500 rounded transition duration-300 hover:bg-blue-700 hover:text-white focus:outline-none"
                @click="removeUser(user.id, index)"
              >
                Remove
              </button>
            </td>
          </tr>
        </tbody>
      </table>
      <button
        class="px-5 py-2 rounded text-blue-700 transition duration-300 hover:text-blue focus:outline-none"
        @click="prevPage"
      >
        ← Previous
      </button>
      <button
        class="float-right px-5 py-2 rounded text-blue-700 transition duration-300 hover:text-blue focus:outline-none"
        @click="nextPage"
      >
        Next →
      </button>
    </div>
    <modal :showing="showSuccessModal" @close="showSuccessModal = false">
      <h4>User removed successfully</h4>
      <hr />
      <p class="py-8">User has been successfully removed from the database.</p>
      <button
        class="bg-blue-600 hover:bg-blue-300 text-white font-bold py-2 px-8 rounded inline-flex items-center float-right"
        @click="showSuccessModal = false"
      >
        Close
      </button>
    </modal>
  </div>
</template>
<script>
import Modal from '~/components/Modal.vue'
export default {
  components: {
    Modal,
  },
  data() {
    return {
      userData: [],
      pageSize: 10,
      currentPage: 1,
      showSuccessModal: false,
    }
  },
  computed: {
    users() {
      return this.userData.filter((row, index) => {
        const start = (this.currentPage - 1) * this.pageSize
        const end = this.currentPage * this.pageSize
        if (index >= start && index < end) return true
      })
    },
  },
  mounted() {
    this.getUsers()
  },
  methods: {
    async getUsers() {
      const result = await this.$axios.$get('/api/users')
      this.userData = result
    },
    removeUser(id, index) {
      console.log(id)
      console.log(index)
      this.$axios
        .$delete(`/api/user/${id}`)
        .then((response) => {
          this.userData.splice(index, 1)
          this.showSuccessModal = true
        })
        .catch((error) => {
          alert(error)
        })
    },
    nextPage() {
      if (this.currentPage * this.pageSize < this.userData.length)
        this.currentPage++
    },
    prevPage() {
      if (this.currentPage > 1) this.currentPage--
    },
  },
}
</script>
