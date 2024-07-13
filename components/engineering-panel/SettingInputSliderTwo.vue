// C:\Users\user1\VSCProjects\telemetry-nuxt\nuxt-app\components\engineering-panel\SettingInputSlider.vue
<template>
    <div class="setting-input-values">
        <div class="value-displays">
            <SettingsOutput :value="currentMin" :units="units" />
            <SettingsOutput :value="currentMax" :units="units" />
        </div>
        <CustomButton 
            backgroundColor="#1f18b5" 
            textColor="#ffffff" 
            :onClick="openModal"
            >
            control
        </CustomButton>
        <ModalControlSliderTwo 
            :is-open="isModalOpen" 
            :title="title" 
            @close="closeModal" 
            @apply="applyChanges"
            :absolute-min="absoluteMin"
            :absolute-max="absoluteMax"
            :current-min="currentMin"
            :current-max="currentMax"
            :units="units"
        />
    </div>
</template>

<script setup>
import { ref } from 'vue';
import CustomButton from '@/components/ui/CustomButton.vue';
import SettingsOutput from './SettingsOutput.vue';
import ModalControlSliderTwo from '../modals/ModalControlSliderTwo.vue';

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
    currentMin: {
        type: Number,
        required: true
    },
    currentMax: {
        type: Number,
        required: true
    },
    units: {
        type: String,
        default: ''
    }
});

const emit = defineEmits(['update:currentMin', 'update:currentMax']);

const isModalOpen = ref(false);

const openModal = () => {
    isModalOpen.value = true;
};

const closeModal = () => {
    isModalOpen.value = false;
};

const applyChanges = (newValues) => {
    emit('update:currentMin', newValues[0]);
    emit('update:currentMax', newValues[1]);
    closeModal();
};
</script>

<style scoped>
.setting-input-values {
    display: flex;
    flex-direction: column;
    margin-bottom: 10px;
}

label {
    margin-bottom: 5px;
}

.value-displays {
    display: flex;
    justify-content: space-between;
    margin-bottom: 5px;
}

</style>