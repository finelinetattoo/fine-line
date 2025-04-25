export enum BodyPart {
  ARM = 'ARM',
  LEG = 'LEG',
  BACK = 'BACK',
  CHEST = 'CHEST',
  NECK = 'NECK',
  HAND = 'HAND',
  FOOT = 'FOOT',
  HEAD = 'HEAD',
  OTHER = 'OTHER',
}
export const BodyPartLabels: Record<BodyPart, string> = {
  [BodyPart.ARM]: 'Brazo',
  [BodyPart.LEG]: 'Pierna',
  [BodyPart.BACK]: 'Espalda',
  [BodyPart.CHEST]: 'Pecho',
  [BodyPart.NECK]: 'Cuello',
  [BodyPart.HAND]: 'Mano',
  [BodyPart.FOOT]: 'Pie',
  [BodyPart.HEAD]: 'Cabeza',
  [BodyPart.OTHER]: 'Otro',
};
