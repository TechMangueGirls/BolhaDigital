import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Form, Alert, Button, Spinner } from "react-bootstrap";
import favicon from "../assets/favicon.png";
import API_BASE_URL from "../api";

const Signup = () => {
  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [dob, setDob] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const originalBg = document.body.style.backgroundColor;
    document.body.style.backgroundColor = "#0579b2";
    return () => {
      document.body.style.backgroundColor = originalBg;
    };
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (password !== confirmPassword) {
      setError("As senhas não coincidem.");
      return;
    }

    setLoading(true);

    try {
      const res = await fetch(`${API_BASE_URL}/auth/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name,
          username,
          email,
          dob,
          password,
          confirmpassword: confirmPassword,
        }),
      });

      const data = await res.json();

      if (res.ok) {
        navigate("/");
      } else {
        setError(data.msg || "Erro ao cadastrar.");
      }
    } catch (err) {
      setError("Erro ao conectar com o servidor.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div
        className="p-4 box"
        style={{
          maxWidth: "400px",
          margin: "80px auto 0 auto",
          backgroundColor: "white",
          borderRadius: "12px",
          boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
        }}
      >
        <div className="text-center mb-3">
          <img
            src={favicon}
            alt="Bolha Digital"
            style={{ width: "130px", display: "block", margin: "0 auto" }}
          />
        </div>
        {error && <Alert variant="danger">{error}</Alert>}
        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3">
            <Form.Control
              type="text"
              placeholder="Nome e Sobrenome"
              onChange={(e) => setName(e.target.value)}
              value={name}
              required
              disabled={loading}
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Control
              type="text"
              placeholder="Nome de Usuário"
              onChange={(e) => setUsername(e.target.value)}
              value={username}
              required
              disabled={loading}
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Control
              type="email"
              placeholder="Email"
              onChange={(e) => setEmail(e.target.value)}
              value={email}
              required
              disabled={loading}
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Control
              type="date"
              onChange={(e) => setDob(e.target.value)}
              value={dob}
              required
              disabled={loading}
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Control
              type="password"
              placeholder="Senha"
              onChange={(e) => setPassword(e.target.value)}
              value={password}
              required
              disabled={loading}
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Control
              type="password"
              placeholder="Confirmar Senha"
              onChange={(e) => setConfirmPassword(e.target.value)}
              value={confirmPassword}
              required
              disabled={loading}
            />
          </Form.Group>
          <div className="d-grid gap-2">
            <Button
              className="custom-btn"
              type="submit"
              style={{
                backgroundColor: "#0579b2",
                border: "none",
                fontWeight: "bold",
              }}
              disabled={loading}
            >
              {loading ? <Spinner size="sm" /> : "Cadastrar"}
            </Button>
          </div>
        </Form>
        <div className="text-center mt-3" style={{ color: "#0579b2" }}>
          Já tem uma conta? <Link to="/">Faça login</Link>
        </div>
      </div>

      <footer
        className="text-center mt-5 mb-3"
        style={{ color: "white", fontSize: "0.9rem" }}
      >
        © {new Date().getFullYear()} Bolha Digital. Todos os direitos reservados.
<p>
  Criado por{" "}
  <button
    onClick={() => navigate("/sobrenos")}
    style={{
      background: "none",
      border: "none",
      color: "white",
      textDecoration: "underline",
      cursor: "pointer",
      padding: 0,
      font: "inherit",
    }}
  >
    TechMangueGirls
  </button>
</p>
      </footer>
    </>
  );
};

export default Signup;
