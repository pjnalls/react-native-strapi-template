/**
 * Learn more about using TypeScript with React Navigation:
 * https://reactnavigation.org/docs/typescript/
 */

export type Card = {
  deckId: number;
  id: number;
  front: string;
  back: string;
  days: number;
};

export type Deck = {
  id: number;
  cards: Card[];
  description: string;
  name: string;
  user: User;
};

export type DecksProps = {
  deck: Deck;
  decks: Deck[];
  setDeck: React.Dispatch<React.SetStateAction<Deck>>;
};

export type DeckTabProps = {
  deck: Deck;
  decks: Deck[];
  setDeck: React.Dispatch<React.SetStateAction<Deck>>;
};

export type System = {
  lastReviewed: number;
  now: number;
};

export type QueueProps = {
  deckId: number;
};

export type User = {
  id: string;
  password: string;
}
