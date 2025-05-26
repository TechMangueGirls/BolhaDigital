import React from "react";
import { useNavigate } from "react-router-dom";
import { useUserAuth } from "../context/UserAuthContext";
import BottomNavigation from "./BottomNavigation";

const Perfil = () => {
  const { user, logOut } = useUserAuth();
  const navigate = useNavigate();

  if (!user) {
    return <div>Carregando...</div>;
  }

  const handleLogout = () => {
    logOut();
    navigate("/");
  };

  return (
    <div className="perfil-container" style={{ paddingBottom: "70px" }}>
      <header className="perfil-header">
        <h1>Perfil</h1>
        <button className="logout-button" onClick={handleLogout}>
          Sair
        </button>
      </header>

      <p>Veja e personalize suas informações abaixo:</p>

      <div className="perfil-card">
        <div className="perfil-item">
          <strong>Nome:</strong> {user.name}
        </div>
        <div className="perfil-item">
          <strong>Usuário:</strong> @{user.username}
        </div>

        <div className="perfil-stats">
          <div><strong>Seguindo:</strong> 3000</div>
          <div><strong>Seguidores:</strong> 40</div>
          <div><strong>Publicações:</strong> 25</div>
        </div>

        <div className="perfil-bio">
          <p>🎮 Gamer | 📸 Apaixonado por fotografia</p>
          <p>Explorando o mundo, um passo de cada vez</p>
          <p>🎧 Viciado em música e boas vibes</p>
        </div>
      </div>

      <footer className="perfil-footer">
        <BottomNavigation />
      </footer>
    </div>
  );
};

export default Perfil;
