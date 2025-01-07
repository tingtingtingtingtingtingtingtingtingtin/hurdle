import React, { useContext } from "react";
import ToggleSwitch from "./ToggleSwitch";
import { SettingContext } from "../App";

const Settings = ({ onClose }) => {
  const { settings, setSettings } = useContext(SettingContext);
  const handleToggle = (id) => {
    setSettings((prev) => ({
        ...prev,
        [id]: { ...prev[id], value: !prev[id].value },
      }));
  }

  return (
    <div className="settings-screen">
      <div className="settings-content">
        <span className="header">
          <h2 className="header-element">Settings</h2>
          <button className="settings-close" onClick={onClose}>
            X
          </button>
        </span>
        {
          Object.entries(settings).map(([id, setting]) => (
              <div key={id} className="settings-item">
                <div className="label-text">{setting.label}</div>
                <ToggleSwitch
                  label={id}
                  onClick={() => handleToggle(id)}
                  defaultChecked={setting.value}
                />
              </div>
            ))
        }
      </div>
    </div>
  );
};

export default Settings;
