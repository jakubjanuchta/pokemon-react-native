import { createContext } from "react";
import { TPokemonListContext, TPokemon } from "../types/types";

const PokemonListContext = createContext<TPokemonListContext>({
  pokemonList: [],
  setPokemonList: (pokemon: TPokemon[]) => {},
});

export default PokemonListContext;
