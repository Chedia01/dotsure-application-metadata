<template>
  <Transition name="fade">
    <div
      v-if="showing"
      class="fixed inset-0 w-full h-screen flex items-center justify-center bg-gray-700 bg-opacity-50"
      @click.self="close"
    >
      <div class="max-w-2xl bg-white shadow-lg rounded-lg p-8">
        <!-- <button
          aria-label="close"
          class="text-xl text-gray-500 mx-4 float-right"
          @click.prevent="close"
        >
          ×
        </button> -->
        <slot />
      </div>
    </div>
  </Transition>
</template>

<script>
export default {
  props: {
    showing: {
      required: true,
      type: Boolean,
    },
  },
  methods: {
    close() {
      this.$emit('close')
    },
  },
}
</script>
<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: all 0.4s;
}
.fade-enter,
.fade-leave-to {
  opacity: 0;
}
</style>
