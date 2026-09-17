const nav = document.getElementById('mainNav');
  if (nav) {
    window.addEventListener('scroll', () => {
      nav.classList.toggle('scrolled', window.scrollY > 60);
    });
  }

  const navToggle = document.getElementById('navToggle');
  const navMobile = document.getElementById('navMobile');
  if (navToggle && navMobile) {
    navToggle.addEventListener('click', () => {
      const isOpen = navToggle.classList.toggle('open');
      navMobile.classList.toggle('open', isOpen);
      navToggle.setAttribute('aria-expanded', String(isOpen));
      document.body.style.overflow = isOpen ? 'hidden' : '';
    });
    navMobile.querySelectorAll('a').forEach(a => {
      a.addEventListener('click', () => {
        navToggle.classList.remove('open');
        navMobile.classList.remove('open');
        navToggle.setAttribute('aria-expanded', 'false');
        document.body.style.overflow = '';
      });
    });
  }

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        e.target.classList.add('visible');
        observer.unobserve(e.target);
      }
    });
  }, { threshold: 0.12 });

  document.querySelectorAll('.fade-up').forEach((el, i) => {
    el.style.transitionDelay = (i % 3) * 0.12 + 's';
    observer.observe(el);
  });

  const activeFilters = { tab: 'all', zona: 'all', priceMin: null, priceMax: null };

  function setTab(btn, type) {
    document.querySelectorAll('.filter-tab').forEach(t => t.classList.remove('active'));
    btn.classList.add('active');
    activeFilters.tab = type;
    if (document.querySelector('.property-card-sm[data-op]')) {
      applyPropertyFilters();
    }
  }

  function applyZonaFilter() {
    const sel = document.getElementById('zonaFilter');
    activeFilters.zona = sel ? sel.value : 'all';
    applyPropertyFilters();
  }

  function applyPriceFilter() {
    const min = document.getElementById('priceMinFilter');
    const max = document.getElementById('priceMaxFilter');
    activeFilters.priceMin = min && min.value ? parseFloat(min.value) : null;
    activeFilters.priceMax = max && max.value ? parseFloat(max.value) : null;
    applyPropertyFilters();
  }

  function clearFilters() {
    activeFilters.tab = 'all';
    activeFilters.zona = 'all';
    activeFilters.priceMin = null;
    activeFilters.priceMax = null;
    document.querySelectorAll('.filter-tab').forEach(t => t.classList.remove('active'));
    const allTab = document.querySelector('.filter-tab[data-filter="all"]');
    if (allTab) allTab.classList.add('active');
    const zonaSel = document.getElementById('zonaFilter');
    if (zonaSel) zonaSel.value = 'all';
    const min = document.getElementById('priceMinFilter');
    const max = document.getElementById('priceMaxFilter');
    if (min) min.value = '';
    if (max) max.value = '';
    applyPropertyFilters();
  }

  function applyPropertyFilters() {
    const cards = document.querySelectorAll('.property-card-sm[data-op]');
    let visibleCount = 0;
    cards.forEach(card => {
      const { tab, zona, priceMin, priceMax } = activeFilters;
      const matchesTab = tab === 'all' || card.dataset.op === tab || card.dataset.tipo === tab;
      const matchesZona = zona === 'all' || card.dataset.zona === zona;
      const price = parseFloat(card.dataset.price || '0');
      const matchesMin = priceMin === null || price >= priceMin;
      const matchesMax = priceMax === null || price <= priceMax;
      const matches = matchesTab && matchesZona && matchesMin && matchesMax;
      card.style.display = matches ? '' : 'none';
      if (matches) visibleCount++;
    });
    const noResults = document.getElementById('noResults');
    if (noResults) noResults.classList.toggle('visible', visibleCount === 0);
    const counter = document.getElementById('resultsCount');
    if (counter) counter.textContent = visibleCount + (visibleCount === 1 ? ' propiedad encontrada' : ' propiedades encontradas');
  }

  /* ===== PROPERTY DETAIL MODAL ===== */
  const PROPERTY_DATA = {
    5944012: {
      badge: 'Nueva Incorporación', op: 'Venta', location: 'El Cantón - Norte',
      title: 'Casa en Venta 5 ambientes Barrio El Cantón Norte a la laguna',
      desc: 'Casa moderna a estrenar con vista plena a la laguna en El Cantón – Norte. Distribuida en dos plantas, con amplio living-comedor, cocina integrada y galería con parrilla. Construcción de calidad con losa radiante, doble vidrio y preinstalación de aire acondicionado. Una opción ideal para quienes buscan confort, naturaleza y una vida tranquila frente al agua.',
      price: 'USD 300.000', priceSuffix: '', code: 'JHO4569060',
      specs: { dorm: 3, banos: 3, m2: '220 m²', plantas: 2 },
      images: ['assets/images/propiedades/5944012.jpg','assets/images/propiedades/5944012/1.jpg','assets/images/propiedades/5944012/2.jpg','assets/images/propiedades/5944012/3.jpg','assets/images/propiedades/5944012/4.jpg','assets/images/propiedades/5944012/5.jpg','assets/images/propiedades/5944012/6.jpg'],
      wa: 'https://api.whatsapp.com/send?phone=5491165185675&text=Hola%20Julieta%2C%20me%20interesa%20la%20Casa%20en%20Venta%20El%20Cant%C3%B3n%20Norte%20a%20la%20laguna'
    },
    7661682: {
      badge: 'Nueva Incorporación', op: 'Venta', location: 'El Cantón - Norte',
      title: 'Casa a la laguna en Venta El Cantón Barrio Norte',
      desc: 'Casa moderna con vistas a la laguna, ubicada en el Barrio Norte de El Cantón. Living-comedor súper luminoso con ventanales de alta calidad, cocina completa y galería con parrilla integrada al jardín y a la piscina revestida en venecitas. Suite principal con terraza privada, jacuzzi y vestidor.',
      price: 'USD 340.000', priceSuffix: '', code: 'JHO7661682',
      specs: { dorm: 3, banos: 3, m2: '212 m²', plantas: 2 },
      images: ['assets/images/propiedades/7661682.jpg','assets/images/propiedades/7661682/1.jpg','assets/images/propiedades/7661682/2.jpg','assets/images/propiedades/7661682/3.jpg','assets/images/propiedades/7661682/4.jpg','assets/images/propiedades/7661682/5.jpg','assets/images/propiedades/7661682/6.jpg'],
      wa: 'https://api.whatsapp.com/send?phone=5491165185675&text=Hola%20Julieta%2C%20me%20interesa%20la%20Casa%20a%20la%20laguna%20en%20Venta%20El%20Cant%C3%B3n%20Barrio%20Norte'
    },
    6740856: {
      badge: 'Destacada', op: 'Venta', location: 'El Cantón - Norte',
      title: 'Casa al agua en Venta 5 Ambientes El Cantón Barrio Norte',
      desc: 'Casa moderna frente a la laguna en El Cantón Norte. Living-comedor en doble altura, cocina amplia con comedor diario y escritorio. Exterior destacado con galería, parrilla, piscina con borde infinito, playa y muelle propio. Losa radiante, DVH y cochera para varios autos.',
      price: 'USD 330.000', priceSuffix: '', code: 'JHO6740856',
      specs: { dorm: 3, banos: 3, m2: '230 m²', plantas: 2 },
      images: ['assets/images/propiedades/6740856.jpg','assets/images/propiedades/6740856/1.jpg','assets/images/propiedades/6740856/2.jpg','assets/images/propiedades/6740856/3.jpg','assets/images/propiedades/6740856/4.jpg','assets/images/propiedades/6740856/5.jpg','assets/images/propiedades/6740856/6.jpg'],
      wa: 'https://api.whatsapp.com/send?phone=5491165185675&text=Hola%20Julieta%2C%20me%20interesa%20la%20Casa%20al%20agua%20en%20Venta%205%20Ambientes%20El%20Cant%C3%B3n%20Barrio%20Norte'
    },
    8170318: {
      badge: 'Financiación 50%', op: 'Venta', location: 'El Cantón - Norte',
      title: 'Casa a la laguna en Venta — 6 Ambientes, Barrio Norte',
      desc: 'Casa a la laguna en el Cantón, Barrio Norte, con posibilidad de financiación del 50%. Ideal para quienes buscan naturaleza y tranquilidad frente al agua, a minutos de la Panamericana.',
      price: 'USD 420.000', priceSuffix: '', code: 'JHO8170318',
      specs: { ambientes: 5, m2: '281 m²' },
      images: ['assets/images/propiedades/8170318.jpg','assets/images/propiedades/8170318/1.jpg','assets/images/propiedades/8170318/2.jpg','assets/images/propiedades/8170318/3.jpg','assets/images/propiedades/8170318/4.jpg'],
      wa: 'https://api.whatsapp.com/send?phone=5491165185675&text=Hola%20Julieta%2C%20me%20interesa%20la%20propiedad%20JHO8170318'
    },
    5943099: {
      badge: 'Venta / Alquiler', op: 'Venta', location: 'El Cantón - Norte',
      title: 'Hermosa Casa con vista a laguna, Barrio Norte',
      desc: 'Disponible en venta o alquiler. Ubicada en el Cantón, Barrio Norte, con vista a la laguna. Una alternativa flexible para quienes buscan instalarse o invertir en la zona.',
      price: 'USD 350.000', priceSuffix: '', code: 'FHO3699484',
      specs: { ambientes: 4, m2: '253 m²' },
      images: ['assets/images/propiedades/5943099.jpg','assets/images/propiedades/5943099/1.jpg','assets/images/propiedades/5943099/2.jpg','assets/images/propiedades/5943099/3.jpg','assets/images/propiedades/5943099/4.jpg'],
      wa: 'https://api.whatsapp.com/send?phone=5491165185675&text=Hola%20Julieta%2C%20me%20interesa%20la%20propiedad%20FHO3699484'
    },
    6713046: {
      badge: 'Venta / Alquiler', op: 'Venta', location: 'El Cantón - Islas',
      title: 'Casa al agua — 5 Ambientes, Barrio Islas',
      desc: 'Casa al agua en el Cantón, Barrio Islas. Disponible en venta, en uno de los sectores más buscados de este barrio privado de Escobar.',
      price: 'USD 450.000', priceSuffix: '', code: 'JHO6713046',
      specs: { ambientes: 5, m2: 'Consultar' },
      images: ['assets/images/propiedades/6713046.jpg','assets/images/propiedades/6713046/1.jpg','assets/images/propiedades/6713046/2.jpg','assets/images/propiedades/6713046/3.jpg','assets/images/propiedades/6713046/4.jpg'],
      wa: 'https://api.whatsapp.com/send?phone=5491165185675&text=Hola%20Julieta%2C%20me%20interesa%20la%20propiedad%20JHO6713046'
    },
    7596146: {
      badge: 'Venta / Alquiler', op: 'Venta', location: 'El Cantón - Islas',
      title: 'Casa a la Laguna, Barrio Islas',
      desc: 'Casa a la laguna en el Cantón, Barrio Islas, disponible en venta. Zona tranquila con acceso directo al espejo de agua interno del barrio.',
      price: 'USD 390.000', priceSuffix: '', code: 'JHO7596146',
      specs: { m2: '247 m²' },
      images: ['assets/images/propiedades/7596146.jpg','assets/images/propiedades/7596146/1.jpg','assets/images/propiedades/7596146/2.jpg','assets/images/propiedades/7596146/3.jpg','assets/images/propiedades/7596146/4.jpg'],
      wa: 'https://api.whatsapp.com/send?phone=5491165185675&text=Hola%20Julieta%2C%20me%20interesa%20la%20propiedad%20JHO7596146'
    },
    7149829: {
      badge: 'Con Pileta', op: 'Venta', location: 'Marinas - Puertos del Lago',
      title: 'Casa al agua con pileta, 2 dormitorios en suite',
      desc: 'Casa al agua en Puertos del Lago, Barrio Marinas, con pileta propia y dos dormitorios en suite. Barrio privado con amenities, seguridad 24hs y acceso directo desde Panamericana.',
      price: 'USD 550.000', priceSuffix: '', code: 'JHO7149829',
      specs: { dorm: 2, m2: '233 m²' },
      images: ['assets/images/propiedades/7149829.jpg','assets/images/propiedades/7149829/1.jpg','assets/images/propiedades/7149829/2.jpg','assets/images/propiedades/7149829/3.jpg','assets/images/propiedades/7149829/4.jpg'],
      wa: 'https://api.whatsapp.com/send?phone=5491165185675&text=Hola%20Julieta%2C%20me%20interesa%20la%20propiedad%20JHO7149829'
    },
    8694115: {
      badge: 'Venta / Alquiler', op: 'Venta', location: 'Muelles - Puertos del Lago',
      title: 'Casa en Puertos del Lago, Barrio Muelles',
      desc: 'Casa en Puertos del Lago, Barrio Muelles, disponible en venta. Uno de los barrios más consolidados del desarrollo, con marina propia y clubhouse.',
      price: 'USD 690.000', priceSuffix: '', code: 'JHO8694115',
      specs: { dorm: 4, m2: '290 m²' },
      images: ['assets/images/propiedades/8694115.jpg','assets/images/propiedades/8694115/1.jpg','assets/images/propiedades/8694115/2.jpg','assets/images/propiedades/8694115/3.jpg','assets/images/propiedades/8694115/4.jpg'],
      wa: 'https://api.whatsapp.com/send?phone=5491165185675&text=Hola%20Julieta%2C%20me%20interesa%20la%20propiedad%20JHO8694115'
    },
    7162713: {
      badge: 'Destacada', op: 'Venta', location: 'El Cantón - Norte',
      title: 'Casa a la laguna, Barrio Norte',
      desc: 'Casa a la laguna en el Cantón, Barrio Norte, disponible en venta. Amplia superficie cubierta distribuida en varios ambientes con vista al agua.',
      price: 'USD 490.000', priceSuffix: '', code: 'JHO7162713',
      specs: { dorm: 4, m2: '320 m²' },
      images: ['assets/images/propiedades/7162713.jpg','assets/images/propiedades/7162713/1.jpg','assets/images/propiedades/7162713/2.jpg','assets/images/propiedades/7162713/3.jpg','assets/images/propiedades/7162713/4.jpg'],
      wa: 'https://api.whatsapp.com/send?phone=5491165185675&text=Hola%20Julieta%2C%20me%20interesa%20la%20propiedad%20JHO7162713'
    },
    8697318: {
      badge: '', op: 'Venta', location: 'Ceibos - Puertos del Lago',
      title: 'Casa en Puertos del Lago, Barrio Ceibos',
      desc: 'Casa en Puertos del Lago, Barrio Ceibos, disponible en venta. Barrio residencial con espacios verdes y buena conectividad interna.',
      price: 'USD 405.000', priceSuffix: '', code: 'JHO8697318',
      specs: { dorm: 3, m2: '288 m²' },
      images: ['assets/images/propiedades/8697318.jpg','assets/images/propiedades/8697318/1.jpg','assets/images/propiedades/8697318/2.jpg','assets/images/propiedades/8697318/3.jpg','assets/images/propiedades/8697318/4.jpg'],
      wa: 'https://api.whatsapp.com/send?phone=5491165185675&text=Hola%20Julieta%2C%20me%20interesa%20la%20propiedad%20JHO8697318'
    },
    7552210: {
      badge: '', op: 'Venta', location: 'Palermo Hollywood - CABA',
      title: 'Departamento 2 Ambientes en Palermo Hollywood',
      desc: 'Departamento de 2 ambientes en venta, en el corazón de Palermo Hollywood. Excelente ubicación, cerca de bares, restaurantes y transporte público.',
      price: 'USD 175.000', priceSuffix: '', code: 'JBU67389',
      specs: { ambientes: 2, m2: '57 m²' },
      images: ['assets/images/propiedades/7552210.jpg','assets/images/propiedades/7552210/1.jpg','assets/images/propiedades/7552210/2.jpg','assets/images/propiedades/7552210/3.jpg','assets/images/propiedades/7552210/4.jpg'],
      wa: 'https://api.whatsapp.com/send?phone=5491165185675&text=Hola%20Julieta%2C%20me%20interesa%20la%20propiedad%20JBU67389'
    },
    8001070: {
      badge: 'A Estrenar', op: 'Venta', location: 'Escobar - GBA Zona Norte',
      title: 'Departamento a estrenar, 3 amb. con cochera',
      desc: 'Departamento a estrenar en el Complejo Green Boero, Escobar, con cochera y excelente ubicación. Ideal para vivir o invertir en una zona en pleno crecimiento.',
      price: 'USD 125.000', priceSuffix: '', code: 'JAP8001070',
      specs: { ambientes: 3, m2: '66,9 m²' },
      images: ['assets/images/propiedades/8001070.jpg','assets/images/propiedades/8001070/1.jpg','assets/images/propiedades/8001070/2.jpg','assets/images/propiedades/8001070/3.jpg','assets/images/propiedades/8001070/4.jpg'],
      wa: 'https://api.whatsapp.com/send?phone=5491165185675&text=Hola%20Julieta%2C%20me%20interesa%20la%20propiedad%20JAP8001070'
    },
    9087687: {
      badge: '', op: 'Venta', location: 'Amarras - Puertos del Lago',
      title: 'Lote al agua, Barrio Amarras',
      desc: 'Terreno al agua en Puertos del Lago, Barrio Amarras, ideal para construir a medida. Superficie generosa con acceso directo a la costa interna del barrio.',
      price: 'USD 148.000', priceSuffix: '', code: 'JLA9087687',
      specs: { m2: '904,74 m²' },
      images: ['assets/images/propiedades/9087687.jpg','assets/images/propiedades/9087687/1.jpg','assets/images/propiedades/9087687/2.jpg','assets/images/propiedades/9087687/3.jpg','assets/images/propiedades/9087687/4.jpg'],
      wa: 'https://api.whatsapp.com/send?phone=5491165185675&text=Hola%20Julieta%2C%20me%20interesa%20la%20propiedad%20JLA9087687'
    },
    9830322: {
      badge: 'Alquiler Anual', op: 'Alquiler', location: 'San Matías',
      title: 'Casa en Alquiler Anual | Pileta, Galería y Parrilla',
      desc: 'Casa en alquiler anual en San Matías, con pileta, galería y parrilla. Barrio privado con añosas arboledas sobre las barrancas del río Luján.',
      price: 'USD 1.800', priceSuffix: '/mes', code: 'JHO9830322',
      specs: { dorm: 3 },
      images: ['assets/images/propiedades/9830322.jpg','assets/images/propiedades/9830322/1.jpg','assets/images/propiedades/9830322/2.jpg','assets/images/propiedades/9830322/3.jpg','assets/images/propiedades/9830322/4.jpg'],
      wa: 'https://api.whatsapp.com/send?phone=5491165185675&text=Hola%20Julieta%2C%20me%20interesa%20la%20propiedad%20JHO9830322'
    },
    8075015: {
      badge: '', op: 'Venta', location: 'Amarras - Puertos del Lago',
      title: 'Casa estilo moderno, Barrio Amarras',
      desc: 'Casa estilo moderno en venta en Puertos del Lago, Barrio Amarras, Escobar. Diseño contemporáneo con líneas limpias en uno de los barrios más consolidados del desarrollo.',
      price: 'USD 450.000', priceSuffix: '', code: 'JHO8075015',
      specs: { dorm: 4, m2: 'Consultar' },
      images: ['assets/images/propiedades/8075015.jpg','assets/images/propiedades/8075015/1.jpg','assets/images/propiedades/8075015/2.jpg','assets/images/propiedades/8075015/3.jpg','assets/images/propiedades/8075015/4.jpg'],
      wa: 'https://api.whatsapp.com/send?phone=5491165185675&text=Hola%20Julieta%2C%20me%20interesa%20la%20propiedad%20JHO8075015'
    },
    5944385: {
      badge: 'Alquiler Anual', op: 'Alquiler', location: 'Acacias - Puertos del Lago',
      title: 'Casa en Alquiler Anual, 4 Ambientes, Barrio Acacias',
      desc: 'Casa en alquiler anual en Puertos del Lago, Barrio Acacias. Cuatro ambientes en un entorno tranquilo, ideal para vivir en familia cerca de la naturaleza.',
      price: 'USD 1.500', priceSuffix: '/mes', code: 'JHO5181803',
      specs: { ambientes: 4, m2: '200,96 m²' },
      images: ['assets/images/propiedades/5944385.jpg','assets/images/propiedades/5944385/1.jpg','assets/images/propiedades/5944385/2.jpg','assets/images/propiedades/5944385/3.jpg','assets/images/propiedades/5944385/4.jpg'],
      wa: 'https://api.whatsapp.com/send?phone=5491165185675&text=Hola%20Julieta%2C%20me%20interesa%20la%20propiedad%20JHO5181803'
    },
    8010167: {
      badge: 'Destacada', op: 'Venta', location: 'El Cantón - Puerto',
      title: 'Casa a la laguna, Barrio Puerto',
      desc: 'Casa a la laguna en el Cantón, Barrio Puerto, disponible en venta. Amplia superficie con acceso directo al agua en uno de los sectores más nuevos del barrio.',
      price: 'USD 470.000', priceSuffix: '', code: 'JHO8010167',
      specs: { dorm: 4, m2: '308 m²' },
      images: ['assets/images/propiedades/8010167.jpg','assets/images/propiedades/8010167/1.jpg','assets/images/propiedades/8010167/2.jpg','assets/images/propiedades/8010167/3.jpg','assets/images/propiedades/8010167/4.jpg'],
      wa: 'https://api.whatsapp.com/send?phone=5491165185675&text=Hola%20Julieta%2C%20me%20interesa%20la%20propiedad%20JHO8010167'
    }
  };

  const SPEC_LABELS = { dorm: 'Dormitorios', banos: 'Baños', m2: 'Superficie', ambientes: 'Ambientes', plantas: 'Plantas' };

  const EMPRENDIMIENTO_DATA = {
    puertosdellago: {
      location: 'Puertos del Lago, Escobar', title: 'Puertos del Lago', entrega: 'Barrio privado',
      desc: 'Puertos ofrece un verdadero cambio en tu calidad de vida: seguridad, tranquilidad y contacto con la naturaleza sin resignar infraestructura. Con acceso directo desde la Panamericana, un lugar con lotes, casas, departamentos, townhouses, hotel y oficinas.',
      tags: ['Al lago', 'Club House', 'Gimnasio', 'Cancha de Tenis', 'Centro de deportes'],
      code: 'JPN61971',
      images: ['assets/images/emprendimientos/61971.jpg'],
      wa: 'https://api.whatsapp.com/send?phone=5491165185675&text=Hola%20Julieta%2C%20quiero%20informaci%C3%B3n%20sobre%20Puertos%20del%20Lago'
    },
    elcanton: {
      location: 'El Cantón, Escobar (Maschwitz)', title: 'El Cantón Barrio Privado', entrega: 'Barrio privado',
      desc: 'Ubicado en Maschwitz, Km 45 de Panamericana. Desarrollado sobre 500 hectáreas, compuesto por 4 barrios: Norte, Islas, Golf y Puerto. Lotes de 800 m² promedio, el 65% con vista a lagunas internas.',
      tags: ['Al lago', 'Cancha de Golf', 'Club House', 'Seguridad 24hs'],
      code: 'JPN45786',
      images: ['assets/images/emprendimientos/45786.jpg'],
      wa: 'https://api.whatsapp.com/send?phone=5491165185675&text=Hola%20Julieta%2C%20quiero%20informaci%C3%B3n%20sobre%20El%20Cant%C3%B3n%20Barrio%20Privado'
    },
    sanmatias: {
      location: 'San Matías, Escobar', title: 'Barrio Privado San Matías', entrega: 'Barrio privado',
      desc: 'Zona de antiguas quintas residenciales sobre las barrancas del río Luján, con añosas arboledas. Más de 2.000 árboles de 120 especies. 200 hectáreas divididas en cinco sectores con dos grandes lagunas.',
      tags: ['Al lago', 'Pileta climatizada', 'Club House', 'Seguridad 24hs'],
      code: 'JPN45782',
      images: ['assets/images/emprendimientos/45782.jpg'],
      wa: 'https://api.whatsapp.com/send?phone=5491165185675&text=Hola%20Julieta%2C%20quiero%20informaci%C3%B3n%20sobre%20San%20Mat%C3%ADas'
    },
    cabrera: {
      location: 'Cabrera al 6000, Palermo Hollywood', title: 'Emprendimiento Cabrera', entrega: 'Entrega: Noviembre 2025',
      desc: 'Proyecto sustentable en el corazón de Palermo Hollywood. 9 pisos con 18 unidades funcionales, semipisos de 2 ambientes con ventilación cruzada y cocina integrada. Acepta financiación.',
      tags: ['Apto mascotas', 'Apto profesional', 'Ascensor'],
      code: 'JBU67389',
      images: ['assets/images/emprendimientos/67389.jpg'],
      wa: 'https://api.whatsapp.com/send?phone=5491165185675&text=Hola%20Julieta%2C%20quiero%20informaci%C3%B3n%20sobre%20el%20Emprendimiento%20Cabrera%20en%20Palermo%20Hollywood'
    },
    humboldt: {
      location: 'Humboldt al 2200, Palermo', title: 'Emprendimiento Humboldt', entrega: 'En construcción',
      desc: 'Proyecto premium y sustentable en el corazón de Palermo. 12 pisos, 39 unidades de 1, 2 y 3 ambientes con balcón y cocina integrada. Amenities en altura: SUM con parrilla, terraza y solárium.',
      tags: ['Hidromasaje', 'Solarium', 'SUM'],
      code: 'JBU65998',
      images: ['assets/images/emprendimientos/65998.jpg'],
      wa: 'https://api.whatsapp.com/send?phone=5491165185675&text=Hola%20Julieta%2C%20quiero%20informaci%C3%B3n%20sobre%20el%20Emprendimiento%20Humboldt%20en%20Palermo'
    },
    colegiales: {
      location: 'Colegiales, CABA', title: 'Emprendimiento Colegiales', entrega: 'Entrega: Enero 2024',
      desc: 'Edificio a estrenar con amenities, a metros de la estación Colegiales y de las avenidas Cabildo y Federico Lacroze. Departamentos de 1, 2 y 3 ambientes; planta baja comercial y gastronómica.',
      tags: ['Pileta', 'SUM', 'Seguridad 24hs'],
      code: 'JBU57357',
      images: ['assets/images/emprendimientos/57357.jpg'],
      wa: 'https://api.whatsapp.com/send?phone=5491165185675&text=Hola%20Julieta%2C%20quiero%20informaci%C3%B3n%20sobre%20el%20Emprendimiento%20Colegiales'
    },
    vila: {
      location: 'Parque Batlle, Montevideo — Uruguay', title: 'Emprendimiento 01 Vila', entrega: 'Entrega: Junio 2025',
      desc: 'Desarrollo con foco en el concepto de housing: naturaleza, movilidad sustentable y tecnología. Tres bloques independientes enlazados por patios verdes con vegetación autóctona.',
      tags: ['Parrilla', 'Solarium', 'SPA'],
      code: 'JBU63796',
      images: ['assets/images/emprendimientos/63796.jpg'],
      wa: 'https://api.whatsapp.com/send?phone=5491165185675&text=Hola%20Julieta%2C%20quiero%20informaci%C3%B3n%20sobre%20el%20Emprendimiento%2001%20Vila%20en%20Montevideo'
    },
    malvin: {
      location: 'Malvín, Montevideo — Uruguay', title: 'Nostrum Malvín Torre 2', entrega: 'Entrega: Abril 2025',
      desc: 'Torre diseñada por el arquitecto Carlos Ott junto a Carlos Ponce de León Arquitectos. 92 unidades monoambiente, 1, 2 y 3 dormitorios con vistas panorámicas a la rambla.',
      tags: ['Gimnasio', 'Club House', 'Zonas Verdes'],
      code: 'JBU63686',
      images: ['assets/images/emprendimientos/63686.jpg'],
      wa: 'https://api.whatsapp.com/send?phone=5491165185675&text=Hola%20Julieta%2C%20quiero%20informaci%C3%B3n%20sobre%20Nostrum%20Malv%C3%ADn%20Torre%202'
    },
    nazca: {
      location: 'Villa del Parque, CABA', title: 'Emprendimiento Nazca', entrega: 'Entrega: Agosto 2024',
      desc: 'Desarrollo de 9 pisos con 46 unidades de 2, 3 y 4 ambientes, 26 cocheras y guardado de bicicletas en subsuelo. Muy buena conectividad, cerca de las estaciones Concordia y Nazca.',
      tags: ['Seguridad 24hs'],
      code: 'JBU57256',
      images: ['assets/images/emprendimientos/57256.jpg'],
      wa: 'https://api.whatsapp.com/send?phone=5491165185675&text=Hola%20Julieta%2C%20quiero%20informaci%C3%B3n%20sobre%20el%20Emprendimiento%20Nazca'
    }
  };

  const modalGallery = { images: [], index: 0 };

  function renderModalGallery() {
    const mainImg = document.getElementById('modalMainImg');
    mainImg.src = modalGallery.images[modalGallery.index];
    const thumbs = document.getElementById('modalThumbs');
    thumbs.querySelectorAll('img').forEach((im, i) => im.classList.toggle('active', i === modalGallery.index));
    const counter = document.getElementById('modalImgCounter');
    const multi = modalGallery.images.length > 1;
    if (counter) {
      counter.style.display = multi ? 'block' : 'none';
      counter.textContent = (modalGallery.index + 1) + ' / ' + modalGallery.images.length;
    }
    document.querySelectorAll('.modal-nav-arrow').forEach(a => a.classList.toggle('hidden', !multi));
  }

  function showModalImage(index) {
    const total = modalGallery.images.length;
    modalGallery.index = (index + total) % total;
    renderModalGallery();
  }

  function modalNextImage() { showModalImage(modalGallery.index + 1); }
  function modalPrevImage() { showModalImage(modalGallery.index - 1); }

  function setupModalGallery(images) {
    const base = window.SITE_BASE || '';
    modalGallery.images = images.map(src => base + src);
    modalGallery.index = 0;
    const thumbs = document.getElementById('modalThumbs');
    thumbs.innerHTML = '';
    if (modalGallery.images.length > 1) {
      modalGallery.images.forEach((src, i) => {
        const t = document.createElement('img');
        t.src = src;
        t.onclick = () => showModalImage(i);
        thumbs.appendChild(t);
      });
      thumbs.style.display = 'flex';
    } else {
      thumbs.style.display = 'none';
    }
    renderModalGallery();
  }

  function openPropertyModal(id) {
    const data = PROPERTY_DATA[id];
    const overlay = document.getElementById('propertyModalOverlay');
    if (!data || !overlay) return;

    document.getElementById('modalLocation').textContent = '📍 ' + data.location;
    document.getElementById('modalTitle').textContent = data.title;
    document.getElementById('modalDesc').textContent = data.desc;
    document.getElementById('modalPrice').innerHTML = data.price + (data.priceSuffix ? '<sup style="font-size:0.55em;">' + data.priceSuffix + '</sup>' : '');
    document.getElementById('modalCode').textContent = 'Ref. ' + data.code;
    document.getElementById('modalCta').href = data.wa;

    const badgeRow = document.getElementById('modalBadgeRow');
    badgeRow.innerHTML = '';
    if (data.badge) badgeRow.innerHTML += '<span class="m-badge">' + data.badge + '</span>';
    if (data.op) badgeRow.innerHTML += '<span class="m-op">' + data.op + '</span>';

    const metaWrap = document.getElementById('modalMeta');
    metaWrap.style.display = '';
    metaWrap.innerHTML = '';
    Object.keys(data.specs).forEach(key => {
      metaWrap.innerHTML += '<div><strong>' + data.specs[key] + '</strong><span>' + (SPEC_LABELS[key] || key) + '</span></div>';
    });
    const tagWrap = document.getElementById('modalTagRow');
    if (tagWrap) tagWrap.style.display = 'none';

    setupModalGallery(data.images);
    overlay.classList.add('open');
    document.body.style.overflow = 'hidden';
  }

  function openEmprendimientoModal(id) {
    const data = EMPRENDIMIENTO_DATA[id];
    const overlay = document.getElementById('propertyModalOverlay');
    if (!data || !overlay) return;

    document.getElementById('modalLocation').textContent = '📍 ' + data.location;
    document.getElementById('modalTitle').textContent = data.title;
    document.getElementById('modalDesc').textContent = data.desc;
    document.getElementById('modalPrice').textContent = data.entrega;
    document.getElementById('modalCode').textContent = 'Ref. ' + data.code;
    document.getElementById('modalCta').href = data.wa;

    const badgeRow = document.getElementById('modalBadgeRow');
    badgeRow.innerHTML = '';

    const metaWrap = document.getElementById('modalMeta');
    metaWrap.style.display = 'none';
    const tagWrap = document.getElementById('modalTagRow');
    if (tagWrap) {
      tagWrap.innerHTML = data.tags.map(t => '<span>' + t + '</span>').join('');
      tagWrap.style.display = 'flex';
    }

    setupModalGallery(data.images);
    overlay.classList.add('open');
    document.body.style.overflow = 'hidden';
  }

  function closePropertyModal() {
    const overlay = document.getElementById('propertyModalOverlay');
    if (overlay) overlay.classList.remove('open');
    document.body.style.overflow = '';
  }

  document.addEventListener('keydown', (e) => {
    const overlay = document.getElementById('propertyModalOverlay');
    const isOpen = overlay && overlay.classList.contains('open');
    if (e.key === 'Escape') closePropertyModal();
    if (isOpen && e.key === 'ArrowRight') modalNextImage();
    if (isOpen && e.key === 'ArrowLeft') modalPrevImage();
  });

  function handleSubmit(e) {
    e.preventDefault();
    const btn = document.getElementById('submitBtn');
    btn.textContent = 'Enviando...';
    btn.disabled = true;
    setTimeout(() => {
      btn.style.display = 'none';
      document.getElementById('form-success').style.display = 'block';
    }, 1200);
  }

  // Auto-select filter tab from URL (e.g. propiedades.html?filtro=alquiler)
  document.addEventListener('DOMContentLoaded', () => {
    const params = new URLSearchParams(window.location.search);
    const filtro = params.get('filtro');
    if (filtro) {
      const tab = document.querySelector('.filter-tab[data-filter="' + filtro + '"]');
      if (tab) tab.click();
    }
  });