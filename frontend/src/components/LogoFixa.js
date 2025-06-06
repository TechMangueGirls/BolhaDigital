// Logo.jsx
import logo from "../assets/favicon.png";

function Logo() {
  return (
    <img
      src={logo}
      alt="Logo"
      style={{
        position: "fixed",
        top: "1rem",       
        left: "1rem",
        height: "40px",    
        width: "auto",
        objectFit: "contain",
        zIndex: 1000,
        pointerEvents: "none",
      }}
    />
  );
}

export default Logo;
