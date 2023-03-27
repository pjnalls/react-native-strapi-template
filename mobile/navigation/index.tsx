/**
 * If you are not familiar with React Navigation, refer to the "Fundamentals" guide:
 * https://reactnavigation.org/docs/getting-started
 *
 */
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import {
  NavigationContainer,
  DefaultTheme,
  DarkTheme,
} from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { FC, useCallback, useEffect, useState } from "react";
import { ColorSchemeName } from "react-native";

import Colors from "../constants/Colors";
import { CURRENT_API_TOKEN, IPV4_ADDRESS } from "../evironment.dev";
import useColorScheme from "../hooks/useColorScheme";
import LinkingConfiguration from "./LinkingConfiguration";
import { ModalScreen } from "../screens/ModalScreen";
import { NotFoundScreen } from "../screens/NotFoundScreen";
import { DeckTabScreen } from "../screens/DeckTabScreen";
import { QueueTabScreen } from "../screens/QueueTabScreen";
import { TabBarIcon } from "../shared/TabBarIcon.util";
import { Deck, RootStackParamList, RootTabParamList } from "../types";

export const Navigation: FC<{
  colorScheme: ColorSchemeName;
}> = ({ colorScheme }: { colorScheme: ColorSchemeName }) => (
  <NavigationContainer
    linking={LinkingConfiguration}
    theme={colorScheme === "dark" ? DarkTheme : DefaultTheme}
  >
    <RootNavigator />
  </NavigationContainer>
);

/**
 * A root stack navigator is often used for displaying modals on top of all other content.
 * https://reactnavigation.org/docs/modal
 */
const Stack = createNativeStackNavigator<RootStackParamList>();

function RootNavigator() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Root"
        component={BottomTabNavigator}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="NotFound"
        component={NotFoundScreen}
        options={{ title: "Oops!" }}
      />
      <Stack.Group screenOptions={{ presentation: "modal" }}>
        <Stack.Screen name="Modal" component={ModalScreen} />
      </Stack.Group>
    </Stack.Navigator>
  );
}

/**
 * A bottom tab navigator displays tab buttons on the bottom of the display to switch screens.
 * https://reactnavigation.org/docs/bottom-tab-navigator
 */
const BottomTab = createBottomTabNavigator<RootTabParamList>();

function BottomTabNavigator() {
  const colorScheme = useColorScheme();
  const [deck, setDeck] = useState({} as Deck);
  const [decks, setDecks] = useState([] as Deck[]);
  const getDecksForUser = useCallback(async () => {
    const url = `http://${IPV4_ADDRESS}:1337/api/decks`;
    // const jwt = store.getState().jwt;
    const response = await fetch(url, {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${CURRENT_API_TOKEN}`,
      },
    });

    if (response.ok) {
      const jsonValue = await response.json();
      return Promise.resolve(jsonValue);
    } else {
      return Promise.reject("*** No decks found");
    }
  }, []);

  useEffect(() => {
    getDecksForUser().then((json) => {
      json &&
        setDecks([
          ...json.data.map((d: any) => ({ ...d.attributes, id: d.id })),
        ] as Deck[]);
      setDeck(
        [...json.data.map((d: any) => ({ ...d.attributes, id: d.id }))][0]
      );
    });
  }, []);

  return (
    <BottomTab.Navigator
      initialRouteName="Deck"
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme].tint,
      }}
    >
      <BottomTab.Screen
        name="Deck"
        children={() => DeckTabScreen({ deck, decks, setDeck })}
        options={{
          title: "Decks",
          tabBarIcon: ({ color }) => <TabBarIcon name="list" color={color} />,
        }}
      />
      <BottomTab.Screen
        name="Queue"
        children={() => QueueTabScreen(deck)}
        options={{
          title: "Queue",
          tabBarIcon: ({ color }) => (
            <TabBarIcon name="long-arrow-right" color={color} />
          ),
        }}
      />
    </BottomTab.Navigator>
  );
}
