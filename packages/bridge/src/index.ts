import can from 'socketcan';

// Parse database
const network = can.parseNetworkDescription("resources/db/Model3CAN.kcd");
const channel = can.createRawChannel(process.env.NODE_ENV === 'production' ? "can0" : "vcan");
const db_motor = new can.DatabaseService(channel, network.buses["Motor"]);
const db_instr = new can.DatabaseService(channel, network.buses["Instrumentation"]);

channel.start();

// Register a listener to get any value changes
db_motor.messages["CruiseControlStatus"].signals["SpeedKm"].onChange(s => {
   console.log("SpeedKm " + s.value);
});

// Register a listener to get any value updates
db_motor.messages["Emission"].signals["Enginespeed"].onUpdate(s => {
   console.log("Enginespeed " + s.value);
});

// Update tank temperature
// db_instr.messages["TankController"].signals["TankTemperature"].update(80);

// Trigger sending this message
db_instr.send("TankController");

channel.stop()