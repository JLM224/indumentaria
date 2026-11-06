import clienteAxios from "../../funcionesAuxiliares/configAxios";
import { useNavigate, NavLink } from "react-router-dom";
import { Container } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { useState } from "react";
import swal from "sweetalert2";
import "./Formularios.css";

const Formulario = ({ Pagina }) => {
  const navigate = useNavigate();

  const [errores, setErrores] = useState({});

  const [registro, setRegistro] = useState({
    usuario: "",
    email: "",
    contrasenia: "",
    repContrasenia: "",
  });

  const [login, setLogin] = useState({
    usuario: "",
    contrasenia: "",
  });

  const validarEmail = (email) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  };

  const handleClickDelBotonParaRegistro = async (ev) => {
    ev.preventDefault();

    try {
      const erroresFormulario = {};

      const {
        usuario,
        email,
        contrasenia,
        repContrasenia,
      } = registro;

      if (!usuario.trim())
        erroresFormulario.usuario = "Campo usuario está vacío";

      if (!email.trim())
        erroresFormulario.email = "Campo email está vacío";
      else if (!validarEmail(email))
        erroresFormulario.email = "Ingrese un email válido";

      if (!contrasenia)
        erroresFormulario.contrasenia = "Campo contraseña está vacío";

      if (!repContrasenia)
        erroresFormulario.repContrasenia =
          "Campo repetir contraseña está vacío";

      if (Object.keys(erroresFormulario).length > 0) {
        setErrores(erroresFormulario);
        return;
      }

      if (contrasenia !== repContrasenia) {
        swal.fire({
          icon: "error",
          title: "Las contraseñas no coinciden",
        });
        return;
      }

      const usuarioRegistrado = await clienteAxios.post("/usuarios", {
        usuario,
        email,
        contrasenia,
      });

      swal.fire({
        title: usuarioRegistrado.data.mensaje,
        text: "¡En breve recibirás un email de confirmación!",
        icon: "success",
      });

      setRegistro({
        usuario: "",
        email: "",
        contrasenia: "",
        repContrasenia: "",
      });

      setErrores({});

      setTimeout(() => {
        navigate("/Iniciar_Sesion");
      }, 1000);

    } catch (error) {
      const mensajeBackend = error.response?.data?.mensaje;

      if (mensajeBackend) {
        if (mensajeBackend.toLowerCase().includes("usuario")) {
          setErrores((prev) => ({
            ...prev,
            usuario: mensajeBackend,
          }));
        } else if (mensajeBackend.toLowerCase().includes("email")) {
          setErrores((prev) => ({
            ...prev,
            email: mensajeBackend,
          }));
        } else {
          swal.fire({
            icon: "error",
            title: "Error al registrar",
            text: mensajeBackend,
          });
        }
      } else {
        swal.fire({
          icon: "error",
          title: "Error al registrar",
          text: "Revisá los campos o contactá al administrador.",
        });
      }
    }
  };

  const handleChangeDatosRegistro = (ev) => {
    const { name, value } = ev.target;

    if (errores[name]) {
      setErrores((prev) => ({
        ...prev,
        [name]: "",
      }));
    }

    setRegistro((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleChangeDatosLogeo = (ev) => {
    const { name, value } = ev.target;

    if (errores[name]) {
      setErrores((prev) => ({
        ...prev,
        [name]: "",
      }));
    }

    setLogin((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleClickBotonLogueo = async (ev) => {
    ev.preventDefault();

    try {
      const erroresLogin = {};

      const { usuario, contrasenia } = login;

      if (!usuario.trim())
        erroresLogin.usuario = "Campo usuario vacío";

      if (!contrasenia)
        erroresLogin.contrasenia = "Campo contraseña vacío";

      setErrores(erroresLogin);

      if (Object.keys(erroresLogin).length > 0) return;

      const response = await clienteAxios.post("/usuarios/login", {
        usuario,
        contrasenia,
      });

      const {
        token,
        rol,
        usuario: nombreUsuario,
        idUsuario,
      } = response.data.data;

      sessionStorage.setItem("token", token);
      sessionStorage.setItem("rol", rol);
      sessionStorage.setItem("usuario", nombreUsuario);
      sessionStorage.setItem("idUsuario", idUsuario);

      swal.fire({
        title: `¡Bienvenido ${nombreUsuario}!`,
        text: "Has iniciado sesión correctamente",
        icon: "success",
      });

      setLogin({
        usuario: "",
        contrasenia: "",
      });

      if (rol === "usuario") {
        setTimeout(() => {
          navigate("/Usuario");
        }, 1000);
      } else {
        navigate("/Admin_Productos");
      }

    } catch (error) {
      swal.fire({
        icon: "error",
        title: "Error al iniciar sesión",
        text:
          error.response?.data?.mensaje ||
          "Algo salió mal. Revisá los datos o contactá al admin.",
      });
    }
  };

  return (
  <div className="auth-page">
    <div className="auth-layout">

      {/* Panel visual */}
      <div className="auth-image">
        <div className="auth-image-content">
          <span>VIVÍ A TU MANERA</span>
          <h2>EL MAR NOS INSPIRA.<br />TU ESTILO TE DEFINE.</h2>
          <p>Encontrá tu estilo. Disfrutá el camino.</p>
        </div>
      </div>

      {/* Panel del formulario */}
      <div className="auth-form-side">
        <div className="auth-form">

          <span className="auth-overline">
            {Pagina === "Crear_Cuenta" ? "SUMATE A LA COMUNIDAD" : "QUÉ BUENO TENERTE DE VUELTA"}
          </span>

          <h1>
            {Pagina === "Crear_Cuenta" ? "Crear cuenta" : "Iniciar sesión"}
          </h1>

          <p className="auth-description">
            {Pagina === "Crear_Cuenta"
              ? "Creá tu cuenta y empezá a descubrir nuestra colección."
              : "Ingresá a tu cuenta para seguir disfrutando de la tienda."}
          </p>

          <Form
            onSubmit={
              Pagina === "Crear_Cuenta"
                ? handleClickDelBotonParaRegistro
                : handleClickBotonLogueo
            }
          >

            <Form.Group className="auth-group" controlId="Usuario">
              <Form.Label>Usuario</Form.Label>
              <Form.Control
                type="text"
                placeholder="Ingresá tu nombre de usuario"
                name="usuario"
                className={errores.usuario ? "is-invalid" : ""}
                value={
                  Pagina === "Crear_Cuenta"
                    ? registro.usuario
                    : login.usuario
                }
                onChange={
                  Pagina === "Crear_Cuenta"
                    ? handleChangeDatosRegistro
                    : handleChangeDatosLogeo
                }
              />
              {errores.usuario && (
                <p className="auth-error">{errores.usuario}</p>
              )}
            </Form.Group>

            {Pagina === "Crear_Cuenta" && (
              <Form.Group className="auth-group" controlId="Email">
                <Form.Label>Email</Form.Label>
                <Form.Control
                  type="email"
                  placeholder="Ingresá tu email"
                  name="email"
                  className={errores.email ? "is-invalid" : ""}
                  value={registro.email}
                  onChange={handleChangeDatosRegistro}
                />
                {errores.email && (
                  <p className="auth-error">{errores.email}</p>
                )}
              </Form.Group>
            )}

            <Form.Group className="auth-group" controlId="Contrasenia">
              <Form.Label>Contraseña</Form.Label>
              <Form.Control
                type="password"
                placeholder="Ingresá tu contraseña"
                name="contrasenia"
                className={errores.contrasenia ? "is-invalid" : ""}
                value={
                  Pagina === "Crear_Cuenta"
                    ? registro.contrasenia
                    : login.contrasenia
                }
                onChange={
                  Pagina === "Crear_Cuenta"
                    ? handleChangeDatosRegistro
                    : handleChangeDatosLogeo
                }
              />
              {errores.contrasenia && (
                <p className="auth-error">{errores.contrasenia}</p>
              )}
            </Form.Group>

            {Pagina === "Crear_Cuenta" && (
              <Form.Group className="auth-group" controlId="RepContrasenia">
                <Form.Label>Repetir contraseña</Form.Label>
                <Form.Control
                  type="password"
                  placeholder="Volvé a ingresar tu contraseña"
                  name="repContrasenia"
                  className={errores.repContrasenia ? "is-invalid" : ""}
                  value={registro.repContrasenia}
                  onChange={handleChangeDatosRegistro}
                />
                {errores.repContrasenia && (
                  <p className="auth-error">{errores.repContrasenia}</p>
                )}
              </Form.Group>
            )}

            {Pagina === "Iniciar_Sesion" && (
              <div className="auth-forgot">
                <NavLink to="/Recuperar_Contrasenia">
                  ¿Olvidaste tu contraseña?
                </NavLink>
              </div>
            )}

            <Button type="submit" className="auth-submit">
              {Pagina === "Crear_Cuenta" ? "CREAR MI CUENTA" : "INGRESAR"}
              <span> →</span>
            </Button>

          </Form>

          <div className="auth-bottom">
            {Pagina === "Iniciar_Sesion" ? (
              <p>
                ¿Todavía no tenés cuenta?
                <NavLink to="/Crear_Cuenta"> Registrate acá</NavLink>
              </p>
            ) : (
              <p>
                ¿Ya tenés una cuenta?
                <NavLink to="/Iniciar_Sesion"> Iniciá sesión</NavLink>
              </p>
            )}
          </div>

        </div>
      </div>
    </div>
  </div>
   )
}

export default Formulario