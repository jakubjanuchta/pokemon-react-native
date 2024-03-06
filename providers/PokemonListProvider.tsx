import { useState } from "react";
import PokemonListContext from "../context/PokemonListContext";
import { TPokemon } from "../types/types";

export default function PokemonListProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [pokemonList, setPokemonList] = useState<TPokemon[]>([]);

  const setList = (newPokemonList: TPokemon[]) => {
    setPokemonList((prevList) => {
      const updatedList = prevList;

      newPokemonList.forEach((newPokemon) => {
        if (!updatedList.some((pokemon) => pokemon.name === newPokemon.name)) {
          updatedList.push(newPokemon);
        }
      });

      return updatedList;
    });
  };

  return (
    <PokemonListContext.Provider
      value={{
        pokemonList,
        setPokemonList: setList,
      }}
    >
      {children}
    </PokemonListContext.Provider>
  );
}
