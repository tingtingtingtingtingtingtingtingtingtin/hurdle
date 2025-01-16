import { useState } from "react";
import Settings from "./Settings";

const Header = () => {
  const [showSettings, setShowSettings] = useState(false);
  const toggleShowSettings = () => {
    setShowSettings(!showSettings);
    console.log("Button clicked");
  };

  return (
    <div className="header">
      <div className="header-element">
        <h1>HURDLE</h1>
      </div>
      <button className="settings-btn" onClick={toggleShowSettings}>
        <i className="fas fa-cog"></i>{" "}
      </button>

      {showSettings && <Settings onClose={toggleShowSettings} />}
    </div>
  );
};

export default Header;
