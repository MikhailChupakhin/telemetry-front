// C:\Users\user1\VSCProjects\telemetry-nuxt\nuxt-app\components\engineering-panel\SettingInputSliderSingle.vue
<template>
    <div class="setting-input-single-slider">
        <div class="value-display" :onClick="openModal">
            <SettingsOutput :value="currentValue" :units="units" />
        </div>
        <ModalControlSliderSingle :is-open="isModalOpen" :title="title" @close="closeModal"
            @apply="applyChanges" :absolute-min="absoluteMin" :absolute-max="absoluteMax"
            :current-value="currentValue" :units="units" />
    </div>
</template>

<script setup>
import { ref } from 'vue';
import SettingsOutput from './SettingsOutput.vue';
import ModalControlSliderSingle from '../modals/ModalControlSliderSingle.vue';
import CustomButton from '../ui/CustomButton.vue';

const props = defineProps({
    title: {type: String},
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
    units: {
        type: String,
        default: ''
    }
});

const emit = defineEmits(['update:currentValue']);

const isModalOpen = ref(false);

const openModal = () => {
    isModalOpen.value = true;
};

const closeModal = () => {
    isModalOpen.value = false;
};

const applyChanges = (newValue) => {
    console.log('applyChanges called')
    emit('update:currentValue', newValue);
    closeModal();
};
</script>

<style scoped>
.setting-input-single-slider {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 10px;
}

.value-display {
    width: 100%;
    text-align: center;
}
</style>