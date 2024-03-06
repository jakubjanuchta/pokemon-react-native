import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import PokemonListScreen from "../../screens/PokemonListScreen";
import FavoritePokemonScreen from "../../screens/FavoritePokemonScreen";
import { Feather, MaterialIcons } from "@expo/vector-icons";
import MapScreen from "../../screens/MapScreen";

export default function Navigation() {
  const Tab = createBottomTabNavigator();

  return (
    <Tab.Navigator>
      <Tab.Screen
        name="Pokemon List"
        component={PokemonListScreen}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Feather name="list" size={size} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="Favorite Pokemon"
        component={FavoritePokemonScreen}
        options={{
          tabBarIcon: ({ color, size }) => (
            <MaterialIcons name="favorite-border" size={size} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="Pokemon Map"
        component={MapScreen}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Feather name="map" size={size} color={color} />
          ),
        }}
      />
    </Tab.Navigator>
  );
}
