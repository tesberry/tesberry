import type { NextPage } from 'next'
import Head from 'next/head'
import { useEffect, useState } from 'react'
import { Carplay } from '../components/carplay/Carplay'

const defaultSettings = { fps : 60 };

if (typeof window !== 'undefined' && window.localStorage.getItem('settings') === null) {
  window.localStorage.setItem('settings', JSON.stringify(defaultSettings))
}

const CarplayPage: NextPage = () => {
  const [settings, setSettings] = useState(JSON.parse(window.localStorage.getItem('settings') || '') || defaultSettings);
  const [ws, setWs] = useState<WebSocket>();

  useEffect(() => {
    const socket = new WebSocket('ws://tesberry:3001');
    socket.binaryType = 'arraybuffer';
    setWs(socket);
    return () => socket.close();
  }, [])

  const [status, setStatus] = useState(false);

  const touchEvent = (type: number, x: number, y: number) => {
    console.log("touch event type: ", + type + " x: " + x + " y:" + y)
    ws?.send(JSON.stringify({ type, x, y }));
  }

  const changeSetting = (key: string, value: any) => {
    console.log("setting: " + key + " change to: " + value)
    const newSettings = { ...settings, [key]: value };
    setSettings(newSettings);
    window.localStorage.setItem('settings', JSON.stringify(newSettings));
  }

  const toggleCarplay = () => {
    setStatus(!status)
  }
  return (
    <>
      <Head>
        <title>CarPlay</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="App" style={{height: '100%'}}>
        <button onClick={toggleCarplay}>openCarplay</button>
        <Carplay
          settings={settings}
          status={status}
          touchEvent={touchEvent}
          changeSetting={changeSetting}
          ws={ws}
          type="ws"
        />
      </div>
    </>
  )
}

export default CarplayPage
