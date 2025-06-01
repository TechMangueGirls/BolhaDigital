import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Form, Alert, Button } from "react-bootstrap";
import favicon from "../assets/favicon.png";
import { useUserAuth } from "../context/UserAuthContext";

const Login = () => {
  const [login, setLogin] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const navigate = useNavigate();
  const { logIn } = useUserAuth();

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
    setSuccess("");

    try {
      const res = await fetch(`${process.env.REACT_APP_BACKEND_URL}/auth/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          identifier: login,
          password,
        }),
      });

      const data = await res.json();

      if (res.ok && data.user) {
        logIn(data.user, data.token);
        setSuccess("Autenticação realizada com sucesso!");
        setTimeout(() => navigate("/home"), 1000);
      } else {
        setError(data.msg || "Credenciais inválidas.");
      }
    } catch (err) {
      setError("Erro ao conectar com o servidor.");
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
        {success && <Alert variant="success">{success}</Alert>}
        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3">
            <Form.Control
              type="text"
              placeholder="Nome do usuário ou email"
              onChange={(e) => setLogin(e.target.value)}
              required
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Control
              type="password"
              placeholder="Digite sua senha"
              onChange={(e) => setPassword(e.target.value)}
              required
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
            >
              Entrar
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
          <a
            href="https://github.com/luanabernardo/Bolha-Digital"
            target="_blank"
            rel="noopener noreferrer"
            style={{ color: "white", textDecoration: "underline" }}
          >
            TechMangueGirls
          </a>
        </p>
      </footer>
    </>
  );
};

export default Login;


