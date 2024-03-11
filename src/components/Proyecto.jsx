import { Link } from "react-router-dom";

const Proyecto = ({ proyecto }) => {
  const { _id, nombre, cliente, creador } = proyecto;

  return (
    <div className="border-b p-5 rounded-lg flex">
      <p className="flex-1 font-bold">
        {nombre}{" "}
        <span className="text-sm text-gray-400 uppercase">
          {""}
          {cliente}
        </span>
      </p>

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
