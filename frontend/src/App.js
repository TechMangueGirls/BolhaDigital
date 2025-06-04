import { Container, Row, Col } from "react-bootstrap";
import { Routes, Route } from "react-router-dom";
import "./App.css";

import Home from "./components/Home";
import Login from "./components/Login";
import Signup from "./components/Signup";
import ProtectedRoute from "./components/ProtectedRoute";
import { UserAuthContextProvider } from "./context/UserAuthContext";

import Missoes from "./components/Missoes";
import Post from "./components/Post";
import Likes from "./components/Likes";
import Perfil from "./components/Perfil";
import Welcome from "./components/Welcome";
import MissoesDiarias from "./components/MissoesDiarias";

// 📌 Importando a Missão do Dia
import MissaoDia from "./missoes/MissaoDia";

function App() {
  return (
    <UserAuthContextProvider>
      <Container style={{ width: "400px" }}>
        <Row>
          <Col>
            <Routes>
              {/* Tela Welcome na raiz */}
              <Route path="/" element={<Welcome />} />

              {/* Tela Login na rota /login */}
              <Route path="/login" element={<Login />} />

              {/* Tela de cadastro */}
              <Route path="/signup" element={<Signup />} />

              {/* Rotas protegidas */}
              <Route
                path="/home"
                element={
                  <ProtectedRoute>
                    <Home />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/missoes"
                element={
                  <ProtectedRoute>
                    <Missoes />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/missoesdiarias"
                element={
                  <ProtectedRoute>
                    <MissoesDiarias />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/post"
                element={
                  <ProtectedRoute>
                    <Post />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/likes"
                element={
                  <ProtectedRoute>
                    <Likes />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/perfil"
                element={
                  <ProtectedRoute>
                    <Perfil />
                  </ProtectedRoute>
                }
              />

              {/* Rota da Missão do Dia */}
              <Route
                path="/missao/dia"
                element={
                  <ProtectedRoute>
                    <MissaoDia />
                  </ProtectedRoute>
                }
              />
            </Routes>
          </Col>
        </Row>
      </Container>
    </UserAuthContextProvider>
  );
}

export default App;
