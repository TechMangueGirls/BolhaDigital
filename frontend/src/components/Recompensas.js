import React, { useState, useEffect } from "react";
import BottomNavigation from "./BottomNavigation";
import LogoFixa from "./LogoFixa";
import { useUserAuth } from "../context/UserAuthContext";
import { FaPlus } from "react-icons/fa";

import bolha from "../assets/img/bolha.png";
import gamer from "../assets/img/gamer.png";
import reino from "../assets/img/reino.png";
import artista from "../assets/img/artista.png";

const todasRecompensas = [
  { titulo: "Bolha", pontos: 150, iconUrl: bolha },
  { titulo: "Gamer", pontos: 700, iconUrl: gamer },
  { titulo: "Reino", pontos: 1000, iconUrl: reino },
  { titulo: "Artista", pontos: 800, iconUrl: artista },
  { titulo: "Postagem de Vídeo", pontos: 20000, iconUrl: null, icon: "🎬" },
  { titulo: "Postagem de Imagens", pontos: 10000, iconUrl: null, icon: "📸" },
];

const recompensasPadrao = [
  {
    titulo: "Envio de Missões",
    iconUrl: "https://cdn-icons-png.flaticon.com/512/190/190411.png",
  },
  { titulo: "Postagem", iconUrl: null, icon: "📝" },
];

const API_BASE_URL = process.env.REACT_APP_BACKEND_URL || "http://localhost:5000";

const Recompensas = () => {
  const { user, setUser } = useUserAuth();
  const saldoBubbles = user?.pontos ?? 0;

  const [isMobile, setIsMobile] = useState(false);
  const [hoveredIndex, setHoveredIndex] = useState(null);

  const [recompensasObtidas, setRecompensasObtidas] = useState([...recompensasPadrao]);
  const [recompensasDisponiveis, setRecompensasDisponiveis] = useState(todasRecompensas);

  useEffect(() => {
    const carregarRecompensas = async () => {
      if (!user?._id) return;

      try {
        const res = await fetch(`${API_BASE_URL}/api/recompensas/${user._id}`);
        const data = await res.json();

        if (res.ok) {
          const recompensasObtidasComIcones = data.obtidas.map((r) => {
            const recompensaLocal = todasRecompensas.find((tr) => tr.titulo === r.titulo);
            return {
              ...r,
              iconUrl: recompensaLocal?.iconUrl || r.iconUrl || null,
              icon: recompensaLocal?.icon || r.icon || null,
            };
          });

          const recompensasParaResgatar = data.paraResgatar.map((r) => {
            const recompensaLocal = todasRecompensas.find((tr) => tr.titulo === r.titulo);
            return {
              ...r,
              iconUrl: recompensaLocal?.iconUrl || r.iconUrl || null,
              icon: recompensaLocal?.icon || r.icon || null,
            };
          });

          setRecompensasObtidas([...recompensasPadrao, ...recompensasObtidasComIcones]);
          setRecompensasDisponiveis(recompensasParaResgatar);
        } else {
          console.error("Erro ao buscar recompensas:", data.message);
        }
      } catch (error) {
        console.error("Erro na requisição:", error);
      }
    };

    carregarRecompensas();
  }, [user]);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth <= 480);
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handleResgatar = async (index) => {
    const recompensa = recompensasDisponiveis[index];

    if (saldoBubbles < recompensa.pontos) {
      alert("Você não tem bubbles suficientes para resgatar essa recompensa.");
      return;
    }

    try {
      const response = await fetch(`${API_BASE_URL}/api/recompensas/obter/${user._id}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ titulo: recompensa.titulo }),
      });

      const data = await response.json();

      if (!response.ok) {
        alert(data.message || "Erro ao resgatar recompensa.");
        return;
      }

      setUser(data.user);
      alert("Recompensa obtida com sucesso!");
    } catch (error) {
      alert("Erro na comunicação com o servidor.");
      console.error(error);
    }
  };

  const styles = {
    wrapper: {
      backgroundColor: "#fff",
      minHeight: "100vh",
      paddingTop: isMobile ? "120px" : "120px",
      paddingBottom: isMobile ? "100px" : "70px",
      boxSizing: "border-box",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      width: "100%",
      overflowY: "auto",
      maxHeight: "100vh",
      scrollbarWidth: "none",
      msOverflowStyle: "none",
    },
    container: {
      width: "100%",
      maxWidth: "400px",
      padding: "0 10px",
      display: "flex",
      flexDirection: "column",
      gap: "14px",
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
      marginBottom: "10px",
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
      marginTop: "10px",
      marginBottom: "6px",
      textAlign: "center",
    },
    grid: {
      display: "grid",
      gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr",
      gap: "12px",
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
      minHeight: "160", 
    },
    cardHover: {
      transform: "scale(1.07)",
    },
    cardObtida: {
      backgroundColor: "#007aaf",
      color: "white",
      border: "none",
      cursor: "default",
    },
    icon: {
      width: "50px",
      height: "50px",
      objectFit: "contain",
    },
    iconText: {
      fontSize: "36px",
      lineHeight: "1",
    },
    pontos: {
      fontWeight: "bold",
      color: "#007aaf",
    },
    button: {
      backgroundColor: "#00AEEF",
      border: "none",
      borderRadius: "8px",
      color: "white",
      padding: "6px 10px",
      cursor: "pointer",
      fontWeight: "bold",
      marginTop: "auto",
    },
  };

  return (
    <>
      <LogoFixa />
      <div style={styles.wrapper}>
        <div style={styles.container}>
          <div style={styles.saldoCard}>
            <div>Saldo Bubbles:</div>
            <div style={styles.saldoBubble}>
              {saldoBubbles} <FaPlus />
            </div>
          </div>

          <div style={styles.sectionTitle}>Recompensas Obtidas</div>
          <div style={styles.grid}>
            {recompensasObtidas.map((recompensa, index) => (
              <div
                key={index}
                style={{
                  ...styles.card,
                  ...styles.cardObtida,
                  ...(hoveredIndex === index ? styles.cardHover : {}),
                }}
                onMouseEnter={() => setHoveredIndex(index)}
                onMouseLeave={() => setHoveredIndex(null)}
              >
                {recompensa.iconUrl ? (
                  <img
                    src={recompensa.iconUrl}
                    alt={recompensa.titulo}
                    style={styles.icon}
                  />
                ) : (
                  <div style={styles.iconText}>{recompensa.icon || "🏆"}</div>
                )}
                <div>{recompensa.titulo}</div>
              </div>
            ))}
          </div>

          <div style={{ height: "24px" }}></div>

          <div style={styles.sectionTitle}>Recompensas para Resgatar</div>
          <div style={styles.grid}>
            {recompensasDisponiveis.map((recompensa, index) => (
              <div
                key={index}
                style={{
                  ...styles.card,
                  ...(hoveredIndex === index ? styles.cardHover : {}),
                }}
                onMouseEnter={() => setHoveredIndex(index)}
                onMouseLeave={() => setHoveredIndex(null)}
              >
                {recompensa.iconUrl ? (
                  <img
                    src={recompensa.iconUrl}
                    alt={recompensa.titulo}
                    style={styles.icon}
                  />
                ) : (
                  <div style={styles.iconText}>{recompensa.icon || "🎁"}</div>
                )}
                <div>{recompensa.titulo}</div>
                <div style={styles.pontos}>{recompensa.pontos} Bubbles</div>
                <button style={styles.button} onClick={() => handleResgatar(index)}>
                  Resgatar
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
      <BottomNavigation />
    </>
  );
};

export default Recompensas;
