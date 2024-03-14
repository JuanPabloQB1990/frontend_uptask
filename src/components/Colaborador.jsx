import useProyectos from "../hooks/useProyectos"

const Colaborador = ({colaborador}) => {
    const { name, email } = colaborador

    const { handleModalEliminarColaborador } = useProyectos()

  return (
    <div className="border-b p-5 flex justify-between items-center">
      <div>
        <p>{name}</p>
        <p className="text-gray-700 text-sm">{email}</p>
      </div>
      <div>
        <button onClick={() => handleModalEliminarColaborador(colaborador)} className="bg-red-600 px-4 py-3 text-white uppercase font-bold text-sm rounded-lg">Eliminar</button>
      </div>
    </div>
  )
}

export default Colaborador
