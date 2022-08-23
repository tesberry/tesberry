import React, { useCallback } from 'react';
import WebCam from "./webCam";
import Modal from "react-modal";

const customStyles = {
  display: 'flex',
  flexDirection: 'column',
  flexGrow: 1
};

interface SettingsProps {
  settings: { fps: number };
  changeValue: (key: string, value: number | boolean) => void;
  reqReload: () => void;
  customStyles?: React.CSSProperties & Modal.Styles;
}

export const Settings: React.FC<SettingsProps> = ({ settings, changeValue, customStyles, reqReload }) => {
  const [state, setState] = React.useState({ webCam: false })

  const openWebCam = useCallback(() => {
    setState({ webCam: true })
  }, []);

  const closeWebcam = useCallback(() => {
    setState({ webCam: false })
  }, [])

  const getInput = (key: string, value: any) => {
    switch (key) {
      case 'fps':
        return <input type={'number'} min={10} value={value} onChange={(e) => {
          e.preventDefault()
          console.log(e.target.value)
          changeValue(key, parseInt(e.target.value))
        }}/>
      default:
        return <input type={'number'} value={value} onChange={(e) => {
          e.preventDefault()
          changeValue(key, parseInt(e.target.value))
        }}/>
    }
  }


  const single = (key: string, value: any) => {
    return(
      <div>
        <div style={{display: 'flex', justifyContent: 'space-between', marginTop: "5%", marginBottom: "5%"}}>
          <div>{key}</div>
          {getInput(key, value)}
        </div>
        <hr />
      </div>
    )
  };

  return (
    <div>
      <div>
        <button onClick={openWebCam}>Show webCam </button>
        <hr />
        <div style={customStyles}>
          {Object.keys(settings).map(key => single(key, settings[key as keyof typeof settings]))}
        </div>
      </div>
      <div style={{marginTop: 'auto', marginLeft: 'auto', marginRight: 'auto'}}>
        <button style={{marginTop: 'auto', marginLeft: 'auto', marginRight: 'auto'}} onClick={reqReload}>click to reload</button>
      </div>
      <Modal
        isOpen={state.webCam}
        // onAfterOpen={afterOpenModal}
        onRequestClose={closeWebcam}
        style={customStyles}
        contentLabel="Example Modal"
        ariaHideApp={true}
      >
        <WebCam />
      </Modal>
    </div>
  );
};
