import { FC } from "react";
import { StyleSheet, TouchableOpacity } from "react-native";

import Colors from "../constants/Colors";
import useColorScheme from "../hooks/useColorScheme";
import { TabBarIcon } from "../shared/TabBarIcon.util";
import { Text, View } from "./Themed";
import { Card, Deck, DecksProps } from "../types";

export const Decks: FC<DecksProps> = (props: DecksProps) => {
  const { deck, decks, setDeck } = props;
  const colorScheme = useColorScheme();
  return (
    <View>
      <View style={styles.container}></View>
      <View
        style={styles.separator}
        lightColor="#eee"
        darkColor="rgba(255,255,255,0.1)"
      />
      {decks.map((d, index) => (
        <View key={`deck-${d.id}`} style={styles.helpContainer}>
          <View style={{ marginRight: 17 }}>
            <TouchableOpacity onPress={() => handleDeckSelect(d, setDeck)}>
              <TabBarIcon
                name="sticky-note"
                color={
                  deck.id === index + 1
                    ? Colors[colorScheme].tabIconSelected
                    : Colors[colorScheme].tabIconDefault
                }
              />
            </TouchableOpacity>
          </View>

          <View
            style={{
              width: "80%",
            }}
          >
            <TouchableOpacity
              onPress={() => handleDeckSelect(d, setDeck)}
              style={styles.helpLink}
            >
              <Text
                style={{
                  ...styles.itemTitle,
                  color:
                    deck.id === index
                      ? Colors[colorScheme].tabIconSelected
                      : Colors[colorScheme].tabIconDefault,
                }}
              >
                {d.name}
              </Text>
              <Text
                lightColor="rgba(0,0,0,0.8)"
                darkColor="rgba(255,255,255,0.8)"
              >
                {d.description}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      ))}
    </View>
  );
};

function handleDeckSelect(deck: Deck, setDeck: any) {
  setDeck(() => ({ ...deck }));
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    marginHorizontal: 50,
  },
  itemTitle: {
    fontWeight: "500",
  },
  separator: {
    alignSelf: "center",
    marginVertical: 30,
    height: 1,
    width: "80%",
  },
  helpContainer: {
    flexDirection: "row",
    marginTop: 15,
    alignItems: "center",
    marginHorizontal: "auto",
    width: "90%",
  },
  helpLink: {
    paddingVertical: 15,
  },
});
