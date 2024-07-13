// C:\Users\user1\VSCProjects\telemetry-nuxt\nuxt-app\components\sliders\SliderHorizontal.vue

<template>
  <div class="slider-container">
    <div class="output-fields">
      <SettingsOutput :value="displayValues[0]" :width="80" :height="30" />
      <SettingsOutput :value="displayValues[1]" :width="80" :height="30" />
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
  currentMin: {
    type: Number,
    required: true
  },
  currentMax: {
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
const currentValues = ref([props.currentMin, props.currentMax]);

const displayValues = computed(() => {
  return currentValues.value.map(value => Number(value).toFixed(props.decimals));
});

onMounted(() => {
  noUiSlider.create(slider.value, {
    start: [props.currentMin, props.currentMax],
    connect: true,
    range: {
      'min': props.absoluteMin,
      'max': props.absoluteMax
    },
    step: props.step
  });

  slider.value.noUiSlider.on('update', (values) => {
    currentValues.value = values.map(Number);
    emit('update', currentValues.value);
  });
});

watch(() => [props.currentMin, props.currentMax], ([newMin, newMax]) => {
  if (slider.value && slider.value.noUiSlider) {
    slider.value.noUiSlider.set([newMin, newMax]);
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

.output-fields {
  display: flex;
  justify-content: space-between;
  width: 100%;
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

<style>
.noUi-horizontal .noUi-handle {
    width: 34px;
    height: 38px;
    right: -17px;
    top: -12px;
}

.noUi-touch-area {
  background-color: #b6b2b2;
  border-radius: 0.4rem;
}
.noUi-connects {
  background-color: lightblue;
}
</style>