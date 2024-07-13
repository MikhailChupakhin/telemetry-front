// C:\Users\user1\VSCProjects\telemetry-nuxt\nuxt-app\components\modals\ModalControlSliderSingle.vue
<template>
    <teleport to="body">
        <div v-if="isOpen" class="modal-overlay">
            <div class="modal-content">
                <div class="modal-header">
                    <h2>{{ title }}</h2>
                    <button @click="close" class="close-button">&times;</button>
                </div>
                <div class="modal-body">
                    <SingleSliderHorizontal
                        :absolute-min="absoluteMin"
                        :absolute-max="absoluteMax"
                        :current-value="currentValue"
                        :step="1"
                        :decimals="2"
                        @update="handleUpdate"
                    />
                </div>
                <div class="modal-footer">
                    <CustomButton
                        backgroundColor="#28a745"
                        textColor="#ffffff"
                        :onClick="apply"
                    >
                        Apply
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
import SingleSliderHorizontal from '../sliders/SingleSliderHorizontal.vue';
import CustomButton from '../ui/CustomButton.vue';

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
    currentValue: {
        type: Number,
        required: true
    },
    units: {
        type: String,
        default: ''
    }
});

const emit = defineEmits(['close', 'apply']);

const newValue = ref(props.currentValue);

const close = () => {
    emit('close');
};

const apply = () => {
    emit('apply', newValue.value);
};

const handleUpdate = (value) => {
    newValue.value = value;
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
    justify-content: space-between;
    align-items: center;
    margin-bottom: 15px;
}

.modal-body {
    margin-bottom: 20px;
}

.modal-footer {
    display: flex;
    justify-content: flex-end;
    gap: 10px;
}

.close-button {
    background: none;
    border: none;
    font-size: 1.5rem;
    cursor: pointer;
}
</style>