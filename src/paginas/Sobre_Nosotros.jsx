import { useNavigate } from "react-router-dom";
import "../estilos/Sobre_Nosotros.css";

const Sobre_Nosotros = () => {
  const navigate = useNavigate();

  return (
    <main className="about-page">
      <section className="about-hero">
        <div className="about-hero-content">
          <span>CONOCÉ NUESTRA ESENCIA</span>

          <h1>
            MÁS QUE UNA MARCA,
            <br />
            UN ESTILO DE VIDA.
          </h1>

          <p>
            Inspirados por el mar, la libertad y la cultura urbana.
          </p>
        </div>
      </section>

      <section className="about-intro">

        <span className="about-subtitle">QUIÉNES SOMOS</span>

        <h2>
          VESTIMOS TU FORMA
          <br />
          DE SER.
        </h2>

        <p>
          Creemos que la ropa es mucho más que algo que usamos todos los días.
          Es una forma de expresarnos, de mostrar nuestra personalidad
          y de sentirnos cómodos siendo nosotros mismos.
        </p>

        <p>
          Nos inspiramos en la cultura surf, el mar y el estilo urbano
          para ofrecer prendas que acompañen cada momento de tu vida.
        </p>

      </section>
      <section className="about-story">
        <div className="story-image">
          <img
            src="/imagenes/sn.jpg"
            alt="Estilo de vida junto al mar"
          />
        </div>

        <div className="story-content">

          <span className="about-subtitle">NUESTRA HISTORIA</span>

          <h2>
            NACIMOS CON
            <br />
            UNA IDEA.
          </h2>

          <p>
            Queremos transmitir una manera de vivir donde la comodidad,
            la autenticidad y el estilo van de la mano.
          </p>

          <p>
            Cada prenda busca acompañarte en tus aventuras, tus días
            de playa y también en tu rutina. Nos gusta lo simple,
            lo auténtico y aquello que tiene personalidad.
          </p>

          <p>
            No se trata solamente de seguir tendencias, sino de encontrar
            tu propio estilo y sentirte bien con lo que llevás puesto.
          </p>
        </div>
      </section>

      <section className="about-values">
        <div className="values-heading">
          <span className="about-subtitle">LO QUE NOS REPRESENTA</span>
          <h2>NUESTRA ESENCIA</h2>
          <p>Los valores que forman parte de nuestra identidad.</p>
        </div>

        <div className="values-grid">

          <article className="value-card">
            <div className="value-icon">
              <i className="bi bi-water"></i>
            </div>

            <h3>LIBERTAD</h3>

            <p>
              Creemos en vivir sin límites, disfrutar cada momento
              y encontrar nuestro propio camino.
            </p>
          </article>

          <article className="value-card">
            <div className="value-icon">
              <i className="bi bi-stars"></i>
            </div>

            <h3>CALIDAD</h3>

            <p>
              Buscamos prendas cómodas, versátiles y pensadas
              para acompañarte todos los días.
            </p>
          </article>

          <article className="value-card">
            <div className="value-icon">
              <i className="bi bi-lightning-charge"></i>
            </div>

            <h3>ACTITUD</h3>

            <p>
              Nos identifica un estilo auténtico, relajado
              y con personalidad propia.
            </p>
          </article>
        </div>
      </section>

      <section className="about-final">

        <div className="about-final-content">

          <span>ENCONTRÁ TU ESTILO</span>

          <h2>
            VIVÍ A TU
            <br />
            MANERA.
          </h2>

          <button
            onClick={() => navigate("/Categorias")}
            className="about-button">
            DESCUBRÍ LA COLECCIÓN
            <i className="bi bi-arrow-right"></i>
          </button>
        </div>
      </section>
    </main>
  )
}

export default Sobre_Nosotros