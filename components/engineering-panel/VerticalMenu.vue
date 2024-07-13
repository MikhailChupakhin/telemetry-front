// C:\Users\user1\VSCProjects\telemetry-nuxt\nuxt-app\components\engineering-panel\VerticalMenu.vue
<template>
  <div class="vertical-menu">
    <div v-for="(item, index) in menuItems" :key="index" class="menu-item">
      <div @click="toggleItem(index)" class="menu-title">
        {{ item.title }}
      </div>
      <div v-if="item.open" class="menu-content">
        <div v-for="(subItem, subIndex) in item.submenuItems" :key="subIndex" class="submenu-item">
          <div class="submenu-title">
            {{ subItem.title }}
          </div>
          <div class="submenu-content">
            <component :is="subItem.component" v-bind="subItem.props" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import SliderHorizontal from '@/components/sliders/SliderHorizontal.vue';
import SettingsOutput from './SettingsOutput.vue';
import SettingInputCheckbox from './SettingInputCheckbox.vue';
import SettingInputSliderTwo from './SettingInputSliderTwo.vue';
import SettingInputSliderSingle from './SettingInputSliderSingle.vue';

const {
  state,
  frontFiltered,
  roll,
  pitch,
  gpsSpeed,
  targetRoll,
  targetPitch,
  //
  parameterLevelLo,
  parameterLevelHi,
  parameterAccelerationLevelLo,
  parameterAccelerationLevelHi,
  parameterRegulatorLevelP,
  parameterRegulatorLevelI,
  parameterRegulatorLevelD,
  parameterRegulatorLevelMC,
  // functions
  emitCheckboxState,
} = inject('pageState')

const menuItems = ref([
  // STATE BLOCK
  {
    title: 'STATE',
    open: false,
    submenuItems: [
      {
        title: 'State',
        component: markRaw(SettingsOutput),
        props: {
          value: state,
        }
      },
      {
        title: 'GPS speed',
        component: markRaw(SettingsOutput),
        props: {
          value: gpsSpeed,
          width: 200,
          units: 'units?'
        }
      },
      {
        title: 'Level',
        component: markRaw(SettingsOutput),
        props: {
          value: frontFiltered,
          width: 200,
          units: 'units?'
        }
      },
      {
        title: 'Roll',
        component: markRaw(SettingsOutput),
        props: {
          value: roll,
          width: 200,
          units: 'units?'
        }
      },
      {
        title: 'Pitch',
        component: markRaw(SettingsOutput),
        props: {
          value: pitch,
          width: 200,
          units: 'units?'
        }
      },
      {
        title: 'Target Roll',
        component: markRaw(SettingsOutput),
        props: {
          value: targetRoll,
          width: 200,
          units: 'units?'
        }
      },
      {
        title: 'Target Pitch',
        component: markRaw(SettingsOutput),
        props: {
          value: targetPitch,
          width: 200,
          units: 'units?'
        }
      },
      {
        title: 'Key',
        component: markRaw(SettingInputCheckbox),
        props: {
          id: 'key',
          emitCheckboxState: emitCheckboxState,
        }
      },
      {
        title: 'Archimedes',
        component: markRaw(SettingInputCheckbox),
        props: {
          id: 'Archimedes',
          emitCheckboxState: emitCheckboxState,
        }
      },
      {
        title: 'Lift DN',
        component: markRaw(SettingInputCheckbox),
        props: {
          id: 'LiftDN',
          emitCheckboxState: emitCheckboxState,
        }
      },
      {
        title: 'Lift UP',
        component: markRaw(SettingInputCheckbox),
        props: {
          id: 'LiftUP',
          emitCheckboxState: emitCheckboxState,
        }
      },
    ]
  },
  // LEVEL BLOCK
  {
    title: 'LEVEL',
    open: false,
    submenuItems: [
      {
        title: 'Level',
        component: markRaw(SettingsOutput),
        props: {
          value: frontFiltered,
          width: 200,
          units: 'units?'
        }
      },
      {
        title: 'Cruising level',
        component: markRaw(SettingInputSliderTwo),
        props: {
          title: 'Cruising level adjustment',
          absoluteMin: 100,
          absoluteMax: 500,
          currentMin: parameterLevelLo,
          currentMax: parameterLevelHi,
        }
      },
      {
        title: 'Acceleration level',
        component: markRaw(SettingInputSliderTwo),
        props: {
          title: 'Acceleration level adjustment',
          absoluteMin: 100,
          absoluteMax: 1000,
          currentMin: parameterAccelerationLevelLo,
          currentMax: parameterAccelerationLevelHi,
        }
      },
      {
        title: 'P',
        component: markRaw(SettingInputSliderSingle),
        props: {
          title: 'level P adjustment',
          absoluteMin: 0,
          absoluteMax: 100,
          currentValue: parameterRegulatorLevelP,
        }
      },
      {
        title: 'I',
        component: markRaw(SettingInputSliderSingle),
        props: {
          title: 'level I adjustment',
          absoluteMin: 0,
          absoluteMax: 100,
          currentValue: parameterRegulatorLevelI,
        }
      },
      {
        title: 'D',
        component: markRaw(SettingInputSliderSingle),
        props: {
          title: 'level D adjustment',
          absoluteMin: 0,
          absoluteMax: 100,
          currentValue: parameterRegulatorLevelD,
        }
      },
      {
        title: 'MC',
        component: markRaw(SettingInputSliderSingle),
        props: {
          title: 'level MC adjustment',
          absoluteMin: 0,
          absoluteMax: 100,
          currentValue: parameterRegulatorLevelMC,
        }
      },
    ]
  },
  // DISTANCE BLOCK
  {
    title: 'DISTANCE',
    open: false,
    submenuItems: [
     {
        title: 'Level',
        component: markRaw(SettingsOutput),
        props: {
          value: frontFiltered,
          width: 200,
          units: 'units?'
        }
      },
      {
        title: 'Left base',
        component: markRaw(SettingInputSliderSingle),
        props: {
          title: 'Left base adjustment',
          absoluteMin: 0,
          absoluteMax: 100,
          currentValue: parameterRegulatorLevelP,
        }
      },
      {
        title: 'Right Base',
        component: markRaw(SettingInputSliderSingle),
        props: {
          title: 'Right Base adjustment',
          absoluteMin: 0,
          absoluteMax: 100,
          currentValue: parameterRegulatorLevelI,
        }
      },
      {
        title: 'Measure',
        component: markRaw(SettingInputSliderSingle),
        props: {
          title: 'Measure adjustment',
          absoluteMin: 0,
          absoluteMax: 100,
          currentValue: parameterRegulatorLevelD,
        }
      },
      {
        title: 'Estimate',
        component: markRaw(SettingInputSliderSingle),
        props: {
          title: 'Estimate adjustment',
          absoluteMin: 0,
          absoluteMax: 100,
          currentValue: parameterRegulatorLevelMC,
        }
      },
      {
        title: 'Q',
        component: markRaw(SettingInputSliderSingle),
        props: {
          title: 'Q adjustment',
          absoluteMin: 0,
          absoluteMax: 100,
          currentValue: parameterRegulatorLevelMC,
        }
      },
      
    ]
  },
  // ROLL BLOCK
  {
    title: 'ROLL',
    open: false,
    submenuItems: [
     {
        title: 'Level',
        component: markRaw(SettingsOutput),
        props: {
          value: frontFiltered,
          width: 200,
          units: 'units?'
        }
      },
      {
        title: 'Roll shift',
        component: markRaw(SettingInputSliderSingle),
        props: {
          title: 'Roll shift adjustment',
          absoluteMin: 0,
          absoluteMax: 100,
          currentValue: 1,
        }
      },
      {
        title: 'Max roll angle',
        component: markRaw(SettingInputSliderSingle),
        props: {
          title: 'Max roll angle adjustment',
          absoluteMin: 0,
          absoluteMax: 100,
          currentValue: 1,
        }
      },
      {
        title: 'Critical roll angle',
        component: markRaw(SettingInputSliderSingle),
        props: {
          title: 'Critical roll angle adjustment',
          absoluteMin: 0,
          absoluteMax: 100,
          currentValue: 1,
        }
      },
      {
        title: 'P',
        component: markRaw(SettingInputSliderSingle),
        props: {
          title: 'roll P adjustment',
          absoluteMin: 0,
          absoluteMax: 100,
          currentValue: 1,
        }
      },
      {
        title: 'I',
        component: markRaw(SettingInputSliderSingle),
        props: {
          title: 'roll I adjustment',
          absoluteMin: 0,
          absoluteMax: 100,
          currentValue: 1,
        }
      },
      {
        title: 'D',
        component: markRaw(SettingInputSliderSingle),
        props: {
          title: 'roll D adjustment',
          absoluteMin: 0,
          absoluteMax: 100,
          currentValue: 1,
        }
      },
      {
        title: 'MC',
        component: markRaw(SettingInputSliderSingle),
        props: {
          title: 'roll MC adjustment',
          absoluteMin: 0,
          absoluteMax: 100,
          currentValue: 1,
        }
      },
    ]
  },
  // PITCH BLOCK
  {
    title: 'PITCH',
    open: false,
    submenuItems: [
     {
        title: 'Pitch',
        component: markRaw(SettingsOutput),
        props: {
          value: frontFiltered,
          width: 200,
          units: 'units?'
        }
      },
      {
        title: 'Pitch shift',
        component: markRaw(SettingInputSliderSingle),
        props: {
          title: 'Pitch shift adjustment',
          absoluteMin: 0,
          absoluteMax: 100,
          currentValue: 1,
        }
      },
      {
        title: 'Max pitch angle',
        component: markRaw(SettingInputSliderSingle),
        props: {
          title: 'Max pitch angle adjustment',
          absoluteMin: 0,
          absoluteMax: 100,
          currentValue: 1,
        }
      },
      {
        title: 'Crawling pitch angle',
        component: markRaw(SettingInputSliderSingle),
        props: {
          title: 'Crawling pitch angle adjustment',
          absoluteMin: 0,
          absoluteMax: 100,
          currentValue: 1,
        }
      },
      {
        title: 'P',
        component: markRaw(SettingInputSliderSingle),
        props: {
          title: 'roll P adjustment',
          absoluteMin: 0,
          absoluteMax: 100,
          currentValue: 1,
        }
      },
      {
        title: 'I',
        component: markRaw(SettingInputSliderSingle),
        props: {
          title: 'roll I adjustment',
          absoluteMin: 0,
          absoluteMax: 100,
          currentValue: 1,
        }
      },
      {
        title: 'D',
        component: markRaw(SettingInputSliderSingle),
        props: {
          title: 'roll D adjustment',
          absoluteMin: 0,
          absoluteMax: 100,
          currentValue: 1,
        }
      },
      {
        title: 'MC',
        component: markRaw(SettingInputSliderSingle),
        props: {
          title: 'roll MC adjustment',
          absoluteMin: 0,
          absoluteMax: 100,
          currentValue: 1,
        }
      },
    ]
  },
  // TURNS BLOCK 
  {
    title: 'TURNS',
    open: false,
    submenuItems: [
    {
        title: 'Turns enabled',
        component: markRaw(SettingInputCheckbox),
        props: {
          id: 'turns_enabled',
          emitCheckboxState: emitCheckboxState,
        }
      },
    ]
  },
  // SPEED BLOCK
  {
    title: 'SPEED',
    open: false,
    submenuItems: [
    {
        title: 'Crawling',
        component: markRaw(SettingInputSliderTwo),
        props: {
          title: 'Crawling adjustment',
          absoluteMin: 100,
          absoluteMax: 500,
          currentMin: 1,
          currentMax: 2,
        }
      },
      {
        title: 'Cruising',
        component: markRaw(SettingInputSliderTwo),
        props: {
          title: 'Cruising adjustment',
          absoluteMin: 100,
          absoluteMax: 1000,
          currentMin: 1,
          currentMax: 2,
        }
      },
    ]
  },
]);

const toggleItem = (index) => {
  menuItems.value[index].open = !menuItems.value[index].open;
};
</script>

<style scoped>
.vertical-menu {
  width: 100%;
}

.menu-item {
  margin-bottom: 10px;
}

.menu-title {
  font-size: 2rem;
  cursor: pointer;
  padding: 5px;
  background-color: #f0f0f0;
}

.menu-content {
  padding: 5px;
  background-color: #e0e0e0;
}

.submenu-item {
  display: flex;
  margin-top: 5px;
}

.submenu-title {
  font-size: 1.5rem;
  flex: 0 0 35%;
  max-width: 35%;
  padding: 3px 1rem;
  background-color: #d0d0d0;
}

.submenu-content {
  flex: 0 0 56%;
  max-width: 56%;
  padding: 3px;
  background-color: #c0c0c0;
}
</style>