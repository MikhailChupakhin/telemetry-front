// C:\Users\user1\VSCProjects\telemetry-nuxt\nuxt-app\components\modals\ModalControlSliderTwo.vue
<template>
    <teleport to="body">
        <div v-if="isOpen" class="modal-overlay">
            <div class="modal-content">
                <div class="modal-header">
                    <h2>{{ title }}</h2>
                </div>
                <div class="modal-body">
                    <SliderHorizontal
                        :absolute-min="absoluteMin"
                        :absolute-max="absoluteMax"
                        :current-min="currentMin"
                        :current-max="currentMax"
                        :step="1"
                        :decimals="2"
                        @update="handleUpdate"
                    />
                </div>
                <div class="modal-footer">
                    <CustomButton 
                        backgroundColor="#126b21" 
                        textColor="#ffffff" 
                        :onClick="apply"
                        >
                        Apply!
                    </CustomButton>
                    <CustomButton 
                        backgroundColor="#dc3545"
                        textColor="#ffffff" 
                        :onClick="close"
                        >
                        Close
                    </CustomButton>
                </div>
            </div>
        </div>
    </teleport>
</template>

<script setup>
import { ref } from 'vue';
import CustomButton from '@/components/ui/CustomButton.vue';
import SliderHorizontal from '../sliders/SliderHorizontal.vue';

const props = defineProps({
    isOpen: {
        type: Boolean,
        required: true
    },
    title: {
        type: String,
        default: 'Modal'
    },
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

const emit = defineEmits(['close', 'apply']);

const currentValues = ref([props.currentMin, props.currentMax]);

const close = () => {
    emit('close');
};

const apply = () => {
    emit('apply', currentValues.value);
};

const handleUpdate = (values) => {
    currentValues.value = values;
};
</script>

<style scoped>
.modal-overlay {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 1000;
}

.modal-content {
    background-color: white;
    padding: 20px;
    border-radius: 5px;
    width: 80%;
    max-width: 500px;
}

.modal-header {
    display: flex;
    justify-content: flex-start;
    align-items: center;
    margin-bottom: 15px;
}

.modal-body {
    margin-bottom: 20px;
}

.modal-footer {
    display: flex;
    justify-content: flex-end;
}

button {
    padding: 8px 15px;
    margin-left: 10px;
    border: none;
    border-radius: 3px;
    cursor: pointer;
}


.close-button {
    background-color: #6c757d;
    color: white;
}

.close-button:hover {
    background-color: #545b62;
}
</style>