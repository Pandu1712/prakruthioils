import React, { createContext, useContext, useEffect, useState } from 'react';

interface AdminAuthContextType {
  isAdmin: boolean;
  loading: boolean;
  signInAdmin: (token: string) => void;
  signOut: () => void;
}

const AdminAuthContext = createContext<AdminAuthContextType>({
  isAdmin: false,
  loading: true,
  signInAdmin: () => {},
  signOut: () => {},
});

export const AdminAuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isAdmin, setIsAdmin] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check local storage for admin token
    const token = localStorage.getItem('admin_session');
    if (token === 'valid_session_active') {
      setIsAdmin(true);
    }
    setLoading(false);
  }, []);

  const signInAdmin = (token: string) => {
    // Basic verification just to ensure session holds
    if (token) {
      localStorage.setItem('admin_session', 'valid_session_active');
      setIsAdmin(true);
    }
  };

  const signOut = () => {
    localStorage.removeItem('admin_session');
    setIsAdmin(false);
  };

  return (
    <AdminAuthContext.Provider value={{ isAdmin, loading, signInAdmin, signOut }}>
      {children}
    </AdminAuthContext.Provider>
  );
};

export const useAdminAuth = () => useContext(AdminAuthContext);
