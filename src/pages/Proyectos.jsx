import { Suspense, lazy, useEffect } from "react";
import useProyectos from "../hooks/useProyectos";
import Spinner from "../components/Spinner";
import Alerta from "../components/Alerta";

const Proyecto = lazy(() => import("../components/Proyecto"));

const Proyectos = () => {
  const { obtenerProyectos, proyectos, cargando } = useProyectos();

  useEffect(() => {
    obtenerProyectos();
  }, []);

  if (cargando) return <Spinner />;

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
