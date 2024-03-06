import { Pressable, StyleSheet, Text, View } from "react-native";
import { useContext } from "react";
import Pokemon from "../components/Pokemon/Pokemon";
import FavoritePokemonContext from "../context/FavoritePokemonContext";
import { useNavigation } from "@react-navigation/native";

export default function FavoritePokemonScreen() {
  const { favoritePokemon } = useContext(FavoritePokemonContext);
  const navigation = useNavigation();

  const goBack = () => {
    navigation.navigate("Pokemon List" as never);
  };

  return (
    <View style={styles.container}>
      <View style={styles.pokemonContainer}>
        {favoritePokemon ? (
          <Pokemon pokemonData={favoritePokemon} isSinglePokemon={true} />
        ) : (
          <View style={styles.noFavPokemon}>
            <Text style={styles.text}>No fav pokemon set</Text>
            <Pressable style={styles.goBackButton} onPress={goBack}>
              <Text style={styles.goBackButtonText}>
                Go back to pokemon list
              </Text>
            </Pressable>
          </View>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
    paddingTop: 30,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 20,
  },
  pokemonContainer: {
    width: "100%",
    padding: "5%",
  },
  noFavPokemon: {
    alignItems: "center",
    justifyContent: "center",
  },
  text: {
    textAlign: "center",
    fontWeight: "bold",
    fontSize: 25,
  },
  goBackButton: {
    backgroundColor: "#f4511e",
    padding: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    marginTop: 20,
  },
  goBackButtonText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 18,
    textAlign: "center",
  },
});
