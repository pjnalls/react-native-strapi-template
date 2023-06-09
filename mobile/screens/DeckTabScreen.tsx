import React, { FC } from "react";
import { ScrollView } from "react-native";
import { Decks } from "../components/Decks";
import { Text, View } from "../components/Themed";
import Colors from "../constants/Colors";
import useColorScheme from "../hooks/useColorScheme";
import { TabBarIcon } from "../shared/TabBarIcon.util";
import { styles } from "../shared/Tab.styles";
import { DeckTabProps } from "../types";

export const DeckTabScreen: FC<DeckTabProps> = (props: DeckTabProps) => {
  const { deck, decks, setDeck } = props;
  const colorScheme = useColorScheme();
  return (
    <View style={styles.container}>
      <TabBarIcon
        name="sticky-note"
        color={Colors[colorScheme].tabIconSelected}
      />
      <View
        style={styles.separator}
        lightColor="#eee"
        darkColor="rgba(255,255,255,0.1)"
      />

      <Text
        style={styles.title}
        lightColor="rgba(0,0,0,1)"
        darkColor="rgba(255,255,255,1)"
      >
        {deck.name}
      </Text>
      <View
        style={styles.smSeparator}
        lightColor="#eee"
        darkColor="rgba(255,255,255,0.1)"
      />
      <Text
        style={styles.text}
        lightColor="rgba(0,0,0,0.8)"
        darkColor="rgba(255,255,255,0.8)"
      >
        {deck.description}
      </Text>
      <ScrollView>
        <Decks deck={deck} decks={decks} setDeck={setDeck} />
      </ScrollView>
    </View>
  );
};
