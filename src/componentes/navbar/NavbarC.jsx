import { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import Container from "react-bootstrap/Container";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import NavDropdown from "react-bootstrap/NavDropdown";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Swal from "sweetalert2";
import "./Navbar.css";

const NavbarC = () => {
  const token = sessionStorage.getItem("token")
  const rol = sessionStorage.getItem("rol")
  const usuario = sessionStorage.getItem("usuario")

  const navigate = useNavigate();

  const [mostrarBuscador, setMostrarBuscador] = useState(false)
  const [busqueda, setBusqueda] = useState("")

  const cantidadCarrito = 0;

  const cerrarSesion = async () => {
    await Swal.fire({
      title: `¡Hasta pronto, ${usuario || "Usuario"}! 👋`,
      text: "Esperamos verte nuevamente muy pronto.",
      icon: "success",
      showConfirmButton: false,
      timer: 1500
    })

    sessionStorage.clear();
    navigate("/")
  }

  const buscarProducto = (e) => {
    e.preventDefault();

    if (!busqueda.trim()) return;

    navigate(`/Categorias?busqueda=${encodeURIComponent(busqueda)}`)
    setBusqueda("")
    setMostrarBuscador(false)
  }
  return (
    <>
      <Navbar expand="lg" className="navbar-custom">
        <Container>
          <NavLink to="/" className="nav-logo">
            <img
              src="/logo.jpeg"
              alt="Logo de la tienda"
              className="logo"            />
          </NavLink>

          <Navbar.Toggle aria-controls="navbar-contenido" />

          <Navbar.Collapse id="navbar-contenido">
            <Nav className="mx-auto nav-links">
              <NavLink to="/" className="nav-link">
                Inicio
              </NavLink>

              <NavLink to="/Categorias" className="nav-link">
                Categorías
              </NavLink>

              <NavLink to="/Sobre_Nosotros" className="nav-link">
                Sobre nosotros
              </NavLink>

              <NavLink to="/Contacto" className="nav-link">
                Contacto
              </NavLink>

              {rol === "usuario" && (
                <NavLink to="/Mis_Pedidos" className="nav-link">
                  Mis pedidos
                </NavLink>
              )}

              {rol === "admin" && (
                <NavDropdown
                  title="Administración"
                  id="admin-dropdown"
                  className="admin-dropdown">
                  <NavDropdown.Item
                    as={NavLink}
                    to="/Admin_Productos">
                    Productos
                  </NavDropdown.Item>

                  <NavDropdown.Item
                    as={NavLink}
                    to="/Admin_Usuarios">
                    Usuarios
                  </NavDropdown.Item>
                </NavDropdown>
              )}
            </Nav>

            <div className="nav-actions">
              <button
                className="icon-button"
                aria-label="Buscar productos"
                onClick={() => setMostrarBuscador(!mostrarBuscador)}>
                <i className="bi bi-search"></i>
              </button>

              <NavDropdown
                title={<i className="bi bi-person"></i>}
                id="usuario-dropdown"
                align="end"
                className="user-dropdown">
                {!token ? (
                  <>
                    <NavDropdown.Item as={NavLink} to="/Iniciar_Sesion">
                      Iniciar sesión
                    </NavDropdown.Item>

                    <NavDropdown.Item as={NavLink} to="/Crear_Cuenta">
                      Crear cuenta
                    </NavDropdown.Item>
                  </>
                ) : (
                  <>
                    <NavDropdown.Header>
                      Hola, {usuario || "Usuario"}
                    </NavDropdown.Header>

                    {rol === "usuario" && (
                      <NavDropdown.Item as={NavLink} to="/Mis_Pedidos">
                        Mis pedidos
                      </NavDropdown.Item>
                    )}

                    <NavDropdown.Divider />

                    <NavDropdown.Item onClick={cerrarSesion}>
                      Cerrar sesión
                    </NavDropdown.Item>
                  </>
                )}
              </NavDropdown>

              <button
                className="icon-button cart-button"
                aria-label="Ir al carrito"
                onClick={() => navigate("/Carrito")}>
                <i className="bi bi-bag"></i>

                {cantidadCarrito > 0 && (
                  <span className="cart-counter">
                    {cantidadCarrito}
                  </span>
                )}
              </button>
            </div>
          </Navbar.Collapse>
        </Container>

        {mostrarBuscador && (
          <div className="search-container">
            <Form onSubmit={buscarProducto} className="search-form">
              <Form.Control
                type="text"
                placeholder="¿Qué estás buscando?"
                value={busqueda}
                onChange={(e) => setBusqueda(e.target.value)}
                autoFocus/>

              <Button type="submit" className="search-submit">
                Buscar
              </Button>
            </Form>
          </div>
        )}
      </Navbar>
    </>
  )
}

export default NavbarC