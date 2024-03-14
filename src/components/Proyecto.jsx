import { Link } from "react-router-dom";
import useAuth from "../hooks/useAuth";


const Proyecto = ({ proyecto }) => {
  
  const { _id, nombre, cliente, creador } = proyecto;
  const { auth } = useAuth()
  
  return (
    <div className="border-b p-5 rounded-lg flex justify-between">
      <div className="flex items-center gap-2">
        <p className="flex-1 font-bold">
          {nombre}{" "}
          <span className="text-sm text-gray-400 uppercase">
            {""}
            {cliente}
          </span>
        </p>
        {creador !== auth._id && <p className="p-1 text-xs rounded-lg text-white bg-green-500 font-bold uppercase">Colaborador</p>}

      </div>
      <Link
        className="text-gray-600 hover:text-gray-800 uppercase text-sm font-bold"
        to={`/proyectos/proyecto/${_id}`}
      >
        Ver Proyecto
      </Link>
    </div>
  );
};

export default Proyecto;
