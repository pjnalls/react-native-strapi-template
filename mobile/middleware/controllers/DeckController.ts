import { IPV4_ADDRESS } from "../../evironment.dev";
import { store } from "../../redux/Store";
import { Deck } from "../../types";

/**
 * if you have an instance of Strapi running on your local
 * machine:
 *
 * 1. Run `adb reverse tcp:8163 tcp:8163` (only on android)
 *
 * 2. You have to change the access IP from localhost
 * to the IP of the machine Strapi is running on.
 */
const url = `http://${IPV4_ADDRESS}:1337/decks`;

/**
 * add a deck to Strapi
 */
export const save = async (deck: Deck) => {
  const requestBody = JSON.stringify({
    name: deck.name,
    description: deck.description,
    cards: deck.cards,
    user: deck.user.id,
  });

  const requestConfig = {
    method: "POST",
    headers: {
      Authorization: `Bearer ${store.getState().jwt}`,
      "Content-Type": "application/json",
    },
    body: requestBody,
  };

  const response = await fetch(url, requestConfig);

  const json = await response.json();

  if (json.error) {
    return null;
  }

  return json._id;
};

/**
 * add a deck to Strapi
 */
export const edit = async (deck: Deck) => {
  const requestBody = JSON.stringify({
    cards: deck.cards,
    name: deck.name,
    description: deck.description,
    user: deck.user.id,
  });

  const requestConfig = {
    method: "PUT",
    headers: { Authorization: `Bearer ${store.getState().jwt}` },
    body: requestBody,
  };

  const response = await fetch(`${url}/${deck.id}`, requestConfig);
  const json = await response.json();

  if (json.error) {
    return false;
  }

  return true;
};

/**
 * delete a deck from Strapi
 */
export const dismiss = async (deck: Deck) => {
  const response = await fetch(`${url}/${deck.id}`, {
    headers: { Authorization: `Bearer ${store.getState().jwt}` },
  });

  const json = await response.json();

  if (json.error) {
    return false;
  }

  return true;
};
