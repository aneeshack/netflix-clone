import  { createContext, useContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '../firebase'; // Ensure to import your firebase config

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setIsAuthenticated(true);
        navigate('/', { replace: true }); // Redirect to home if authenticated
      } else {
        setIsAuthenticated(false);
        navigate('/login', { replace: true }); // Redirect to login if not authenticated
      }
    });

    return () => unsubscribe(); // Cleanup listener on unmount
  }, [navigate]);

  const login = () => setIsAuthenticated(true);
  
  const logout = () => {
    setIsAuthenticated(false);
    localStorage.removeItem('authToken'); // Clear any stored tokens
    navigate('/login', { replace: true }); // Redirect to login
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
