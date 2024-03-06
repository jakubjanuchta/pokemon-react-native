import { useQuery } from "react-query";
import {
  StyleSheet,
  Text,
  View,
  Image,
  Pressable,
  ActivityIndicator,
} from "react-native";
import { TPokemon, TPokemonListItem } from "../../types/types";
import { MaterialIcons } from "@expo/vector-icons";
import { Dispatch, SetStateAction, useContext, useState } from "react";
import FavoritePokemonContext from "../../context/FavoritePokemonContext";

export default function Pokemon({
  pokemonData,
  isSinglePokemon,
  isInsideModal,
  isInsideMap,
  onPress,
}: {
  pokemonData: TPokemonListItem | TPokemon;
  isSinglePokemon?: boolean;
  isInsideModal?: boolean;
  isInsideMap?: boolean;
  onPress?: (pokemon?: TPokemon) => void;
}) {
  const { favoritePokemon, setFavoritePokemon } = useContext(
    FavoritePokemonContext
  );

  const isFavorite = favoritePokemon?.name === pokemonData.name;

  const {
    data: pokemon,
    isLoading,
    isError,
  } = useQuery<TPokemon>(pokemonData.name, () => {
    if (isSinglePokemon) {
      const singlePokemonData = pokemonData as TPokemon;

      return singlePokemonData;
    } else {
      const multiplePokemonData = pokemonData as TPokemonListItem;

      return fetch(multiplePokemonData.url)
        .then((response) => response.json())
        .then((data) => {
          return data;
        });
    }
  });

  const onFavoritePress = () => {
    setFavoritePokemon(isFavorite || !pokemon ? null : pokemon);
  };

  return (
    <Pressable onPress={() => onPress && onPress(pokemon)}>
      <View
        style={[
          styles.container,
          {
            width: isInsideModal ? 280 : "100%",
            height: isSinglePokemon
              ? isInsideModal
                ? 500
                : "90%"
              : isInsideMap
              ? 150
              : 300,

            shadowOpacity: isInsideModal ? 0 : 0.25,
            shadowRadius: isInsideModal ? 0 : 3.84,
            elevation: isInsideModal ? 0 : 5,
            flexDirection: isInsideModal ? "column" : "row",
          },
        ]}
      >
        <Image
          style={[
            styles.thumbnail,
            {
              width: isInsideModal ? 200 : isInsideMap ? 80 : "40%",
              height: isInsideModal ? 200 : isInsideMap ? 80 : "100%",
              marginLeft: isInsideMap ? 10 : 0,
            },
          ]}
          source={{
            uri: pokemon?.sprites.front_default,
          }}
        />
        {!isInsideModal && !isInsideMap && <View style={styles.separator} />}
        <View style={styles.content}>
          {isSinglePokemon && (
            <Pressable onPress={onFavoritePress}>
              <MaterialIcons
                name={isFavorite ? "favorite" : "favorite-border"}
                size={24}
                color={isFavorite ? "#f4511e" : "black"}
              />
            </Pressable>
          )}
          <Text
            style={[
              styles.name,
              {
                fontSize: isInsideMap ? 15 : 25,
              },
            ]}
          >
            {pokemonData.name}
          </Text>
          {!isInsideMap && (
            <View style={styles.valuesContainer}>
              <Text style={styles.text}>
                <Text style={styles.textBold}>Weight: </Text>
                {pokemon?.weight}
              </Text>
              <Text style={styles.text}>
                <Text style={styles.textBold}>Height: </Text>
                {pokemon?.height}
              </Text>
              {isSinglePokemon && (
                <Text style={styles.text}>
                  <Text style={styles.textBold}>Base experience: </Text>
                  {pokemon?.base_experience}
                </Text>
              )}
            </View>
          )}
        </View>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    marginBottom: 10,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-start",
    gap: 10,
    backgroundColor: "#fff",
    borderRadius: 5,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
  },
  thumbnail: {
    borderRadius: 5,
    resizeMode: "contain",
  },
  separator: {
    height: "70%",
    width: 0.5,
    backgroundColor: "grey",
  },
  content: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    gap: 10,
    height: "100%",
    padding: 5,
  },
  name: {
    padding: 20,
    fontWeight: "bold",
    textTransform: "capitalize",
  },
  valuesContainer: {
    alignItems: "flex-start",
    justifyContent: "center",
    gap: 10,
  },
  text: {
    fontSize: 16,
  },
  textBold: {
    fontWeight: "bold",
  },
});
