import React from 'react';
import Modal from "react-modal";

const customStyles = {
  display: 'flex',
  flexDirection: 'column',
  flexGrow: 1
};

interface SettingsProps {
  settings: { fps: number };
  changeValue: (key: string, value: number | boolean) => void;
  customStyles?: React.CSSProperties & Modal.Styles;
}

export const Settings: React.FC<SettingsProps> = ({ settings, changeValue, customStyles }) => {
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
        <hr />
        <div style={customStyles}>
          {Object.keys(settings).map(key => single(key, settings[key as keyof typeof settings]))}
        </div>
      </div>
    </div>
  );
};
