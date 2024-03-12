import { createContext, useEffect, useState } from "react";
import clienteAxios from "../config/clienteAxios";

export const AuthContext = createContext();

const AuthProvider = ({ children }) => {

  const [auth, setAuth] = useState({});
  const [cargando, setCargando] = useState(true);
  const [alerta, setAlerta] = useState({});

  const mostrarAlerta = alerta => {
    setAlerta(alerta);

    setTimeout(() => {
      setAlerta({});
    }, 5000);
  }
  

  useEffect(() => {
    console.log("autenticando");
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

  const loginUser = async(user) => {
    console.log(user);
    try {
      setAlerta({});
      
      const { data } = await clienteAxios.post('/usuarios/login', { 
        email: user.email,
        password: user.password
      })
      
      setAuth(data)
      localStorage.setItem('token', data.token)
      
    } catch (error) {
      
      setAlerta({
        msg: error.response.data.msg,
        error: true,
      });
    }
  }
  

  return <AuthContext.Provider value={{ auth, cargando, loginUser, alerta, mostrarAlerta }}>{children}</AuthContext.Provider>;
};

export default AuthProvider;
