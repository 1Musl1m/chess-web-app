import './App.css'
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import { Landing } from './screens/Landing';
import { Game } from './screens/Game';
import { Login } from './screens/Login';
import { onAuthStateChanged, User } from "firebase/auth";
import { auth } from "../firebase.config";
import { useEffect, useState } from "react";

function App() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
      setLoading(false);
    });
    return unsubscribe; 
  }, []);

  const ProtectedRoute = ({ children }: { children: JSX.Element }) => {
    if (loading) return <div>Загрузка...</div>;
    return user ? children : <Navigate to="/login" replace />;
  };

  return (
    <div className='h-screen bg-slate-950'>
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<Login />} />

          <Route 
            path="/" 
            element={
              <ProtectedRoute>
                <Landing />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/game" 
            element={
              <ProtectedRoute>
                <Game />
              </ProtectedRoute>
            } 
          />

          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App;