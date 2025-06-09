import React, { useEffect, useState, useCallback } from "react";
import { useUserAuth } from "../context/UserAuthContext";
import BottomNavigation from "./BottomNavigation";
import LogoutButton from "./LogoutBottom";
import LogoFixa from "./LogoFixa";
import API_BASE_URL from "../api";
import { FaEdit, FaTrash, FaSave, FaTimes } from "react-icons/fa";

const Perfil = () => {
  const { user, refreshUserData, token } = useUserAuth();

  const [posts, setPosts] = useState([]);
  const [editingPostId, setEditingPostId] = useState(null);
  const [editingContent, setEditingContent] = useState("");
  const [error, setError] = useState("");
  const [showAvatarOptions, setShowAvatarOptions] = useState(false);
  const [recompensasObtidas, setRecompensasObtidas] = useState([]);
  const [loadingAvatarId, setLoadingAvatarId] = useState(null);

  const fetchUserPosts = useCallback(async () => {
    if (!user?._id) return;
    try {
      const response = await fetch(`${API_BASE_URL}/posts`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await response.json();
      if (response.ok && Array.isArray(data.posts)) {
        const userPosts = data.posts.filter(post => post.author?._id === user._id);
        setPosts(userPosts);
      } else {
        setPosts([]);
      }
    } catch {
      setPosts([]);
    }
  }, [user, token]);

  const fetchRecompensasObtidas = useCallback(async () => {
    if (!user?._id) return;
    try {
      const response = await fetch(`${API_BASE_URL}/api/recompensas/${user._id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await response.json();
      if (response.ok) {
        setRecompensasObtidas(data.obtidas || []);
      } else {
        console.error("Erro na resposta recompensas:", data.message || data);
      }
    } catch (err) {
      console.error("Erro ao buscar recompensas:", err);
    }
  }, [user, token]);

  useEffect(() => {
    if (user?._id) {
      refreshUserData();
      fetchUserPosts();
      fetchRecompensasObtidas();
    }
  }, [user, refreshUserData, fetchUserPosts, fetchRecompensasObtidas]);

  const formatDateTime = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleString("pt-BR", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const startEditing = (post) => {
    setEditingPostId(post._id);
    setEditingContent(post.content);
  };

  const cancelEditing = () => {
    setEditingPostId(null);
    setEditingContent("");
    setError("");
  };

  const saveEditing = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/posts/${editingPostId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ content: editingContent }),
      });
      const data = await response.json();
      if (response.ok) {
        cancelEditing();
        fetchUserPosts();
      } else {
        setError(data.msg || "Erro ao salvar");
      }
    } catch (err) {
      setError("Erro: " + err.message);
    }
  };

  const deletePost = async (postId) => {
    if (!window.confirm("Tem certeza que deseja excluir o post?")) return;
    try {
      const response = await fetch(`${API_BASE_URL}/posts/${postId}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      });
      if (response.ok) fetchUserPosts();
    } catch (err) {
      setError("Erro: " + err.message);
    }
  };

  const handleAvatarClick = () => {
    setShowAvatarOptions(prev => !prev);
  };

  const handleAvatarSelect = async (titulo) => {
    setLoadingAvatarId(titulo);
    try {
      const response = await fetch(`${API_BASE_URL}/api/recompensas/avatar/${user._id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ titulo }),
      });
      if (response.ok) {
        await refreshUserData();
        setShowAvatarOptions(false);
      } else {
        const errorData = await response.json();
        alert("Erro ao mudar avatar: " + (errorData.message || "Erro desconhecido"));
      }
    } catch (err) {
      alert("Erro ao mudar avatar: " + err.message);
    }
    setLoadingAvatarId(null);
  };

  const normalizeIconUrl = (iconUrl, titulo) => {
    if (!iconUrl) return `/assets/img/${titulo.toLowerCase()}.png`;
    if (iconUrl.startsWith("/")) return iconUrl;
    return `/assets/img/${titulo.toLowerCase()}.png`;
  };

  if (!user) return <div>Carregando...</div>;

  const avatar =
    user.avatarSelecionado?.iconUrl ? (
      <img
        src={normalizeIconUrl(user.avatarSelecionado.iconUrl, user.avatarSelecionado.titulo)}
        alt="Avatar"
        style={{ width: 80, height: 80, borderRadius: "50%" }}
      />
    ) : (
      <span style={{ fontSize: 32, color: "#fff", fontWeight: "bold" }}>
        {user.name?.charAt(0)?.toUpperCase() || "?"}
      </span>
    );

  return (
    <div className="perfil-container" style={{ paddingBottom: 70 }}>
      <LogoFixa />
      <header style={{ textAlign: "center", margin: "20px 0" }}>
        <h2 style={{ color: "#0579b2" }}>Perfil</h2>
      </header>

      <div style={{ display: "flex", justifyContent: "center", position: "relative", marginBottom: 16 }}>
        <div
          onClick={handleAvatarClick}
          style={{
            width: 80,
            height: 80,
            borderRadius: "50%",
            backgroundColor: "#8a2be2",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: 32,
            color: "#fff",
            fontWeight: "bold",
            cursor: "pointer",
            overflow: "hidden",
          }}
        >
          {avatar}
        </div>

        {showAvatarOptions && (
          <div
            style={{
              position: "absolute",
              top: 90,
              backgroundColor: "#fff",
              border: "1px solid #ccc",
              borderRadius: 8,
              padding: 10,
              display: "flex",
              gap: 10,
              flexWrap: "wrap",
              zIndex: 10,
              maxWidth: 300,
              boxShadow: "0 2px 6px rgba(0,0,0,0.2)",
            }}
          >
            {recompensasObtidas.map((r) => (
              <button
                key={r.titulo}
                onClick={() => handleAvatarSelect(r.titulo)}
                disabled={loadingAvatarId !== null}
                style={{
                  width: 40,
                  height: 40,
                  padding: 0,
                  background: "none",
                  border: "none",
                  cursor: loadingAvatarId === null ? "pointer" : "default",
                  borderRadius: "50%",
                  overflow: "hidden",
                }}
                title={r.titulo}
              >
                {loadingAvatarId === r.titulo ? (
                  <div className="spinner" />
                ) : (
                  <img
                    src={normalizeIconUrl(r.iconUrl, r.titulo)}
                    alt={r.titulo}
                    style={{ width: 40, height: 40, objectFit: "contain" }}
                  />
                )}
              </button>
            ))}
          </div>
        )}
      </div>

      <div style={{ textAlign: "center", marginBottom: 20 }}>
        <p><strong>Nome:</strong> {user.name}</p>
        <p><strong>Usuário:</strong> @{user.username}</p>
        <p><strong>Bubbles:</strong> {user.pontos ?? 0} 🫧</p>
      </div>

      <div style={{ padding: "0 16px" }}>
        <h3 style={{ color: "#0579b2", textAlign: "center", marginBottom: 10 }}>Minhas Postagens</h3>
        <div style={{ maxHeight: "45vh", overflowY: "auto", paddingRight: 8 }}>
          {posts.length === 0 ? (
            <p style={{ textAlign: "center", color: "#666" }}>Você ainda não postou nada.</p>
          ) : (
            posts.map((post) => (
              <div
                key={post._id}
                style={{
                  border: "1px solid #0579b2",
                  borderRadius: 10,
                  padding: 8,
                  marginBottom: 8,
                  backgroundColor: "#f0f8ff",
                  position: "relative",
                }}
              >
                <div style={{ fontSize: 12, color: "#555", marginBottom: 4 }}>
                  {formatDateTime(post.createdAt)}
                </div>

                {editingPostId === post._id ? (
                  <textarea
                    value={editingContent}
                    onChange={(e) => setEditingContent(e.target.value)}
                    rows={3}
                    style={{ width: "100%", borderRadius: 6, padding: 6, fontSize: 14 }}
                  />
                ) : (
                  <p style={{ whiteSpace: "pre-wrap", margin: 0 }}>{post.content}</p>
                )}

                <div
                  style={{
                    position: "absolute",
                    top: 8,
                    right: 8,
                    display: "flex",
                    gap: 8,
                    fontSize: 14,
                    color: "#0579b2",
                    cursor: "pointer",
                  }}
                >
                  {editingPostId === post._id ? (
                    <>
                      <FaSave onClick={saveEditing} title="Salvar" />
                      <FaTimes onClick={cancelEditing} title="Cancelar" />
                    </>
                  ) : (
                    <>
                      <FaEdit onClick={() => startEditing(post)} title="Editar" />
                      <FaTrash onClick={() => deletePost(post._id)} title="Excluir" />
                    </>
                  )}
                </div>
                {error && editingPostId === post._id && (
                  <div style={{ color: "red", marginTop: 4 }}>{error}</div>
                )}
              </div>
            ))
          )}
        </div>
      </div>

      <LogoutButton />
      <BottomNavigation />
    </div>
  );
};

export default Perfil;