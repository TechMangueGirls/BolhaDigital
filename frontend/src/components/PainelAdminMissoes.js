import React, { useEffect, useState } from "react";
import { useUserAuth } from "../context/UserAuthContext";

function PainelAdminMissoes() {
  const { user, token } = useUserAuth();
  const [missoes, setMissoes] = useState([]);
  const [loading, setLoading] = useState(true);

  const API_URL = process.env.REACT_APP_API_URL;
  const ADMIN_EMAIL = process.env.REACT_APP_ADMIN_EMAIL || "admin@gmail.com";

  const isAdmin = user && (user.role === "admin" || user.email === ADMIN_EMAIL);

  useEffect(() => {
    if (!isAdmin) return;

    const fetchMissoesPendentes = async () => {
      try {
        const res = await fetch(`${API_URL}/api/missoes/pendentes`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        const data = await res.json();

        if (res.ok) {
          setMissoes(data);
        } else {
          console.error(data.msg || data.error);
        }
      } catch (error) {
        console.error("Erro ao buscar missões pendentes", error);
      } finally {
        setLoading(false);
      }
    };

    fetchMissoesPendentes();
  }, [isAdmin, token, API_URL]);

  const aprovarMissao = async (id) => {
    try {
      const res = await fetch(`${API_URL}/api/missoes/${id}/status`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ status: "aprovado" }),
      });

      const data = await res.json();

      if (res.ok) {
        alert("Missão aprovada com sucesso.");
        setMissoes(missoes.filter((m) => m._id !== id));
      } else {
        alert(data.msg || data.error);
      }
    } catch (error) {
      console.error("Erro ao aprovar missão", error);
    }
  };

  if (!isAdmin) {
    return <p>Acesso negado. Apenas administradores podem acessar.</p>;
  }

  if (loading) return <p>Carregando missões...</p>;

  return (
    <div>
      <h1>Painel de Administração de Missões</h1>

      {missoes.length === 0 ? (
        <p>Não há missões pendentes.</p>
      ) : (
        <ul>
          {missoes.map((missao) => (
            <li key={missao._id}>
              <p><strong>{missao.titulo}</strong></p>
              <p>Status: {missao.status}</p>
              <p>Data de envio: {new Date(missao.dataEnvio).toLocaleString()}</p>
              <p>Usuário ID: {missao.usuario._id}</p>
              <p>Imagem: {missao.imagem}</p>
              <button onClick={() => aprovarMissao(missao._id)}>Aprovar</button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default PainelAdminMissoes;
