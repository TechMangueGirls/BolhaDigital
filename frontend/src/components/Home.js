import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../assets/style/home.css";
import BottomNavigation from "./BottomNavigation";

const Home = () => {
  const [userName, setUserName] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    const userId = localStorage.getItem("userId");

    if (!token || !userId) {
      navigate("/");
      return;
    }

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
          setUserName(data.user.username);
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
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("userId");
    navigate("/");
  };

  return (
    <div className="home-container">
      <header className="home-header">
        <h2 className="welcome-text">Bem-vindo(a), {userName}!</h2>
        <button className="logout-button" onClick={handleLogout}>
          Sair
        </button>
      </header>

      <p className="home-description">Esta é a sua página inicial.</p>

      <footer className="home-footer">
        <BottomNavigation />
      </footer>
    </div>
  );
};

export default Home;

