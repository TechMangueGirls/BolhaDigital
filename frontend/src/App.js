import { Container, Row, Col } from "react-bootstrap";
import { Routes, Route } from "react-router-dom";
import "./App.css";

/* Páginas & componentes */
import Home from "./components/Home";
import Login from "./components/Login";
import Signup from "./components/Signup";
import ProtectedRoute from "./components/ProtectedRoute";
import { UserAuthContextProvider } from "./context/UserAuthContext";

import Post from "./components/Post";
import Likes from "./components/Likes";
import Perfil from "./components/Perfil";
import Welcome from "./components/Welcome";
import MissoesDiarias from "./components/MissoesDiarias";
import Recompensas from "./components/Recompensas";
import SobreNos from "./components/SobreNos";       
import "./components/Sobre.css";                    

/* Missões */
import MissaoDia from "./missoes/MissaoDia";
import MissaoArte from "./missoes/MissaoArte";
import MissaoMusica from "./missoes/MissaoMusica";
import MissaoFilme from "./missoes/MissaoFilme";
import ValidarMissoes from "./components/ValidarMissoes";

function App() {
  return (
    <UserAuthContextProvider>
      <Container style={{ width: "100%" }}>
        <Row>
          <Col>
            <Routes>
      
              <Route path="/" element={<Welcome />} />
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<Signup />} />
              <Route path="/sobrenos" element={<SobreNos />} />  
        
              <Route
                path="/home"
              element={
                  <ProtectedRoute>
                    <Home />
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
                path="/recompensas"
                element={
                  <ProtectedRoute>
                    <Recompensas />
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
              <Route
                path="/missao/arte"
                element={
                  <ProtectedRoute>
                    <MissaoArte />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/missao/musica"
                element={
                  <ProtectedRoute>
                    <MissaoMusica />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/missao/filme"
                element={
                  <ProtectedRoute>
                    <MissaoFilme />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/validar-missoes"
                element={
                  <ProtectedRoute>
                    <ValidarMissoes />
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
