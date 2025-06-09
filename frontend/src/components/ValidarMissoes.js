import React, { useEffect, useState } from "react";
import { useUserAuth } from "../context/UserAuthContext";

function ValidarMissoes() {
  const { user, token } = useUserAuth();
  const [missoes, setMissoes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [imagemAmpliada, setImagemAmpliada] = useState(null); 

  useEffect(() => {
    if (!token) return;

    setLoading(true);

    fetch(`${process.env.REACT_APP_BACKEND_URL}/api/missoes/pendentes`, {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then(res => res.json())
      .then(data => {
        if (data) setMissoes(data);
      })
      .catch(err => console.error(err))
      .finally(() => setLoading(false));
  }, [token]);

  const validarMissao = (id, novoStatus) => {
    fetch(`${process.env.REACT_APP_BACKEND_URL}/api/missoes/${id}/status`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ status: novoStatus }),
    })
      .then(res => res.json())
      .then(() => {
        setMissoes(missoes.filter(missao => missao._id !== id));
      })
      .catch(err => console.error(err));
  };

  if (!user || user.role !== "admin") return <p>Acesso negado.</p>;

  if (loading) return <p>Carregando missões pendentes...</p>;

  return (
    <div style={{ maxWidth: "700px", margin: "20px auto", fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif" }}>
      <h1 style={{ textAlign: "center", marginBottom: "20px" }}>Validar Missões</h1>

      {imagemAmpliada && (
        <div
          onClick={() => setImagemAmpliada(null)}
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100vw",
            height: "100vh",
            backgroundColor: "rgba(0, 0, 0, 0.8)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            zIndex: 9999,
            cursor: "zoom-out",
          }}
        >
          <img
            src={imagemAmpliada}
            alt="Imagem ampliada"
            style={{
              maxWidth: "90%",
              maxHeight: "90%",
              borderRadius: "10px",
              boxShadow: "0 0 20px rgba(0,0,0,0.5)",
            }}
          />
        </div>
      )}

      {missoes.length === 0 ? (
        <p style={{ textAlign: "center" }}>Não há missões pendentes.</p>
      ) : (
        <ul style={{ listStyle: "none", padding: 0 }}>
          {missoes.map(missao => (
            <li
              key={missao._id}
              style={{
                border: "1px solid #ddd",
                borderRadius: "8px",
                padding: "15px",
                marginBottom: "15px",
                boxShadow: "0 2px 6px rgba(0,0,0,0.1)",
                backgroundColor: "#fff",
              }}
            >
              <h3 style={{ margin: "0 0 10px 0" }}>{missao.titulo}</h3>
              {missao.descricao && <p style={{ marginBottom: "10px", color: "#555" }}>{missao.descricao}</p>}

              <div style={{ display: "flex", gap: "10px", flexWrap: "wrap", marginBottom: "10px" }}>
                {missao.imagens && missao.imagens.map((img, idx) => (
                  <img
                    key={idx}
                    src={`${process.env.REACT_APP_BACKEND_URL}/uploads/${img}`}
                    alt={`Missão ${missao.titulo} - imagem ${idx + 1}`}
                    style={{
                      width: "220px",
                      height: "140px",
                      objectFit: "cover",
                      borderRadius: "6px",
                      border: "1px solid #ccc",
                      cursor: "pointer"
                    }}
                    onClick={() => setImagemAmpliada(`${process.env.REACT_APP_BACKEND_URL}/uploads/${img}`)}
                  />
                ))}
              </div>

              <div>
                <button
                  onClick={() => validarMissao(missao._id, "aprovada")}
                  style={{
                    padding: "8px 14px",
                    marginRight: "10px",
                    backgroundColor: "#4CAF50",
                    color: "#fff",
                    border: "none",
                    borderRadius: "5px",
                    cursor: "pointer",
                    fontWeight: "600",
                  }}
                >
                  Aprovar
                </button>
                <button
                  onClick={() => validarMissao(missao._id, "rejeitada")}
                  style={{
                    padding: "8px 14px",
                    backgroundColor: "#f44336",
                    color: "#fff",
                    border: "none",
                    borderRadius: "5px",
                    cursor: "pointer",
                    fontWeight: "600",
                  }}
                >
                  Reprovar
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default ValidarMissoes;
