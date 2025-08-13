import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Initialize from localStorage
  useEffect(() => {
    const user = localStorage.getItem('dailyPlannerUser');
    if (user) {
      setCurrentUser(JSON.parse(user));
    }
    setLoading(false);
  }, []);

  const signup = (email, password) => {
    const user = {
      uid: Date.now().toString(),
      email,
      createdAt: new Date().toISOString()
    };
    
    localStorage.setItem('dailyPlannerUser', JSON.stringify(user));
    setCurrentUser(user);
    return Promise.resolve(user);
  };

  const login = (email) => {
    const user = {
      uid: Date.now().toString(),
      email,
      createdAt: new Date().toISOString()
    };
    
    localStorage.setItem('dailyPlannerUser', JSON.stringify(user));
    setCurrentUser(user);
    return Promise.resolve(user);
  };

  const logout = () => {
    localStorage.removeItem('dailyPlannerUser');
    setCurrentUser(null);
    return Promise.resolve();
  };

  const value = {
    currentUser,
    signup,
    login,
    logout,
    loading
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
}