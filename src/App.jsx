import { useState, useEffect, useRef } from "react";
import "./App.css";

const REVIEWS = [
  {
    name: "Laura M.",
    city: "Madrid",
    stars: 5,
    text: "Absolutamente increible! Nuestro guia Carlos conocia cada rincon de Madrid y lo contaba con una pasion contagiosa. Aprendi mas en tres horas que en anos de colegio. Repetiria sin pensarlo dos veces.",
  },
  {
    name: "Marcos R.",
    city: "Barcelona",
    stars: 5,
    text: "El mejor plan que hice en Barcelona. El guia nos llevo por rincones del Barrio Gotico que jamas habria encontrado solo. Muy recomendable para cualquiera que quiera entender la ciudad de verdad.",
  },
  {
    name: "Ana G.",
    city: "Sevilla",
    stars: 4,
    text: "Tour muy bien organizado y con mucho mimo en los detalles. La guia nos conto historias del Barrio de Santa Cruz que te ponen los pelos de punta. Sin duda la mejor manera de empezar una visita a Sevilla.",
  },
  {
    name: "David F.",
    city: "Budapest",
    stars: 5,
    text: "Budapest es preciosa y el tour lo hace aun mejor. Guia divertidisimo que mezcla historia, anecdotas y humor a la perfeccion. Me fui con ganas de volver para hacer el tour nocturno.",
  },
  {
    name: "Sofia T.",
    city: "Lisboa",
    stars: 5,
    text: "Kiwi Free Tours es de lo mejor que me ha pasado viajando. La guia de Lisboa nos hizo sentir como si fueramos del barrio desde el primer momento. El fado sonando de fondo mientras escuchabas las historias... magico.",
  },
];

const COUNTRIES = [
  {
    id: "es",
    name: "España",
    flag: "🇪🇸",
    cities: ["Madrid", "Barcelona", "Sevilla"],
  },
  {
    id: "en",
    name: "Inglaterra",
    flag: "🇬🇧",
    cities: ["Londres", "Manchester", "Oxford"],
  },
  {
    id: "ie",
    name: "Irlanda",
    flag: "🇮🇪",
    cities: ["Dublín", "Galway", "Cork"],
  },
  {
    id: "fr",
    name: "Francia",
    flag: "🇫🇷",
    cities: ["París", "Lyon", "Marsella"],
  },
  {
    id: "hu",
    name: "Hungría",
    flag: "🇭🇺",
    cities: ["Budapest", "Pécs", "Eger"],
  },
  {
    id: "pt",
    name: "Portugal",
    flag: "🇵🇹",
    cities: ["Lisboa", "Oporto", "Sintra"],
  },
];

const CITIES = {
  Madrid: {
    img: "imagenes/madrid.jpg",
    desc: "Nuestra ruta por Madrid arranca en la icónica Puerta del Sol, el kilómetro cero de España. Continuamos por la Plaza Mayor y bajamos por las estrechas calles del Madrid de los Austrias hasta el Mercado de San Miguel. Después, un paseo por el Palacio Real antes de terminar frente al Templo de Debod, el templo egipcio con mejores vistas de la ciudad.",
  },
  Barcelona: {
    img: "imagenes/barcelona.jpg",
    desc: "Empezamos en Las Ramblas y nos adentramos en el corazón gótico para descubrir la Catedral de Barcelona y los restos romanos que se esconden bajo sus calles. Luego, el mercado de la Boqueria y la Plaza Real antes de llegar al Barrio del Born.",
  },
  Sevilla: {
    img: "imagenes/sevilla.jpg",
    desc: "El free tour por Sevilla comienza en la magnética Plaza de España y desciende hasta el corazón del Barrio de Santa Cruz. Exploramos la Catedral, la más grande del mundo gótico, y la Torre del Oro junto al Guadalquivir.",
  },
  Londres: {
    img: "imagenes/londres.jpg",
    desc: "El tour londinense parte del Tower Bridge y recorre la orilla sur del Támesis con paradas en Borough Market y la Tate Modern. Cruzamos el río para adentrarnos en la City frente a St. Paul's. Terminamos en Trafalgar Square.",
  },
  Manchester: {
    img: "imagenes/manchester.jpg",
    desc: "Manchester es la capital del norte de Inglaterra y cuna de la Revolución Industrial. Nuestro tour empieza en el barrio de Castlefield, donde se conservan los primeros canales y almacenes de la era industrial. Recorremos el Northern Quarter lleno de murales y cafés de especialidad antes de terminar en la imponente Catedral de Manchester.",
  },
  Oxford: {
    img: "imagenes/oxford.jpg",
    desc: "Oxford es sinónimo de conocimiento: el tour empieza en la Bodleian Library y recorre los colleges que inspiraron Hogwarts. Pasamos por el Christ Church y terminamos en la Carfax Tower con vistas de los famosos tejados de la ciudad universitaria.",
  },
  Dublín: {
    img: "imagenes/dublin.jpg",
    desc: "Dublín empieza en el Trinity College y su famoso Libro de Kells. Cruzamos el Ha'penny Bridge hacia Temple Bar, el barrio de la música y la cerveza artesanal. El tour finaliza en el Dublin Castle con historias de la independencia irlandesa.",
  },
  Galway: {
    img: "imagenes/galway.jpg",
    desc: "Galway es la capital cultural de Irlanda. Comenzamos en la Spanish Arch y subimos por Shop Street entre músicos callejeros. El tour recorre el barrio latino antes de terminar frente a la Catedral de Galway.",
  },
  Cork: {
    img: "imagenes/cork.jpg",
    desc: "Cork nos recibe con el bullicioso Mercado Inglés, una joya de arquitectura victoriana. Subimos hasta el campanario de Shandon y terminamos en la University College Cork al pie del río Lee.",
  },
  París: {
    img: "imagenes/paris.jpg",
    desc: "El free tour por París empieza frente a Notre-Dame. Cruzamos el Pont Neuf al barrio de Saint-Germain-des-Prés y sus cafés literarios. Terminamos en la Plaza de la Bastilla con la historia de la Revolución Francesa.",
  },
  Lyon: {
    img: "imagenes/lyon.jpg",
    desc: "Lyon nos acoge empezando en el Vieux-Lyon, el barrio renacentista más grande de Europa declarado Patrimonio UNESCO. Exploramos los traboules, pasajes secretos de los sericultores. El tour termina en la Colina de Fourvière.",
  },
  Marsella: {
    img: "imagenes/marsella.jpg",
    desc: "Marsella comienza en su Vieux-Port, el puerto milenario. Subimos hasta Notre-Dame de la Garde y bajamos por Le Panier, el barrio más antiguo lleno de arte urbano. Terminamos en la Canebière.",
  },
  Budapest: {
    img: "imagenes/budapest.jpg",
    desc: "Budapest empieza en el barrio del Castillo de Buda. Cruzamos el Puente de las Cadenas hacia Pest para descubrir la Gran Sinagoga y el mercado central. El tour termina en la Plaza de los Héroes.",
  },
  Pécs: {
    img: "imagenes/pecs.jpg",
    desc: "Pécs nos recibe con su espectacular mezquita turca del siglo XVI. El tour sube por el barrio de las galerías de arte hasta la Basílica de los Cuatro Mártires. Terminamos en el Széchenyi tér.",
  },
  Eger: {
    img: "imagenes/eger.jpg",
    desc: "Eger es famosa por su vino Toro de Sangre. Comenzamos en el castillo que resistió al Imperio Otomano y bajamos por las calles barrocas hasta el minarete turco más septentrional de Europa.",
  },
  Lisboa: {
    img: "imagenes/lisboa.jpg",
    desc: "Lisboa empieza en el Castillo de São Jorge y baja por la Alfama, donde el fado se cuela por cada ventana. Cruzamos la Baixa Pombalina y subimos al Chiado antes de terminar en el Miradouro de Santa Catarina.",
  },
  Oporto: {
    img: "imagenes/oporto.jpg",
    desc: "Oporto empieza en la Ribeira, Patrimonio UNESCO. Cruzamos el puente Dom Luís I para visitar las bodegas de Vila Nova de Gaia. Terminamos en la estación de São Bento cubierta de azulejos históricos.",
  },
  Sintra: {
    img: "imagenes/sintra.jpg",
    desc: "Sintra parece sacada de un libro de cuentos. Exploramos el palacio real y subimos entre eucaliptos hasta el castillo árabe del siglo VIII. El Palácio da Pena nos espera con sus colores imposibles.",
  },
};

const MONTHS = [
  "Enero",
  "Febrero",
  "Marzo",
  "Abril",
  "Mayo",
  "Junio",
  "Julio",
  "Agosto",
  "Septiembre",
  "Octubre",
  "Noviembre",
  "Diciembre",
];
const WDAYS = ["L", "M", "X", "J", "V", "S", "D"];

// ── FOOTER ───────────────────────────────────────────────────────────────────
function Footer() {
  return (
    <footer className="footer">
      <span className="footer-copy">
        © {new Date().getFullYear()} Kiwi Free Tours · Todos los derechos
        reservados
      </span>
    </footer>
  );
}

// ── HOME ──────────────────────────────────────────────────────────────────────
function HomePage({ onNavigate }) {
  const [current, setCurrent] = useState(0);
  const swipeX = useRef(null);

  useEffect(() => {
    const timer = setInterval(
      () => setCurrent((c) => (c + 1) % REVIEWS.length),
      4500,
    );
    return () => clearInterval(timer);
  }, []);

  const prev = () =>
    setCurrent((c) => (c - 1 + REVIEWS.length) % REVIEWS.length);
  const next = () => setCurrent((c) => (c + 1) % REVIEWS.length);

  const onMouseDown = (e) => {
    swipeX.current = e.clientX;
  };
  const onTouchStart = (e) => {
    swipeX.current = e.touches[0].clientX;
  };
  const onMouseUp = (e) => {
    if (swipeX.current === null) return;
    if (Math.abs(swipeX.current - e.clientX) > 40)
      swipeX.current - e.clientX > 0 ? next() : prev();
    swipeX.current = null;
  };
  const onTouchEnd = (e) => {
    if (swipeX.current === null) return;
    if (Math.abs(swipeX.current - e.changedTouches[0].clientX) > 40)
      swipeX.current - e.changedTouches[0].clientX > 0 ? next() : prev();
    swipeX.current = null;
  };

  const r = REVIEWS[current];

  return (
    <div className="page">
      <div className="hero">
        <div className="hero-emoji">🥝</div>
        <h1 className="hero-title">
          Kiwi
          <br />
          <span>Free Tours</span>
        </h1>
        <p className="hero-desc">
          Tours gratuitos en español con guías locales apasionados. Experiencias
          únicas, recuerdos para siempre.
        </p>
        <button className="btn-primary" onClick={() => onNavigate("cities")}>
          Ver ciudades
        </button>
        <div className="hero-arrow">↓</div>
      </div>

      <div className="reviews-section">
        <h2 className="section-title">Lo que dicen nuestros viajeros</h2>
        <div className="carousel-wrapper">
          <button className="car-side-btn" onClick={prev}>
            ‹
          </button>
          <div
            className="review-card"
            onMouseDown={onMouseDown}
            onMouseUp={onMouseUp}
            onTouchStart={onTouchStart}
            onTouchEnd={onTouchEnd}
          >
            <div className="stars">
              {"★".repeat(r.stars)}
              {"☆".repeat(5 - r.stars)}
            </div>
            <p className="review-text">"{r.text}"</p>
            <div className="reviewer">
              <div className="avatar">{r.name[0]}</div>
              <div>
                <div className="reviewer-name">{r.name}</div>
                <div className="reviewer-city">Tour en {r.city}</div>
              </div>
            </div>
          </div>
          <button className="car-side-btn" onClick={next}>
            ›
          </button>
        </div>
        <div className="dots-row">
          {REVIEWS.map((_, i) => (
            <button
              key={i}
              className={`dot${i === current ? " active" : ""}`}
              style={{ width: i === current ? 24 : 8 }}
              onClick={() => setCurrent(i)}
            />
          ))}
        </div>
      </div>

      <div className="contact-section">
        <h2 className="section-title">Contacta con nosotros</h2>
        <p className="contact-desc">
          ¿Tienes alguna pregunta? Encuéntranos en redes o escríbenos
          directamente.
        </p>
        <div className="contact-links">
          <a className="contact-link" href="#">
            <svg
              width="22"
              height="22"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <rect x="2" y="2" width="20" height="20" rx="5" />
              <circle cx="12" cy="12" r="4" />
              <circle
                cx="17.5"
                cy="6.5"
                r="1"
                fill="currentColor"
                stroke="none"
              />
            </svg>
            Instagram
          </a>
          <a className="contact-link" href="#">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor">
              <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
            </svg>
            Facebook
          </a>
          <a className="contact-link" href="#">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413Z" />
            </svg>
            WhatsApp
          </a>
        </div>
        <p className="contact-email">
          También puedes escribirnos al correo{" "}
          <a href="mailto:kiwi@freetours.com" className="contact-email-link">
            kiwi@freetours.com
          </a>
        </p>
      </div>
    </div>
  );
}

// ── CITIES ────────────────────────────────────────────────────────────────────
function CitiesPage({ onSelectCity }) {
  const [open, setOpen] = useState(null);

  return (
    <div className="page">
      <div className="cities-page">
        <h2 className="page-title">Nuestros destinos</h2>
        <p className="page-sub">
          Selecciona un país para ver las ciudades disponibles
        </p>
        {COUNTRIES.map((c) => (
          <div key={c.id} className="country-item">
            <button
              className={`country-btn${open === c.id ? " open" : ""}`}
              onClick={() => setOpen(open === c.id ? null : c.id)}
            >
              <span>
                {c.flag} {c.name}
              </span>
              <span className="arrow">▼</span>
            </button>
            {open === c.id && (
              <div className="cities-list">
                {c.cities.map((city) => (
                  <button
                    key={city}
                    className="city-btn"
                    onClick={() => onSelectCity(city)}
                  >
                    {city}
                  </button>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

// ── CALENDAR MODAL ────────────────────────────────────────────────────────────
function CalendarModal({ cityName, onClose, onConfirmed }) {
  const [step, setStep] = useState("calendar");
  const [calYear, setCalYear] = useState(new Date().getFullYear());
  const [calMonth, setCalMonth] = useState(new Date().getMonth());
  const [selDate, setSelDate] = useState(null);
  const [selTime, setSelTime] = useState(null);
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    guests: 1,
  });
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});

  const daysInMonth = new Date(calYear, calMonth + 1, 0).getDate();
  const firstDay = (new Date(calYear, calMonth, 1).getDay() + 6) % 7;
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const isValidEmail = (v) => /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v.trim());
  const isValidPhone = (v) => /^\+?[\d\s\-.()]{7,20}$/.test(v.trim());
  const isValidName = (v) => v.trim().length >= 2;

  const validate = (f, v) => {
    if (f === "name")
      return isValidName(v) ? "" : "Introduce tu nombre completo";
    if (f === "email")
      return isValidEmail(v)
        ? ""
        : "Introduce un email válido (ej: nombre@dominio.com)";
    if (f === "phone")
      return isValidPhone(v)
        ? ""
        : "Introduce un número válido (ej: +34 600 000 000)";
    return "";
  };

  const handleField = (f, v) => {
    setForm((prev) => ({ ...prev, [f]: v }));
    if (touched[f]) setErrors((prev) => ({ ...prev, [f]: validate(f, v) }));
  };

  const handleBlur = (f) => {
    setTouched((prev) => ({ ...prev, [f]: true }));
    setErrors((prev) => ({ ...prev, [f]: validate(f, form[f]) }));
  };

  const formValid =
    isValidName(form.name) &&
    isValidEmail(form.email) &&
    isValidPhone(form.phone);

  const calCells = [];
  for (let i = 0; i < firstDay; i++) calCells.push(null);
  for (let d = 1; d <= daysInMonth; d++) calCells.push(d);

  const isPast = (d) => new Date(calYear, calMonth, d) < today;
  const isSel = (d) =>
    selDate &&
    selDate.getDate() === d &&
    selDate.getMonth() === calMonth &&
    selDate.getFullYear() === calYear;

  const prevMonth = () => {
    if (calMonth === 0) {
      setCalMonth(11);
      setCalYear((y) => y - 1);
    } else setCalMonth((m) => m - 1);
  };
  const nextMonth = () => {
    if (calMonth === 11) {
      setCalMonth(0);
      setCalYear((y) => y + 1);
    } else setCalMonth((m) => m + 1);
  };

  const handleConfirm = () => {
    onConfirmed({
      city: cityName,
      date: selDate,
      time: selTime,
      name: form.name,
    });
  };

  return (
    <div
      className="modal-overlay"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div className="modal-sheet">
        <div className="modal-header">
          <button
            className="modal-back"
            onClick={step === "calendar" ? onClose : () => setStep("calendar")}
          >
            ←
          </button>
          <div className="modal-title">
            {step === "calendar"
              ? `Tour en ${cityName}`
              : "Completa tu reserva"}
          </div>
        </div>

        {step === "calendar" && (
          <>
            <div className="cal-nav">
              <button className="cal-nav-btn" onClick={prevMonth}>
                ‹
              </button>
              <span className="cal-month">
                {MONTHS[calMonth]} {calYear}
              </span>
              <button className="cal-nav-btn" onClick={nextMonth}>
                ›
              </button>
            </div>
            <div className="cal-grid">
              {WDAYS.map((d) => (
                <div key={d} className="cal-day-header">
                  {d}
                </div>
              ))}
            </div>
            <div className="cal-grid" style={{ marginBottom: 16 }}>
              {calCells.map((d, i) => (
                <button
                  key={i}
                  disabled={!d || isPast(d)}
                  className={`cal-day${!d ? " empty" : ""}${d && isSel(d) ? " selected" : ""}`}
                  onClick={() => {
                    if (d && !isPast(d)) {
                      setSelDate(new Date(calYear, calMonth, d));
                      setSelTime(null);
                    }
                  }}
                >
                  {d || ""}
                </button>
              ))}
            </div>

            {selDate && (
              <>
                <p className="section-label">Selecciona horario:</p>
                <div className="times-grid">
                  {["09:00", "12:00", "17:00"].map((t) => (
                    <button
                      key={t}
                      className={`time-btn${selTime === t ? " selected" : ""}`}
                      onClick={() => setSelTime(t)}
                    >
                      {t}
                    </button>
                  ))}
                </div>
                <button
                  className="btn-block"
                  disabled={!selTime}
                  onClick={() => setStep("form")}
                >
                  Reservar →
                </button>
              </>
            )}
          </>
        )}

        {step === "form" && (
          <>
            <div className="booking-summary">
              📅{" "}
              {selDate?.toLocaleDateString("es-ES", {
                weekday: "long",
                day: "numeric",
                month: "long",
              })}{" "}
              · 🕐 {selTime} · {cityName}
            </div>
            {[
              {
                key: "name",
                label: "Nombre completo",
                type: "text",
                placeholder: "Tu nombre completo",
              },
              {
                key: "email",
                label: "Email",
                type: "email",
                placeholder: "tu@email.com",
              },
              {
                key: "phone",
                label: "Teléfono",
                type: "tel",
                placeholder: "+34 600 000 000",
              },
            ].map((f) => (
              <div key={f.key} className="form-group">
                <label className="form-label">{f.label}</label>
                <input
                  className={`form-input${errors[f.key] && touched[f.key] ? " error" : ""}${!errors[f.key] && touched[f.key] && form[f.key] ? " valid" : ""}`}
                  type={f.type}
                  placeholder={f.placeholder}
                  value={form[f.key]}
                  onChange={(e) => handleField(f.key, e.target.value)}
                  onBlur={() => handleBlur(f.key)}
                />
                {errors[f.key] && touched[f.key] && (
                  <div className="field-error show">{errors[f.key]}</div>
                )}
              </div>
            ))}
            <div className="form-group">
              <label className="form-label">Número de asistentes</label>
              <div className="guests-ctrl">
                <button
                  className="guest-btn"
                  onClick={() =>
                    setForm((f) => ({
                      ...f,
                      guests: Math.max(1, f.guests - 1),
                    }))
                  }
                >
                  −
                </button>
                <span className="guest-count">{form.guests}</span>
                <button
                  className="guest-btn"
                  onClick={() =>
                    setForm((f) => ({
                      ...f,
                      guests: Math.min(20, f.guests + 1),
                    }))
                  }
                >
                  +
                </button>
                <span className="guest-label">personas</span>
              </div>
            </div>
            <button
              className="btn-block"
              disabled={!formValid}
              onClick={handleConfirm}
            >
              Confirmar reserva
            </button>
          </>
        )}
      </div>
    </div>
  );
}

// ── CITY PAGE ─────────────────────────────────────────────────────────────────
function CityPage({ cityName, onBack }) {
  const [showModal, setShowModal] = useState(false);
  const [confirmed, setConfirmed] = useState(null);
  const d = CITIES[cityName] || {};

  const handleConfirmed = (data) => {
    setShowModal(false);
    setConfirmed(data);
  };

  return (
    <div className="page">
      <div className="city-hero">
        <img
          className="city-hero-img"
          src={d.img}
          alt={cityName}
          onError={(e) => (e.target.style.display = "none")}
        />
        <div className="city-overlay" />
        <button className="back-btn" onClick={onBack}>
          ←
        </button>
        <div className="city-name-hero">{cityName}</div>
      </div>
      <div className="city-content">
        <p className="city-desc">{d.desc}</p>
        <button className="btn-teal" onClick={() => setShowModal(true)}>
          📅 Ver horarios
        </button>
      </div>

      {showModal && (
        <CalendarModal
          cityName={cityName}
          onClose={() => setShowModal(false)}
          onConfirmed={handleConfirmed}
        />
      )}

      {confirmed && (
        <div className="modal-overlay">
          <div className="confirm-box">
            <div className="confirm-emoji">🎉</div>
            <div className="confirm-title">Reserva confirmada</div>
            <p className="confirm-text">
              Hemos apuntado tu plaza para el tour en{" "}
              <strong>{confirmed.city}</strong> el{" "}
              <strong>
                {confirmed.date?.toLocaleDateString("es-ES", {
                  day: "numeric",
                  month: "long",
                })}
              </strong>{" "}
              a las <strong>{confirmed.time}</strong>.<br />
              ¡Nos vemos allí, {confirmed.name.split(" ")[0]}! 🥝
            </p>
            <button
              className="btn-primary"
              onClick={() => {
                setConfirmed(null);
                onBack();
              }}
            >
              Volver a ciudades
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

// ── APP ───────────────────────────────────────────────────────────────────────
export default function App() {
  const [page, setPage] = useState("home");
  const [selectedCity, setSelectedCity] = useState(null);

  const handleSelectCity = (city) => {
    setSelectedCity(city);
    setPage("city");
  };

  return (
    <>
      <nav className="nav">
        <button className="nav-logo" onClick={() => setPage("home")}>
          🥝 Kiwi Free Tours
        </button>
        <button
          className={`nav-btn${page === "cities" || page === "city" ? " active" : ""}`}
          onClick={() => setPage("cities")}
        >
          Destinos
        </button>
      </nav>

      {page === "home" && <HomePage onNavigate={setPage} />}
      {page === "cities" && <CitiesPage onSelectCity={handleSelectCity} />}
      {page === "city" && selectedCity && (
        <CityPage cityName={selectedCity} onBack={() => setPage("cities")} />
      )}

      <Footer />
    </>
  );
}
