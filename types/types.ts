export type TPokemon = {
  name: string;
  weight: number;
  height: number;
  base_experience: number;
  sprites: {
    front_default: string;
  };
};

export type TPokemonListItem = {
  name: string;
  url: string;
};

export type TFavoritePokemonContext = {
  favoritePokemon: TPokemon | null;
  getFavoritePokemon: (pokemon: TPokemon) => void;
  setFavoritePokemon: (pokemon: TPokemon | null) => void;
};

export type TPokemonListContext = {
  pokemonList: TPokemon[];
  setPokemonList: (pokemon: TPokemon[]) => void;
};

export type TInfinteData<T> = {
  results: T[];
  next: string;
  previous: string;
};

export type TMarker = {
  latlng: {
    latitude: number;
    longitude: number;
  };
  pokemon?: TPokemon;
};
