export const ContactPageData = {
  contactFields: [
    { label: 'Nombre y apellidos *', type: 'text', name: 'name' },
    { label: 'Email *', type: 'email', name: 'email' },
    { label: 'Mensaje *', type: 'textarea', name: 'message' },
  ] as const,
  videoSection: {
    src: 'assets/videos/contact-video.mp4',
    type: 'video/mp4',
  },
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
  iconsSection: [
    {
      iconLink: 'assets/icons/address.webp',
      title: 'Dirección:',
      subtitle: 'Calle montecorto 2 Badajoz, Los Santos de Maimona',
      textLink: 'https://maps.app.goo.gl/XVkBcER8389CgkKj8',
    },
    {
      iconLink: 'assets/icons/phone.webp',
      title: 'Teléfono:',
      subtitle: '+34 674 05 58 37',
      textLink: 'tel:+34674055837',
    },
    {
      iconLink: 'assets/icons/whatsapp.webp',
      title: 'WhatsApp',
      subtitle: '+34 674 05 58 37',
      textLink: 'https://wa.me/34674055837',
    },
    {
      iconLink: 'assets/icons/email.webp',
      title: 'Email:',
      subtitle: 'tattoostudiofineline@gmail.com',
      textLink: 'mailto:tattoostudiofineline@gmail.com',
    },
  ],
  openingHours: [
    { day: 'lunes', hours: ['10:00 - 13:00', '16:30 - 20:00'] },
    { day: 'martes', hours: ['10:00 - 13:00', '16:30 - 20:00'] },
    { day: 'miércoles', hours: ['10:00 - 13:00', '16:30 - 20:00'] },
    { day: 'jueves', hours: ['10:00 - 13:00', '16:30 - 20:00'] },
    { day: 'viernes', hours: ['10:00 - 13:00', '16:30 - 20:00'] },
    { day: 'sábado', hours: ['Cerrado'] },
    { day: 'domingo', hours: ['Cerrado'] },
  ],
  mapUrl:
    'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3105.940406869976!2d-6.978778524595412!3d38.87960524775458!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xd16e439937cd04f%3A0x2b270cc779adf548!2sC.%20Vasco%20N%C3%BA%C3%B1ez%202%20Tramo%2C%2006001%20Badajoz!5e0!3m2!1ses!2ses!4v1746790096662!5m2!1ses!2ses',
};
