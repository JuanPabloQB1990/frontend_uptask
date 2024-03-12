import { useEffect } from "react";
import useProyectos from "../hooks/useProyectos";
import { useNavigate, useParams } from "react-router-dom";
import FormularioProyecto from "../components/FormularioProyecto";

const ProyectoEdit = () => {

  const { id } = useParams();
  const navigate = useNavigate()

  const { obtenerProyecto, proyecto, cargando, eliminarProyecto } = useProyectos();



  useEffect(() => {
    obtenerProyecto(id);
  }, []);

  if (cargando) return "Cargando...";

  const handleDelete = async() => {
    if (confirm("Deseas eliminar este proyecto?")) {
      await eliminarProyecto(id)

      setTimeout(() => {
        navigate("/proyectos")
        
      }, 4000);
    }
  }
  

  return (
    <div>
      <div className="flex justify-between">
        <h1 className="text-4xl font-black">
          Editar Proyecto: {proyecto.nombre}
        </h1>
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
              d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"
            />
          </svg>

          <button onClick={handleDelete} className="uppercase font-bold">Eliminar</button>
        </div>
      </div>
      <div className="mt-10 flex justify-center">
        <FormularioProyecto />
      </div>
    </div>
  );
};

export default ProyectoEdit;
