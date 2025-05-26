import React from "react";
import { useNavigate } from "react-router-dom";
import { useUserAuth } from "../context/UserAuthContext";
import "../assets/style/home.css";
import BottomNavigation from "./BottomNavigation";

const Home = () => {
  const { user, logOut } = useUserAuth();
  const navigate = useNavigate();

  if (!user) return <div>Carregando...</div>;

  const handleLogout = () => {
    logOut();
    navigate("/");
  };

  return (
    <div className="home-container">
      <header className="home-header">
        <h2 className="welcome-text">Bem-vindo(a), {user.username}!</h2>
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
