import { useEffect } from "react";
import Proyecto from "../components/Proyecto";
import useProyectos from "../hooks/useProyectos";

const Proyectos = () => {
  const { obtenerProyectos, proyectos } = useProyectos();

  useEffect(() => {
    obtenerProyectos()
  }, []);
  
  return (
    <div>
      <h1 className="text-4xl font-black">Proyectos</h1>
      <div className="bg-white shadow mt-10 rounded-lg p-5">
        {proyectos.length ? (
          proyectos.map((proyecto) => (
            <Proyecto key={proyecto._id} proyecto={proyecto} />
          ))
        ) : (
          <p className="text-center text-gray-600 uppercase p-5">
            No hay proyectos
          </p>
        )}
      </div>
    </div>
  );
};

export default Proyectos;
