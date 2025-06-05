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

  const fetchUserPosts = useCallback(async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/posts`);
      const data = await response.json();
      if (response.ok && Array.isArray(data.posts)) {
        const userPosts = data.posts.filter(
          (post) => post.author?._id === user?._id
        );
        setPosts(userPosts);
      }
    } catch {
      setPosts([]);
    }
  }, [user]);

  useEffect(() => {
    refreshUserData();
    fetchUserPosts();
  }, [refreshUserData, fetchUserPosts]);

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
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (response.ok) fetchUserPosts();
    } catch (err) {
      setError("Erro: " + err.message);
    }
  };

  if (!user) return <div>Carregando...</div>;

  const initial = user.name?.charAt(0)?.toUpperCase() || "?";

  return (
    <div className="perfil-container" style={{ paddingBottom: "70px", fontFamily: "Arial, sans-serif" }}>
      <LogoFixa />
      <header style={{ textAlign: "center", margin: "20px 0" }}>
        <h2 style={{ color: "#0579b2" }}>Perfil</h2>
      </header>

      <div style={{ display: "flex", justifyContent: "center", marginBottom: "16px" }}>
        <div
          style={{
            width: "80px",
            height: "80px",
            borderRadius: "50%",
            backgroundColor: "#8a2be2",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: "32px",
            color: "#fff",
            fontWeight: "bold",
          }}
        >
          {initial}
        </div>
      </div>

      <div style={{ textAlign: "center", marginBottom: "20px", color: "#333" }}>
        <p><strong>Nome:</strong> {user.name}</p>
        <p><strong>Usuário:</strong> @{user.username}</p>
        <p><strong>Bubbles:</strong> {user.pontos ?? 0} 🫧</p>
      </div>

      <div style={{ padding: "0 16px" }}>
        <h3 style={{ color: "#0579b2", marginBottom: "10px", textAlign: "center" }}>Minhas Postagens</h3>

        <div
          style={{
            maxHeight: "45vh",
            overflowY: "auto",
            paddingRight: "8px",
          }}
        >
          <style>
            {`
              ::-webkit-scrollbar {
                width: 6px;
              }
              ::-webkit-scrollbar-thumb {
                background-color: #ccc;
                border-radius: 4px;
              }
            `}
          </style>

          {posts.length === 0 ? (
            <p style={{ textAlign: "center", color: "#666" }}>Você ainda não postou nada.</p>
          ) : (
            posts.map((post) => (
              <div
                key={post._id}
                style={{
                  border: "1px solid #0579b2",
                  borderRadius: "12px",
                  padding: "12px",
                  marginBottom: "12px",
                  backgroundColor: "#fff",
                  position: "relative",
                }}
              >
                {editingPostId === post._id ? (
                  <>
                    <textarea
                      value={editingContent}
                      onChange={(e) => setEditingContent(e.target.value)}
                      style={{
                        width: "100%",
                        minHeight: "60px",
                        borderRadius: "8px",
                        padding: "8px",
                        fontSize: "14px",
                      }}
                    />
                    <div style={{ display: "flex", justifyContent: "flex-end", gap: "8px", marginTop: "8px" }}>
                      <button onClick={saveEditing} style={iconBtnStyle}><FaSave /></button>
                      <button onClick={cancelEditing} style={iconBtnStyle}><FaTimes /></button>
                    </div>
                  </>
                ) : (
                  <>
                    <p style={{ color: "#0579b2", fontSize: "15px" }}>{post.content}</p>
                    <small style={{ color: "#888" }}>{formatDateTime(post.createdAt)}</small>
                    <div style={{ display: "flex", justifyContent: "flex-end", gap: "8px", marginTop: "8px" }}>
                      <button onClick={() => startEditing(post)} style={iconBtnStyle}><FaEdit /></button>
                      <button onClick={() => deletePost(post._id)} style={iconBtnStyle}><FaTrash /></button>
                    </div>
                  </>
                )}
              </div>
            ))
          )}
        </div>
      </div>

      {error && <p style={{ color: "red", textAlign: "center" }}>{error}</p>}

      <footer style={{ marginTop: "20px", textAlign: "center" }}>
        <LogoutButton />
        <BottomNavigation />
      </footer>
    </div>
  );
};

const iconBtnStyle = {
  backgroundColor: "transparent",
  border: "none",
  color: "#0579b2",
  fontSize: "18px",
  cursor: "pointer",
};

export default Perfil;
