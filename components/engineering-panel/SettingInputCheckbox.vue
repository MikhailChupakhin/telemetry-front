// components\engineering-panel\SettingInputCheckbox.vue
<template>
    <div class="setting-input-checkbox-container">
      <div class="setting-input-checkbox" :style="containerStyle">
        <input
          type="checkbox"
          :id="id"
          :checked="modelValue"
          @change="handleChange"
          :style="checkboxStyle"
        >
        <label :for="id" class="checkbox-label">{{ label }}</label>
      </div>
      <div v-if="units" class="units-text">{{ units }}</div>
    </div>
  </template>
  
  <script setup>
  import { computed } from 'vue';
  
  // const { emitCheckboxState } = usePageState();
  
  const props = defineProps({
    modelValue: {
      type: Boolean,
      default: false
    },
    label: {
      type: String,
      default: ''
    },
    id: {
      type: String,
      required: true
    },
    width: {
      type: [String, Number],
      default: '100%'
    },
    height: {
      type: [String, Number],
      default: '30px'
    },
    units: {
      type: String,
      default: ''
    },
    emitCheckboxState: {
      type: Function,
      required: true
    }
  });
  
  const emit = defineEmits(['update:modelValue']);
  
  const containerStyle = computed(() => ({
    width: typeof props.width === 'number' ? `${props.width}px` : props.width,
    height: typeof props.height === 'number' ? `${props.height}px` : props.height,
  }));

  const checkboxStyle = computed(() => ({
    height: '100%',
  }));
  
  function handleChange(event) {
    const isChecked = event.target.checked;
    emit('update:modelValue', isChecked);
    props.emitCheckboxState(props.id, isChecked);
  }
  </script>
  
  <style scoped>
  .setting-input-checkbox-container {
    display: flex;
    align-items: center;
  }
  
  .setting-input-checkbox {
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: #f0f0f0;
    border: 1px solid #ccc;
    border-radius: 4px;
    overflow: hidden;
    padding: 0 5px;
  }
  
  .checkbox-label {
    margin-left: 5px;
    font-size: 14px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    color: #333;
  }
  
  .units-text {
    margin-left: 5px;
    font-size: 14px;
    color: #666;
  }
  
  input[type="checkbox"] {
    cursor: pointer;
    padding: 3px;
    width: 2rem;
    height: 2rem;
  }
  </style>