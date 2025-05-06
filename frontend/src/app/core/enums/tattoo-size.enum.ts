export enum TattooSize {
  SMALL = 'SMALL',
  MEDIUM = 'MEDIUM',
  LARGE = 'LARGE',
  XLARGE = 'XLARGE',
}
export const TattooSizeLabels: Record<TattooSize, string> = {
  [TattooSize.SMALL]: 'Pequeño',
  [TattooSize.MEDIUM]: 'Mediano',
  [TattooSize.LARGE]: 'Grande',
  [TattooSize.XLARGE]: 'Muy grande',
};
