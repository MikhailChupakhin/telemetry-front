// C:\Users\user1\VSCProjects\telemetry-nuxt\nuxt-app\components\engineering-panel\SettingsOutput.vue
<template>
  <div class="settings-output-container">
    <div class="settings-output" :style="containerStyle">
      <div class="output-text" :style="textStyle">
        {{ displayValue }}
      </div>
    </div>
    <div v-if="units" class="units-text">{{ units }}</div>
  </div>
</template>

<script setup>
import { computed } from 'vue';

const props = defineProps({
  value: {
    type: [String, Number],
    default: ''
  },
  placeholder: {
    type: String,
    default: 'disconnect'
  },
  width: {
    type: [String, Number],
    default: '80%'
  },
  height: {
    type: [String, Number],
    default: '30px'
  },
  units: {
    type: String,
    default: ''
  }
});


const containerStyle = computed(() => ({
  width: typeof props.width === 'number' ? `${props.width}px` : props.width,
  height: typeof props.height === 'number' ? `${props.height}px` : props.height,
}));

const textStyle = computed(() => ({
  width: '100%',
  height: '100%',
  lineHeight: typeof props.height === 'number' ? `${props.height}px` : props.height,
}));

const displayValue = computed(() => {
  return props.value === 'N/A' ? props.placeholder : props.value;
});
</script>

<style scoped>
.settings-output-container {
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
}

.settings-output {
  display: inline-block;
  background-color: #f0f0f0;
  border: 1px solid #ccc;
  border-radius: 4px;
  overflow: hidden;
}

.output-text {
  text-align: center;
  font-size: 1.7rem;
  font-weight: 800;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  color: #333;
}

.units-text {
  font-size: 1.5rem;
  font-weight: 700;
  margin-left: 5px;
  color: #333;
}
</style>