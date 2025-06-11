'use client';

import { createContext, useContext, useState, ReactNode, useEffect } from 'react';

type User = {
  _id: string;
  name: string;
  email: string;
  // Add other user properties as needed
} | null;

interface AuthContextType {
  user: User;
  setUser: (user: User) => void;
  fetchUser: () => Promise<void>;
  loading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User>(null);
  const [loading, setLoading] = useState(true);

  const fetchUser = async () => {
    try {
      const response = await fetch('/api/get-user', {
        method: 'GET',
        credentials: 'include', // Equivalent to axios' withCredentials
      });

      if (response.ok) {
        const data = await response.json();
        setUser(data.user || null);
      } else {
        setUser(null);
      }
    } catch (error) {
      console.error("Error fetching user:", error);
      setUser(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUser();
  }, []);

  const value = {
    user,
    setUser,
    fetchUser,
    loading,
    setLoading
  };

  return (
    <AuthContext.Provider value={value}>
      {loading ? (
        <p className="flex justify-center items-center">Loading...</p>
      ) : (
        children
      )}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};