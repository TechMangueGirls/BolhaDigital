import { createContext, useContext, useState, useEffect } from "react";

const UserAuthContext = createContext();

export function UserAuthContextProvider({ children }) {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const loadUser = async () => {
      const token = localStorage.getItem("token");

      if (!token) return;

      try {
        const res = await fetch("http://localhost:5000/user/me", {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const data = await res.json();
        if (res.ok && data.user) {
          setUser(data.user);
        } else {
          console.error("Erro ao carregar usuário:", data.msg || data.error);
          logOut();
        }
      } catch (error) {
        console.error("Erro ao conectar ao servidor:", error);
        logOut();
      }
    };

    loadUser();
  }, []);

  // ✅ Função signUp corrigida: envia dados para o backend
  const signUp = async (name, username, email, dob, password) => {
    try {
      const res = await fetch("http://localhost:5000/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name, username, email, dob, password }),
      });

      const data = await res.json();

      if (res.ok) {
        // Supondo que o backend retorna { user, token }
        logIn(data.user, data.token);
      } else {
        console.error("Erro no cadastro:", data.msg || data.error);
        alert(data.msg || data.error);
      }
    } catch (error) {
      console.error("Erro de conexão no cadastro:", error);
      alert("Erro de conexão ao tentar cadastrar.");
    }
  };

  const logIn = (userData, token) => {
    localStorage.setItem("user", JSON.stringify(userData));
    localStorage.setItem("token", token);
    localStorage.setItem("userId", userData._id);
    setUser(userData);
  };

  const logOut = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    localStorage.removeItem("userId");
    setUser(null);
  };

  const resetPassword = (email) => {
    alert("Instruções de recuperação de senha enviadas para o seu e-mail.");
  };

  return (
    <UserAuthContext.Provider
      value={{ user, signUp, logIn, logOut, resetPassword }}
    >
      {children}
    </UserAuthContext.Provider>
  );
}

export function useUserAuth() {
  return useContext(UserAuthContext);
}
