import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useUserAuth } from "../context/UserAuthContext";
import LogoFixa from "../components/LogoFixa";

const MissaoFilme = () => {
  const navigate = useNavigate();
  const { token } = useUserAuth();

  const [titulo] = useState("Indique um filme que faz você se sentir bem");
  const [imagens, setImagens] = useState([]);
  const [statusMsg, setStatusMsg] = useState("");
  const [enviando, setEnviando] = useState(false);

  const handleFileChange = (e) => {
    setImagens(Array.from(e.target.files));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (imagens.length === 0) {
      setStatusMsg("Por favor, selecione pelo menos uma imagem.");
      return;
    }

    if (!token) {
      setStatusMsg("Usuário não autenticado. Faça login.");
      return;
    }

    setEnviando(true);
    setStatusMsg("");

    const formData = new FormData();
    formData.append("titulo", titulo);
    imagens.forEach((imagem) => formData.append("imagens", imagem));

    try {
      const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/api/missoes/enviar`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formData,
        credentials: "include",
      });

      const data = await response.json();

      if (response.ok) {
        setStatusMsg("Missão enviada com sucesso! Aguarde aprovação do admin.");
        setImagens([]);
      } else {
        setStatusMsg(data.mensagem || "Erro ao enviar missão.");
      }
    } catch (error) {
      console.error("Erro ao enviar:", error);
      setStatusMsg("Erro na conexão com o servidor.");
    } finally {
      setEnviando(false);
    }
  };

  const titleStyle = {
    color: "#0579b2",
    textAlign: "center",
    marginBottom: 10,
    fontSize: "1.8rem",
    wordWrap: "break-word",
  };

  return (
    <div style={{ maxWidth: 400, margin: "30px auto 0", padding: 16, fontFamily: "Arial, sans-serif" }}>
      <h2 style={titleStyle}>Missões</h2>

      <div style={{ backgroundColor: "#58b7ff", color: "white", borderRadius: 16, padding: 20, textAlign: "center", marginBottom: 20 }}>
        <h3 style={{ fontSize: 18, marginBottom: 8 }}>Filme</h3>
        <p style={{ fontWeight: "bold", marginBottom: 8 }}>🏆 100 pontos</p>
        <p style={{ fontSize: 14 }}>
          Indique nas redes sociais um filme que faz você se sentir bem. Escreva o nome, explique brevemente o motivo e poste com carinho.
          Depois, envie um print da publicação aqui para validar sua missão.
        </p>
        <div style={{ textAlign: "left", backgroundColor: "#fff", color: "#0579b2", borderRadius: 12, padding: 12, marginTop: 16 }}>
          <p>📌 O que deve conter no print (ou nos prints)?</p>
          <ul style={{ paddingLeft: 20, fontSize: 14 }}>
            <li>Capa ou trecho mas contendo o nome do filme</li>
          </ul>
        </div>
      </div>

      <form onSubmit={handleSubmit} style={{ textAlign: "center" }}>
        <div style={{ border: "2px dashed #0579b2", borderRadius: 12, padding: 20, marginBottom: 16, backgroundColor: "#f0faff" }}>
          <label htmlFor="fileInput" style={{ display: "block", color: "#0579b2", fontWeight: "bold", fontSize: 14, marginBottom: 8 }}>
            Selecione as imagens da missão:
          </label>
          <input
            id="fileInput"
            type="file"
            accept="image/*"
            multiple
            onChange={handleFileChange}
            style={{ display: "none" }}
          />
          <button
            type="button"
            onClick={() => document.getElementById("fileInput").click()}
            style={{
              backgroundColor: "#0579b2",
              color: "white",
              border: "none",
              padding: "10px 20px",
              borderRadius: 20,
              cursor: "pointer",
              fontWeight: "bold",
              fontSize: 14,
            }}
          >
            Escolher Imagens
          </button>
          {imagens.length > 0 && (
            <p style={{ marginTop: 10, fontSize: 12, color: "#333" }}>
              {imagens.length} imagem(ns) selecionada(s)
            </p>
          )}
        </div>

        <button
          type="submit"
          disabled={enviando}
          style={{
            backgroundColor: "#0579b2",
            color: "white",
            padding: "12px 30px",
            borderRadius: 25,
            border: "none",
            fontWeight: "bold",
            fontSize: 16,
            cursor: "pointer",
          }}
        >
          {enviando ? "Enviando..." : "Enviar"}
        </button>
      </form>

      {statusMsg && (
        <p style={{ marginTop: 16, color: "red", textAlign: "center" }}>{statusMsg}</p>
      )}

      <button
        onClick={() => navigate(-1)}
        style={{
          marginTop: 24,
          backgroundColor: "transparent",
          border: "none",
          color: "#0579b2",
          textDecoration: "underline",
          cursor: "pointer",
          display: "block",
          marginLeft: "auto",
          marginRight: "auto",
        }}
      >
        Voltar
      </button>

      <LogoFixa />
    </div>
  );
};

export default MissaoFilme;
