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

import MissaoDia from "./missoes/MissaoDia";
import PainelAdminMissoes from "./components/PainelAdminMissoes"; 

function App() {
  return (
    <UserAuthContextProvider>
      <Container style={{ width: "400px" }}>
        <Row>
          <Col>
            <Routes>
              {/* Tela Welcome na raiz */}
              <Route path="/" element={<Welcome />} />
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<Signup />} />

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

              <Route
                path="/missao/dia"
                element={
                  <ProtectedRoute>
                    <MissaoDia />
                  </ProtectedRoute>
                }
              />

              {/* ✅ Rota do Painel Admin Missões */}
              <Route
                path="/paineladminmissoes"
                element={
                  <ProtectedRoute>
                    <PainelAdminMissoes />
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
