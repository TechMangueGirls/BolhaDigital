import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Form, Alert } from "react-bootstrap";
import { Button } from "react-bootstrap";
import { useUserAuth } from "../context/UserAuthContext";
import favicon from "../assets/favicon.png";  // Importando o ícone

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const { logIn, resetPassword } = useUserAuth();  // Atualize a função de reset da senha
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      await logIn(email, password);
      navigate("/home");
    } catch (err) {
      setError(err.message);
    }
  };

  const handleResetPassword = async () => {
    setError("");
    try {
      await resetPassword(email);
      alert("Instruções de recuperação de senha foram enviadas para o seu e-mail.");
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <>
      <div className="p-4 box">
        <h2 className="mb-3">
        <img src={favicon} alt="Bolha Digital" className="icone" />
        </h2>

        {error && <Alert variant="danger">{error}</Alert>}

        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Control
              type="email"
              placeholder="Endereço de email"
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicPassword">
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

        <div className="mt-3">
          <Button variant="link" onClick={handleResetPassword}>
            Esqueceu sua senha?
          </Button>
        </div>

        <hr />

        <div className="text-center">
          Não possui uma conta? <Link to="/signup">Cadastre-se</Link>
        </div>
      </div>
    </>
  );
};

export default Login;
