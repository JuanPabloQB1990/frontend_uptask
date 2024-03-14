import { createContext, useState } from "react";
import clienteAxios from "../config/clienteAxios";

export const ProyectosContext = createContext();

const ProyectoProvider = ({ children }) => {
  const [proyectos, setProyectos] = useState([]);
  const [proyecto, setProyecto] = useState({});
  const [colaborador, setColaborador] = useState({});
  const [alerta, setAlerta] = useState({});
  const [cargando, setCargando] = useState(false);
  const [cargandoColaborador, setCargandoColaborador] = useState(false);
  const [modalFormularioTarea, setModalFormularioTarea] = useState(false);
  const [modalEliminarTarea, setModalEliminarTarea] = useState(false);
  const [tarea, setTarea] = useState({});
  const [modalEliminarColaborador, setModalEliminarColaborador] = useState(false);

  const obtenerProyectos = async () => {
    console.log("obteniendo proyectos");
    try {
      const token = localStorage.getItem("token");

      if (!token) return;

      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      };

      const { data } = await clienteAxios("/proyectos", config);
      setProyectos(data);
    } catch (error) {
      console.log(error);
    }
  };

  const mostrarAlerta = (alerta) => {
    setAlerta(alerta);

    setTimeout(() => {
      setAlerta({});
    }, 5000);
  };

  const submitProyecto = async (proyecto) => {
    setAlerta({})

    if (proyecto.id) {
      await editarProyecto(proyecto);
    } else {
      await nuevoProyecto(proyecto);
    }
  };

  const nuevoProyecto = async (proyecto) => {
    
    try {
      const token = localStorage.getItem("token");

      if (!token) return;

      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      };

      const { data } = await clienteAxios.post("/proyectos", proyecto, config);
      setProyectos([...proyectos, data]);

      setAlerta({
        msg: "Proyecto creado",
        error: false,
      });

      setTimeout(() => {
        setAlerta({});
      }, 3000);
    } catch (error) {
      console.log(error);
    }
  };

  const editarProyecto = async (proyecto) => {
    
    try {
      const token = localStorage.getItem("token");

      if (!token) return;

      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      };

      const { data } = await clienteAxios.put(
        `/proyectos/${proyecto.id}`,
        proyecto,
        config
      );

      const proyectosActualizados = proyectos.map((proyectoState) =>
        proyectoState._id === data._id ? data : proyectoState
      );
      setProyectos(proyectosActualizados);

      setAlerta({
        msg: "Proyecto Editado",
        error: false,
      });

      setTimeout(() => {
        setAlerta({});
      }, 3000);
    } catch (error) {
      console.log(error);
    }
  };

  const obtenerProyecto = async (id) => {
    setCargando(true);
    setAlerta({})
    const token = localStorage.getItem("token");

    if (!token) return;

    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    };

    try {
      const { data } = await clienteAxios(`/proyectos/${id}`, config);
      setProyecto(data);

    } catch (error) {
      setAlerta({
        msg: error.response.data.msg,
        error: true,
      })


      
    } finally {
      setCargando(false);
    }
  };

  const eliminarProyecto = async (id) => {
    const token = localStorage.getItem("token");

    if (!token) return;

    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    };

    try {
      const { data } = await clienteAxios.delete(`/proyectos/${id}`, config);

      const proyectosActualizados = proyectos.filter(
        (proyectoState) => proyectoState._id !== id
      );

      setProyectos(proyectosActualizados);

      setAlerta({
        msg: data.msg,
        error: false,
      });

      setTimeout(() => {
        setAlerta({});
      }, 3000);
    } catch (error) {
      console.log(error);
    }
  };

  const handleModalTarea = () => {
    setModalFormularioTarea(!modalFormularioTarea);
    setTarea({});
  };

  const submitTarea = async (tarea) => {
    if (tarea.id) {
      await editarTarea(tarea);
    } else {
      await crearTarea(tarea);
    }
  };

  const crearTarea = async (tarea) => {
    try {
      const token = localStorage.getItem("token");

      if (!token) return;

      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      };

      const { data } = await clienteAxios.post("/tareas", tarea, config);
      
      // agregamos tarea al proyecto en el state
      const proyectoAtualizado = { ...proyecto };
      proyectoAtualizado.tareas = [...proyecto.tareas, data];
      setProyecto(proyectoAtualizado);
      
      setAlerta({
        msg: "Tarea creada",
        error: false,
      });

      setTimeout(() => {
        setAlerta({});
        setModalFormularioTarea(!modalFormularioTarea);
      }, 2000);
    } catch (error) {
      console.log(error);
    }
  };

  const editarTarea = async (tarea) => {
    try {
      const token = localStorage.getItem("token");

      if (!token) return;

      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      };

      const { data } = await clienteAxios.put(
        `/tareas/${tarea.id}`,
        tarea,
        config
      );
      console.log(data);

      // actualizamos tarea al proyecto en el state
      const proyectoActualizado = { ...proyecto };
      proyectoActualizado.tareas = proyectoActualizado.tareas.map(
        (tareaState) => (tareaState._id === data._id ? data : tareaState)
      );

      setProyecto(proyectoActualizado);

      setAlerta({
        msg: "Tarea Editada",
        error: false,
      });

      setTimeout(() => {
        setAlerta({});
        setModalFormularioTarea(!modalFormularioTarea);
      }, 2000);
    } catch (error) {
      console.log(error);
    }
  };

  const handleModalEditarTarea = (tarea) => {
    setTarea(tarea);
    setModalFormularioTarea(!modalFormularioTarea);
  };

  const handleModalEliminarTarea = (tarea) => {
    setTarea(tarea);
    setModalEliminarTarea(!modalEliminarTarea);
  };

  const eliminarTarea = async () => {
    try {
      const token = localStorage.getItem("token");

      if (!token) return;

      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      };

      const { data } = await clienteAxios.delete(
        `/tareas/${tarea._id}`,
        config
      );

      setModalEliminarTarea(!modalEliminarTarea);

      // actualizamos tarea al proyecto en el state
      const proyectoActualizado = { ...proyecto };
      proyectoActualizado.tareas = proyectoActualizado.tareas.filter(
        (tareaState) => tareaState._id !== tareaState._id
      );
      setProyecto(proyectoActualizado);

      setAlerta({
        msg: data.msg,
        error: false,
      });

      setTimeout(() => {
        setAlerta({});
      }, 3000);
    } catch (error) {
      console.log(error);
    }
  };

  const submitColaborador = async email => {
    
    setCargandoColaborador(true)
    setColaborador({});
    try {
      const token = localStorage.getItem("token");

      if (!token) return;

      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      };

      const { data } = await clienteAxios.post("/proyectos/colaboradores", {email}, config)
      setColaborador(data);
      setAlerta({})

    } catch (error) {

      setAlerta({
        msg: error.response.data.msg,
        error: true,
      });

    }

    setCargandoColaborador(false)
  }

  const agregarColaborador = async email => {
  
    try {
      const token = localStorage.getItem("token");

      if (!token) return;

      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      };

      const { data } = await clienteAxios.post(`/proyectos/colaboradores/${proyecto._id}`, {email}, config)
      
      setAlerta({
        msg: data.msg,
        error: false,
      });

      setColaborador({})

      setTimeout(() => {
        setAlerta({})
      }, 2000);

    } catch (error) {
      
      setAlerta({
        msg: error.response.data.msg,
        error: true,
      });

    }

  }
  
  const handleModalEliminarColaborador = colaborador => {
    setModalEliminarColaborador(!modalEliminarColaborador)
    setColaborador(colaborador)
  }
  
const eliminarColaborador = async() => {
  
  try {
    const token = localStorage.getItem("token");

      if (!token) return;

      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      };

      const { data } = await clienteAxios.post(`/proyectos/eliminar-colaborador/${proyecto._id}`, {id: colaborador._id}, config)
      
      const proyectoActualizado = {...proyecto}

      proyectoActualizado.colaboradores = proyectoActualizado.colaboradores.filter(
        (colaboradorState) => colaboradorState._id !== colaborador._id
      );

      setProyecto(proyectoActualizado)

      setAlerta({
        msg: data.msg,
        error: false,
      });

      setColaborador({})
      setModalEliminarColaborador(!modalEliminarColaborador)

      setTimeout(() => {
        setAlerta({})
      }, 2000);
  } catch (error) {
    console.log(error);
  }
}

const completarTarea = async id => {
  
  try {
    const token = localStorage.getItem("token");

    if (!token) return;

    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    };

    const { data } = await clienteAxios.post(`/tareas/estado/${id}`, {id}, config)

    const proyectoActualizado = {...proyecto}

    proyectoActualizado.tareas = proyectoActualizado.tareas.map(
      (tareaState) => (tareaState._id === data._id? data : tareaState)
    );
    
    setProyecto(proyectoActualizado)
    setTarea({})
    setAlerta({})

  } catch (error) {
    console.log(error);
  }
}


  return (
    <ProyectosContext.Provider
      value={{
        proyectos,
        mostrarAlerta,
        alerta,
        submitProyecto,
        obtenerProyecto,
        proyecto,
        cargando,
        eliminarProyecto,
        handleModalTarea,
        modalFormularioTarea,
        submitTarea,
        handleModalEditarTarea,
        tarea,
        handleModalEliminarTarea,
        modalEliminarTarea,
        eliminarTarea,
        obtenerProyectos,
        submitColaborador,
        colaborador,
        agregarColaborador,
        cargandoColaborador,
        handleModalEliminarColaborador,
        eliminarColaborador,
        modalEliminarColaborador,
        completarTarea
      }}
    >
      {children}
    </ProyectosContext.Provider>
  );
};

export default ProyectoProvider;
