import { useEffect, useState } from "react";

const Alert = ({ message, onClose }) => {
  const [active, setActive] = useState(false);
  useEffect(() => {
    if (message) {
      setActive(true);
      console.log(message);
      const timer = setTimeout(() => {
        setActive(false);
        setTimeout(() => onClose(), 300);
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, [message, onClose]);

  return (
    <div className={`alert-box ${active ? "show" : "hide"}`}>{message}</div>
  );
};

export default Alert;
