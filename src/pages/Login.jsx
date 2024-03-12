import { useState } from "react";
import { Link, useNavigate } from "react-router-dom"
import Alerta from "../components/Alerta";
import useAuth from "../hooks/useAuth";

function Login() {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate()

  const { loginUser, alerta, mostrarAlerta } = useAuth()

  const handleSubmit = async(e) => {
    e.preventDefault()

    if ([email, password].includes("")) {
      mostrarAlerta({
        msg: "los campos son obligatorios",
        error: true,
      });
      return;
    }

    await loginUser({email, password})
    
    navigate("/proyectos")
    
    setEmail("");
    setPassword("");

  }
  
  const { msg } = alerta;

  return (
    <div>
        <h1 className="text-sky-600 font-black text-6xl capitalize">Inicia sesion y administra tus <span className="text-slate-700">proyectos</span></h1>
        {msg && <Alerta alerta={alerta} />}
        <form onSubmit={handleSubmit} className="my-10 bg-white shadow rounded-lg p-10">
          <div className="my-5">
            <label htmlFor="email" className="uppercase text-gray-600 block text-xl font-bold">Email</label>
            <input value={email} onChange={e => setEmail(e.target.value) } type="email" name="email" id="email" className="w-full mt-3 p-3 border rounded-xl bg-gray-50" placeholder="Email de registro"/>
          </div>
          <div className="my-5">
            <label htmlFor="password" className="uppercase text-gray-600 block text-xl font-bold">Email</label>
            <input value={password} onChange={e => setPassword(e.target.value)}  type="password" name="password" id="password" className="w-full mt-3 p-3 border rounded-xl bg-gray-50" placeholder="password de registro"/>
          </div>
          <input type="submit" value="Iniciar Sesion" className="bg-sky-700 w-full py-3 mb-5 text-white uppercase font-bold rounded hover:cursor-pointer hover:bg-sky-800 transition-colors"/>
        </form>
        <nav className="lg:flex lg:justify-between">
          <Link className="block text-center my-5 text-slate-500 uppercase text-sm" to="/registrar">No tienes cuenta? Registrate</Link>
          <Link className="block text-center my-5 text-slate-500 uppercase text-sm" to="/olvide-password">Olvide mi password</Link>
        </nav>
    </div>
  )
}

export default Login
