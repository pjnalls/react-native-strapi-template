import { FC, useCallback, useEffect, useState } from "react";
import { Button, StyleSheet } from "react-native";

import Colors from "../constants/Colors";
import { ONE_DAY_IN_MILLISECONDS, system } from "../data/Queue.data";
import { CURRENT_API_TOKEN, IPV4_ADDRESS } from "../evironment.dev";
import { fibonacci } from "../fibonacci";
import useColorScheme from "../hooks/useColorScheme";
import { Text, View } from "./Themed";
import { Card, QueueProps } from "../types";

export const Review: FC<QueueProps> = (props) => {
  const { deckId } = props;
  const [queue, setQueue] = useState([] as Card[]);
  const [currentCard, setCurrentCard] = useState(queue[queue.length - 1]);
  const [display, setDisplay] = useState(false);
  const colorScheme = useColorScheme();

  const getCardsForUser = useCallback(async (deckId: number) => {
    const url = `http://${IPV4_ADDRESS}:1337/api/cards?filters[$and][0][deckId][$eq]=${deckId}`;
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
      return Promise.reject("*** No cards found");
    }
  }, []);

  useEffect(() => {
    getCardsForUser(deckId).then((json) => {
      json &&
        setQueue([
          ...json.data.map((d: any) => ({ ...d.attributes, id: d.id })),
        ] as Card[]);
      setCurrentCard(
        [...json.data.map((d: any) => ({ ...d.attributes, id: d.id }))][0]
      );
    });
  }, []);

  if (currentCard && currentCard.days <= 0) {
    const { front, back } = currentCard;
    return (
      <View style={{ width: "100%" }}>
        <View style={styles.container}>
          <Text
            style={styles.text}
            lightColor="rgba(0,0,0,1)"
            darkColor="rgba(255,255,255,1)"
          >
            {front}
          </Text>
        </View>
        <View style={styles.container}>
          <View
            style={styles.separator}
            lightColor="#eee"
            darkColor="rgba(255,255,255,0.8)"
          />
          {display ? (
            <>
              <Text
                style={styles.text}
                lightColor="rgba(0,0,0,1)"
                darkColor="rgba(255,255,255,1)"
              >
                {back}
              </Text>
              <View
                style={styles.btnSeparator}
                lightColor="rgba(255,255,255,0)"
                darkColor="rgba(255,255,255,0)"
              />
              <View style={styles.buttonRow}>
                <Button
                  color={Colors[colorScheme].easy}
                  title="Easy"
                  onPress={() =>
                    review(
                      5,
                      currentCard,
                      queue,
                      () => setCurrentCard(queue[currentCard.id] as Card),
                      setDisplay
                    )
                  }
                />
                <Button
                  color={Colors[colorScheme].okay}
                  title="Okay"
                  onPress={() =>
                    review(
                      3,
                      currentCard,
                      queue,
                      () => setCurrentCard(queue[currentCard.id] as Card),
                      setDisplay
                    )
                  }
                />
                <Button
                  color={Colors[colorScheme].hard}
                  title="Hard"
                  onPress={() =>
                    review(
                      1,
                      currentCard,
                      queue,
                      () => setCurrentCard(queue[currentCard.id] as Card),
                      setDisplay
                    )
                  }
                />
                <Button
                  color={Colors[colorScheme].again}
                  title="Again"
                  onPress={() =>
                    review(
                      0,
                      currentCard,
                      queue,
                      () => setCurrentCard(queue[currentCard.id] as Card),
                      setDisplay
                    )
                  }
                />
              </View>
            </>
          ) : (
            <>
              <Text
                style={styles.text}
                lightColor="rgba(0,0,0,1)"
                darkColor="rgba(255,255,255,1)"
              >
                {" "}
              </Text>
              <View
                style={styles.btnSeparator}
                lightColor="rgba(255,255,255,0)"
                darkColor="rgba(255,255,255,0)"
              />
              <Button title="Answer" onPress={() => setDisplay(true)} />
            </>
          )}
        </View>
      </View>
    );
  } else {
    return (
      <View>
        <View style={styles.container}>
          <Text
            style={styles.text}
            lightColor="rgba(0,0,0,0.8)"
            darkColor="rgba(255,255,255,0.8)"
          >
            No reviews needed now for this deck.
          </Text>
        </View>
      </View>
    );
  }
};

const review = (
  n: number,
  currentCard: Card,
  queue: Card[],
  setCurrentCard: any,
  setDisplay: any
) => {
  const currentIndex = queue.findIndex((card) => card.id === currentCard.id);
  const days = updateLastReviewedDate(currentIndex, queue);

  if (days <= 0) {
    setDays(n, currentIndex, queue);
    setDisplay(false);
    setCurrentCard(() => queue[currentCard.id - 1]);
  }
};

const setDays = (m: number, i: number, queue: Card[]) =>
  (queue[i].days *= Math.round(fibonacci(m) * 0.333));

const updateLastReviewedDate = (i: number, queue: Card[]) => {
  system.now = Date.now();
  queue[i].days -= Math.round(
    system.now - system.lastReviewed / ONE_DAY_IN_MILLISECONDS
  );
  return queue[i].days;
};

const styles = StyleSheet.create({
  buttonRow: {
    display: "flex",
    justifyContent: "space-around",
    flexDirection: "row",
    width: "100%",
  },
  container: {
    marginTop: 33.333,
    alignItems: "center",
    marginHorizontal: 50,
  },
  text: {
    fontSize: 24,
    lineHeight: 24,
    textAlign: "center",
  },
  separator: {
    marginVertical: 60,
    height: 1,
    width: "80%",
  },
  btnSeparator: {
    marginVertical: 47.5,
    height: 1,
    width: "80%",
  },
});
