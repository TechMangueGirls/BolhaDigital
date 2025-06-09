import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Form, Alert, Button, Spinner } from "react-bootstrap";
import favicon from "../assets/favicon.png";
import { useUserAuth } from "../context/UserAuthContext";

const Login = () => {
  const [login, setLogin]   = useState("");
  const [password, setPassword] = useState("");
  const [error, setError]   = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);          
  const navigate = useNavigate();
  const { logIn } = useUserAuth();                        

  useEffect(() => {
    const originalBg = document.body.style.backgroundColor;
    document.body.style.backgroundColor = "#0579b2";
    return () => { document.body.style.backgroundColor = originalBg; };
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    setLoading(true);

    try {
      const res = await fetch(
        `${process.env.REACT_APP_BACKEND_URL}/auth/login`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          credentials: "include",
          body: JSON.stringify({ identifier: login, password }),
        }
      );

      const data = await res.json();

      if (res.ok && data.user && data.token) {
        logIn(data.user, data.token);

        setSuccess("Autenticação realizada com sucesso!");
        setTimeout(() => navigate("/home"), 800);
      } else {
        setError(data.msg || "Credenciais inválidas.");
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
          maxWidth: 400,
          margin: "80px auto 0 auto",
          backgroundColor: "white",
          borderRadius: 12,
          boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
        }}
      >
        <div className="text-center mb-3">
          <img src={favicon} alt="Bolha Digital" style={{ width: 130 }} />
        </div>

        {error   && <Alert variant="danger">{error}</Alert>}
        {success && <Alert variant="success">{success}</Alert>}

        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3">
            <Form.Control
              type="text"
              placeholder="Nome do usuário ou email"
              value={login}
              onChange={(e) => setLogin(e.target.value)}
              required
              disabled={loading}
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Control
              type="password"
              placeholder="Digite sua senha"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              disabled={loading}
            />
          </Form.Group>

          <div className="d-grid gap-2">
            <Button
              type="submit"
              className="custom-btn"
              style={{ backgroundColor: "#0579b2", border: "none" }}
              disabled={loading}
            >
              {loading ? <Spinner size="sm" /> : "Entrar"}
            </Button>
          </div>
        </Form>

        <div className="text-center mt-3" style={{ color: "#0579b2" }}>
          Não possui uma conta? <Link to="/signup">Cadastre-se</Link>
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

export default Login;
