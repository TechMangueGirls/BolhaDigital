import React, { useEffect, useState } from "react";
import { useUserAuth } from "../context/UserAuthContext";
import { FaThumbsUp, FaThumbsDown } from "react-icons/fa";
import BottomNavigation from "./BottomNavigation";
import LogoutButton from "./LogoutBottom";
import LogoFixa from "./LogoFixa";

const Votacao = () => {
  const { user, token } = useUserAuth();
  const [frases, setFrases] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const API_BASE = process.env.REACT_APP_BACKEND_URL;

  useEffect(() => {
    const fetchFrases = async () => {
      if (!token) return;

      try {
        const res = await fetch(`${API_BASE}/api/votacoes`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        if (!res.ok) throw new Error("Erro ao buscar frases");
        const data = await res.json();
        setFrases(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchFrases();
  }, [API_BASE, token]);

  const votar = async (id, tipo) => {
    try {
      const res = await fetch(`${API_BASE}/api/votacoes/${id}/votar`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ tipo }),
      });
      const data = await res.json();

      if (!res.ok) {
        alert(data.error || "Erro ao votar");
        return;
      }

      alert(data.message);

      setLoading(true);
      const res2 = await fetch(`${API_BASE}/api/votacoes`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (res2.ok) {
        const data2 = await res2.json();
        setFrases(data2);
      }
      setLoading(false);
    } catch {
      alert("Erro ao votar");
    }
  };

  if (loading)
    return (
      <div
        style={{ textAlign: "center", marginTop: "130px", color: "#004a99" }}
      >
        Carregando frases...
      </div>
    );
  if (error)
    return (
      <div
        style={{ textAlign: "center", marginTop: "130px", color: "#dc3545" }}
      >
        Erro: {error}
      </div>
    );

  const styles = {
    wrapper: {
      backgroundColor: "#fff",
      minHeight: "100vh",
      paddingTop: 100,
      paddingBottom: 80,
      boxSizing: "border-box",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      width: "100%",
      overflowY: "auto",
      fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
      color: "#004a99",
    },
    container: {
      width: "100%",
      maxWidth: 480,
      padding: "0 16px",
      display: "flex",
      flexDirection: "column",
      gap: 24,
    },
    topText: {
      fontSize: "1.4rem",
      fontWeight: 700,
      lineHeight: 1.0,
      textAlign: "center",
    },
    saldo: {
      backgroundColor: "#00AEEF",
      color: "white",
      borderRadius: 14,
      padding: "8px 14px",
      fontSize: 16,
      fontWeight: "bold",
      display: "flex",
      alignItems: "center",
      gap: 6,
      userSelect: "none",
      boxShadow: "0 2px 8px rgba(0, 174, 239, 0.4)",
      whiteSpace: "nowrap",
      minWidth: 130,
      justifyContent: "center",
      marginLeft: "auto",
      marginRight: "auto",
    },
    emoji: {
      fontSize: 20,
      lineHeight: 1,
    },
    missionInfo: {
      fontSize: "1rem",
      fontWeight: 600,
      color: "#0066cc",
      textAlign: "center",
      marginBottom: 8,
    },
    frasesContainer: {
      display: "flex",
      flexDirection: "column",
      gap: 16,
      maxHeight: "calc(100vh - 320px)",
      overflowY: "auto",
      paddingRight: 8,
    },
    card: {
      borderRadius: 16,
      padding: 16,
      backgroundColor: "#e6f0ff",
      boxShadow: "0 2px 6px rgba(0,74,153,0.15)",
      display: "flex",
      flexDirection: "column",
      gap: 12,
      fontSize: 14,
      color: "#004a99",
      transition: "transform 0.2s ease-in-out",
      outline: "none",
    },
    cardText: {
      fontWeight: 700,
      fontSize: 16,
      lineHeight: 1.3,
    },
    buttonsContainer: {
      display: "flex",
      justifyContent: "center",
      gap: 16,
    },
    buttonBase: {
      border: "none",
      borderRadius: 16,
      padding: "10px 20px",
      fontSize: 16,
      cursor: "pointer",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      gap: 8,
      minWidth: 110,
      userSelect: "none",
      transition: "transform 0.2s ease, box-shadow 0.2s ease",
    },
    positiveButton: {
      backgroundColor: "#28a745",
      color: "white",
    },
    negativeButton: {
      backgroundColor: "#dc3545",
      color: "white",
    },
    footer: {
      position: "fixed",
      bottom: 0,
      left: 0,
      width: "100%",
      backgroundColor: "white",
      paddingTop: 10,
      paddingBottom: 10,
      boxShadow: "0 -2px 8px rgba(0,0,0,0.1)",
      zIndex: 1000,
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      gap: 6,
    },
  };

  return (
    <>
      <style>{`
        .frases-scroll::-webkit-scrollbar {
          display: none;
        }
        .frases-scroll {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
        button:focus {
          outline: 3px solid #28a745;
          outline-offset: 2px;
        }
      `}</style>

      <div style={styles.wrapper}>
        <LogoFixa />
        <div style={styles.container}>

          {/* Texto principal */}
          <div style={styles.topText}>
            Vote nas informações que você já sabia sobre o cyberbullying
          </div>

          {/* Saldo de bubbles */}
          <div style={styles.saldo} aria-label="Saldo de bubbles">
            Você tem {user?.pontos ?? 0} <span style={styles.emoji}>🫧</span>
          </div>

          {/* Informação de valor da missão */}
          <div style={styles.missionInfo}>
            Cada voto vale 25 bubbles 🎯
          </div>

          {/* Lista de frases */}
          <div
            className="frases-scroll"
            style={styles.frasesContainer}
            aria-label="Lista de frases para votação"
          >
            {frases.map(({ _id, frase, votosPositivos, votosNegativos }) => (
              <div
                key={_id}
                style={styles.card}
                tabIndex={0}
                onFocus={(e) => (e.currentTarget.style.transform = "translateY(-5px)")}
                onBlur={(e) => (e.currentTarget.style.transform = "translateY(0)")}
              >
                <div style={styles.cardText}>{frase}</div>

                <div style={styles.buttonsContainer}>
                  <button
                    style={{ ...styles.buttonBase, ...styles.positiveButton }}
                    aria-label="Curtir"
                    title="Curtir"
                    onClick={() => votar(_id, "positivo")}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.transform = "translateY(-3px)";
                      e.currentTarget.style.boxShadow = "0 4px 10px rgba(40,167,69,0.5)";
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.transform = "translateY(0)";
                      e.currentTarget.style.boxShadow = "none";
                    }}
                  >
                    <FaThumbsUp size={20} /> {votosPositivos}
                  </button>

                  <button
                    style={{ ...styles.buttonBase, ...styles.negativeButton }}
                    aria-label="Não curtir"
                    title="Não curtir"
                    onClick={() => votar(_id, "negativo")}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.transform = "translateY(-3px)";
                      e.currentTarget.style.boxShadow = "0 4px 10px rgba(220,53,69,0.5)";
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.transform = "translateY(0)";
                      e.currentTarget.style.boxShadow = "none";
                    }}
                  >
                    <FaThumbsDown size={20} /> {votosNegativos}
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        <footer style={styles.footer}>
          <LogoutButton />
          <BottomNavigation />
        </footer>
      </div>
    </>
  );
};

export default Votacao;
