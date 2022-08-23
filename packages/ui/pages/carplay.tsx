import type { NextPage } from 'next'
import Head from 'next/head'
import { useEffect, useState } from 'react'
import { Carplay } from '../components/carplay/Carplay'

const CarplayPage: NextPage = () => {
  const [ws, setWs] = useState<WebSocket>();

  useEffect(() => {
    const socket = new WebSocket('ws://tesberry:3001');
    socket.binaryType = 'arraybuffer';
    setWs(socket);
  }, [])

  const [status, setStatus] = useState(false);

  const touchEvent = (type: number, x: number, y: number) => {
    console.log("touch event type: ", + type + " x: " + x + " y:" + y)
  }

  const changeSetting = (key: string, value: any) => {
    console.log("setting: " + key + " change to: " + value)
  }

  const reload = () => {
    console.log("reload request")
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
          settings={{
            fps: 60,
          }}
          status={status}
          touchEvent={touchEvent}
          changeSetting={changeSetting}
          reload={reload}
          ws={ws}
          type="ws"
        />
      </div>
    </>
  )
}

export default CarplayPage
