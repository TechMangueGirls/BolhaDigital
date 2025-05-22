import React, { useState } from "react";
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
        localStorage.setItem("token", data.token);
        logIn(data.user, data.token); 
        setSuccess("Autenticação realizada com sucesso!");
        setTimeout(() => navigate("/home"), 1000); 
      } else {
        setError(data.msg || "Credenciais inválidas.");
      }
    } catch (err) {
      console.error("Erro ao conectar com o servidor:", err);
      setError("Erro ao conectar com o servidor.");
    }
  };

  return (
    <div className="p-4 box">
      <h2 className="mb-3">
        <img src={favicon} alt="Bolha Digital" className="icone" />
      </h2>
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
          <Button className="custom-btn" type="submit">
            Entrar
          </Button>
        </div>
      </Form>
      <div className="text-center mt-3">
        Não possui uma conta? <Link to="/signup">Cadastre-se</Link>
      </div>
    </div>
  );
};

export default Login;





