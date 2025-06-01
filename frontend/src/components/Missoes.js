import { useNavigate } from "react-router-dom";
import BottomNavigation from './BottomNavigation';
import LogoutButton from "./LogoutBottom";
import LogoFixa from "./LogoFixa";

const Missoes = () => {
  const navigate = useNavigate();

  const buttonStyle = {
    backgroundColor: "#0579b2",
    border: "none",
    color: "white",
    padding: "20px 24px",             
    fontSize: "1.2rem",               
    cursor: "pointer",
    borderRadius: "10px",
    margin: "16px auto",              
    width: "100%",
    maxWidth: "500px",                
    display: "block",
    textAlign: "left",
  };

  const spanStyle = {
    fontWeight: "normal",
    fontSize: "1rem",
    display: "block",
    marginTop: "6px",
    color: "white",
  };

  return (
    <div style={{ backgroundColor: "#fff", paddingTop: "40px" }}>
      <h1 style={{ color: "#0579b2", textAlign: "center", marginBottom: "10px" }}>Missões</h1>
      <p style={{ textAlign: "center", marginBottom: "30px" }}>
        Explore suas missões abaixo e cumpra desafios para espalhar positividade!
      </p>

      <button style={buttonStyle} onClick={() => navigate("/post")}>
        Postagens
        <span style={spanStyle}>Veja e compartilhe as postagens mais recentes.</span>
      </button>

      <button style={buttonStyle} onClick={() => navigate("/recompensas")}>
        Recompensas
        <span style={spanStyle}>Acumule Bubbles e troque por recompensas.</span>
      </button>

      <button style={buttonStyle} onClick={() => navigate("/perfil")}>
        Perfil
        <span style={spanStyle}>Veja e personalize seu perfil.</span>
      </button>

      <button style={buttonStyle} onClick={() => navigate("/likes")}>
        Votação
        <span style={spanStyle}>Vote e contribua com uma bolha mais positiva.</span>
      </button>

      <footer>
        <LogoutButton />
        <LogoFixa />
        <BottomNavigation />
      </footer>
    </div>
  );
};

export default Missoes;

