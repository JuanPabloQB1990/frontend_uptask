import FormularioProyecto from "../components/FormularioProyecto"

const NuevoProyecto = () => {
  return (
    <div>
      <h1 className="text-4xl font-black">Nuevo Proyectos</h1>
        <div className="mt-10 flex justify-center">
            <FormularioProyecto/>
        </div>
    </div>
  )
}

export default NuevoProyecto
