import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Form, Alert, Button } from "react-bootstrap";
import favicon from "../assets/favicon.png";

const Signup = () => {
  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [dob, setDob] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (password !== confirmPassword) {
      setError("As senhas não coincidem.");
      return;
    }

    try {
      const res = await fetch("http://localhost:5000/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          name,
          username,
          email,
          dob,
          password,
          confirmpassword: confirmPassword
        })
      });

      const data = await res.json();

      if (res.ok) {
        navigate("/");
      } else {
        setError(data.msg || "Erro ao cadastrar.");
      }
    } catch (err) {
      setError("Erro ao conectar com o servidor.");
    }
  };

  return (
    <div className="p-4 box">
      <h2 className="mb-3">
        <img src={favicon} alt="Bolha Digital" className="icone" />
      </h2>
      {error && <Alert variant="danger">{error}</Alert>}
      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3">
          <Form.Control
            type="text"
            placeholder="Nome Completo"
            onChange={(e) => setName(e.target.value)}
            required
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Control
            type="text"
            placeholder="Nome de Usuário"
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Control
            type="email"
            placeholder="Email"
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Control
            type="date"
            onChange={(e) => setDob(e.target.value)}
            required
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Control
            type="password"
            placeholder="Senha"
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Control
            type="password"
            placeholder="Confirmar Senha"
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />
        </Form.Group>
        <div className="d-grid gap-2">
          <Button className="custom-btn" type="submit">
            Cadastrar
          </Button>
        </div>
      </Form>
      <div className="text-center mt-3">
        Já tem uma conta? <Link to="/">Faça login</Link>
      </div>
    </div>
  );
};

export default Signup;
