import { useNavigate } from "react-router-dom";

function LogoutButton() {
  const navigate = useNavigate();

  const handleLogout = () => {
    navigate("/");
  };

  return (
    <button
      onClick={handleLogout}
      style={{
        position: "fixed",
        top: "20px",
        right: "20px",
        backgroundColor: "#0579b2",   
        borderRadius: "20px",
        padding: "10px 16px",
        border: "#0778b1",  
        color: "white",               
        fontWeight: "bold",
        fontSize: "0.9rem",
        cursor: "pointer",
        boxShadow: "0 4px 6px rgba(0,0,0,0.1)",
        zIndex: 1000,
      }}
      aria-label="Sair"
      title="Sair"
    >
      Sair
    </button>
  );
}

export default LogoutButton;