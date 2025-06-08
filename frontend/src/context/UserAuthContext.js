import { createContext, useContext, useState, useEffect } from "react";

const UserAuthContext = createContext();

export function UserAuthContextProvider({ children }) {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadUser = async () => {
      setLoading(true);
      const localToken = localStorage.getItem("token");

      if (!localToken) {
        setLoading(false);
        return;
      }

      try {
        const res = await fetch(`${process.env.REACT_APP_BACKEND_URL}/user/me`, {
          method: "GET",
          headers: {
            Authorization: `Bearer ${localToken}`,
          },
        });

        const data = await res.json();

        if (res.ok && data.user) {
          setUser(data.user);
          setToken(localToken);
          localStorage.setItem("user", JSON.stringify(data.user));
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
      const res = await fetch(`${process.env.REACT_APP_BACKEND_URL}/auth/register`, {
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
    setToken(userToken);
  };

  const logOut = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    localStorage.removeItem("userId");
    setUser(null);
    setToken(null);
  };

  const resetPassword = async (email) => {
    alert("Instruções de recuperação de senha enviadas para o seu e-mail.");
  };

  const refreshUserData = async () => {
    const userId = localStorage.getItem("userId");
    if (!token || !userId) return;

    try {
      const res = await fetch(`${process.env.REACT_APP_BACKEND_URL}/api/recompensas/users/${userId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const data = await res.json();

      if (res.ok) {
        setUser(data);
        localStorage.setItem("user", JSON.stringify(data));
      } else {
        console.error("Erro ao buscar usuário atualizado:", data.message);
      }
    } catch (err) {
      console.error("Erro ao atualizar usuário:", err);
    }
  };

  return (
    <UserAuthContext.Provider
      value={{
        user,
        setUser,
        token,
        loading,
        error,
        signUp,
        logIn,
        logOut,
        resetPassword,
        refreshUserData,
      }}
    >
      {children}
    </UserAuthContext.Provider>
  );
}

export function useUserAuth() {
  return useContext(UserAuthContext);
}
