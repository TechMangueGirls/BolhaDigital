import logo from "../assets/favicon.png";

function Logo() {
  return (
    <img
      src={logo}
      alt="Logo"
      style={{
        position: "fixed",
        top: "35px",
        left: "35px",
        height: "65px", 
        objectFit: "contain",
        zIndex: 1000,
      }}
    />
  );
}

export default Logo;
