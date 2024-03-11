import { useState } from "react";
import { Link } from "react-router-dom";
import Alerta from "../components/Alerta";
import clienteAxios from "../config/clienteAxios";

const Registrar = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [repetirPassword, setRepetirPassword] = useState("");
  const [alerta, setAlerta] = useState({});

  const handleSubmit = async (e) => {
    e.preventDefault();

    if ([name, email, password, repetirPassword].includes("")) {
      setAlerta({
        msg: "los campos son obligatorios",
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
        msg: "los password debe ser minimo 6 caracteres",
        error: true,
      });
      return;
    }

    setAlerta({});

    try {
      const { data } = await clienteAxios.post(`/usuarios`, {
        name,
        password,
        email,
      });
      
      setAlerta({
        msg: data.msg,
        error: false,
      });

      setName("");
      setEmail("");
      setPassword("");
      setRepetirPassword("");
      
    } catch (error) {
      console.log(error.response);
      setAlerta({
        msg: error.response.data.msg,
        error: true,
      });
    }

    
  };

  const { msg } = alerta;

  return (
    <div>
      <h1 className="text-sky-600 font-black text-6xl capitalize">
        Crea tu Cuenta y administra tus{" "}
        <span className="text-slate-700">proyectos</span>
      </h1>
      {msg && <Alerta alerta={alerta} />}
      <form
        onSubmit={handleSubmit}
        className="my-10 bg-white shadow rounded-lg p-10"
      >
        <div className="my-5">
          <label
            htmlFor="name"
            className="uppercase text-gray-600 block text-xl font-bold"
          >
            Nombre
          </label>
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            type="text"
            name="name"
            id="name"
            className="w-full mt-3 p-3 border rounded-xl bg-gray-50"
            placeholder="Nombre de registro"
          />
        </div>
        <div className="my-5">
          <label
            htmlFor="email"
            className="uppercase text-gray-600 block text-xl font-bold"
          >
            Email
          </label>
          <input
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            type="email"
            name="email"
            id="email"
            className="w-full mt-3 p-3 border rounded-xl bg-gray-50"
            placeholder="Email de registro"
          />
        </div>
        <div className="my-5">
          <label
            htmlFor="password"
            className="uppercase text-gray-600 block text-xl font-bold"
          >
            Password
          </label>
          <input
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            type="password"
            name="password"
            id="password"
            className="w-full mt-3 p-3 border rounded-xl bg-gray-50"
            placeholder="password de registro"
          />
        </div>
        <div className="my-5">
          <label
            htmlFor="password2"
            className="uppercase text-gray-600 block text-xl font-bold"
          >
            Repetir Password
          </label>
          <input
            value={repetirPassword}
            onChange={(e) => setRepetirPassword(e.target.value)}
            type="password"
            name="password2"
            id="password2"
            className="w-full mt-3 p-3 border rounded-xl bg-gray-50"
            placeholder="Repite tu password"
          />
        </div>
        <input
          type="submit"
          value="Crear cuenta"
          className="bg-sky-700 w-full py-3 mb-5 text-white uppercase font-bold rounded hover:cursor-pointer hover:bg-sky-800 transition-colors"
        />
      </form>
      <nav className="lg:flex lg:justify-between">
        <Link
          className="block text-center my-5 text-slate-500 uppercase text-sm"
          to="/"
        >
          Ya tienes cuenta? Inicia Sesion
        </Link>
        <Link
          className="block text-center my-5 text-slate-500 uppercase text-sm"
          to="/olvide-password"
        >
          Olvide mi password
        </Link>
      </nav>
    </div>
  );
};

export default Registrar;
