import * as mqtt from 'mqtt'

export const mqttCient = mqtt.connect(`mqtt://${process.env.MQTT_HOSTNAME}`)

mqttCient.on('connect', () => {
  mqttCient.subscribe('presence', err => {
    if (!err) {
      mqttCient.publish('presence', 'tesberry bridge connected')
    }
  })
})

// mqttCient.on('message', (topic, message) => {
//   // message is Buffer
//   console.log(message.toString())
//   // TODO: encode can message and send to can bus
//   // TODO: check to not receive own sent messages
// })
