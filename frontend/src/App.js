import { Container, Row, Col } from "react-bootstrap";
import { Routes, Route } from "react-router-dom";
import "./App.css";
import Home from "./components/Home";
import Login from "./components/Login";
import Signup from "./components/Signup";
import ProtectedRoute from "./components/ProtectedRoute";
import { UserAuthContextProvider } from "./context/UserAuthContext";
import Missoes from "./components/Missoes";
import Votacao from "./components/Votacao";

function App() {
  return (
    <UserAuthContextProvider>
      <Container style={{ width: "400px" }}>
        <Row>
          <Col>
            <Routes>
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
                path="/votacao"
                element={
                  <ProtectedRoute>
                    <Votacao />
                  </ProtectedRoute>
                }
              />
              <Route path="/" element={<Login />} />
              <Route path="/signup" element={<Signup />} />
            </Routes>
          </Col>
        </Row>
      </Container>
    </UserAuthContextProvider>
  );
}

export default App;


