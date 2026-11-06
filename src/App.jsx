import {BrowserRouter as Router, Routes, Route} from "react-router-dom";
import NavbarC from "./componentes/navbar/NavbarC";
import Pagina_Principal from "./paginas/Pagina_Principal";
import Sobre_Nosotros from "./paginas/Sobre_Nosotros";
import Contacto from "./paginas/Contacto";
import Iniciar_Sesion from "./paginas/Iniciar_Sesion";
import Crear_Cuenta from "./paginas/Crear_Cuenta";
import Carrito from "./paginas/Carrito";
import { useEffect } from "react";
import Aos from "aos";

const App = () => {
  useEffect(() => {
    Aos.init({
      duration: 800,
      once: true
    })
  }, [])
  return (
    <div className="contenedor">
      <Router>
        <NavbarC/>
        <div className="contenido">
          <Routes>
            <Route path="/" element={<Pagina_Principal/>}/>
            <Route path="/Sobre_Nosotros" element={<Sobre_Nosotros/>}/>
            <Route path="/Contacto" element={<Contacto/>}/>
            <Route path="/Iniciar_Sesion" element={<Iniciar_Sesion/>}/>
            <Route path="/Crear_Cuenta" element={<Crear_Cuenta/>}/>
            <Route path="/Carrito" element={<Carrito/>}/>
          </Routes>
        </div>
      </Router>
    </div>
  )
}

export default App