export const homePageData = {
  parallaxSection: {
    parallaxBgClass: 'bg-about',
    title: '¿Qué es Fine Line?',
    description:
      'Fine Line es un estudio donde el arte minimalista cobra vida. Nuestro espacio refleja equilibrio, calma y una estética cuidada, ofreciendo tatuajes de precisión con un enfoque moderno y profesional.',
    buttonLabel: 'Reserva tu cita',
    buttonLink: '/reserva-cita',
  },

  heroCarousel: {
    images: [
      'assets/images/carousel/carousel1.jpeg',
      'assets/images/carousel/carousel2.jpeg',
      'assets/images/carousel/carousel3.jpeg',
    ],
    title: 'FINE LINE Tattoo',
    subtitle: 'Un estudio diferente',
    paragraph1:
      'Estudio de estilo minimalista donde el arte toma forma con precisión y detalle.',
    paragraph2: 'Microrealismo y geometría para quienes buscan algo único.',
    buttonLabel: 'Contáctanos',
    buttonLink: '/contacto',
  },

  hoverCards: {
    mainTitle: 'Qué hacemos',
    cards: [
      {
        title: 'Tatuajes',
        imageMain: 'assets/images/tattoos/tatuaje-brazo-calavera.jpg',
        imageOverlay: 'assets/images/tattoos/tatuaje-dibujo.webp',
        ctaLink: '/portafolio',
        ctaLabel: 'Trabajos realizados',
        decoration: 'assets/icons/tatuaje.png',
      },
      {
        title: 'Kit post-tatuaje',
        imageMain: 'assets/images/kit-tattoo/kit-post-tatuaje.webp',
        imageOverlay: 'assets/images/kit-tattoo/kit-post-tatuaje-overlay.webp',
        ctaLink: '/recomendaciones',
        ctaLabel: 'Ver recomendaciones',
        decoration: 'assets/icons/band-aid.png',
      },
    ],
  },

  soonSectionCards: {
    mainTitle: 'Próximamente',
    cards: [
      {
        title: 'Micropigmentación',
        imageMain: 'assets/images/micropigmentation/micropigmentacion.png',
        imageOverlay:
          'assets/images/micropigmentation/micropigmentacion-labios.webp',
        ctaLink: '',
        ctaLabel: '',
        decoration: 'assets/icons/lapiz-de-cejas.png',
      },
    ],
  },

  teamSection: {
    title: 'Nuestro equipo',
    paragraphs: [
      'Fine Line cuenta con Liz, nuestra artista especializada en microrealismo, geometría y técnicas avanzadas de cuidado de la piel.',
      'Su atención al detalle y su enfoque meticuloso garantizan una experiencia estética única, profesional y personalizada para cada cliente.',
    ],
    buttonLabel: 'Contacta',
    buttonLink: '/contacto',
    imageSrc: 'assets/images/artists/liz.webp',
    imageAlt: 'Liz, artista de Fine Line',
    imagePosition: 'left',
    backgroundClass: 'bg-beige',
    imageStyle: 'rounded',
  } as const,

  spaceSection: {
    title: 'Nuestro espacio',
    paragraphs: [
      'El estudio Fine Line está diseñado para ofrecer una atmósfera de calma, limpieza y estética minimalista.',
      'Cada detalle ha sido pensado para asegurar comodidad, intimidad y una experiencia única tanto para el cliente como para el artista.',
    ],
    buttonLabel: 'Ver estudio',
    buttonLink: '/estudio',
    imageSrc: 'assets/images/studio/espacio-studio.webp',
    imageAlt: 'Interior del estudio Fine Line',
    imagePosition: 'right',
    backgroundClass: 'bg-granite',
    imageStyle: 'square',
  } as const,

  testimonials: {
    mainTitle: 'Lo que dicen nuestros clientes',
    quotes: [
      {
        quote:
          'Un trato impecable y el diseño quedó espectacular. 100% recomendable.',
        name: 'Claudia M.',
        rating: 5,
      },
      {
        quote:
          'Me sentí muy cómoda durante toda la sesión. Profesional y limpio.',
        name: 'Alejandro G.',
        rating: 4.5,
      },
      {
        quote:
          'La precisión y detalle del trabajo superaron mis expectativas. Sin duda volveré.',
        name: 'Sofía L.',
        rating: 5,
      },
      {
        quote:
          'El ambiente transmite mucha calma y profesionalismo. Excelente experiencia desde el primer momento.',
        name: 'Martín P.',
        rating: 4,
      },
    ],
  },

  socialSection: {
    backgroundClass: 'bg-granite',
  },
};
