// C:\Users\user1\VSCProjects\telemetry-nuxt\nuxt-app\components\ui\CustomButton.vue

<template>
  <button 
    class="custom-button"
    :style="buttonStyle"
    @click="handleClick"
  >
    <slot></slot>
  </button>
</template>

<script setup>
import { computed } from 'vue';

const props = defineProps({
  backgroundColor: {
    type: String,
    default: '#007bff'
  },
  textColor: {
    type: String,
    default: '#ffffff'
  },
  onClick: {
    type: Function,
    default: () => {}
  }
});

const buttonStyle = computed(() => ({
  backgroundColor: props.backgroundColor,
  color: props.textColor
}));

const handleClick = (event) => {
  props.onClick(event);
};
</script>

<style scoped>
.custom-button {
  margin-top: 0.4rem;
  width: 90%;
  align-self: center;
  padding: 5px 10px;
  font-size: 1rem;
  font-weight: bold;
  border: none;
  border-radius: 0.5rem;
  cursor: pointer;
  transition: opacity 0.3s;
}

.custom-button:hover {
  opacity: 0.8;
}

.custom-button:active {
  opacity: 0.6;
}

</style>