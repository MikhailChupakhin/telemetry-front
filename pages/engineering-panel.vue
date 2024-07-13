// C:\Users\user1\VSCProjects\telemetry-nuxt\nuxt-app\pages\engineering-panel.vue
<template>
    <div>
      <h1>Engineering panel</h1>
      <p>Connection status: {{ isConnected ? 'Connected' : 'Disconnected' }}</p>
      <p>Last timestamp: {{ lastTimestamp }}</p>
      <p>Recieved count: {{ receivedCount }}</p>

      <ClientOnly>
        <VerticalMenu />
      </ClientOnly>
    </div>
</template>

<script setup>
import { usePageState } from '~/composables/usePageState'
import SliderHorizontal from '@/components/sliders/SliderHorizontal.vue';
import VerticalMenu from '@/components/engineering-panel/VerticalMenu.vue';


const { isConnected, lastTimestamp, receivedCount, ...pageState } = usePageState()

provide('pageState', pageState)
</script>