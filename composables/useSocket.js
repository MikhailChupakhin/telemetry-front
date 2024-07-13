// C:\Users\user1\VSCProjects\telemetry-nuxt\nuxt-app\composables\useSocket.js
import { ref, onMounted, onUnmounted } from 'vue'
import io from 'socket.io-client'

export function useSocket(url = 'http://localhost:8000') {
  const socket = ref(null)
  const isConnected = ref(false)
  const lastTimestamp = ref(0)
  const receivedCount = ref(0)

  // Ref vars for block <<State>>
  const state = ref('N/A')
  const frontFiltered = ref('N/A')
  const roll = ref('N/A')
  const pitch = ref('N/A')
  const gpsSpeed = ref('N/A')
  const targetRoll = ref('N/A')
  const targetPitch = ref('N/A')
  // Ref vars for block <<Level>>
  const parameterLevelLo = ref('N/A')
  const parameterLevelHi = ref('N/A')
  const parameterAccelerationLevelLo = ref('N/A')
  const parameterAccelerationLevelHi = ref('N/A')
  const parameterRegulatorLevelP = ref('N/A')
  const parameterRegulatorLevelI = ref('N/A')
  const parameterRegulatorLevelD = ref('N/A')
  const parameterRegulatorLevelMC = ref('N/A')
  // Ref vars for block <<Distance>>

  function connect() {
    socket.value = io(url, {
      transports: ['websocket']
    })

    socket.value.on('connect', () => {
      console.log('Connected to server', socket.value.id)
      isConnected.value = true

    })

    socket.value.on('disconnect', (reason) => {
      console.log('Disconnected from server', reason)
      isConnected.value = false

      
      lastTimestamp.value = null
      receivedCount.value = 0
      // Unfill vars for block <<State>>
      state.value = 'N/A'
      frontFiltered.value = 'N/A'
      roll.value = 'N/A'
      pitch.value = 'N/A'
      gpsSpeed.value = 'N/A'
      targetRoll.value = 'N/A'
      targetPitch.value = 'N/A'
      // Unfill vars for block <<Level>>
      parameterLevelLo.value = 'N/A'
      parameterLevelHi.value = 'N/A'
      parameterAccelerationLevelLo.value = 'N/A'
      parameterAccelerationLevelHi.value = 'N/A'
      parameterRegulatorLevelP.value = 'N/A'
      parameterRegulatorLevelI.value = 'N/A'
      parameterRegulatorLevelD.value = 'N/A'
      parameterRegulatorLevelMC.value = 'N/A'
    })

    socket.value.on('timestamp', (data) => {
      lastTimestamp.value = data.runtime.timestamp
      receivedCount.value++

      // Fill vars for block <<State>>
      state.value = data.runtime.state
      frontFiltered.value = data.runtime.sensors.distance.front_filtered
      roll.value = data.runtime.sensors.imu.orientation.roll
      pitch.value = data.runtime.sensors.imu.orientation.pitch
      gpsSpeed.value = data.runtime.sensors.gps.speed
      targetRoll.value = data.runtime.target_roll
      targetPitch.value = data.runtime.target_pitch
      // Fill vars for block <<Level>>
      parameterLevelLo.value = data.parameters.levels.lo
      parameterLevelHi.value = data.parameters.levels.hi
      parameterAccelerationLevelLo.value = data.parameters.acceleration_level.lo
      parameterAccelerationLevelHi.value = data.parameters.acceleration_level.hi
      parameterRegulatorLevelP.value = data.parameters.regulators.level.P
      parameterRegulatorLevelI.value = data.parameters.regulators.level.I
      parameterRegulatorLevelD.value = data.parameters.regulators.level.D
      parameterRegulatorLevelMC.value = data.parameters.regulators.level.MC
      // Fill vars for block <<Distance>>
    })
  }

  function emitCheckboxState(id, isChecked) {
    console.log('emitCheckboxState called')
    if (socket.value && isConnected.value) {
      socket.value.emit('checkbox_state', { id, isChecked });
    }
  }

  onMounted(() => {
    connect()
  })

  onUnmounted(() => {
    if (socket.value) {
      socket.value.disconnect()
    }
  })

  return {
    socket,
    isConnected,
    lastTimestamp,
    receivedCount,

    // Return values for block <<State>>
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
  }
}