export const recommendationsPageData = {
  instructionsSection: {
    title: 'Intrucciones el día de tu cita',
    paragraphs: [
      'El día de tu cita, asegúrate de haber dormido bien y de venir con el estómago lleno para evitar mareos o bajadas de tensión.',
      'Lleva ropa cómoda que permita acceder fácilmente a la zona donde se realizará el tatuaje, y evita aplicar cremas o productos en esa área.',
    ],
    imageSrc: 'assets/images/recommendations/recommendations-first-day.webp',
    imageAlt: 'instrucciones el día de tu cita',
    imagePosition: 'right',
    backgroundClass: '',
    imageStyle: 'square',
  } as const,

  aftercareSection: {
    heading: 'Cuidados posteriores',
    mainParagraph:
      'Cuidar tu tatuaje es tan importante como el diseño en sí. ¡Una buena cicatrización es clave para que el arte en tu piel luzca impecable por años!',
    secondaryParagraph:
      'Después de hacerte el tatuaje, es fundamental seguir ciertos cuidados para asegurar una correcta cicatrización y preservar la calidad del diseño:',
    paragraphs: [
      '1. Mantén el vendaje inicial durante al menos 2-4 horas tras la sesión. Luego, retíralo con las manos limpias.',
      '2. Lava la zona con agua tibia y jabón neutro, sin perfumes ni alcohol. Sécala con una toalla limpia dando pequeños toques, sin frotar.',
      '3. Aplica una crema cicatrizante recomendada por tu tatuador, en capa fina y uniforme. Repite este proceso 2 o 3 veces al día.',
      '4. Evita rascarte o arrancar las costras que se formen durante la curación. Es parte natural del proceso.',
      '5. No expongas el tatuaje al sol, ni a piscinas, saunas o el mar durante al menos 2-3 semanas.',
      '6. Viste ropa holgada que no roce o irrite la zona tatuada.',
      '7. Evita el ejercicio intenso las primeras 48 horas, especialmente si el tatuaje está en una zona de fricción o sudoración.',
    ],
    imageSrc: 'assets/images/recommendations/aftercare.webp',
    imageAlt: 'cuidados posteriores',
    imagePosition: 'left',
    backgroundClass: '',
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
