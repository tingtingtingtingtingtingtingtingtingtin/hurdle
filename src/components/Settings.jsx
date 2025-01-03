import React, { useContext } from "react";
import ToggleSwitch from "./ToggleSwitch";
import { SettingContext } from "../App";

const Settings = ({ onClose }) => {
  const { settings, setSettings } = useContext(SettingContext);

  const toggleExpanded = () => {
    setSettings((prev) => ({
      ...prev,
      useExpanded: !prev.useExpanded,
    }));
  };

  return (
    <div className="settings-screen">
      <div className="settings-content">
        <span className="header">
          <h2 className="header-element">Settings</h2>
          <button className="settings-close" onClick={onClose}>
            X
          </button>
        </span>
        <div className="settings-item">
          <div className="label-text">Use expanded word list (recommended)</div>
          <ToggleSwitch
            label="expanded-list"
            onClick={(prev) => ({...prev, useExpanded: !prev.useExpanded})}
            defaultChecked={true}
          />
        </div>
				<div className="settings-item">
          <div className="label-text">Hard Mode (for testing purposes)</div>
          <ToggleSwitch
            label="hard-mode"
            onClick={(prev) => ({...prev, hardMode: !prev.hardMode})}
            defaultChecked={false}
          />
        </div>
      </div>
    </div>
  );
};

export default Settings;
