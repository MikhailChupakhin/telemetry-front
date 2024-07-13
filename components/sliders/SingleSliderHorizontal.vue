// C:\Users\user1\VSCProjects\telemetry-nuxt\nuxt-app\components\sliders\SingleSliderHorizontal.vue
<template>
  <div class="slider-container">
    <div class="output-field">
      <SettingsOutput :value="displayValue" :width="80" :height="30" />
    </div>
    <div ref="slider" class="slider"></div>
    <div class="limit-values">
      <span>Min: {{ absoluteMin }}</span>
      <span>Max: {{ absoluteMax }}</span>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, computed, watch } from 'vue';
import noUiSlider from 'nouislider';
import 'nouislider/dist/nouislider.css';
import SettingsOutput from '../engineering-panel/SettingsOutput.vue';

const props = defineProps({
  absoluteMin: {
    type: Number,
    required: true
  },
  absoluteMax: {
    type: Number,
    required: true
  },
  currentValue: {
    type: Number,
    required: true
  },
  step: {
    type: Number,
    default: 1
  },
  decimals: {
    type: Number,
    default: 2
  }
});

const emit = defineEmits(['update']);

const slider = ref(null);
const currentSliderValue = ref(props.currentValue);

const displayValue = computed(() => {
  return Number(currentSliderValue.value).toFixed(props.decimals);
});

onMounted(() => {
  noUiSlider.create(slider.value, {
    start: props.currentValue,
    connect: [true, false],
    range: {
      'min': props.absoluteMin,
      'max': props.absoluteMax
    },
    step: props.step
  });

  slider.value.noUiSlider.on('update', (values) => {
    currentSliderValue.value = Number(values[0]);
    emit('update', currentSliderValue.value);
  });
});

watch(() => props.currentValue, (newValue) => {
  if (slider.value && slider.value.noUiSlider) {
    slider.value.noUiSlider.set(newValue);
  }
});

watch(() => [props.absoluteMin, props.absoluteMax], ([newMin, newMax]) => {
  if (slider.value && slider.value.noUiSlider) {
    slider.value.noUiSlider.updateOptions({
      range: {
        'min': newMin,
        'max': newMax
      }
    });
  }
});
</script>

<style scoped>
.slider-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
}

.output-field {
  margin-bottom: 10px;
}

.slider {
  width: 100%;
  margin: 1rem 0rem;
}

.limit-values {
  display: flex;
  justify-content: space-between;
  width: 100%;
  margin-top: 5px;
  font-size: 1.2em;
  font-weight: 600;
  color: #c40000;
}
</style>