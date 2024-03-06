import { useEffect, useState } from "react";
import FavoritePokemonContext from "../context/FavoritePokemonContext";
import { POKEMON_STORAGE_KEY } from "../constants/constants";
import { getData, storeData } from "../storage/storage";
import { TPokemon } from "../types/types";

export default function FavouritePokemonProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [favoritePokemon, setFavoritePokemon] = useState<TPokemon | null>(null);

  const getPokemon = () => {
    getData(POKEMON_STORAGE_KEY).then((data) => {
      if (data) {
        setPokemon(data as TPokemon);
      }
    });
  };
  const setPokemon = (pokemon: TPokemon | null) => {
    storeData(POKEMON_STORAGE_KEY, pokemon);
    setFavoritePokemon(pokemon);
  };

  useEffect(() => {
    getPokemon();
  }, []);

  return (
    <FavoritePokemonContext.Provider
      value={{
        favoritePokemon,
        getFavoritePokemon: getPokemon,
        setFavoritePokemon: setPokemon,
      }}
    >
      {children}
    </FavoritePokemonContext.Provider>
  );
}
