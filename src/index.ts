import can from 'socketcan';
import path from 'path';
import fs from 'fs';
import 'dotenv/config'
import { mqttCient } from './mqtt';
import { syncBuiltinESMExports } from 'module';

// Parse database
const network = can.parseNetworkDescription(path.resolve(__dirname, '../resources/db/Model3CAN.kcd'));
const channel = can.createRawChannel(process.env.CAN_DEVICES.split(',')[0]);
const db = new can.DatabaseService(channel, network.buses['Model3CAN']);

channel.start();

const data = {};

db.messages.forEach(message => {
   Object.keys(message.signals).forEach(signalName => {
      data[message.name] = {};
      message.signals[signalName].onChange(s => {
         data[message.name][signalName.split('_')[1]] = s.value;
         // send data via mqtt
         mqttCient.publish(['tesberry', 'vehicle', message.name.substr(5)].join('/'), JSON.stringify(data[message.name]))
      });
   });
});

// example mqtt message
// topic: tesberry/vehicle/UI_vehicleControl
/*
   {
      accessoryPowerRequest: 1
      alarmEnabled: 1
      ambientLightingEnabled: 0
   }
*/

// Update tank temperature
// db_instr.messages["TankController"].signals["TankTemperature"].update(80);

// Trigger sending this message
// db_instr.send("TankController");

process.on('exit', channel.stop);
