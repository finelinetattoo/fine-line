export enum TattooStyle {
  MICROREALISM = 'MICROREALISM',
  GEOMETRIC = 'GEOMETRIC',
  TRADITIONAL = 'TRADITIONAL',
  JAPANESE = 'JAPANESE',
  DOTWORK = 'DOTWORK',
  MINIMALIST = 'MINIMALIST',
  TRIBAL = 'TRIBAL',
  WATERCOLOUR = 'WATERCOLOUR',
  REALISTIC = 'REALISTIC',
  ABSTRACT = 'ABSTRACT',
}

export const TattooStyleLabels: Record<TattooStyle, string> = {
  [TattooStyle.MICROREALISM]: 'Microrealismo',
  [TattooStyle.GEOMETRIC]: 'Geométrico',
  [TattooStyle.TRADITIONAL]: 'Tradicional',
  [TattooStyle.JAPANESE]: 'Japonés',
  [TattooStyle.DOTWORK]: 'Dotwork',
  [TattooStyle.MINIMALIST]: 'Minimalista',
  [TattooStyle.TRIBAL]: 'Tribal',
  [TattooStyle.WATERCOLOUR]: 'Acuarela',
  [TattooStyle.REALISTIC]: 'Realista',
  [TattooStyle.ABSTRACT]: 'Abstracto',
};
