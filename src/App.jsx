import { BrowserRouter, Route, Routes } from "react-router-dom";
import AuthLayout from "./layouts/AuthLayout";
import Login from "./pages/Login";
import Registrar from "./pages/Registrar";
import OlvidePassword from "./pages/OlvidePassword";
import NuevoPassword from "./pages/NuevoPassword";
import ConfirmarCuenta from "./pages/ConfirmarCuenta";
import AuthProvider from "./context/AuthProvider";
import Proyectos from "./pages/Proyectos";
import RutaProtegida from "./layouts/RutaProtegida";
import NuevoProyecto from "./pages/NuevoProyecto";
import ProyectoProvider from "./context/ProyectoProvider";
import ProyectoView from "./pages/ProyectoView";
import ProyectoEdit from "./pages/ProyectoEdit";
import NuevoColaborador from "./pages/NuevoColaborador";
function App() {
  console.log(import.meta.env.VITE_BACKEND_URL);
  return (
    <AuthProvider>
      <ProyectoProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<AuthLayout />}>
              <Route index element={<Login />} />
              <Route path="registrar" element={<Registrar />} />
              <Route path="olvide-password" element={<OlvidePassword />} />
              <Route
                path="olvide-password/:token"
                element={<NuevoPassword />}
              />
              <Route path="confirmar/:id" element={<ConfirmarCuenta />} />
            </Route>
            <Route path="/proyectos" element={<RutaProtegida />}>
              <Route index element={<Proyectos />} />
              <Route path="crear-proyecto" element={<NuevoProyecto />} />
              <Route path="proyecto/:id" element={<ProyectoView />} />
              <Route path="proyecto/editar/:id" element={<ProyectoEdit/>} />
              <Route path="nuevo-colaborador/:id" element={<NuevoColaborador/>} />
            </Route>
          </Routes>
        </BrowserRouter>
      </ProyectoProvider>
    </AuthProvider>
  );
}

export default App;
