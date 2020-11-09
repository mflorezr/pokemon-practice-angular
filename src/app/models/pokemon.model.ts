export interface Pokemon {
  id: number,
  name: string,
  image?: string,
  description?: string,
  height?: number,
  weight?: number,
  gender?: string,
  types?: Type[],
  abilities?: Ability[],
  stats?: Stat[],
  url?: string;
  sprites?: {
    front_default: string
  },
  flavor_text_entries?: Description[]
  gender_rate?: number,
};

export interface Description {
  flavor_text: string
};

export interface Stat {
  base_stat: number,
  stat: {
    name: string,
  }
};

export interface Ability {
  ability: {
    name: string
  }
};

export interface Type {
  type: {
    name: string
  }
};