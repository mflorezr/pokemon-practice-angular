export interface Pokemon {
  id: number,
  name: string,
  image: string,
  description?: string,
  height: number,
  weight: number,
  gender?: string,
  types: any,
  abilities: any,
  stats: any
};