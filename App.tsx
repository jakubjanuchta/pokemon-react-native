import { QueryClient, QueryClientProvider } from "react-query";
import { NavigationContainer } from "@react-navigation/native";
import Navigation from "./components/Navigation/Navigation";
import FavoritePokemonProvider from "./providers/FavoritePokemonProvider";
import PokemonListProvider from "./providers/PokemonListProvider";

const queryClient = new QueryClient();

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <PokemonListProvider>
        <FavoritePokemonProvider>
          <NavigationContainer>
            <Navigation />
          </NavigationContainer>
        </FavoritePokemonProvider>
      </PokemonListProvider>
    </QueryClientProvider>
  );
}
