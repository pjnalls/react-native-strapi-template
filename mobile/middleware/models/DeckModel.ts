/**
 * Deck Model as defined in Strapi `backend` project.
 */

import { edit, save, dismiss } from "../controllers/DeckController";
import { Deck } from "../../types";

class DeckModel {
  deck: Deck = {} as Deck;
  user: string = "";

  constructor(user: string, deck: Deck) {
    this.deck = { ...deck };
    this.user = user;
    // save function adds id property later
  }

  async save() {
    // save the deck to Strapi
    const id = await save(this);

    // should no id be returned throw an error
    if (!id) {
      throw new Error("Deck could not be saved");
    }

    // set id and return true
    this.deck.id = id;
    return true;
  }

  async edit() {
    if (!this.deck.id) {
      throw new Error("Cannot edit TODO before it was saved.");
    }

    const edited = await edit(this);

    // check if the edit returned false
    if (!edited) {
      throw new Error("Deck could not be edited.");
    }

    return true;
  }

  async dismiss() {
    if (!this.deck.id) {
      throw new Error("Cannot delete TODO before it was saved.");
    }

    const dismissed = await dismiss(this);

    // check if the dismiss returned false
    if (!dismissed) {
      throw new Error("Deck could not be deleted.");
    }

    return true;
  }
}

export default DeckModel;
