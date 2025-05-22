import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import BottomNavigation from "./BottomNavigation";

const Perfil = () => {
  const [nome, setNome] = useState("");       // Para o nome real (ex: André)
  const [username, setUsername] = useState(""); // Para o username (ex: andrezin)
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    const userId = localStorage.getItem("userId");

    if (!token || !userId) {
      navigate("/");
    } else {
      const loadUserData = async () => {
        try {
          const res = await fetch(`http://localhost:5000/user/${userId}`, {
            method: "GET",
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });

          const data = await res.json();

          if (res.ok && data.user) {
            setNome(data.user.name || "");          // ajuste para o campo do nome real no seu backend
            setUsername(data.user.username || "");
          } else {
            console.error("Erro ao carregar dados do usuário:", data.msg);
            navigate("/");
          }
        } catch (error) {
          console.error("Erro ao conectar ao servidor:", error);
          navigate("/");
        }
      };

      loadUserData();
    }
  }, [navigate]);

  return (
    <div className="perfil-container" style={{ paddingBottom: "70px" }}>
      <h1>Perfil</h1>
      <p>Veja e personalize suas informações abaixo:</p>

      <div className="perfil-card">
        <div className="perfil-item">
          <strong>Nome:</strong> {nome}
        </div>
        <div className="perfil-item">
          <strong>Usuário:</strong> @{username}
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


