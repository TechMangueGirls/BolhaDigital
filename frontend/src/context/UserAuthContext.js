import { createContext, useContext, useState, useEffect } from "react";

const UserAuthContext = createContext();

export function UserAuthContextProvider({ children }) {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);  // <-- guardar token aqui
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadUser = async () => {
      setLoading(true);
      const localToken = localStorage.getItem("token");
      const localUser = localStorage.getItem("user");

      if (!localToken || !localUser) {
        setLoading(false);
        return;
      }

      try {
        const res = await fetch("http://localhost:5000/user/me", {
          method: "GET",
          headers: {
            Authorization: `Bearer ${localToken}`,
          },
        });

        const data = await res.json();

        if (res.ok && data.user) {
          setUser(data.user);
          setToken(localToken);  // <-- setar token no estado
        } else {
          logOut();
          setError(data.msg || data.error);
        }
      } catch (error) {
        logOut();
        setError("Erro ao conectar com o servidor");
      } finally {
        setLoading(false);
      }
    };

    loadUser();
  }, []);

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
        logIn(data.user, data.token);
      } else {
        alert(data.msg || data.error);
        throw new Error(data.msg || data.error);
      }
    } catch (error) {
      alert("Erro ao cadastrar: " + error.message);
    }
  };

  const logIn = (userData, userToken) => {
    localStorage.setItem("user", JSON.stringify(userData));
    localStorage.setItem("token", userToken);
    localStorage.setItem("userId", userData._id);
    setUser(userData);
    setToken(userToken);  // <-- setar token no estado
  };

  const logOut = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    localStorage.removeItem("userId");
    setUser(null);
    setToken(null);  // <-- limpar token no estado
  };

  const resetPassword = (email) => {
    alert("Instruções de recuperação de senha enviadas para o seu e-mail.");
  };

  return (
    <UserAuthContext.Provider
      value={{ user, token, loading, error, signUp, logIn, logOut, resetPassword }}
    >
      {children}
    </UserAuthContext.Provider>
  );
}

export function useUserAuth() {
  return useContext(UserAuthContext);
}
