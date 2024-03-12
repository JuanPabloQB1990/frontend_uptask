import { Link, useParams } from "react-router-dom";
import useProyectos from "../hooks/useProyectos";
import { useEffect, useState } from "react";
import ModalFormularioTarea from "../components/ModalFormularioTarea";
import Tarea from "../components/Tarea";
import ModalEliminarTarea from "../components/ModalEliminarTarea";
import Alerta from "../components/Alerta";

const ProyectoView = () => {
  const { id } = useParams();

  const { obtenerProyecto, proyecto, cargando, handleModalTarea, alerta } = useProyectos();

  useEffect(() => {
    obtenerProyecto(id);
  }, []);

  const { msg } = alerta

  return cargando ? (
    "cargando..."
  ) : (
    <>
      <div className="flex justify-between">
        <h1 className="font-black text-4xl">{proyecto.nombre}</h1>
        <div className="flex items-center gap-2 text-gray-400 hover:text-black">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
            className="w-6 h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L6.832 19.82a4.5 4.5 0 0 1-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 0 1 1.13-1.897L16.863 4.487Zm0 0L19.5 7.125"
            />
          </svg>
          <Link
            className="uppercase font-bold"
            to={`/proyectos/proyecto/editar/${id}`}
          >
            Editar
          </Link>
        </div>
      </div>
      <button
      onClick={handleModalTarea}
        type="button"
        className="text-sm px-5 py-3 w-full md:w-auto rounded-lg uppercase font-bold bg-sky-400 mt-5 gap-2 flex items-center justify-center text-white text-center"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="currentColor"
          className="w-6 h-6"
        >
          <path
            fillRule="evenodd"
            d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25ZM12.75 9a.75.75 0 0 0-1.5 0v2.25H9a.75.75 0 0 0 0 1.5h2.25V15a.75.75 0 0 0 1.5 0v-2.25H15a.75.75 0 0 0 0-1.5h-2.25V9Z"
            clipRule="evenodd"
          />
        </svg>
        Nueva Tarea
      </button>
      <p className="font-bold text-xl mt-10">Tareas del Proyecto</p>
      {msg && <Alerta alerta={alerta}/>}
      <div className="bg-white shadow mt-10 rounded-lg">
        {proyecto.tareas?.length ? proyecto.tareas.map(tarea => (<Tarea key={tarea._id} tarea={tarea}/>)) : <p className="text-center my-5 p-10">No hay tareas</p>}
      </div>
      <ModalFormularioTarea />
      <ModalEliminarTarea/>
    </>
  );
};

export default ProyectoView;
