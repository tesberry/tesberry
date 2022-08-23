import { Readable } from 'stream';
import WebSocket from 'ws';
import Carplay from 'node-carplay';

const mp4Reader = new Readable({
    read(size) {
    }
});

let wss;
wss = new WebSocket.Server({ port: 3001 , perMessageDeflate: false});

wss.on('connection', function connection(ws) {
  console.log('Socket connected. sending data...');
  const wsstream = WebSocket.createWebSocketStream(ws);

  mp4Reader.on('data', (data) => {
    ws.send(data)
  })

  ws.on('error', function error(error) {
    console.log('WebSocket error');
  });
  ws.on('close', function close(msg) {
    console.log('WebSocket close');
  });
});

// TODO: use env variables for config
const config = {
  dpi: 240,
  nightMode: 0, // TODO: get from canbus
  hand: 0,
  boxName: 'nodePlay',
  width: 800,
  height: 480,
  fps: 30,
}
console.log("spawning carplay", config)
const carplay = new Carplay(config, mp4Reader)

carplay.on('status', (data) => {
  // if(data.status) {
  //     mainWindow.webContents.send('plugged')
  // } else {
  //     mainWindow.webContents.send('unplugged')
  // }
  console.log("data received", data)
})

carplay.on('quit', () => {
  console.log("carplay quit")
})

// ipcMain.on('click', (event, data) => {
//     carplay.sendTouch(data.type, data.x, data.y)
//     console.log(data.type, data.x, data.y)
// })

// ipcMain.on('statusReq', (event, data) => {
//     if(carplay.getStatus()) {
//         mainWindow.webContents.send('plugged')
//     } else {
//         mainWindow.webContents.send('unplugged')
//     }
// })

// ipcMain.on("fpsReq", (event) => {
//     event.returnValue = settings.store.get('fps')
// })

// ipcMain.on('getSettings', () => {
//     mainWindow.webContents.send('allSettings', settings.store.store)
// })

// ipcMain.on('settingsUpdate', (event, {type, value}) => {
//     console.log("updating settings", type, value)
//     settings.store.set(type, value)
//     mainWindow.webContents.send('allSettings', settings.store.store)
// })
