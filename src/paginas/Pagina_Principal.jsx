import { useNavigate } from "react-router-dom";
import "../estilos/Pagina_Principal.css";

const Pagina_Principal = () => {
  const navigate = useNavigate();

  const categorias = [
    {
      nombre: "REMERAS",
      imagen: "/imagenes/remeras.jpg",
      categoria: "Remeras"
    },
    {
      nombre: "SHORTS",
      imagen: "/imagenes/shorts.jpg",
      categoria: "Shorts"
    },
    {
      nombre: "MALLAS",
      imagen: "/imagenes/mallas.jpg",
      categoria: "Mallas"
    },
    {
      nombre: "PANTALONES",
      imagen: "/imagenes/pantalones.jpg",
      categoria: "Pantalones"
    },
    {
      nombre: "ABRIGOS",
      imagen: "/imagenes/abrigos.jpg",
      categoria: "Abrigos"
    },
    {
      nombre: "ACCESORIOS",
      imagen: "/imagenes/accesorios.jpg",
      categoria: "Accesorios"
    }
  ]

  const verProductos = () => {
    navigate("/Categorias");
  }

  const verCategoria = (categoria) => {
    navigate(`/Categorias?categoria=${encodeURIComponent(categoria)}`);
  }
  return (
    <main className="principal">
      <section className="hero-banner">

        <div className="hero-content">
          <h1>NUEVA<br />COLECCIÓN</h1>

          <p>Estilo, comodidad y actitud.</p>

          <button
            className="hero-button"
            onClick={verProductos}>
            VER PRODUCTOS <span>→</span>
          </button>
        </div>
      </section>

      <section className="categories-section">
        <div className="section-title">
          <span></span>
          <h2>CATEGORÍAS</h2>
          <span></span>
        </div>

        <div className="categories-grid">

          {categorias.map((categoria) => (
            <div
              className="category-card"
              key={categoria.nombre}
              onClick={() => verCategoria(categoria.categoria)}
            >
              <img
                src={categoria.imagen}
                alt={categoria.nombre}
              />

              <div className="category-overlay">
                <h3>{categoria.nombre}</h3>
              </div>
            </div>
          ))}
        </div>
      </section>
    </main>
  )
}

export default Pagina_Principal