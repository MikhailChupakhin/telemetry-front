import io from 'socket.io-client'

let socket = null

export default defineNuxtPlugin((nuxtApp) => {
  const createSocket = () => {
    if (socket) {
      console.log('Closing existing socket connection')
      socket.close()
    }
    
    socket = io('http://127.0.0.1:8000', {
      transports: ['websocket'],
      reconnection: true,
      reconnectionAttempts: 5,
      reconnectionDelay: 1000
    })

    socket.on('connect', () => {
      console.log('Socket connected with ID:', socket.id)
    })

    socket.on('disconnect', (reason) => {
      console.log('Socket disconnected. Reason:', reason)
    })

    return socket
  }

  if (process.client) {
    nuxtApp.provide('socket', createSocket())

    // Закрываем соединение при уничтожении приложения
    nuxtApp.hook('app:beforeMount', () => {
      if (socket) {
        console.log('Closing socket connection before app mount')
        socket.close()
      }
    })
  }
})