import React, { useEffect } from "react";
import { useUserAuth } from "../context/UserAuthContext";
import BottomNavigation from "./BottomNavigation";
import LogoutButton from "./LogoutBottom"; 
import LogoFixa from "./LogoFixa";

const Perfil = () => {
  const { user, refreshUserData } = useUserAuth();

  useEffect(() => {
    refreshUserData(); 
  }, [refreshUserData]); 
  if (!user) {
    return <div>Carregando...</div>;
  }

  return (
    <div className="perfil-container" style={{ paddingBottom: "70px" }}>
      <header className="perfil-header">
        <h1>Perfil</h1>
      </header>

      <p>Veja e personalize suas informações abaixo:</p>

      <div className="perfil-card">
        <div className="perfil-item">
          <strong>Nome:</strong> {user.name}
        </div>
        <div className="perfil-item">
          <strong>Usuário:</strong> @{user.username}
        </div>
        <div className="perfil-item">
          <strong>Bubbles:</strong> {user.pontos ?? 0} 🫧
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

      <footer 
        className="perfil-footer" 
        style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "10px", marginTop: "20px" }}
      >
        <LogoutButton />
        <LogoFixa />
        <BottomNavigation />
      </footer>
    </div>
  );
};

export default Perfil;
