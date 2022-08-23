import React, { useCallback, useEffect, useRef } from 'react';
import JMuxer from 'jmuxer';
import Modal from "react-modal";
import { Settings } from './Settings'

const customStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    minWidth: '50%',
    transform: 'translate(-50%, -50%)',
  },
};

interface CarplayProps {
  status: boolean;
  settings: { fps: number };
  changeSetting: (key: string, value: number | boolean) => void;
  touchEvent: (type: number, x: number, y: number) => void;
  type?: 'socket.io' | 'ws';
  ws: WebSocket | undefined;
}

export const Carplay: React.FC<CarplayProps> = ({ status, settings, changeSetting, type, ws, touchEvent }) => {
  const ref = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [state, setState] = React.useState({
    height: 0,
    width: 0,
    mouseDown: false,
    lastX: 0,
    lastY: 0,
    playing: false,
    frameCount: 0,
    modalOpen: false,
    running: false,
    webCam: false,
  });

  useEffect(() => {
    if (!ws) return;
    console.log("creating carplay", settings)
    const jmuxer = new JMuxer({
      node: 'player',
      mode: 'video',
      fps: settings.fps,
      flushingTime: 100,
      debug: false
    });
    const height = ref.current?.clientHeight || 0;
    const width = ref.current?.clientWidth || 0;

    setState((oldState) => ({ ...oldState, height, width }))

    if (type === 'ws') {
      ws.onmessage = (event) => {
        if(!state.running) {
          if (videoRef.current) {
            videoRef.current.play()
            setState((oldState) => ({ ...oldState, running: true }))
          }
        }
        let buf = Buffer.from(event.data)
        let video = buf.slice(4)
        jmuxer.feed({ video: new Uint8Array(video) })
      }
    } else if (type === "socket.io") {
      ws.addEventListener('carplay', (data) => {
        let buf = Buffer.from(data as any)
        let duration = buf.readInt32BE(0)
        let video = buf.slice(4)
        //console.log("duration was: ", duration)
        jmuxer.feed({video: new Uint8Array(video), duration:duration})
      })
    }
  }, [ws, settings, type]);

  const openModal = useCallback(() => {
    console.log("clicked")
    setState((oldState) => ({ ...oldState, modalOpen: true }))
  }, [])

  const closeModal = useCallback(() => {
    setState((oldState) => ({ ...oldState, modalOpen: false }))
  }, []);

  const handleMDown: React.MouseEventHandler<HTMLDivElement> = (e) => {
    let currentTargetRect = e.currentTarget.getBoundingClientRect();
    let x = e.clientX - currentTargetRect.left
    let y = e.clientY - currentTargetRect.top
    x = x / state.width
    y = y / state.height
    setState((oldState) => ({ ...oldState, lastX: x, lastY: y}))
    setState((oldState) => ({ ...oldState, mouseDown: true}))
    touchEvent(14, x, y)
  }

  const handleMUp: React.MouseEventHandler<HTMLDivElement> = (e) => {
    let currentTargetRect = e.currentTarget.getBoundingClientRect();
    let x = e.clientX - currentTargetRect.left
    let y = e.clientY - currentTargetRect.top
    x = x / state.width
    y = y / state.height
    setState((oldState) => ({ ...oldState, mouseDown: false}))
    touchEvent(16, x, y)
  }

  const handleMMove: React.MouseEventHandler<HTMLDivElement> = (e) => {
    let currentTargetRect = e.currentTarget.getBoundingClientRect();
    let x = e.clientX - currentTargetRect.left
    let y = e.clientY - currentTargetRect.top
    x = x / state.width
    y = y / state.height
    touchEvent(15, x, y)
  }

  const handleDown: React.TouchEventHandler<HTMLDivElement> = (e) => {
    let currentTargetRect = e.currentTarget.getBoundingClientRect();
    let x = e.touches[0].clientX - currentTargetRect.left
    let y = e.touches[0].clientY - currentTargetRect.top
    x = x / state.width
    y = y / state.height
    setState((oldState) => ({ ...oldState, lastX: x, lastY: y}))
    setState((oldState) => ({ ...oldState, mouseDown: true}))
    touchEvent(14, x, y)
    e.preventDefault()
  }
  const handleUp: React.TouchEventHandler<HTMLDivElement> = (e) => {
    let x = state.lastX
    let y = state.lastY
    setState((oldState) => ({ ...oldState, mouseDown: false}))
    touchEvent(16, x, y)
    e.preventDefault()
  }

  const handleMove: React.TouchEventHandler<HTMLDivElement> = (e) => {
    let currentTargetRect = e.currentTarget.getBoundingClientRect();
    let x = e.touches[0].clientX - currentTargetRect.left
    let y = e.touches[0].clientY - currentTargetRect.top
    x = x / state.width
    y = y / state.height
    touchEvent(15, x, y)
  }

  return (
    <div style={{height: '100%'}}  id={'main'}>
      <div 
        ref={ref}
         className="App"
         onTouchStart={handleDown}
         onTouchEnd={handleUp}
         onTouchMove={(e) => {
           if (state.mouseDown) {
             handleMove(e)
           }
         }}
         onMouseDown={handleMDown}
         onMouseUp={handleMUp}
         onMouseMove={(e) => {
           if (state.mouseDown) {
             handleMMove(e)
           }
         }}
         style={{height: '100%', width: '100%', padding: 0, margin: 0, display: 'flex'}}>
        <video ref={videoRef} style={{ height: status ? "100%" : "0%" }} autoPlay muted id="player" />
        {status ? <div></div>
          :
          <div style={{marginTop: 'auto', marginBottom: 'auto', textAlign: 'center', flexGrow: '1'}}>
            <div style={{marginTop: 'auto', marginBottom: 'auto', textAlign: 'center', flexGrow: '1'}}>CONNECT IPHONE TO BEGIN CARPLAY</div>
            <button onClick={openModal}>Settings</button>
          </div>
        }
      </div>
      <Modal
        isOpen={state.modalOpen}
        // onAfterOpen={afterOpenModal}
        onRequestClose={closeModal}
        style={customStyles}
        contentLabel="Example Modal"
        ariaHideApp={true}
      >
        <Settings settings={settings} changeValue={changeSetting} />
      </Modal>
    </div>
 );
}
