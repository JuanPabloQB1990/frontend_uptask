import { createContext, useEffect, useState } from "react";
import clienteAxios from "../config/clienteAxios";
import { useNavigate } from "react-router-dom";

export const AuthContext = createContext();

const AuthProvider = ({ children }) => {

  const [auth, setAuth] = useState({});
  const [cargando, setCargando] = useState(true);

  

  useEffect(() => {
    
    const autenticarUsuario = async() => {

      const token = localStorage.getItem('token')

      if (!token) {
        setCargando(false)
        return
      }

      const config = {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        }
      }

      try {
        const { data } = await clienteAxios('/usuarios/perfil', config)
        setAuth(data);
        
      } catch (error) {
        console.log(error);
        setAuth({});
      }

      setCargando(false)
    }

    autenticarUsuario()
    
  }, []);

  return <AuthContext.Provider value={{ auth, cargando }}>{children}</AuthContext.Provider>;
};

export default AuthProvider;
