import React, { useState } from "react";  
import { useNavigate } from "react-router-dom";
import BottomNavigation from './BottomNavigation';
import LogoutButton from "./LogoutBottom"; 
import { useUserAuth } from "../context/UserAuthContext";
import LogoFixa from "./LogoFixa";

import { 
  FaBell, 
  FaCommentDots, 
  FaArrowRight, 
  FaRegNewspaper, 
  FaThumbsUp, 
  FaGift, 
  FaUserCircle 
} from "react-icons/fa";

const Home = () => {
  const { user } = useUserAuth();
  const navigate = useNavigate();

  const styles = {
    welcomeText: {
      fontSize: "1.5em", 
      color: "#333",
      margin: 0,
      marginRight: "auto", 
      display: "flex",
      alignItems: "center", 
    },
    logoContainer: {
      textAlign: "center",
      marginBottom: "20px",
    },
    logo: {
      width: "120px",
      height: "auto",
    },
    header: {
      display: "flex",
      alignItems: "center",
      marginBottom: "30px",
    },
    headerTitle: {
      fontSize: "2em",
      color: "#333",
      margin: 0,
      marginRight: "auto",
    },
    notificationIconWrapper: {
      position: "relative",
      fontSize: "1.5em",
      color: "#555",
      cursor: "pointer",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      width: "30px",
      height: "30px",
    },
    notificationDot: {
      position: "absolute",
      top: "-5px",
      right: "-5px",
      backgroundColor: "#ff0000",
      borderRadius: "50%",
      width: "18px",
      height: "18px",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      color: "white",
      fontSize: "0.7em",
      fontWeight: "bold",
    },
    sharedMissionCard: {
      borderRadius: "15px",
      padding: "20px",
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      marginBottom: "20px",
      cursor: "pointer",
      boxShadow: "0 2px 4px rgba(0, 0, 0, 0.05)",
      transition: "transform 0.2s ease-in-out",
    },
    missionCardBlue: {
      backgroundColor: "#0579b2",
      color: "white",
    },
    missionIconWrapper: {
      background: "rgba(255, 255, 255, 0.2)",
      borderRadius: "50%",
      width: "60px",
      height: "60px",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      marginRight: "15px",
      flexShrink: 0,
    },
    missionIcon: {
      fontSize: "2em",
      color: "white",
    },
    missionContent: {
      flexGrow: 1,
    },
    missionTitle: {
      margin: "0 0 5px 0",
      fontSize: "1.2em",
      fontWeight: "bold",
    },
    missionDescription: {
      margin: 0,
      fontSize: "0.9em",
      opacity: 0.9,
    },
    arrowIcon: {
      fontSize: "1.8em",
      color: "white",
      marginLeft: "10px",
      flexShrink: 0,
    },
    whatToDoText: {
      fontSize: "1.1em",
      color: "#555",
      marginBottom: "15px",
      padding: "0 10px",
    },
    missoesGrid: {
      display: "grid",
      gridTemplateColumns: "1fr 1fr",
      gap: "15px",
      padding: "0 10px",
    },
    cardButtonShared: {
      borderRadius: "15px",
      padding: "20px",
      display: "flex",
      flexDirection: "column",
      alignItems: "flex-start",
      cursor: "pointer",
      minHeight: "120px",
      justifyContent: "space-between",
      boxShadow: "0 2px 4px rgba(0, 0, 0, 0.05)",
      transition: "transform 0.2s ease-in-out, background-color 0.2s ease-in-out, color 0.2s ease-in-out",
    },
    cardButtonTitle: {
      fontSize: "1.1em",
      fontWeight: "bold",
      marginBottom: "5px",
      color: "inherit",
    },
    cardButtonDescription: {
      fontSize: "0.85em",
      opacity: 0.9,
      color: "inherit",
    },
    cardButtonArrow: {
      fontSize: "1.2em",
      marginTop: "10px",
      color: "inherit",
    },
    missoesFooter: {
      position: "fixed",
      bottom: 0,
      left: 0,
      width: "100%",
      backgroundColor: "white",
      boxShadow: "0 -2px 8px rgba(0, 0, 0, 0.1)",
      paddingBottom: "env(safe-area-inset-bottom)",
      zIndex: 1000,
    },
    icone: {
      width: "120px",
      height: "auto",
    },
    p4Box: {
      padding: '1rem',
    },
    mb3: {
      marginBottom: '1rem',
    },
  };

  const [hoveredCard, setHoveredCard] = useState(null);

  const getCardButtonStyle = (cardName) => {
    const isHovered = hoveredCard === cardName;
    let backgroundColor = "";

    switch (cardName) {
      case 'missao':
      case 'rewards':
        backgroundColor = "#0778b1";
        break;
      case 'likes':
        backgroundColor = "#007bff";
        break;
      case 'posts':
      case 'profile':
        backgroundColor = "#58b7ff";
        break;
      default:
        backgroundColor = "#8fdaff";
    }

    return {
      ...styles.cardButtonShared,
      backgroundColor,
      color: "white",
      transform: isHovered ? "translateY(-3px)" : "translateY(0)",
    };
  };

  return (
    <div style={styles.missoesContainer}>
      <div style={styles.logoContainer}>
      </div>

      <div style={styles.header}>
        <h1 style={styles.welcomeText}>Bem-vindo(a), {user.name}!</h1>
        <div style={styles.notificationIconWrapper}>
          <FaBell />
          <span style={styles.notificationDot}>1</span>
        </div>
      </div>

      <p style={{ ...styles.missionDescription, opacity: 1, padding: "0 10px", marginBottom: "20px" }}>
        Compartilhe positividade na bolha!
      </p>

      <div
        style={{ ...styles.sharedMissionCard, ...styles.missionCardBlue }}
        onClick={() => navigate("/missao")}
        onMouseEnter={() => setHoveredCard('missao')}
        onMouseLeave={() => setHoveredCard(null)}
      >
        <div style={styles.missionIconWrapper}>
          <FaCommentDots style={styles.missionIcon} />
        </div>
        <div style={styles.missionContent}>
          <h2 style={styles.missionTitle}>Missões</h2>
          <p style={styles.missionDescription}>
            Missão do dia: Faça um comentário positivo para uma pessoa que você não conhece
          </p>
        </div>
        <FaArrowRight style={styles.arrowIcon} />
      </div>

      <p style={styles.whatToDoText}>O que fazer?</p>

      <div style={styles.missoesGrid}>
        <div
          style={getCardButtonStyle('posts')}
          onClick={() => navigate("/post")}
          onMouseEnter={() => setHoveredCard('posts')}
          onMouseLeave={() => setHoveredCard(null)}
        >
          <FaRegNewspaper size={28} />
          <h3 style={styles.cardButtonTitle}>Postagens</h3>
          <p style={styles.cardButtonDescription}>
            Veja as postagens recentes e interaja com a comunidade.
          </p>
          <FaArrowRight style={styles.cardButtonArrow} />
        </div>

        <div
          style={getCardButtonStyle('likes')}
          onClick={() => navigate("/likes")}
          onMouseEnter={() => setHoveredCard('likes')}
          onMouseLeave={() => setHoveredCard(null)}
        >
          <FaThumbsUp size={28} />
          <h3 style={styles.cardButtonTitle}>Votação</h3>
          <p style={styles.cardButtonDescription}>
            Vote nas postagens que você gostou.
          </p>
          <FaArrowRight style={styles.cardButtonArrow} />
        </div>

        <div
          style={getCardButtonStyle('rewards')}
          onClick={() => navigate("/recompensas")}
          onMouseEnter={() => setHoveredCard('rewards')}
          onMouseLeave={() => setHoveredCard(null)}
        >
          <FaGift size={28} />
          <h3 style={styles.cardButtonTitle}>Recompensas</h3>
          <p style={styles.cardButtonDescription}>
            Descubra suas recompensas e conquistas.
          </p>
          <FaArrowRight style={styles.cardButtonArrow} />
        </div>

        <div
          style={getCardButtonStyle('profile')}
          onClick={() => navigate("/perfil")}
          onMouseEnter={() => setHoveredCard('profile')}
          onMouseLeave={() => setHoveredCard(null)}
        >
          <FaUserCircle size={28} />
          <h3 style={styles.cardButtonTitle}>Perfil</h3>
          <p style={styles.cardButtonDescription}>
            Veja e edite suas informações.
          </p>
          <FaArrowRight style={styles.cardButtonArrow} />
        </div>
      </div>

      <div style={styles.missoesFooter}>
        <LogoFixa/>
        <BottomNavigation />
        <LogoutButton />
      </div>
    </div>
  );
};

export default Home;
