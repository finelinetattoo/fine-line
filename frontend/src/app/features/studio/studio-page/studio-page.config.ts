export const studioPageData = {
  parallaxSection: {
    parallaxBgClass: 'bg-about',
    title: 'Un estudio de confianza',
    description:
      'Un estudio diseñado para ofrecer calma, confianza y arte en cada detalle.',
  },

  whatWeDoSection: {
    title: 'Qué hacemos',
    paragraphs: [
      'Más que un lugar para tatuarse, Fine Line es un espacio para conectar con el arte y sentirte cómodo desde el primer momento.',
      'Cuidamos cada aspecto del ambiente para que la experiencia sea íntima, segura y personalizada.',
    ],
    imageSrc: 'assets/images/studio/espacio-studio.webp',
    imageAlt: 'Interior del estudio Fine Line',
    imagePosition: 'down',
    backgroundClass: 'bg-beige',
    imageStyle: 'square',
  } as const,

  microrealismImages: [
    'assets/images/tattoos/tattoo-bird.webp',
    'assets/images/tattoos/tattoo-face.webp',
    'assets/images/tattoos/tattoo-hands.webp',
  ],

  geometricsImages: [
    'assets/images/tattoos/tattoo-plant.webp',
    'assets/images/tattoos/tattoo-sculture.webp',
    'assets/images/tattoos/tattoo-arm.webp',
  ],

  micropigmentationSection: {
    title: 'Micropigmentación',
    paragraphs: [
      'Muy pronto ofreceremos un servicio de micropigmentación profesional, pensado para realzar tu belleza natural con precisión, sutileza y los más altos estándares de higiene.',
    ],
    imageSrc: 'assets/images/micropigmentation/micropigmentation-studio.webp',
    imageAlt: 'Interior del estudio Fine Line',
    imagePosition: 'down',
    backgroundClass: 'bg-beige',
    imageStyle: 'square',
  } as const,

  wantGetTattoo: {
    parallaxBgClass: 'bg-get-tattoo',
    title: '¿Quieres hacerte un tatuaje?',
    description:
      'Te acompañamos en cada paso para que tu tatuaje sea una experiencia única.',
    buttonLabel: 'Reserva tu cita',
    buttonLink: '/reserva-cita',
  },

  socialSection: {
    backgroundClass: 'bg-granite',
  },
};
