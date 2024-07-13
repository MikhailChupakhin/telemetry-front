// composables/usePageState.js
import { reactive, toRefs } from 'vue'
import { useSocket } from './useSocket'

const pageState = reactive({
  state: 'N/A',
  frontFiltered: 'N/A',
  roll: 'N/A',
  pitch:'N/A',
  gpsSpeed: 'N/A',
  targetRoll: 'N/A',
  targetPitch: 'N/A',
  parameterLevelLo: 'N/A',
  parameterLevelHi: 'N/A',
  parameterAccelerationLevelLo: 'N/A',
  parameterAccelerationLevelHi: 'N/A',
  parameterRegulatorLevelP: 'N/A',
  parameterRegulatorLevelI: 'N/A',
  parameterRegulatorLevelD: 'N/A',
  parameterRegulatorLevelMC: 'N/A',
})

export function usePageState() {
  const { 
    isConnected, 
    lastTimestamp, 
    receivedCount,
    //
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
  } = useSocket()

  // Обновляем pageState при изменении значений из useSocket
  watch([
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
  ], 
    ([
      newState, 
      newFrontFiltered, 
      newRoll, 
      newPitch, 
      newGpsSpeed, 
      newTargetRoll, 
      newTargetPitch,
      //
      newParameterLevelLo,
      newParameterLevelHi,
      newParameterAccelerationLevelLo,
      newParameterAccelerationLevelHi,
      newParameterRegulatorLevelP,
      newParameterRegulatorLevelI,
      newParameterRegulatorLevelD,
      newParameterRegulatorLevelMC,
    ]) => {
      pageState.state = newState
      pageState.frontFiltered = newFrontFiltered
      pageState.roll = newRoll
      pageState.pitch = newPitch
      pageState.gpsSpeed = newGpsSpeed
      pageState.targetRoll = newTargetRoll
      pageState.targetPitch = newTargetPitch
      //
      pageState.parameterLevelLo = newParameterLevelLo
      pageState.parameterLevelHi = newParameterLevelHi
      pageState.parameterAccelerationLevelLo = newParameterAccelerationLevelLo
      pageState.parameterAccelerationLevelHi = newParameterAccelerationLevelHi
      
      pageState.parameterRegulatorLevelP = newParameterRegulatorLevelP
      pageState.parameterRegulatorLevelI = newParameterRegulatorLevelI
      pageState.parameterRegulatorLevelD = newParameterRegulatorLevelD
      pageState.parameterRegulatorLevelMC = newParameterRegulatorLevelMC
    }
  )

  return {
    ...toRefs(pageState),
    isConnected,
    lastTimestamp,
    receivedCount,
    emitCheckboxState,
  }
}