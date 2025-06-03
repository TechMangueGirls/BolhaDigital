import React, { useState, useEffect, useCallback } from "react";
import API_BASE_URL from "../api";
import { useUserAuth } from "../context/UserAuthContext";
import BottomNavigation from "./BottomNavigation";
import LogoutButton from "./LogoutBottom";
import LogoFixa from "./LogoFixa";

// Palavras ofensivas do .env
const offensiveWords = process.env.REACT_APP_OFFENSIVE_WORDS
  ? process.env.REACT_APP_OFFENSIVE_WORDS.split(",").map((w) => w.trim().toLowerCase())
  : [];

function Post() {
  const [content, setContent] = useState("");
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const [isSuccess, setIsSuccess] = useState(false);
  const [createdPost, setCreatedPost] = useState(null);
  const [posts, setPosts] = useState([]);
  const { token } = useUserAuth();

  const containerStyle = {
    minHeight: "100vh",
    display: "flex",
    flexDirection: "column",
    backgroundColor: "#fff",
    padding: "20px",
    boxSizing: "border-box",
    maxWidth: "600px",
    margin: "0 auto",
    fontFamily: "Arial, sans-serif",
    position: "relative",
    paddingBottom: "80px", // espaço para BottomNavigation
  };

  const titleStyle = {
    color: "#0778b1",
    fontSize: "1.8rem",
    marginBottom: "20px",
    textAlign: "center",
  };

  const formWrapperStyle = {
    position: "relative",
    marginBottom: "30px",
  };

  const textareaStyle = {
    width: "100%",
    minHeight: "120px",
    padding: "16px",
    fontSize: "1.1rem",
    borderRadius: "16px",
    border: "1.8px solid #ddd",
    boxSizing: "border-box",
    resize: "vertical",
    fontFamily: "inherit",
    boxShadow: "0 2px 6px rgba(0,0,0,0.05)",
    transition: "border-color 0.3s ease, box-shadow 0.3s ease",
    outline: "none",
    backgroundColor: "transparent",  // fundo transparente
    color: "#222",
  };

  const buttonStyle = {
  backgroundColor: "#0579b2",
  color: "white",
  border: "none",
  borderRadius: "50%",
  width: "40px",
  height: "40px",
  fontSize: "1.8rem",
  fontWeight: "900",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  boxShadow: "0px 4px 10px rgba(5, 121, 178, 0.5)",
  cursor: "pointer",
  position: "absolute",
  top: "-20px",
  right: "4px",
  userSelect: "none",
  lineHeight: 1,
};

  const messageStyle = {
    marginTop: "10px",
    textAlign: "center",
  };

  const postsWrapperStyle = {
    flexGrow: 1,
    overflowY: "auto",
    paddingTop: "10px",
  };

  const postContainerStyle = {
    border: "1px solid #e0e0e0",
    padding: "15px",
    borderRadius: "12px",
    marginBottom: "15px",
    backgroundColor: "#f9f9f9",
  };

  const usernameStyle = {
    fontWeight: "bold",
    color: "#0579b2",
    fontSize: "1.1rem",
  };

  const postContentStyle = {
    marginTop: "8px",
    whiteSpace: "pre-wrap",
    fontSize: "0.95rem",
    color: "#333",
  };

  const dateStyle = {
    marginTop: "8px",
    fontSize: "0.8rem",
    color: "#999",
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

  const fetchPosts = useCallback(async () => {
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
    }
  }, []);

  useEffect(() => {
    fetchPosts();
  }, [fetchPosts]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    setError("");
    setMessage("");
    setIsSuccess(false);

    if (!content.trim()) {
      setError("Digite algo para postar!");
      return;
    }

    const lowerContent = content.toLowerCase();
    const hasOffensive = offensiveWords.some((word) =>
      lowerContent.includes(word)
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

      setMessage("Post criado com sucesso!");
      setIsSuccess(true);
      setCreatedPost(data.post);
      setContent("");
      fetchPosts();
    } catch (error) {
      setError("Erro na requisição: " + error.message);
    }
  };

  if (!token) {
    return <p style={{ textAlign: "center" }}>Você precisa estar logado para postar.</p>;
  }

  return (
    <>
      <LogoFixa />
      <LogoutButton />
      <div style={containerStyle}>
        <h1 style={titleStyle}>Posts</h1>

        <div style={formWrapperStyle}>
          <form onSubmit={handleSubmit}>
            <textarea
              style={textareaStyle}
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder="Compartilhe algo..."
            />
            <button type="submit" style={buttonStyle}>+</button>

            {error && <p style={{ ...messageStyle, color: "red" }}>{error}</p>}
            {isSuccess && message && (
              <p style={{ ...messageStyle, color: "green" }}>{message}</p>
            )}

            {isSuccess && createdPost && (
              <div
                style={{
                  ...postContainerStyle,
                  borderColor: "green",
                  backgroundColor: "#e6ffe6",
                }}
              >
                <strong style={usernameStyle}>
                  {createdPost.author?.username
                    ? "@" + createdPost.author.username
                    : "@você"}
                </strong>
                <p style={postContentStyle}>{createdPost.content}</p>
                <small style={dateStyle}>
                  {formatDateTime(createdPost.createdAt)}
                </small>
              </div>
            )}
          </form>
        </div>

        <div style={postsWrapperStyle}>
          {posts.length > 0 ? (
            posts.map((post) => (
              <div key={post._id || post.id} style={postContainerStyle}>
                <strong style={usernameStyle}>
                  {post.author?.username
                    ? "@" + post.author.username
                    : "@usuário"}
                </strong>
                <p style={postContentStyle}>{post.content}</p>
                <small style={dateStyle}>{formatDateTime(post.createdAt)}</small>
              </div>
            ))
          ) : (
            <p style={{ textAlign: "center" }}>Nenhum post encontrado.</p>
          )}
        </div>
      </div>
      <BottomNavigation />
    </>
  );
}

export default Post;















