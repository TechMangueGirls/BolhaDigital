import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import BottomNavigation from "./BottomNavigation";
import LogoFixa from "./LogoFixa";
import LogoutButton from "./LogoutBottom";
import { useUserAuth } from "../context/UserAuthContext";
import { FaPlus } from "react-icons/fa";

import bolha from "../assets/img/bolha.png";
import gamer from "../assets/img/gamer.png";
import reino from "../assets/img/reino.png";
import artista from "../assets/img/artista.png";

const Recompensas = () => {

  const { user } = useUserAuth();
  const saldoBubbles = user?.pontos ?? 0;

  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 480);
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const recompensasDisponiveis = [
    { titulo: "Bolha", pontos: 500, iconUrl: bolha },
    { titulo: "Gamer", pontos: 3000, iconUrl: gamer },
    { titulo: "Reino", pontos: 5000, iconUrl: reino },
    { titulo: "Artista", pontos: 1500, iconUrl: artista },
  ];

  const recompensasObtidas = [
    {
      titulo: "Envio de Missões",
      iconUrl: "https://cdn-icons-png.flaticon.com/512/190/190411.png",
    },
    { titulo: "Postagem", icon: "📝" },
  ];

  const styles = {
    wrapper: {
      backgroundColor: "#fff",
      minHeight: "100vh",
      paddingTop: isMobile ? "220px" : "260px",
      paddingBottom: isMobile ? "80px" : "100px",
      boxSizing: "border-box",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      width: "100%",
      overflowY: "auto",
    },
    container: {
      width: "100%",
      maxWidth: "600px",
      padding: "0 10px",
      display: "flex",
      flexDirection: "column",
      gap: "20px",
    },
    title: {
      textAlign: "center",
      color: "#0579b2",
      fontSize: isMobile ? "26px" : "28px",
      fontWeight: "bold",
      marginBottom: "10px",
    },
    saldoCard: {
      backgroundColor: "#00AEEF",
      color: "white",
      borderRadius: "16px",
      padding: "16px",
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      fontSize: isMobile ? "14px" : "16px",
      marginBottom: "20px",
    },
    saldoBubble: {
      backgroundColor: "white",
      color: "#00AEEF",
      fontWeight: "bold",
      borderRadius: "20px",
      padding: "6px 14px",
      fontSize: isMobile ? "14px" : "16px",
      display: "flex",
      alignItems: "center",
      gap: "6px",
    },
    sectionTitle: {
      fontSize: isMobile ? "18px" : "20px",
      fontWeight: "600",
      color: "#0579b2",
      marginBottom: "12px",
      textAlign: "center",
    },
    grid: {
      display: "grid",
      gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr",
      gap: "15px",
    },
    card: {
      border: "2px solid #00AEEF",
      borderRadius: "16px",
      padding: "10px",
      textAlign: "center",
      position: "relative",
      boxShadow: "0 2px 6px rgba(0,0,0,0.1)",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      gap: "8px",
      cursor: "pointer",
      userSelect: "none",
      transition: "transform 0.2s",
      fontSize: isMobile ? "14px" : "16px",
    },
    cardHover: {
      transform: "translateY(-3px)",
    },
    obtidaCard: {
      backgroundColor: "#00AEEF",
      color: "white",
      borderRadius: "16px",
      padding: "10px",
      textAlign: "center",
      boxShadow: "0 2px 6px rgba(0,0,0,0.1)",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      gap: "8px",
      fontSize: isMobile ? "14px" : "16px",
    },
    titulo: {
      fontWeight: "600",
      fontSize: isMobile ? "14px" : "16px",
    },
    pontos: {
      color: "#00AEEF",
      fontWeight: "bold",
      fontSize: isMobile ? "18px" : "20px",
      marginTop: "4px",
    },
    botaoMais: {
      position: "absolute",
      top: "4px",
      right: "4px",
      backgroundColor: "#FFD700",
      color: "#000",
      borderRadius: "50%",
      width: "20px",
      height: "20px",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      fontWeight: "bold",
      fontSize: "14px",
      cursor: "pointer",
      userSelect: "none",
    },
    footer: {
      position: "fixed",
      bottom: 0,
      left: 0,
      width: "100%",
      backgroundColor: "white",
      boxShadow: "0 -2px 8px rgba(0,0,0,0.1)",
      paddingBottom: "env(safe-area-inset-bottom)",
      zIndex: 1000,
    },
    iconImage: {
      width: isMobile ? 64 : 80,
      height: isMobile ? 64 : 80,
      objectFit: "contain",
      borderRadius: "10px",
    },
  };

  const [hoveredIndex, setHoveredIndex] = useState(null);

  return (
    <div style={styles.wrapper}>
      <LogoFixa
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          width: "100%",
          zIndex: 1001,
          marginBottom: "20px",
        }}
      />

      <div style={styles.container}>
        <h1 style={styles.title}>Recompensas</h1>

        <div style={styles.saldoCard}>
          <p>Conclua as missões para ganhar + bubbles e resgatar recompensas</p>
          <div style={styles.saldoBubble}>🫧 {saldoBubbles}</div>
        </div>

        <h2 style={styles.sectionTitle}>Para resgatar:</h2>
        <div style={styles.grid}>
          {recompensasDisponiveis.map((item, i) => (
            <div
              key={i}
              style={{
                ...styles.card,
                ...(hoveredIndex === i ? styles.cardHover : {}),
              }}
              title={`${item.titulo} - ${item.pontos} bubbles`}
              onMouseEnter={() => setHoveredIndex(i)}
              onMouseLeave={() => setHoveredIndex(null)}
            >
              <img
                src={item.iconUrl}
                alt={item.titulo}
                style={styles.iconImage}
              />
              <div style={styles.titulo}>{item.titulo}</div>
              {/* descrição removida conforme pedido */}
              <div style={styles.pontos}>{item.pontos} 🫧</div>
              <div style={styles.botaoMais}>
                <FaPlus />
              </div>
            </div>
          ))}
        </div>

        <h2 style={styles.sectionTitle}>Obtidas:</h2>
        <div style={styles.grid}>
          {recompensasObtidas.map((item, i) => (
            <div
              key={i}
              style={styles.obtidaCard}
              title={item.titulo}
            >
              {item.iconUrl ? (
                <img
                  src={item.iconUrl}
                  alt={item.titulo}
                  style={styles.iconImage}
                />
              ) : (
                <span
                  role="img"
                  aria-label={item.titulo}
                  style={{ fontSize: isMobile ? 32 : 40 }}
                >
                  {item.icon}
                </span>
              )}
              <div style={styles.titulo}>{item.titulo}</div>
            </div>
          ))}
        </div>
      </div>

      <footer style={styles.footer}>
        <BottomNavigation />
        <LogoutButton />
      </footer>
    </div>
  );
};

export default Recompensas;
