import { createContext, useContext, useState, useEffect } from "react";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    try { return JSON.parse(localStorage.getItem("aniverse_user") || "null"); }
    catch { return null; }
  });

  const [allUsers, setAllUsers] = useState(() => {
    try { return JSON.parse(localStorage.getItem("aniverse_users") || "{}"); }
    catch { return {}; }
  });

  useEffect(() => {
    localStorage.setItem("aniverse_users", JSON.stringify(allUsers));
  }, [allUsers]);

  useEffect(() => {
    if (user) localStorage.setItem("aniverse_user", JSON.stringify(user));
    else localStorage.removeItem("aniverse_user");
  }, [user]);

  const signup = (username, email, password) => {
    if (allUsers[email]) return { error: "Account already exists with this email." };
    const newUser = { username, email, avatar: username[0].toUpperCase(), joinedAt: new Date().toISOString() };
    setAllUsers(prev => ({ ...prev, [email]: { ...newUser, password } }));
    setUser(newUser);
    return { success: true };
  };

  const login = (email, password) => {
    const found = allUsers[email];
    if (!found) return { error: "No account found with this email." };
    if (found.password !== password) return { error: "Incorrect password." };
    const { password: _, ...safeUser } = found;
    setUser(safeUser);
    return { success: true };
  };

  const logout = () => setUser(null);

  const updateUser = (updates) => {
    setUser(prev => ({ ...prev, ...updates }));
    if (user?.email) {
      setAllUsers(prev => ({ ...prev, [user.email]: { ...prev[user.email], ...updates } }));
    }
  };

  return (
    <AuthContext.Provider value={{ user, login, signup, logout, updateUser }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() { return useContext(AuthContext); }
export default AuthContext;
