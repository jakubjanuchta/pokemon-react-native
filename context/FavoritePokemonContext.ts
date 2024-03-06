import { createContext } from "react";
import { TFavoritePokemonContext } from "../types/types";

const FavoritePokemonContext = createContext<TFavoritePokemonContext>({
  favoritePokemon: null,
  getFavoritePokemon: () => {},
  setFavoritePokemon: () => {},
});

export default FavoritePokemonContext;
