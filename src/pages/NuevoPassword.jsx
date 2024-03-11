import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom"
import Alerta from "../components/Alerta";
import clienteAxios from "../config/clienteAxios";

const NuevoPassword = () => {

  const [tokenValido, setTokenValido] = useState(false);
  const [alerta, setAlerta] = useState({});
  const [password, setPassword] = useState("");
  const [repetirPassword, setRepetirPassword] = useState("");

  const { token } = useParams()

  useEffect(() => {


    const comprobarToken = async() => {
      try {
        await clienteAxios(`/usuarios/olvide-password/${token}`)
        
        setTokenValido(true)
      } catch (error) {
        
        setAlerta({
          msg: error.response.data.msg,
          error: true,
        });
      }
    }
    
    comprobarToken()
  }, []);

  const { msg } = alerta;

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (password === "") {
      setAlerta({
        msg: "la password es obligatoria",
        error: true,
      });
      return;
    }

    if (password !== repetirPassword) {
      setAlerta({
        msg: "los password no son iguales",
        error: true,
      });
      return;
    }

    if (password.length < 6) {
      setAlerta({
        msg: "la password debe ser minimo 6 caracteres",
        error: true,
      });
      return;
    }

    setAlerta({});

    try {
      const { data } = await clienteAxios.post(`/usuarios/olvide-password/${token}`, { password })
      
      setAlerta({
        msg: data.msg,
        error: false,
      });

      setPassword("");
      setRepetirPassword("");

    } catch (error) {

      setAlerta({
        msg: error.response.data.msg,
        error: true,
      });
    }
  }

  return (
    <div>
        <h1 className="text-sky-600 font-black text-6xl capitalize">Reestablece tu <span className="text-slate-700">Password</span></h1>
        {msg && <Alerta alerta={alerta} />}
        {tokenValido && (
          <form onSubmit={handleSubmit} className="my-10 bg-white shadow rounded-lg p-10">
          
          <div className="my-5">
            <label htmlFor="password" className="uppercase text-gray-600 block text-xl font-bold">Password</label>
            <input value={password} onChange={e => setPassword(e.target.value)} type="password" name="password" id="password" className="w-full mt-3 p-3 border rounded-xl bg-gray-50" placeholder="Escribe tu nuevo password"/>
          </div>
          <div className="my-5">
            <label htmlFor="password2" className="uppercase text-gray-600 block text-xl font-bold">Repetir Password</label>
            <input value={repetirPassword} onChange={e => setRepetirPassword(e.target.value)} type="password" name="password2" id="password2" className="w-full mt-3 p-3 border rounded-xl bg-gray-50" placeholder="Repite tu password"/>
          </div>
          <input type="submit" value="Cambiar password" className="bg-sky-700 w-full py-3 mb-5 text-white uppercase font-bold rounded hover:cursor-pointer hover:bg-sky-800 transition-colors"/>
        </form>
        )}
        
        <nav className="lg:flex lg:justify-between">
          <Link className="block text-center my-5 text-slate-500 uppercase text-sm" to="/">Ya tienes cuenta? Inicia Sesion</Link>
          <Link className="block text-center my-5 text-slate-500 uppercase text-sm" to="/registrar">No tienes cuenta? Registrate</Link>
        </nav>
    </div>
  )
}

export default NuevoPassword
