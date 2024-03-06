import React, { useContext, useState } from "react";
import { FlatList, Pressable, StyleSheet, View, Text } from "react-native";
import MapView, { Marker, MapPressEvent } from "react-native-maps";
import { TMarker, TPokemon } from "../../types/types";
import PokemonModal from "../PokemonModal/PokemonModal";
import Pokemon from "../Pokemon/Pokemon";
import PokemonListContext from "../../context/PokemonListContext";
import { Feather } from "@expo/vector-icons";

export default function PokemonMap({}: {}) {
  const [markers, setMarkers] = useState<TMarker[]>([]);
  const [newMarker, setNewMarker] = useState<TMarker | null>(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedPokemon, setSelectedPokemon] = useState<TPokemon | null>(null); // [1
  const { pokemonList } = useContext(PokemonListContext);

  const handlePress = (pokemon?: TPokemon) => {
    if (newMarker?.latlng) {
      setMarkers((prev) => {
        return [...prev, { ...newMarker, pokemon }];
      });
      setNewMarker(null);
    }

    setModalVisible(false);
  };

  const removeMarker = () => {
    setMarkers((prevMarkers) => {
      return prevMarkers.filter(
        (marker) => marker.pokemon?.name !== selectedPokemon?.name
      );
    });

    setSelectedPokemon(null);
    setModalVisible(false);
  };

  const onMapPress = (e: MapPressEvent) => {
    const coord = e.nativeEvent.coordinate;
    const existingMarker = markers.find(
      (marker) =>
        marker.latlng.latitude === coord.latitude &&
        marker.latlng.longitude === coord.longitude
    );

    if (existingMarker) {
      const { pokemon } = existingMarker;
      pokemon && setSelectedPokemon(pokemon);
    } else {
      setNewMarker({ latlng: coord });
    }

    setModalVisible(true);
  };

  return (
    <>
      <MapView
        style={styles.map}
        initialRegion={{
          latitude: 50.0614,
          longitude: 19.9366,
          latitudeDelta: 0.0122,
          longitudeDelta: 0.0121,
        }}
        onPress={onMapPress}
      >
        {markers.map(({ latlng }) => (
          <Marker
            coordinate={latlng}
            key={`${latlng.latitude}-${latlng.longitude}`}
          />
        ))}
      </MapView>
      <PokemonModal
        modalVisible={modalVisible}
        setModalVisible={setModalVisible}
        onModalClose={() => {
          setNewMarker(null);
          setSelectedPokemon(null);
        }}
      >
        {selectedPokemon ? (
          <View style={styles.singlePokemonContainer}>
            <Pokemon
              pokemonData={selectedPokemon}
              isInsideModal={true}
              isSinglePokemon={true}
            />
            <Pressable style={styles.button} onPress={removeMarker}>
              <Text style={styles.buttonText}>
                <Feather
                  style={styles.buttonIcon}
                  name="trash-2"
                  size={20}
                  color="white"
                />
                Remove pin
              </Text>
            </Pressable>
          </View>
        ) : (
          <FlatList
            style={styles.pokemonsContainer}
            data={pokemonList}
            renderItem={({ item }) => {
              return (
                <Pokemon
                  pokemonData={item}
                  isInsideMap={true}
                  onPress={handlePress}
                />
              );
            }}
            keyExtractor={(pokemon) => pokemon.name}
          />
        )}
      </PokemonModal>
    </>
  );
}

const styles = StyleSheet.create({
  map: {
    width: "100%",
    height: "100%",
  },
  pokemonsContainer: {
    width: 300,
    padding: 10,
  },
  singlePokemonContainer: {
    alignItems: "center",
    justifyContent: "center",
  },
  button: {
    backgroundColor: "#b71c1c",
    padding: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    marginVertical: 20,
    width: "90%",
  },
  buttonText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 18,
    textAlign: "center",
  },
  buttonIcon: {
    marginRight: 30,
    paddingRight: 10,
  },
});
