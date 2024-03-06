import { StyleSheet, Text, View } from "react-native";
import PokemonList from "../components/PokemonList/PokemonList";

export default function PokemonListScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Pokemons</Text>
      <PokemonList />
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
});
