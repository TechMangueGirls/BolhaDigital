import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import API_BASE_URL from "../../api";

const Home = () => {
  const [userName, setUserName] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      navigate("/");
    } else {
      const loadUserData = async () => {
        try {
          const res = await fetch(`${API_BASE_URL}/user/me`, {
            method: "GET",
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });

          const data = await res.json();

          if (res.ok && data.user) {
            setUserName(data.user.name);
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

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  return (
    <div className="home-container">
      <div className="user-name">
        <h2>Bem-vindo(a), {userName}!</h2>
      </div>
      <p>Esta é a sua página inicial.</p>
      <button onClick={handleLogout}>Sair</button>

      <div className="user-footer">
        <div className="text-links">
          <button onClick={() => navigate("/missoes")}>Missões</button>
          <button onClick={() => navigate("/votacao")}>Votação</button>
        </div>
      </div>
    </div>
  );
};

export default Home;
