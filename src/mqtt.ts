import * as mqtt from 'mqtt'

export const mqttCient = mqtt.connect(`mqtt://${process.env.MQTT_HOSTNAME}`)

mqttCient.on('connect', () => {
  mqttCient.subscribe('tesberry/bridge/state', err => {
    if (!err) {
      mqttCient.publish('tesberry/bridge/state', 'online')
    }
  })
})

process.on('beforeExit', () => {
  mqttCient.publish('tesberry/bridge/state', 'offline')
})
