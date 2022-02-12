import * as mqtt from 'mqtt'

export const client  = mqtt.connect(`mqtt://${process.env.MQTT_HOSTNAME}`)

client.on('connect', () => {
  client.subscribe('presence', err => {
    if (!err) {
      client.publish('presence', 'tesberry bridge connected')
    }
  })
})

client.on('message', (topic, message) => {
  // message is Buffer
  console.log(message.toString())
  // TODO: encode can message and send to can bus
})
