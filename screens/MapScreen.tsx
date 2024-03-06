import { StyleSheet, Text, View } from "react-native";
import PokemonMap from "../components/PokemonMap/PokemonMap";

export default function MapScreen() {
  return (
    <View style={styles.container}>
      <PokemonMap />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
