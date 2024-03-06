import { InfiniteData, useInfiniteQuery } from "react-query";
import {
  StyleSheet,
  FlatList,
  View,
  Modal,
  Text,
  Pressable,
  ActivityIndicator,
} from "react-native";
import { API_URL } from "../../constants/constants";
import { TInfinteData, TPokemon, TPokemonListItem } from "../../types/types";
import Pokemon from "../Pokemon/Pokemon";
import { useContext, useEffect, useState } from "react";
import PokemonModal from "../PokemonModal/PokemonModal";
import PokemonListContext from "../../context/PokemonListContext";

export default function PokemonList() {
  const [currentPokemon, setCurrentPokemon] = useState<TPokemon | null>(null);
  const [modalVisible, setModalVisible] = useState(false);

  const { setPokemonList } = useContext(PokemonListContext);

  const fetchPokemons = async ({
    pageParam = `${API_URL}?limit=5&offset=0`,
  }) => {
    const pokemons = await fetch(pageParam).then((res) => res.json());

    setPokemonList(pokemons.results);
    return pokemons;
  };

  const {
    data: pokemonList,
    isLoading,
    fetchNextPage,
    // isError,
    // hasNextPage,
    isFetchingNextPage,
  } = useInfiniteQuery<TInfinteData<TPokemonListItem>>({
    queryKey: ["pokemons"],
    queryFn: fetchPokemons,
    getNextPageParam: (lastPage: any) => lastPage.next,
  });

  const pokemons = pokemonList?.pages.flatMap((page) => page.results);

  useEffect(() => {
    !modalVisible && setCurrentPokemon(null);
  }, [modalVisible]);

  useEffect(() => {
    currentPokemon && setModalVisible(true);
  }, [currentPokemon]);

  return (
    <>
      <FlatList
        style={styles.pokemonsContainer}
        data={pokemons}
        renderItem={({ item }) => {
          return (
            <Pokemon
              pokemonData={item}
              onPress={(pokemon?: TPokemon) => {
                pokemon && setCurrentPokemon(pokemon);
              }}
            />
          );
        }}
        keyExtractor={(pokemon) => pokemon.name}
        onEndReached={() => fetchNextPage()}
      />
      {isLoading ||
        (isFetchingNextPage && (
          <ActivityIndicator size="large" color="black" />
        ))}
      {currentPokemon && (
        <PokemonModal
          modalVisible={modalVisible}
          setModalVisible={setModalVisible}
        >
          <Pokemon
            pokemonData={currentPokemon}
            isSinglePokemon={true}
            isInsideModal={true}
          />
        </PokemonModal>
      )}
    </>
  );
}

const styles = StyleSheet.create({
  pokemonsContainer: {
    flex: 1,
    width: "100%",
    padding: "5%",
  },
});
