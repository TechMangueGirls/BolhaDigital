import React, { useState, useEffect, useCallback } from "react";
import API_BASE_URL from "../api";
import { useUserAuth } from "../context/UserAuthContext";
import BottomNavigation from "./BottomNavigation";
import LogoutButton from "./LogoutBottom";
import LogoFixa from "./LogoFixa";

import { FaEdit, FaTrash, FaSave, FaTimes } from "react-icons/fa";

const offensiveWords = process.env.REACT_APP_OFFENSIVE_WORDS
  ? process.env.REACT_APP_OFFENSIVE_WORDS.split(",").map((w) => w.trim().toLowerCase())
  : [];

function Post() {
  const [content, setContent] = useState("");
  const [error, setError] = useState("");
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const { token, user } = useUserAuth();

  const [editingPostId, setEditingPostId] = useState(null);
  const [editingContent, setEditingContent] = useState("");

  const fetchPosts = useCallback(async () => {
    setLoading(true);
    try {
      const response = await fetch(`${API_BASE_URL}/posts`);
      const data = await response.json();
      if (response.ok && Array.isArray(data.posts)) {
        setPosts(data.posts);
      } else {
        setPosts([]);
      }
    } catch {
      setPosts([]);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchPosts();
  }, [fetchPosts]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!content.trim()) {
      setError("Digite algo para postar!");
      return;
    }

    const hasOffensive = offensiveWords.some((word) =>
      new RegExp(`\\b${word}\\b`, "i").test(content)
    );

    if (hasOffensive) {
      setError("Não é possível enviar: palavra ofensiva detectada!");
      return;
    }

    if (!token) {
      setError("Você precisa estar logado para postar.");
      return;
    }

    try {
      const response = await fetch(`${API_BASE_URL}/posts`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ content }),
      });

      const data = await response.json();

      if (!response.ok) {
        setError(data.msg || "Erro ao criar post");
        return;
      }

      setContent("");
      fetchPosts();
    } catch (error) {
      setError("Erro na requisição: " + error.message);
    }
  };

  const startEditing = (post) => {
    setEditingPostId(post._id);
    setEditingContent(post.content);
    setError("");
  };

  const cancelEditing = () => {
    setEditingPostId(null);
    setEditingContent("");
    setError("");
  };

  const saveEditing = async () => {
    if (!editingContent.trim()) {
      setError("Conteúdo não pode ficar vazio!");
      return;
    }

    const hasOffensive = offensiveWords.some((word) =>
      new RegExp(`\\b${word}\\b`, "i").test(editingContent)
    );

    if (hasOffensive) {
      setError("Não é possível enviar: palavra ofensiva detectada!");
      return;
    }

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

      if (!response.ok) {
        setError(data.msg || "Erro ao editar post");
        return;
      }

      setEditingPostId(null);
      setEditingContent("");
      fetchPosts();
    } catch (error) {
      setError("Erro na requisição: " + error.message);
    }
  };

  const handleDelete = async (postId) => {
    const confirmed = window.confirm(
      `Tem certeza que deseja apagar o post de @${user?.username || "usuário"}?`
    );
    if (!confirmed) return;

    try {
      const response = await fetch(`${API_BASE_URL}/posts/${postId}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await response.json();

      if (!response.ok) {
        setError(data.msg || "Erro ao apagar post");
        return;
      }

      fetchPosts();
    } catch (error) {
      setError("Erro na requisição: " + error.message);
    }
  };

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

  if (!token) {
    return <p style={{ textAlign: "center" }}>Você precisa estar logado para postar.</p>;
  }

  return (
    <>
      <LogoFixa />
      <LogoutButton />

      <div style={{ padding: "0", margin: "0", fontFamily: "Arial, sans-serif" }}>
        <div
          style={{
            padding: "16px",
            position: "sticky",
            top: 0,
            zIndex: 10,
            background: "transparent",
          }}
        >
          <h1
            style={{
              color: "#0579b2",
              fontSize: "1.8rem",
              marginBottom: "10px",
              textAlign: "center",
              wordWrap: "break-word",
            }}
          >
            Posts
          </h1>

          <form
            onSubmit={handleSubmit}
            style={{ display: "flex", gap: "8px", alignItems: "flex-start" }}
          >
            <textarea
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder="Compartilhe algo..."
              style={{
                flex: 1,
                padding: "10px",
                fontSize: "1rem",
                borderRadius: "10px",
                border: "1px solid #ccc",
                resize: "vertical",
                backgroundColor: "#fff",
              }}
            />
            <button
              type="submit"
              style={{
                backgroundColor: "#0579b2",
                color: "#fff",
                border: "none",
                borderRadius: "50%",
                width: "40px",
                height: "40px",
                fontSize: "1.5rem",
                fontWeight: "bold",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                cursor: "pointer",
                boxShadow: "0 4px 8px rgba(5, 121, 178, 0.4)",
              }}
            >
              +
            </button>
          </form>

          {error && (
            <p style={{ color: "red", fontSize: "0.9rem", marginTop: "8px" }}>{error}</p>
          )}
        </div>

        <div
          style={{
            maxHeight: "calc(100vh - 200px)",
            overflowY: "auto",
            padding: "16px",
            background: "transparent",
            scrollbarWidth: "none",
          }}
        >
          <style>
            {`
              ::-webkit-scrollbar {
                display: none;
              }
              .btn-icon {
                display: inline-flex;
                align-items: center;
                gap: 6px;
                border: none;
                background: none;
                cursor: pointer;
                font-size: 0.9rem;
                padding: 4px 8px;
                border-radius: 6px;
                transition: background-color 0.2s ease;
              }
              .btn-icon.edit {
                color: #0d6efd;
              }
              .btn-icon.edit:hover {
                background-color: #e7f1ff;
              }
              .btn-icon.delete {
                color: #dc3545;
              }
              .btn-icon.delete:hover {
                background-color: #f8d7da;
              }
              .btn-icon.save {
                color: #198754;
              }
              .btn-icon.save:hover {
                background-color: #d1e7dd;
              }
              .btn-icon.cancel {
                color: #6c757d;
              }
              .btn-icon.cancel:hover {
                background-color: #e2e3e5;
              }
            `}
          </style>

          {loading ? (
            <p style={{ textAlign: "center", marginTop: "20px" }}>Carregando postagens...</p>
          ) : posts.length > 0 ? (
            posts.map((post) => {
              const isAuthor = user && post.author && post.author._id === user._id;
              const isEditing = editingPostId === post._id;

              return (
                <div
                  key={post._id || post.id}
                  style={{
                    border: "1px solid #0579b2",
                    borderRadius: "12px",
                    padding: "16px",
                    backgroundColor: "#ffffff",
                    marginBottom: "12px",
                    boxShadow: "0 2px 6px rgba(0, 0, 0, 0.05)",
                  }}
                >
                  <strong style={{ color: "#0579b2", fontSize: "1rem" }}>
                    {post.author?.username ? "@" + post.author.username : "@usuário"}
                  </strong>

                  {isEditing ? (
                    <>
                      <textarea
                        value={editingContent}
                        onChange={(e) => setEditingContent(e.target.value)}
                        style={{
                          width: "100%",
                          minHeight: "80px",
                          marginTop: "8px",
                          fontSize: "1rem",
                          borderRadius: "8px",
                          border: "1px solid #ccc",
                          padding: "8px",
                        }}
                      />
                      <div style={{ marginTop: "8px" }}>
                        <button
                          onClick={saveEditing}
                          className="btn-icon save"
                          title="Salvar"
                          type="button"
                          style={{ marginRight: "8px" }}
                        >
                          <FaSave />
                          Salvar
                        </button>
                        <button
                          onClick={cancelEditing}
                          className="btn-icon cancel"
                          title="Cancelar"
                          type="button"
                        >
                          <FaTimes />
                          Cancelar
                        </button>
                      </div>
                    </>
                  ) : (
                    <p
                      style={{
                        fontSize: "0.95rem",
                        marginTop: "6px",
                        marginBottom: "8px",
                        color: "#0579b2",
                        whiteSpace: "pre-wrap",
                      }}
                    >
                      {post.content}
                    </p>
                  )}

                  <small style={{ fontSize: "0.75rem", color: "#999" }}>
                    {formatDateTime(post.createdAt)}
                  </small>

                  {!isEditing && isAuthor && (
                    <div style={{ marginTop: "8px" }}>
                      <button
                        onClick={() => startEditing(post)}
                        className="btn-icon edit"
                        title="Editar"
                        type="button"
                        style={{ marginRight: "8px" }}
                      >
                        <FaEdit />
                        Editar
                      </button>
                      <button
                        onClick={() => handleDelete(post._id)}
                        className="btn-icon delete"
                        title="Excluir"
                        type="button"
                      >
                        <FaTrash />
                        Excluir
                      </button>
                    </div>
                  )}
                </div>
              );
            })
          ) : (
            <p style={{ textAlign: "center", marginTop: "20px" }}>Nenhum post encontrado.</p>
          )}
        </div>
      </div>

      <BottomNavigation />
    </>
  );
}

export default Post;
