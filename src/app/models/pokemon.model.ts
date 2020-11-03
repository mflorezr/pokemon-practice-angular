export interface Pokemon {
  id: number,
  name: string,
  image?: string,
  description?: string,
  height?: number,
  weight?: number,
  gender?: string,
  types?: [
    {
      type: {
        name: string
      }
    }
  ],
  abilities?: [
    {
      ability: {
        name: string
      }
    }
  ]
  stats?: [
    {
      base_stat: number,
      stat: {
        name: string,
      }
    }
  ],
  url?: string;
};