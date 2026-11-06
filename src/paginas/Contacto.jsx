import "../estilos/Contacto.css";

const Contacto = () => {
  return (
    <main className="contact-page">
      <section className="contact-hero">
        <div className="contact-hero-content">
          <span>ESTAMOS PARA AYUDARTE</span>
          <h1>HABLEMOS.</h1>
          <p>
            ¿Tenés alguna consulta? Elegí cómo comunicarte
            con nosotros.
          </p>
        </div>
      </section>

      <section className="contact-intro">
        <span className="contact-subtitle">CONTACTO</span>
        <h2>ESTAMOS A UN MENSAJE DE DISTANCIA.</h2>
        <p>
          Ya sea por una consulta sobre nuestros productos,
          tu compra o simplemente para saludarnos, ¡escribinos!
        </p>
      </section>

      <section className="contact-methods">
        <article className="contact-card">
          <div className="contact-icon">
            <i className="bi bi-whatsapp"></i>
          </div>

          <h3>WHATSAPP</h3>
          <p>
            ¿Tenés dudas sobre un producto o tu pedido?
            Escribinos directamente.
          </p>

          <a
            href="https://wa.me/5493412812611"
            target="_blank"
            rel="noreferrer"
            className="contact-link">
            ESCRIBINOS <span>↗</span>
          </a>
        </article>

        <article className="contact-card">
          <div className="contact-icon">
            <i className="bi bi-instagram"></i>
          </div>

          <h3>INSTAGRAM</h3>
          <p>
            Seguinos para conocer las novedades,
            colecciones y todo lo que se viene.
          </p>

          <a
            href="https://www.instagram.com"
            target="_blank"
            rel="noreferrer"
            className="contact-link">
            SEGUINOS <span>↗</span>
          </a>
        </article>

        <article className="contact-card">
          <div className="contact-icon">
            <i className="bi bi-envelope"></i>
          </div>

          <h3>EMAIL</h3>
          <p>
            Para consultas generales, escribinos
            y nos pondremos en contacto.
          </p>

          <a
            href="mailto:correo@gmail.com"
            className="contact-link">
            ENVIAR EMAIL <span>↗</span>
          </a>
        </article>
      </section>
    </main>
  )
}

export default Contacto