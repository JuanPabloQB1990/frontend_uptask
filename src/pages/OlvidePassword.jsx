import { useState } from "react";
import { Link } from "react-router-dom"
import Alerta from "../components/Alerta";
import clienteAxios from "../config/clienteAxios";

const OlvidePassword = () => {
  const [email, setEmail] = useState("");
  const [alerta, setAlerta] = useState({});

  const handleSubmit = async(e) => {
    e.preventDefault()

    setAlerta({})

    if (email === "") {
      setAlerta({
        msg: "el email es obligatorio",
        error: true,
      });
      return;
    }

    try {
      const { data } = await clienteAxios.post(`/usuarios/olvide-password`, { email })
      
      setAlerta({
        msg: data.msg,
        error: false,
      });

      setEmail("")
    } catch (error) {
      
      setAlerta({
        msg: error.response.data.msg,
        error: true,
      });
    }

  }

  const { msg } = alerta;

  return (
    <div>
        <h1 className="text-sky-600 font-black text-6xl capitalize">Recupera tu <span className="text-slate-700">Cuenta</span></h1>
        {msg && <Alerta alerta={alerta} />}
        <form onSubmit={handleSubmit} className="my-10 bg-white shadow rounded-lg p-10">
          <div className="my-5">
            <label htmlFor="email" className="uppercase text-gray-600 block text-xl font-bold">Email</label>
            <input value={email} onChange={e => setEmail(e.target.value)} type="email" id="email" className="w-full mt-3 p-3 border rounded-xl bg-gray-50" placeholder="Email de registro"/>
          </div>
          <input type="submit" value="Enviar email" className="bg-sky-700 w-full py-3 mb-5 text-white uppercase font-bold rounded hover:cursor-pointer hover:bg-sky-800 transition-colors"/>
        </form>
        <nav className="lg:flex lg:justify-between">
          <Link className="block text-center my-5 text-slate-500 uppercase text-sm" to="/registrar">No tienes cuenta? Registrate</Link>
          <Link className="block text-center my-5 text-slate-500 uppercase text-sm" to="/">Ya tienes cuenta? Inicia Sesion</Link>
        </nav>
    </div>
  )
}

export default OlvidePassword
