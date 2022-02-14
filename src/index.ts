import can from 'socketcan';
import path from 'path';
import 'dotenv/config'
import { mqttCient } from './mqtt';

// Parse database
const network = can.parseNetworkDescription(path.resolve(__dirname, '../resources/db/Model3CAN.kcd'));
const channel = can.createRawChannel(process.env.VEHICLE_CAN);
const db = new can.DatabaseService(channel, network.buses['Model3CAN']);

channel.start();

const data = {};

Object.keys(db.messages).forEach(messageId => {
   if (!messageId.startsWith('ID')) return;
   const message = db.messages[messageId];
   Object.keys(message.signals).forEach(signalName => {
      data[message.name] = {};
      message.signals[signalName].onChange(s => {
         data[message.name][signalName.split('_')[1]] = s.value;
         mqttCient.publish(['tesberry', 'vehicle', message.name].join('/'), JSON.stringify(data[message.name]))
      });
   });
});

mqttCient.on('message', (topic, message) => {
   // message is Buffer
   const [id, bus, messageName, type] = topic.split('/');
   if (id !== 'tesberry' || type !== 'SET') return;
   const messageData = JSON.parse(message.toString());
   Object.keys(messageData).forEach((signalName) => {
      const signalPrefix = messageName.substring(5).split('_')[0]
      const signalId = [signalPrefix, signalName].join('_');
      db.messages[messageName].signals[signalId].update(messageData[signalName]);
   });
   db.send(messageName);
 })

process.on('exit', channel.stop);
